// src/components/WhyWorkWithUs.tsx
import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import { Icon } from '@iconify/react';
import styles from './WhyWorkWithUs.module.css'; // Import the CSS Module

const WhyWorkWithUs: React.FC = () => {
  const benefits = [
    {
      icon: 'mdi:account-group-outline',
      title: 'Supportive Team Culture',
      description: 'Work alongside experienced professionals in a collaborative and respectful environment.',
    },
    {
      icon: 'mdi:chart-line',
      title: 'Growth Opportunities',
      description: 'We invest in our team with training and opportunities for career advancement.',
    },
    {
      icon: 'mdi:hand-heart-outline',
      title: 'Competitive Compensation',
      description: 'Receive competitive pay, benefits, and performance incentives.',
    },
    {
      icon: 'mdi:map-marker-radius-outline',
      title: 'Serve Your Community',
      description: 'Make a tangible impact by providing essential services to homeowners in your local area.',
    },
  ];

  return (
    // Use global .section and module-specific .whyWorkSection
    <section className={`section ${styles.whyWorkSection}`}>
      {/* Use global .container */}
      <div className="container">
        <AnimateOnScroll>
          {/* Use global .section-title */}
          <h2 className="section-title">Why Join Express Plumbing?</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          {/* Use global .section-subtitle */}
          <p className="section-subtitle">
            We're more than just a plumbing company; we're a family dedicated to excellence and customer satisfaction.
          </p>
        </AnimateOnScroll>
        {/* Use module style for the grid */}
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <AnimateOnScroll key={index} className={styles.benefitCard}>
              <div className={styles.iconWrapper}>
                <Icon icon={benefit.icon} />
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
