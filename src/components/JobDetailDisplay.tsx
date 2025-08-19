// src/components/JobDetailDisplay.tsx
import React from 'react';
import Link from 'next/link';
import styles from './JobDetailDisplay.module.css'; // We'll create this next
import { Icon } from '@iconify/react';
import AnimateOnScroll from './AnimateOnScroll';

// Extend JobOpening interface for full details
export interface FullJobOpening {
  id: string;
  title: string;
  location: string;
  jobType: string;
  department: string;
  datePosted?: string; // Optional for display
  excerpt: string; // Still useful for meta tags
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits?: string[]; // Optional
}

interface JobDetailDisplayProps {
  job: FullJobOpening;
}

const JobDetailDisplay: React.FC<JobDetailDisplayProps> = ({ job }) => {
  return (
    // Use global .container for max-width and padding
    <div className={`container ${styles.jobDetailContainer}`}>
      <AnimateOnScroll>
        <header className={styles.header}>
          <Link href="/careers/openings" className={styles.backLink}>
            &lt; Back to Job Openings
          </Link>
          <h1 className={styles.title}>{job.title}</h1>
          
        <Link href={`/careers/apply/${job.id}`} className={`btn btn-accent btn-lg ${styles.applyButton}`}>
            Apply Now
        </Link>
          <div className={styles.meta}>
          <span><Icon icon="mdi:map-marker-outline" className={styles.metaIcon} /> {job.location}</span>
          <span><Icon icon="mdi:briefcase-outline" className={styles.metaIcon} /> {job.jobType}</span>
            <span><Icon icon="mdi:account-group-outline" className={styles.metaIcon} /> {job.department}</span>
            {job.datePosted && <span><Icon icon="mdi:calendar-month-outline" className={styles.metaIcon} /> Posted: {new Date(job.datePosted).toLocaleDateString()}</span>}
          </div>
        </header>
      </AnimateOnScroll>

      <AnimateOnScroll className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Job Description</h2>
        <p className={styles.descriptionText}>{job.description}</p>
      </AnimateOnScroll>

      <AnimateOnScroll className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Key Responsibilities</h2>
        <ul className={styles.list}>
          {job.responsibilities.map((item, index) => (
            <li key={`resp-${index}`}>{item}</li>
          ))}
        </ul>
      </AnimateOnScroll>

      <AnimateOnScroll className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Qualifications</h2>
        <ul className={styles.list}>
          {job.qualifications.map((item, index) => (
            <li key={`qual-${index}`}>{item}</li>
          ))}
        </ul>
      </AnimateOnScroll>

      {job.benefits && job.benefits.length > 0 && (
        <AnimateOnScroll className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Benefits</h2>
          <ul className={styles.list}>
            {job.benefits.map((item, index) => (
              <li key={`benefit-${index}`}>{item}</li>
            ))}
          </ul>
        </AnimateOnScroll>
      )}

      <AnimateOnScroll className={styles.applySection}>
        {/* This will eventually link to /careers/apply/[jobId] after login/signup */}
        <Link href={`/careers/apply/${job.id}`} className="btn btn-accent btn-lg">
          Apply Now
        </Link>
      </AnimateOnScroll>
    </div>
  );
};

export default JobDetailDisplay;
