import React from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Icon } from '@iconify/react';

interface SuccessPageProps {
  searchParams: { job?: string };
}

export const metadata = {
  title: 'Application Submitted | Express Plumbing',
  description: 'Thank you for your job application. We will review it and get back to you soon.',
};

const SuccessPage: React.FC<SuccessPageProps> = ({ searchParams }) => {
  const jobTitle = searchParams.job || 'the position';

  return (
    <section className="section">
      <div className="container text-center">
        <AnimateOnScroll>
          <Icon icon="mdi:check-circle-outline" className="text-6xl text-green-500 mx-auto mb-6" />
          <h1 className="section-title mb-4">Application Submitted Successfully!</h1>
          <p className="section-subtitle mb-8">
            Thank you for your interest in {jobTitle} at Express Plumbing. 
            We have received your application and will review it carefully. 
            Our team will get back to you within 5-7 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers/openings" className="btn btn-primary">
              View Other Openings
            </Link>
            <Link href="/" className="btn btn-secondary">
              Return to Home
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default SuccessPage;

