// src/app/page.tsx

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import MembershipCTA from '@/components/MembershipCTA';
import ServiceAreas from '@/components/ServiceAreas'; // <--- IMPORT
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <MembershipCTA />
      <ServiceAreas /> {/* <--- ADD NEW SECTION HERE */}
      <Contact />
    </>
  );
}