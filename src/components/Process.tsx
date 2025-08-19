// src/components/Process.tsx
import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import { Icon } from '@iconify/react'; // Assuming you might use Iconify here too
import styles from './Process.module.css'; // Import the CSS Module

interface ProcessStepData {
    iconName: string; // For Iconify, e.g., 'mdi:phone-outline'
    // Or if using Font Awesome still for this section:
    // iconClass: string; // e.g., 'fas fa-phone-volume'
    title: string;
    description: string;
}

const Process: React.FC = () => {
  const steps: ProcessStepData[] = [
    { iconName: 'mdi:phone-outline', title: 'Initial Consultation', description: 'Contact us via phone or form to discuss your needs and schedule an appointment.' },
    { iconName: 'mdi:clipboard-text-search-outline', title: 'On-Site Evaluation', description: 'Our experts visit your property for a thorough assessment and provide clear options.' },
    { iconName: 'mdi:tools', title: 'Expert Installation/Repair', description: 'Skilled technicians perform the work efficiently using quality parts and materials.' },
    { iconName: 'mdi:thumb-up-outline', title: 'Follow-Up & Satisfaction', description: 'We ensure everything works perfectly and follow up to guarantee your complete satisfaction.' },
  ];

  return (
    // Keep global 'section' and 'process' classes if they have general layout/padding
    <section className="section process" id="process">
      {/* Keep global 'container' class */}
      <div className="container">
        <AnimateOnScroll>
          {/* Keep global 'section-title' class */}
          <h2 className="section-title">Our Simple Service Process</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          {/* Keep global 'section-subtitle' class */}
          <p className="section-subtitle">
            We make getting expert service easy and transparent. Here’s how we work with you.
          </p>
        </AnimateOnScroll>
        {/* Use module style for the steps container */}
        <div className={styles.processSteps}>
          {steps.map((step, index) => (
            <AnimateOnScroll key={index} className={styles.processStep} threshold={0.1}>
                <div className={styles.stepIconWrapper}>
                  {/* Using Iconify component */}
                  <Icon icon={step.iconName} />
                  {/* Or if using Font Awesome: <i className={step.iconClass}></i> */}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
