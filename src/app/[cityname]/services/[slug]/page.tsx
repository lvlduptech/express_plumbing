// src/app/[cityname]/services/[slug]/page.tsx
// This is a Server Component for data fetching and metadata.
// It will pass data to a Client Component for rendering.

import { Metadata } from 'next';
import Link from 'next/link';
import { getServiceBySlug, getAllServiceSlugs, Service } from '@/lib/services'; // Adjust path if needed
import { getAllLocations } from '@/lib/locations'; // Assuming you have this from previous setup
import ServiceDetailClientContent from '@/components/ServiceDetailClientContent'; // Reusing the client component
// Assuming styles are shared or co-located, adjust path if you move/rename ServiceDetail.module.css
// This path points to the CSS module used by the generic /services/[slug] pages.
// If you have a different CSS module for city-specific pages, update this path.
import styles from '@/app/services/[slug]/ServiceDetail.module.css';
// Icon import is not strictly needed here as ServiceDetailClientContent handles it,
// but kept if you decide to render any icons directly in this server component (e.g., for error states).
// import { Icon } from '@iconify/react';


interface CityServicePageProps {
  params: {
    cityname: string; // From [cityname] folder
    slug: string;     // From [slug] folder
  };
}

// Generates all possible combinations of cityname and service slug for static generation
export async function generateStaticParams(): Promise<Array<CityServicePageProps['params']>> {
  const cityLocationObjects = getAllLocations(); // Expects { slug: string, name: string }[]
  const citySlugs = cityLocationObjects.map(loc => loc.slug);

  const serviceSlugObjects = getAllServiceSlugs(); // Expects { params: { slug: '...' } }[]
  const serviceSlugs = serviceSlugObjects.map(s => s.params.slug);

  const paths: Array<CityServicePageProps['params']> = [];
  for (const city of citySlugs) {
    for (const service of serviceSlugs) {
      // Ensure city and service are defined and not empty strings before pushing
      if (city && service) {
        paths.push({ cityname: city, slug: service });
      }
    }
  }
  return paths;
}

// Generates dynamic metadata for the page (title, description, OG tags)
export async function generateMetadata({ params }: CityServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  const cityLocationObjects = getAllLocations();
  const locationData = cityLocationObjects.find(loc => loc.slug === params.cityname);
  // Fallback to a formatted version of cityname param if not found in locations.ts (though it should be)
  const cityNameForDisplay = locationData ? locationData.name : params.cityname.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (!service || !locationData) { // Check if both service and location are valid
    return {
      title: `Information Not Found | Express Plumbing`,
      description: `The requested service or location could not be found.`,
    };
  }

  // Process meta description with city name
  // Ensure [Your Area] is also replaced if it exists in the generic meta description
  let metaDescription = service.metaDescription.replace(/\[City Name\]/gi, cityNameForDisplay);
  metaDescription = metaDescription.replace(/\[Your Area\]/gi, cityNameForDisplay);

  const pageTitle = `${service.heroTitle || service.title} in ${cityNameForDisplay} | Express Plumbing`;

  return {
    title: pageTitle,
    description: metaDescription,
    openGraph: { // Basic Open Graph tags
      title: pageTitle,
      description: metaDescription,
      // Consider adding a relevant image for social sharing:
      // images: [{ url: service.ogImageUrl || '/default-og-image.jpg' }],
    },
  };
}

// Helper function to replace [City Name] and [Your Area] placeholders in text
const processTextWithCity = (text: string | undefined, cityName: string): string => {
  if (!text) return '';
  // Replace both placeholders
  let processedText = text.replace(/\[City Name\]/gi, cityName + ', NJ');
  processedText = processedText.replace(/\[Your Area\]/gi, cityName+ ', NJ');
  // Also replace a common default like "Brick, NJ" if it exists in generic content and should be dynamic
  // This might be too aggressive if "Brick, NJ" is intended literally sometimes.
  // Consider if this specific replacement is always desired.
  // processedText = processedText.replace(/Brick, NJ/gi, cityName);
  return processedText;
};

// The main Server Component for this dynamic route
export default function CityServicePage({ params }: CityServicePageProps) {
  const serviceData = getServiceBySlug(params.slug);
  const cityLocationObjects = getAllLocations();
  const locationData = cityLocationObjects.find(loc => loc.slug === params.cityname);
  const cityNameForDisplay = locationData ? locationData.name : params.cityname.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (!serviceData || !locationData) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '4rem 1rem', minHeight: '60vh' }}>
        <h1 className="section-title">Page Not Found</h1>
        <p className="section-subtitle">
          Sorry, we couldn't find the information for the service "{params.slug}" in "{params.cityname}".
        </p>
        <Link href="/" className="btn btn-primary">Go to Homepage</Link>
      </div>
    );
  }

  const processedService: Service = JSON.parse(JSON.stringify(serviceData)); // Deep clone

  processedService.title = processTextWithCity(serviceData.title, cityNameForDisplay);
  processedService.metaDescription = processTextWithCity(serviceData.metaDescription, cityNameForDisplay);
  processedService.heroSubtitle = processTextWithCity(serviceData.heroSubtitle, cityNameForDisplay);
  processedService.content.introduction = processTextWithCity(serviceData.content.introduction, cityNameForDisplay);
  processedService.content.finalCallToAction = processTextWithCity(serviceData.content.finalCallToAction, cityNameForDisplay);

  if (processedService.content.whyChooseUs) {
    processedService.content.whyChooseUs.title = processTextWithCity(serviceData.content.whyChooseUs.title, cityNameForDisplay);
    // MODIFICATION: Process each point in the whyChooseUs.points array
    if (serviceData.content.whyChooseUs.points) {
      processedService.content.whyChooseUs.points = serviceData.content.whyChooseUs.points.map(point =>
        processTextWithCity(point, cityNameForDisplay)
      );
    }
  }
  if (processedService.content.process) {
    processedService.content.process.title = processTextWithCity(serviceData.content.process.title, cityNameForDisplay);
    // MODIFICATION: Process each step in the process.steps array
    if (serviceData.content.process.steps) {
      processedService.content.process.steps = serviceData.content.process.steps.map(step =>
        processTextWithCity(step, cityNameForDisplay)
      );
    }
  }

  processedService.content.sections = serviceData.content.sections.map(section => ({
    ...section,
    title: processTextWithCity(section.title, cityNameForDisplay),
    description: processTextWithCity(section.description, cityNameForDisplay),
    points: section.points?.map(point => processTextWithCity(point, cityNameForDisplay)),
    subsections: section.subsections?.map(sub => ({
      ...sub,
      title: processTextWithCity(sub.title, cityNameForDisplay),
      description: processTextWithCity(sub.description, cityNameForDisplay),
      items: sub.items?.map(item => processTextWithCity(item, cityNameForDisplay)),
    })),
  }));

  return (
    <div className={styles.serviceDetailPageWrapper}>
      <ServiceDetailClientContent service={processedService} cityName={cityNameForDisplay}/>
    </div>
  );
}
