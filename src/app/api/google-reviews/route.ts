// src/app/api/google-reviews/route.ts
import { NextResponse } from 'next/server';

// Define the structure of a review as expected from the v1 Places API
interface AuthorAttribution {
  displayName: string;
  uri?: string;
  photoUri?: string;
}

interface ReviewText {
  text: string;
  languageCode?: string;
}

interface GoogleV1Review {
  name?: string; // Review resource name
  relativePublishTimeDescription: string;
  rating: number;
  text?: ReviewText;
  originalText?: ReviewText;
  authorAttribution?: AuthorAttribution;
  publishTime?: string; // Timestamp string (e.g., "2023-05-12T15:00:00Z")
}

// Define the structure for our application's review format
interface AppReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number; // Unix timestamp (seconds)
  id: string;
}

// --- In-Memory Cache Configuration ---
let cachedReviewsData: {
  reviews: AppReview[];
  timestamp: number;
} | null = null;

// Cache duration: How long to keep reviews in cache before re-fetching.
// For testing "newest", set to 0 AND RESTART YOUR DEV SERVER.
const CACHE_DURATION_MS = 1 * 60 * 60 * 1000; // 1 hour (default)
// const CACHE_DURATION_MS = 0; // Example for testing: disables cache

export async function GET() {
  const currentTime = Date.now();
  // console.log(`[API v1 /google-reviews] Route hit at ${new Date(currentTime).toISOString()}`);

  // 1. Check Cache
  if (CACHE_DURATION_MS > 0 && cachedReviewsData && (currentTime - cachedReviewsData.timestamp < CACHE_DURATION_MS)) {
    // console.log('[API v1 /google-reviews] CACHE HIT: Returning cached reviews.');
    return NextResponse.json({ reviews: cachedReviewsData.reviews });
  }

  // console.log(`[API v1 /google-reviews] CACHE MISS or EXPIRED/DISABLED (Duration: ${CACHE_DURATION_MS}ms). Fetching fresh reviews.`);

  // 2. Fetch from Google Places API (v1)
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error('[API v1 /google-reviews] CRITICAL ERROR: Google API Key or Place ID is not configured.');
    return NextResponse.json({ error: 'Server configuration error: API Key or Place ID missing.' }, { status: 500 });
  }

  const fields = [
    "id",
    "displayName", // Place Name
    "rating",      // Overall place rating
    "userRatingCount",
    "reviews.authorAttribution.displayName",
    "reviews.authorAttribution.uri",
    "reviews.authorAttribution.photoUri",
    "reviews.publishTime", // Crucial for sorting by newest
    "reviews.rating",
    "reviews.text.text",
    "reviews.relativePublishTimeDescription"
  ].join(',');

  const googleApiUrl = `https://places.googleapis.com/v1/places/${placeId}?fields=${fields}&key=${apiKey}&languageCode=en`;
  // console.log(`[API v1 /google-reviews] Fetching URL (API key redacted): ${googleApiUrl.replace(apiKey, "YOUR_API_KEY_REDACTED")}`);

  try {
    const response = await fetch(googleApiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // Prevent Next.js fetch caching of this outgoing request
    });

    if (!response.ok) {
      let errorDetails: any = { message: `Google API responded with status ${response.status}` };
      try { errorDetails = await response.json(); } catch (e) { /* ignore parse error */ }
      console.error('[API v1 /google-reviews] Google Places API (v1) error response:', errorDetails);
      return NextResponse.json({ error: `Failed to fetch reviews from Google (v1): ${response.statusText}`, details: errorDetails }, { status: response.status });
    }

    const data = await response.json();

    if (!data || !data.reviews) {
      console.warn('[API v1 /google-reviews] Google Places API (v1) response missing reviews array or main data. Data:', data);
      return NextResponse.json({ reviews: [], details: `Google API (v1) response missing reviews.` }, { status: 200 });
    }

    let fetchedV1Reviews: GoogleV1Review[] = data.reviews || [];
    // console.log(`[API v1 /google-reviews] Fetched ${fetchedV1Reviews.length} raw reviews. First author (before sort): ${fetchedV1Reviews[0]?.authorAttribution?.displayName || 'N/A'}`);

    // ** Sort reviews by publishTime (newest first) **
    fetchedV1Reviews.sort((a, b) => {
      const timeA = a.publishTime ? new Date(a.publishTime).getTime() : 0;
      const timeB = b.publishTime ? new Date(b.publishTime).getTime() : 0;
      return timeB - timeA; // Sorts in descending order (newest first)
    });
    // console.log(`[API v1 /google-reviews] Reviews sorted. First author (after sort): ${fetchedV1Reviews[0]?.authorAttribution?.displayName || 'N/A'}`);

    // --- Your Business Logic: e.g., Filter for 5-star reviews ---
    // If you only want 5-star reviews, this filter will be applied to the newest reviews.
    // If the newest review isn't 5-star, it won't be included.
    const fiveStarV1Reviews = fetchedV1Reviews.filter(review => review.rating === 5);
    // console.log(`[API v1 /google-reviews] Filtered to ${fiveStarV1Reviews.length} newest reviews with rating === 5.`);

    // Transform GoogleV1Review to AppReview format
    const transformedReviews: AppReview[] = fiveStarV1Reviews.map((review, index) => {
      const authorName = review.authorAttribution?.displayName || 'Anonymous';
      const reviewTimeSeconds = review.publishTime ? Math.floor(new Date(review.publishTime).getTime() / 1000) : Math.floor(Date.now() / 1000);
      return {
        author_name: authorName,
        author_url: review.authorAttribution?.uri,
        profile_photo_url: review.authorAttribution?.photoUri,
        rating: review.rating,
        relative_time_description: review.relativePublishTimeDescription || '',
        text: review.text?.text || '',
        time: reviewTimeSeconds,
        id: `v1-${reviewTimeSeconds}-${authorName.replace(/\s+/g, '-')}-${index}`,
      };
    });
    
    // 3. Update Cache
    cachedReviewsData = {
      reviews: transformedReviews,
      timestamp: currentTime,
    };
    // console.log(`[API v1 /google-reviews] Cache updated. New timestamp: ${new Date(currentTime).toISOString()}`);

    return NextResponse.json({ reviews: transformedReviews });

  } catch (error: any) {
    console.error('[API v1 /google-reviews] CATCH BLOCK: Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error while fetching reviews (v1).', details: error.message }, { status: 500 });
  }
}