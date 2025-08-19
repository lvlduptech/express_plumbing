// src/components/Header.tsx
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useParams } from 'next/navigation';
import styles from './Header.module.css';

interface NavItem {
  href: string;
  label: string;
  isService?: boolean;
  serviceSlug?: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const params = useParams<{ cityname?: string; location?: string; slug?: string; [key: string]: string | string[] | undefined }>();

  const currentCitySlug = useMemo(() => {
    if (params?.cityname) return params.cityname;
    if (params?.location) return params.location;
    return null;
  }, [params]);

  useEffect(() => {
    console.log("Header Pathname:", pathname);
    console.log("Header Params Object:", params);
    console.log("Header currentCitySlug (memoized):", currentCitySlug);
  }, [pathname, params, currentCitySlug]);

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const adjustHeaderPosition = () => {
      const mobileCtaBar = document.querySelector<HTMLElement>('.mobile-cta-bar');
      const headerElement = headerRef.current;
      if (!headerElement) return;
      let topOffset = 0;
      if (mobileCtaBar && window.getComputedStyle(mobileCtaBar).display !== 'none') {
        topOffset = mobileCtaBar.offsetHeight;
      }
      if (!headerElement.classList.contains(styles.fixedHeader)) { // Check if fixedHeader class exists (you'll need to define this class)
        headerElement.style.top = `${topOffset}px`;
      } else {
         if (window.innerWidth < 769) { // Assuming 769px is your mobile breakpoint
            headerElement.style.top = `${topOffset}px`;
         } else {
            headerElement.style.top = `0px`;
         }
      }
    };
    adjustHeaderPosition();
    window.addEventListener('resize', adjustHeaderPosition);
    return () => window.removeEventListener('resize', adjustHeaderPosition);
  }, []);

  const navItems: NavItem[] = useMemo(() => {
    const getServiceLink = (serviceSlug: string) => {
      // This console.log is for debugging the links generated for navItems
      // console.log('getServiceLink for navItems. currentCitySlug:', currentCitySlug, 'for serviceSlug:', serviceSlug);
      return currentCitySlug
        ? `/${currentCitySlug}/services/${serviceSlug}`
        : `/services/${serviceSlug}`;
    };

    return [
      { href: '/membership', label: 'Membership' },
      { href: getServiceLink('cooling'), label: 'Cooling', isService: true, serviceSlug: 'cooling' },
      { href: getServiceLink('roofing'), label: 'Roofing', isService: true, serviceSlug: 'roofing' },
      { href: getServiceLink('heating'), label: 'Heating', isService: true, serviceSlug: 'heating' },
      { href: getServiceLink('plumbing'), label: 'Plumbing', isService: true, serviceSlug: 'plumbing' },
      { href: '/about-us', label: 'About Us' },
      { href: '/careers', label: 'Careers' },
    ];
  }, [currentCitySlug]);

  // MODIFIED: Logic for logoLink and scheduleServiceLink
  const logoLink = useMemo(() => {
    if (currentCitySlug) {
      // If a city context exists, always link the logo to the /service-area/[cityname] page
      return `/service-area/${currentCitySlug}`;
    }
    // Otherwise, link to the absolute homepage
    return '/';
  }, [currentCitySlug]);

  const scheduleServiceLink = useMemo(() => {
    if (currentCitySlug) {
      // If a city context exists, link Schedule Service to the contact page under /service-area/[cityname]
      // This implies you'd have a route like /service-area/[cityname]/contact
      // If not, you might want this to be /contact or /[cityname]/contact depending on other requirements
      return `https://book.servicetitan.com/o58ls9d58b2yncb25zyxcv51?rwg_token=ACgRB3ds9xvP0DogpoiD7jGQ3swqfQhLf1YPLLpgf2ctO2wTx7NjhXTINO8eXXYr_4Gg570_GSevxoOXWdTSBJXyWF51L7CoVt5p132KswCMXpTuVCwUSRFacHEtmQl1fUmmrtzIE1Em`;
    }
    // Otherwise, link to the generic contact page
    return 'https://book.servicetitan.com/o58ls9d58b2yncb25zyxcv51?rwg_token=ACgRB3ds9xvP0DogpoiD7jGQ3swqfQhLf1YPLLpgf2ctO2wTx7NjhXTINO8eXXYr_4Gg570_GSevxoOXWdTSBJXyWF51L7CoVt5p132KswCMXpTuVCwUSRFacHEtmQl1fUmmrtzIE1Em';
  }, [currentCitySlug]);


  return (
    <header className={`${styles.header}`} id="main-header" ref={headerRef}>
      <script src="https://app.roofle.com/roof-quote-pro-widget.js?id=torVLszXjlh7p4eTNkPHj" async></script>
      <div className={`container ${styles.container}`}>
        <Link href={logoLink} onClick={closeMenu} aria-label="Go to homepage" className={styles.logoLink}>
          <Image
            src="/assets/logo.png" // Verify your logo path
            alt="Express Plumbing Logo"
            className={styles.logoImage}
            width={62} height={62}
            priority
          />
        </Link>

        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? styles.active : ''}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.desktopButton}>
          <Link
            href={scheduleServiceLink}
            className="btn btn-primary"
            onClick={closeMenu}
          >
            Schedule Service
          </Link>
        </div>

        <button
          className={styles.menuToggle}
          id="menu-toggle"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileDropdown}>
          <nav>
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.label} className={styles.mobileNavItem}>
                  <Link href={item.href} onClick={closeMenu} className={styles.mobileNavLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className={styles.mobileNavButtonItem}>
                <Link href={scheduleServiceLink} className={`btn btn-primary ${styles.mobileNavButton}`} onClick={closeMenu}>
                  Schedule Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
