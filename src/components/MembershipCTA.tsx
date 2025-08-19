// src/components/MembershipCTA.tsx
import React from 'react';
import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';
import styles from './MembershipCTA.module.css'; // Import the CSS Module

const MembershipCTA: React.FC = () => {
  return (
    // Use global 'section' for consistent structure if needed, or just module style
    <section className={styles.membershipSection} id="membership">
       {/* Container can be global or part of the module style if specific layout needed */}
       <AnimateOnScroll className="container">
            <h2 className={styles.title}>Join Our Comfort Club Membership!</h2>
            <p className={styles.description}>
                Enjoy priority service, discounts on repairs, and regular maintenance checks
                to keep your systems running smoothly all year long. Ask us for details!
            </p>
            {/* Using global button styles, with an optional module class for specific tweaks */}
            <Link href="#contact" className={`btn btn-accent ${styles.ctaButton}`}>
               Learn More & Sign Up
            </Link>
       </AnimateOnScroll>
    </section>
  );
};

export default MembershipCTA;
