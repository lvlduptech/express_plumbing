'use client';

import React, { useState, useEffect } from 'react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Use pageYOffset for broader compatibility, or scrollY
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Type the event
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a
      href="#" // Keep href for semantics, but rely on onClick
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      id="back-to-top"
      aria-label="Back to Top"
      // Optionally hide from tab order when not visible
      tabIndex={isVisible ? 0 : -1}
    >
      <i className="fas fa-arrow-up"></i>
    </a>
  );
};

export default BackToTop;