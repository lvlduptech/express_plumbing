// src/components/MobileCTA.tsx
'use client';

import React from 'react';
import Link from 'next/link';

interface MobileCTAProps {
    phone: string;
    scheduleLink: string;
}

const MobileCTA: React.FC<MobileCTAProps> = ({ phone, scheduleLink }) => {
  return (
    <div className="mobile-cta-bar">
      {/* Call Us link (assuming only icon+text, wrap it too for consistency) */}
      <a href={phone} className="btn btn-primary">
         <span> {/* Wrap icon and text */}
            <i className="fas fa-phone mr-2"></i> {/* Optional: add margin */}
            Call Us
         </span>
      </a>

      {/* Schedule link - CORRECTED */}
      <Link href={scheduleLink} className="btn btn-accent">
         <span> {/* Wrap icon and text in ONE child element */}
            <i className="fas fa-calendar-alt mr-2"></i> {/* Optional: add margin */}
            Schedule
         </span>
      </Link>
    </div>
  );
};

export default MobileCTA;