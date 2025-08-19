'use client'; // Necessary if AnimateOnScroll or Icon uses client-side hooks

import React, { useMemo, useEffect } from 'react'; // Added useMemo and useEffect
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'; // Added useParams
import AnimateOnScroll from './AnimateOnScroll'; // Assuming path from your project structure
import { Icon } from '@iconify/react';
import styles from './Services.module.css'; // Your CSS Module for this component

// Import the services data and Service type from your central lib/services.ts file
import { services, Service } from '@/lib/services'; // Adjust path if necessary based on your tsconfig.json

const ServicesComponent: React.FC = () => {
  const pathname = usePathname();
  const params = useParams<{ cityname?: string; location?: string; slug?: string; [key: string]: string | string[] | undefined }>();

  // Derive currentCitySlug using useMemo, similar to Header.tsx
  const currentCitySlug = useMemo(() => {
    if (params?.cityname) return params.cityname;
    if (params?.location) return params.location;
    // Do NOT use params.slug here as it would conflict on /services/[slug] pages
    return null;
  }, [params]);

  // Optional: Debugging log
  useEffect(() => {
    console.log("ServicesComponent Pathname:", pathname);
    console.log("ServicesComponent Params Object:", params);
    console.log("ServicesComponent currentCitySlug (memoized):", currentCitySlug);
  }, [pathname, params, currentCitySlug]);


  // Fallback UI if there are no services to display
  if (!services || services.length === 0) {
    return (
      <section className="section services" id="services">
        <div className="container">
          <AnimateOnScroll>
            <h2 className="section-title">Our Expert Services</h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <p className="section-subtitle">
              Service details are currently unavailable. Please check back later.
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  // Helper function to generate service links, now defined inside the component
  // or can be memoized if preferred, but direct usage in map is also fine
  // as the map itself will re-run if currentCitySlug (via props or context if refactored) changes.
  // For simplicity here, we'll construct it directly in the map.

  // Main component rendering
  return (
    <section className="section services" id="services">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">Our Expert Services</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="section-subtitle">
            Comprehensive solutions for your plumbing, heating, cooling, and roofing needs in Brick, NJ and beyond.
          </p>
        </AnimateOnScroll>
        <div className={styles.featuresGrid}>
          {services.map((service: Service) => {
            // Dynamically construct the href for each service card's Link
            const serviceLinkHref = currentCitySlug
              ? `/${currentCitySlug}/services/${service.slug}`
              : `/services/${service.slug}`;

            return (
              <Link href={serviceLinkHref} key={service.slug} className={styles.featureLinkWrapper}>
                <AnimateOnScroll className={styles.featureItem} threshold={0.1}>
                  <span className={styles.iconWrapper}>
                    <Icon icon={service.iconIdentifier} />
                  </span>
                  <h3 className={styles.featureTitle}>
                    {service.heroTitle || service.title.split(' in ')[0]}
                  </h3>
                  <p className={styles.featureDescription}>
                    {service.shortDescription}
                  </p>
                </AnimateOnScroll>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;
