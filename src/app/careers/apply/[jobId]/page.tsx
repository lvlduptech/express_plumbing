import React from 'react';
import { getJobById } from '@/lib/jobs';
import { notFound } from 'next/navigation';
import JobApplicationForm from '@/components/JobApplicationFormNew';

interface ApplyPageProps {
  params: { jobId: string };
}

export async function generateMetadata({ params }: ApplyPageProps) {
  const job = await getJobById(params.jobId);
  if (!job) {
    return {
      title: 'Job Not Found | Express Plumbing',
      description: 'The job posting you are looking for could not be found.',
    };
  }
  return {
    title: `Apply for ${job.title} | Express Plumbing`,
    description: `Submit your application for the ${job.title} position at Express Plumbing.`,
  };
}

const ApplyPage: React.FC<ApplyPageProps> = async ({ params }) => {
  const { jobId } = params;
  const job = await getJobById(jobId);

  if (!job) {
    notFound();
  }

  return <JobApplicationForm job={job} />;
};

export default ApplyPage;

