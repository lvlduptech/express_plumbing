// src/components/JobListingCard.tsx
import React from 'react';
import Link from 'next/link';
import styles from './JobListingCard.module.css'; // We'll create this next
import { Icon } from '@iconify/react';

export interface JobOpening {
  id: string; // Will be used for the URL, e.g., 'plumber-lbi'
  title: string;
  location: string;
  jobType: string; // e.g., "Full-time", "Part-time"
  department: string; // e.g., "Plumbing", "HVAC"
  excerpt: string; // A short summary of the job
}

interface JobListingCardProps {
  job: JobOpening;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ job }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        <Link href={`/careers/jobs/${job.id}`}>
          {job.title}
        </Link>
      </h3>
      <div className={styles.meta}>
        <span><Icon icon="mdi:map-marker-outline" className={styles.metaIcon} /> {job.location}</span>
        <span><Icon icon="mdi:briefcase-outline" className={styles.metaIcon} /> {job.jobType}</span>
        <span><Icon icon="mdi:account-group-outline" className={styles.metaIcon} /> {job.department}</span>
      </div>
      <p className={styles.excerpt}>{job.excerpt}</p>
      <Link href={`/careers/jobs/${job.id}`} className={styles.detailsLink}>
        View Details <Icon icon="mdi:arrow-right" className="inline-block ml-1" />
      </Link>
    </div>
  );
};

export default JobListingCard;
