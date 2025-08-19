// src/app/services/[slug]/page.tsx
// This is a Server Component

import { Metadata } from 'next';
import Link from 'next/link';
import { getServiceBySlug, getAllServiceSlugs, Service } from '@/lib/services'; // Adjust path as needed
import ServiceDetailClientContent from '@/components/ServiceDetailClientContent'; // Import the client component
import styles from './ServiceDetail.module.css'; // Styles are still relevant

interface ServicePageProps {
  params: {
    slug: string;
  };
}

const DEFAULT_CITY_NAME = "NJ"; // Define your default display name

// This function runs at build time on the server
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs(); // From lib/services.ts, expects { params: { slug: '...' } }
  return slugs;
}

// Helper function to replace [City Name] and [Your Area] placeholders
const processTextWithDefaultCity = (text: string | undefined, defaultCity: string): string => {
  if (!text) return '';
  let processedText = text.replace(/\[City Name\]/gi, defaultCity);
  processedText = processedText.replace(/\[Your Area\]/gi, defaultCity);
  // Optional: If you had other specific placeholders like "Brick, NJ" in generic content
  // and want them replaced with the default, add that here.
  // processedText = processedText.replace(/Brick, NJ/gi, defaultCity);
  return processedText;
};


// This function also runs on the server
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return {
      title: 'Service Not Found | Express Plumbing',
      description: 'The requested service could not be found.',
    };
  }

  // Process meta description with the default city name
  const metaDescription = processTextWithDefaultCity(service.metaDescription, DEFAULT_CITY_NAME);
  const pageTitle = `${processTextWithDefaultCity(service.title, DEFAULT_CITY_NAME)} | Express Plumbing`;
  // If heroTitle is used in meta title, ensure it's also processed or generic
  const heroTitleForMeta = processTextWithDefaultCity(service.heroTitle, DEFAULT_CITY_NAME) || pageTitle;


  return {
    title: `${heroTitleForMeta} | Express Plumbing`, // Using heroTitle for consistency if it's more concise
    description: metaDescription,
    openGraph: {
      title: `${heroTitleForMeta} | Express Plumbing`,
      description: metaDescription,
      // images: [{ url: service.imageUrl || '/default-og-image.jpg' }],
    },
  };
}

// This is the main Server Component for the page
export default function ServicePage({ params }: ServicePageProps) {
  const serviceData = getServiceBySlug(params.slug); // Fetch data directly

  if (!serviceData) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '4rem 1rem', minHeight: '60vh' }}>
        <h1 className="section-title">Service Not Found</h1>
        <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
          We're sorry, but the service "{params.slug}" does not exist or may have been moved.
        </p>
        <Link href="/" className="btn btn-primary">Go to Homepage</Link>
      </div>
    );
  }

  // Deep clone and process the service content to replace placeholders with DEFAULT_CITY_NAME
  const processedService: Service = JSON.parse(JSON.stringify(serviceData));

  processedService.title = processTextWithDefaultCity(serviceData.title, DEFAULT_CITY_NAME);
  processedService.metaDescription = processTextWithDefaultCity(serviceData.metaDescription, DEFAULT_CITY_NAME);
  // heroTitle is usually generic (e.g., "Cooling"), but if it contains placeholders:
  // processedService.heroTitle = processTextWithDefaultCity(serviceData.heroTitle, DEFAULT_CITY_NAME);
  processedService.heroSubtitle = processTextWithDefaultCity(serviceData.heroSubtitle, DEFAULT_CITY_NAME);

  processedService.content.introduction = processTextWithDefaultCity(serviceData.content.introduction, DEFAULT_CITY_NAME);
  processedService.content.finalCallToAction = processTextWithDefaultCity(serviceData.content.finalCallToAction, DEFAULT_CITY_NAME);

  if (processedService.content.whyChooseUs) {
    processedService.content.whyChooseUs.title = processTextWithDefaultCity(serviceData.content.whyChooseUs.title, DEFAULT_CITY_NAME);
    if (serviceData.content.whyChooseUs.points) {
      processedService.content.whyChooseUs.points = serviceData.content.whyChooseUs.points.map(point =>
        processTextWithDefaultCity(point, DEFAULT_CITY_NAME)
      );
    }
  }
  if (processedService.content.process) {
    processedService.content.process.title = processTextWithDefaultCity(serviceData.content.process.title, DEFAULT_CITY_NAME);
    if (serviceData.content.process.steps) {
      processedService.content.process.steps = serviceData.content.process.steps.map(step =>
        processTextWithDefaultCity(step, DEFAULT_CITY_NAME)
      );
    }
  }

  processedService.content.sections = serviceData.content.sections.map(section => ({
    ...section,
    title: processTextWithDefaultCity(section.title, DEFAULT_CITY_NAME),
    description: processTextWithDefaultCity(section.description, DEFAULT_CITY_NAME),
    points: section.points?.map(point => processTextWithDefaultCity(point, DEFAULT_CITY_NAME)),
    subsections: section.subsections?.map(sub => ({
      ...sub,
      title: processTextWithDefaultCity(sub.title, DEFAULT_CITY_NAME),
      description: processTextWithDefaultCity(sub.description, DEFAULT_CITY_NAME),
      items: sub.items?.map(item => processTextWithDefaultCity(item, DEFAULT_CITY_NAME)),
    })),
  }));

  // Pass the processed service data AND the default city name to the Client Component
  return (
    <div className={styles.serviceDetailPageWrapper}>
      <ServiceDetailClientContent service={processedService} cityName={DEFAULT_CITY_NAME} />
    </div>
  );
}
