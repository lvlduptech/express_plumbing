// src/components/Footer.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css'; // Import the CSS Module

interface FooterLink { label: string; href: string; }
interface SocialLink extends FooterLink { icon: string; }

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  const col1Links: FooterLink[] = [
    { label: 'Schedule', href: '#contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const col2SocialLinks: SocialLink[] = [
    { label: 'Facebook', href: '#', icon: 'fab fa-facebook-f' },
    // { label: 'Instagram', href: '#', icon: 'fab fa-instagram' },
    // { label: 'Youtube', href: '#', icon: 'fab fa-youtube' },
    // { label: 'Pro Tips', href: '/blog', icon: 'fas fa-lightbulb' },
  ];

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      alert('Newsletter signup not implemented yet.');
  };

  return (
    // Use module style for the main footer layout
    <footer className={styles.footerLayout}>
      {/* Keep global .container for consistent width/padding */}
      <div className="container">

        {/* <div className={styles.topSection}>
          <Link href="/" aria-label="Go to homepage">
             <Image
                src="/assets/logo.png" // Verify your logo path
                alt="Express Plumbing Logo"
                className={styles.logo}
                width={180} height={50} priority
             />
          </Link>
          <p className={styles.copyright}>&copy; {currentYear} Express Plumbing, Heating, Cooling, & Roofing</p>
        </div> */}

        {/* <hr className={styles.separator} /> */}

        <div className={styles.middleContent}>
          <div className={styles.column}>
            <ul>
              {col1Links.map((link) => (
                <li key={link.label}>
                   <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <ul>
              {col2SocialLinks.map((link) => (
                <li key={link.label}>
                   <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <i className={`${link.icon} fa-fw mr-2`}></i>{link.label}
                   </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <p className={styles.newsletterIntro}>Sign up for Pro Tips, Special Offers, & More</p>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Email Address" required aria-label="Email Address for Newsletter"/>
              <button type="submit" className={styles.newsletterButton}>Submit</button>
            </form>
          </div>

          <div className={styles.column}>
            <p className={styles.licenseInfo}>
              HVAC # 19HC00911700 <br />
              PLUMBING # 36BI01247400
            </p>
          </div>
        </div>

        <hr className={styles.separator} />

        <div className={styles.bottomExtra}>
          <div className={styles.callInfo}>
            <span className={styles.callToday}>Call Today!</span>
            <a href="tel:+16093612727">(609) 361-2727</a><br/>
            {/* <a href="tel:+1555..." >(555) ...</a> */}
          </div>
          <div className={styles.slogan}>
             Express: Fin-tastically Fast Home Service! {/* Example Slogan */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
