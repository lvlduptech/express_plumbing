// src/app/careers/openings/page.tsx
import React from 'react';
import Link from 'next/link';
import JobListingCard, { JobOpening } from '@/components/JobListingCard';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { getAllJobs } from '@/lib/jobs';

export const metadata = {
  title: 'Open Positions | Careers at Express Plumbing',
  description: 'Explore current job openings for plumbers, HVAC technicians, roofers, and more at Express Plumbing.',
};

const OpeningsPage: React.FC = async () => {
  const jobs = await getAllJobs();

  // Convert Prisma Job objects to JobOpening interface
  const jobOpenings: JobOpening[] = jobs.map(job => ({
    id: job.id,
    title: job.title,
    location: job.location,
    jobType: job.jobType,
    department: job.department,
    excerpt: job.excerpt,
  }));

  return (
    <section className="section open-positions-page-section">
      <div className="container">
        <AnimateOnScroll>
          <h1 className="section-title text-center mb-4">Current Open Positions</h1>
          <p className="section-subtitle text-center mb-12">
            Find your next opportunity with Express Plumbing. We're looking for dedicated professionals to join us.
          </p>
        </AnimateOnScroll>

        {jobOpenings.length > 0 ? (
          <div className="job-listings-grid">
            {jobOpenings.map((job) => (
              <AnimateOnScroll key={job.id}>
                <JobListingCard job={job} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <AnimateOnScroll>
            <p className="text-center text-lg text-[var(--color-text-muted)]">
              There are currently no open positions. Please check back later or contact us with your resume.
            </p>
          </AnimateOnScroll>
        )}

        <AnimateOnScroll className="text-center mt-12">
            <Link href="/careers" className="btn btn-secondary">
                &larr; Back to Careers Home
            </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default OpeningsPage;
