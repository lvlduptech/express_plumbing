// src/components/ServiceAreas.tsx

import React from 'react';
import Link from 'next/link';
import { serviceAreas } from '@/lib/locations'; // Import the data
import AnimateOnScroll from './AnimateOnScroll';
import styles from './ServiceAreas.module.css'; // Import the CSS Module
// Removed Iconify import as Font Awesome is used for map marker

const ServiceAreas: React.FC = () => {
  return (
    // Use global 'section' and module-specific 'serviceAreasSection'
    <section className={`section ${styles.serviceAreasSection}`} id="service-areas">
      {/* Use global 'container' */}
      <div className="container">
        <AnimateOnScroll>
          {/* Use global 'section-title' and module-specific 'title' for color override */}
          <h2 className={`section-title ${styles.title}`}>
            Our Service Areas
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          {/* Use global 'section-subtitle' and module-specific 'subtitle' for color override */}
          <p className={`section-subtitle ${styles.subtitle}`}>
            Proudly serving homeowners across these communities in New Jersey.
          </p>
        </AnimateOnScroll>

        {/* Grid container for county columns */}
        <AnimateOnScroll className={styles.grid}>
          {/* Map over the counties in the serviceAreas object */}
          {Object.entries(serviceAreas).map(([county, towns]) => (
            // Each county gets its own column div
            <div className={styles.column} key={county}>
              {/* County Heading */}
              <h4 className={styles.countyTitle}>
                {`${county.charAt(0).toUpperCase() + county.slice(1)} County`}
              </h4>
              {/* List of towns for the county */}
              <ul>
                {towns.map((town, index) => {
                  // Generate slug for the link
                  const slug = String(town || '').toLowerCase().replace(/\s+/g, '-').replace(/\(.*\)/g, '').replace(/[^a-z0-9-]/g, '');
                  return (
                    <li key={`${county}-${town}-${index}`} className={styles.townItem}>
                      <Link href={`/service-area/${slug}`} className={styles.townLink}>
                        <span> {/* Keep span for potential future icon + text structure */}
                          {/* Using Font Awesome class directly */}
                          <i className={`fas fa-map-marker-alt fa-fw mr-2 ${styles.townIcon}`}></i>
                          {town}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ServiceAreas;
