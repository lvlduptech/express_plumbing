'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Review {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string; // Still in interface, but won't be used
  text: string;
  time: number; // Still in interface
  id: string;
}

interface ReviewCardState {
  [key: string]: boolean;
}

const TEXT_TRUNCATE_LENGTH = 120;
const MAX_REVIEWS_TO_DISPLAY = 3;
const DEBUG_STATIC_MODE = false; // Set to true to use dummy data

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<ReviewCardState>({});

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      setReviews([]);
      try {
        if (DEBUG_STATIC_MODE) {
            const dummyReviewsData = [
                { author_name: 'Amy Caparelli (Dummy)', author_url: '#', profile_photo_url: '/assets/images/default-avatar.png', rating: 5, relative_time_description: 'a month ago', text: 'Staff courteous, very neat and always on time. I have used them multiple times and have always been satisfied. They are my go to Plumbers. This text is elongated to test the read more functionality and ensure that it works as expected, truncating longer reviews effectively.', time: Date.now() / 1000 - 2592000, id: 'dummy-0-amy' },
                { author_name: 'John B. (Dummy)', author_url: '#', profile_photo_url: '/assets/images/default-avatar.png', rating: 4, relative_time_description: '2 weeks ago', text: 'Good service, resolved my issue quickly. Would recommend for plumbing work. Fair price too.', time: Date.now() / 1000 - 1209600, id: 'dummy-1-john' },
                { author_name: 'Sarah C. (Dummy)', author_url: '#', profile_photo_url: '/assets/images/default-avatar.png', rating: 5, relative_time_description: '3 days ago', text: 'Absolutely fantastic! They came out on a Sunday and fixed our burst pipe. Lifesavers! Very professional. Short and sweet.', time: Date.now() / 1000 - 259200, id: 'dummy-2-sarah' },
            ];
            console.log("[STATIC DEBUG] Using dummy reviews for static display.");
            setReviews(dummyReviewsData.slice(0, MAX_REVIEWS_TO_DISPLAY));
            setIsLoading(false);
            return;
        }

        const response = await fetch('/api/google-reviews');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response from API.' }));
          throw new Error(errorData.error || `Failed to fetch reviews: ${response.status}`);
        }
        const data = await response.json();

        if (data.reviews && data.reviews.length > 0) {
          const reviewsWithId = data.reviews.map((review: Omit<Review, 'id'>, index: number) => ({
            ...review,
            id: `${review.time}-${review.author_name.replace(/\s+/g, '-')}-${index}`
          }));
          setReviews(reviewsWithId.slice(0, MAX_REVIEWS_TO_DISPLAY));
        } else {
          setReviews([{
            id: 'fallback-express-static',
            author_name: 'Your Company Name',
            text: 'We are dedicated to providing top-notch service and value your feedback! Please visit our Google Business Profile to see what our clients are saying or to leave your own review.',
            rating: 5,
            relative_time_description: 'Always', // Not displayed
            time: Date.now() / 1000,
            profile_photo_url: '/assets/images/default-avatar.png',
          }]);
        }
      } catch (err: any) {
        console.error('Error fetching reviews for static display:', err);
        setError(err.message || 'Could not load reviews at this time.');
        setReviews([{
          id: 'fallback-system-static',
          author_name: 'System Notification',
          text: 'We are currently unable to display customer reviews. Please try again later or visit our Google Business Profile directly.',
          rating: 0,
          relative_time_description: 'Now', // Not displayed
          time: Date.now() / 1000,
          profile_photo_url: '/assets/images/default-avatar.png',
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const toggleReadMore = (reviewId: string) => {
    setExpandedReviews(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  if (isLoading) {
    return (
        <section id="testimonials" className={`section ${styles.testimonialsSection}`}>
          <div className="container">
            <h2 className={`section-title ${styles.testimonialsSectionTitle}`}>Customer Voices</h2>
            <div className={styles.loadingState}>Loading customer feedback...</div>
          </div>
        </section>
      );
  }

  const showFallbackMessage = error ||
                             (!isLoading && reviews.length === 0) ||
                             (reviews.length === 1 && reviews[0].id === 'fallback-system-static');

  if (showFallbackMessage) {
    let message = "No customer testimonials to display at the moment. Please check back later!";
    if (error) {
      message = `Error: ${error}`;
    } else if (reviews.length === 1 && reviews[0].id === 'fallback-system-static') {
      message = reviews[0].text;
    }

    return (
        <section id="testimonials" className={`section ${styles.testimonialsSection}`}>
          <div className="container">
            <h2 className={`section-title ${styles.testimonialsSectionTitle}`}>Customer Feedback</h2>
            <div className={styles.errorState}><p>{message}</p></div>
            {(error || (reviews.length === 1 && reviews[0].id === 'fallback-system-static')) && (
             <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
               <a
                 href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'YOUR_PLACE_ID_FALLBACK'}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn btn-secondary"
               >
                 Visit our Google Profile
               </a>
             </div>
            )}
          </div>
        </section>
      );
  }

  return (
    <section id="testimonials" className={`section ${styles.testimonialsSection}`}>
      <div className="container">
        <h2 className={`section-title ${styles.testimonialsSectionTitle}`}>Happy Customers, Quality Work</h2>
        <p className={`section-subtitle ${styles.testimonialsSectionSubtitle}`}>
          We take pride in our 5-star service. Here's what our clients are saying on Google!
        </p>

        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.authorHeader}> {/* Renamed for clarity, was styles.author */}
                {review.profile_photo_url && review.profile_photo_url !== '/assets/images/default-avatar.png' && !review.profile_photo_url.includes('gstatic.com/images/cleardot.gif') ? (
                  <Image
                    src={review.profile_photo_url}
                    alt={`${review.author_name || 'User'}'s profile`}
                    width={40} height={40}
                    className={styles.authorImage}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div className={styles.authorInitial} style={{width: 40, height: 40, fontSize: '1rem'}}>
                    {review.author_name?.substring(0,1).toUpperCase() || 'U'}
                  </div>
                )}
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>
                    {review.author_url ? (
                      <a href={review.author_url} target="_blank" rel="noopener noreferrer" title={`View ${review.author_name || 'User'}'s Google profile`}>
                        {review.author_name || 'Anonymous'}
                      </a>
                    ) : (
                      review.author_name || 'Anonymous'
                    )}
                  </h4>
                  <div className={styles.rating}> {/* Directly placed rating here */}
                    {review.rating > 0 && (
                        <>
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <FontAwesomeIcon
                            key={`star-${starIndex}-${review.id}`}
                            icon={faStar}
                            className={starIndex < review.rating ? styles.starFilled : styles.starEmpty}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.content}>
                <p>
                  {expandedReviews[review.id] || (review.text && review.text.length <= TEXT_TRUNCATE_LENGTH)
                    ? review.text
                    : `${review.text ? review.text.substring(0, TEXT_TRUNCATE_LENGTH) : ''}...`}
                </p>
                {review.text && review.text.length > TEXT_TRUNCATE_LENGTH && (
                  <span
                    onClick={() => toggleReadMore(review.id)}
                    className={styles.readMoreLink}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleReadMore(review.id); }}}
                    aria-expanded={!!expandedReviews[review.id]}
                  >
                    {expandedReviews[review.id] ? 'Read Less' : 'Read More'}
                  </span>
                )}
              </div>

              <div className={styles.reviewFooter}>
                 {/* The "via Google" text will only show if it's not your company's fallback message */}
                 {review.rating > 0 && review.id !== 'fallback-express-static' && (
                    <span className={styles.reviewSource}>via Google</span>
                 )}
              </div>

            </div>
          ))}
        </div>

        <div style={{textAlign: 'center', marginTop: '2.5rem'}}>
          <a
            href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'YOUR_PLACE_ID_FALLBACK'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Read More Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;