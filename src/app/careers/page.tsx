// src/app/careers/page.tsx
import React from 'react';
import Link from 'next/link';
import CareersHero from '@/components/CareersHero';
import WhyWorkWithUs from '@/components/WhyWorkWithUs';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { getAllJobs } from '@/lib/jobs';

export const metadata = {
  title: 'Careers at Express Plumbing',
  description: 'Join the Express Plumbing team! Explore exciting career opportunities in plumbing, HVAC, roofing, and more in the LBI and Brick, NJ area.',
};

const CareersPage: React.FC = async () => {
  const jobs = await getAllJobs();
  const openPositionsCount = jobs.length;

  return (
    <>
      <CareersHero />
      <WhyWorkWithUs />

      <section className="section current-openings-cta bg-[var(--color-background)]" id="open-positions">
        <div className="container text-center">
          <AnimateOnScroll>
            <h2 className="section-title">Explore Opportunities</h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            {openPositionsCount > 0 ? (
              <>
                <p className="section-subtitle mb-8">
                  We have {openPositionsCount} exciting position{openPositionsCount > 1 ? 's' : ''} available. Find your next career move with us!
                </p>
                <Link href="/careers/openings" className="btn btn-primary">
                  View Open Positions
                </Link>
              </>
            ) : (
              <p className="section-subtitle">
                We are not actively hiring for specific roles at the moment, but we are always interested in hearing from talented individuals.
                Feel free to reach out via our contact page.
              </p>
            )}
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
