// src/components/Hero.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';
import styles from './Hero.module.css'; // Import the CSS Module

const Hero: React.FC = () => {
  const words: string[] = ["Plumbing", "Roofing", "Heating", "Cooling", "Building", "Remodeling"];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>(words[0]);
  const logoTextRef = useRef<HTMLSpanElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef1 = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const logoTextElement = logoTextRef.current;
    if (!logoTextElement) return;

    logoTextElement.textContent = words[currentIndex];
    logoTextElement.style.transform = 'translateY(0)';
    logoTextElement.style.opacity = '1';

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef1.current) clearTimeout(timeoutRef1.current);

    intervalRef.current = setInterval(() => {
      const currentElement = logoTextRef.current;
      if (!currentElement) return;

      currentElement.style.transition = 'transform 0.5s ease-in, opacity 0.5s ease-in';
      currentElement.style.transform = 'translateY(100%)';
      currentElement.style.opacity = '0';

      timeoutRef1.current = setTimeout(() => {
        const elementInTimeout1 = logoTextRef.current;
        if (!elementInTimeout1) return;

        setCurrentIndex(prevIndex => {
            const nextIndex = (prevIndex + 1) % words.length;
            setDisplayedText(words[nextIndex]); // Update React state
            // elementInTimeout1.textContent = words[nextIndex]; // Text is now set by {displayedText}
            return nextIndex;
        });

        requestAnimationFrame(() => {
            if (!elementInTimeout1) return;
            elementInTimeout1.style.transition = 'none';
            elementInTimeout1.style.transform = 'translateY(100%)';
            void elementInTimeout1.offsetWidth;
            requestAnimationFrame(() => {
                if (!elementInTimeout1) return;
                elementInTimeout1.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
                elementInTimeout1.style.transform = 'translateY(0)';
                elementInTimeout1.style.opacity = '1';
            });
        });
      }, 500);
    }, 2500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef1.current) clearTimeout(timeoutRef1.current);
    };
  }, [words]); // Effect depends on 'words'

  const videos: string[] = [
    "https://www.shutterstock.com/shutterstock/videos/3678465017/preview/stock-footage-roofer-installing-a-new-roof-on-an-house-element-of-work-moments.webm",
    "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/H2qwMhbkqkzg2flz4/videoblocks-6366f1ab58056f4322bc9a7d_rjbeyydro__d698156934880951e1be0dd9bef88ec9__P360.mp4",
    "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/BKaAXTX/4k-furnace-repairman-3754_71h2tyyd__f7cdc3d5f9c04c721afd13f8c29923ff__P360.mp4",
    "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/MPaEbz-/videoblocks-v3-0002_20230310-pm-peskov-home-repair-3-dom-residens-crossmedia00000000_b-rx8icq3__ea30464b677f08044067dc83878069c6__P360.mp4",
  ];

  return (
    // Use styles from Hero.module.css
    // Keep global 'section' class for consistent padding from globals.css
    <section className={`${styles.hero} section`} id="home">
      <div className={styles.videoContainer}>
        {videos.map((src, index) => (
          <video
            key={index}
            className={styles.video} // Use module style
            autoPlay loop muted playsInline
            src={src}
            style={{ animationDelay: `${index * 10}s` }}
          />
        ))}
        <div className={styles.videoOverlay}></div>
      </div>

      {/* Keep global 'container' class for consistent max-width and padding */}
      <div className={`container ${styles.heroContent}`}>
        <AnimateOnScroll className="w-full"> {/* Tailwind class for width */}
          <h1 className={styles.heroTitle}>
            <span className={styles.logoContainer}>
              <span>Express&nbsp;</span>
              <span
                // id="logo-text" // ID can be removed if all styling is via module
                className={styles.logoText} // Apply module style
                ref={logoTextRef}
                style={{ transform: 'translateY(0)', opacity: 1, display: 'inline-block' }}
              >
                 {displayedText} {/* Text is rendered from state */}
              </span>
            </span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <p className={styles.heroParagraph}>
            At Express Plumbing, Heating, Cooling, & Roofing, we pride ourselves on exceptional workmanship
            and customer service – ensuring your home’s essential systems are in expert hands.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
            {/* Use global .btn and .btn-accent for button styling */}
            <Link href="#contact" className={`btn btn-accent ${styles.heroButton}`}>
              Schedule a Service
            </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Hero;
