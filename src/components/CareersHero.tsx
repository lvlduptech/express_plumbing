// src/components/CareersHero.tsx
'use client';

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import styles from './CareersHero.module.css'; // Import the CSS Module

const CareersHero: React.FC = () => {
  return (
    // Use module style for the section
    <section className={styles.careersHero} id="careers-hero-top">
      {/* Container class might be global or part of module if specific layout needed */}
      <div className={`container ${styles.heroContent}`}>
        <AnimateOnScroll>
          <h1 className={styles.title}>
            Build Your Future with Express Plumbing
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className={styles.subtitle}>
            We're looking for passionate, skilled individuals to join our growing team.
            Discover a rewarding career where your expertise makes a difference.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          {/* Using global button styles */}
          <a href="#open-positions" className="btn btn-accent">
            See Our Open Roles
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default CareersHero;
