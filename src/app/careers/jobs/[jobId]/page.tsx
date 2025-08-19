// src/app/careers/jobs/[jobId]/page.tsx
import React from 'react';
import Link from 'next/link';
import JobDetailDisplay, { FullJobOpening } from '@/components/JobDetailDisplay';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Icon } from '@iconify/react';
import { getJobById, getAllJobs } from '@/lib/jobs';
import { notFound } from 'next/navigation';

interface JobDetailPageProps {
  params: { jobId: string };
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const job = await getJobById(params.jobId);
  if (!job) {
    return {
      title: 'Job Not Found | Express Plumbing',
      description: 'The job posting you are looking for could not be found.',
    };
  }
  return {
    title: `${job.title} | Careers at Express Plumbing`,
    description: job.excerpt,
  };
}

const JobDetailPage: React.FC<JobDetailPageProps> = async ({ params }) => {
  const { jobId } = params;
  const job = await getJobById(jobId);

  if (!job) {
    notFound();
  }

  // Convert Prisma Job to FullJobOpening interface
  const fullJobOpening: FullJobOpening = {
    id: job.id,
    title: job.title,
    location: job.location,
    jobType: job.jobType,
    department: job.department,
    datePosted: job.createdAt.toISOString().split('T')[0],
    excerpt: job.excerpt,
    description: job.description || job.excerpt,
    responsibilities: job.requirements ? job.requirements.split('\n').filter(r => r.trim()) : [],
    qualifications: job.requirements ? job.requirements.split('\n').filter(r => r.trim()) : [],
    benefits: job.benefits ? job.benefits.split('\n').filter(b => b.trim()) : [],
  };

  return (
    <div className="job-detail-page-container section">
      <JobDetailDisplay job={fullJobOpening} />
    </div>
  );
};

export default JobDetailPage;

// Generate static params for all active jobs
export async function generateStaticParams() {
  const jobs = await getAllJobs();
  return jobs.map(job => ({
    jobId: job.id,
  }));
}
