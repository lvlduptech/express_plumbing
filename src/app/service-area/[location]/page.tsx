// src/app/service-area/[location]/page.tsx

import type { Metadata } from 'next'; // Remove ResolvingMetadata for now
import HomePageContent from '@/app/page';
import { getAllLocations } from '@/lib/locations';

interface LocationPageProps {
    params: { location: string };
}

// --- Generate Static Paths (Keep as before) ---
export async function generateStaticParams() {
    const locations = getAllLocations();
    return locations.map((loc) => ({
        location: loc.slug,
    }));
}

// --- MINIMAL Generate Metadata ---
export async function generateMetadata(
    { params }: LocationPageProps // Remove the 'parent' parameter for this test
): Promise<Metadata> {
    // Directly access params.location
    const locationSlug = params.location;

    // Use it directly in the title (minimal processing)
    const title = `Service Area Test: ${locationSlug}`;

    // Return only the title
    return {
        title: title,
    };
}

// --- Page Component (Keep as before) ---
export default function ServiceAreaPage({ params }: LocationPageProps) {
    return <HomePageContent />;
}