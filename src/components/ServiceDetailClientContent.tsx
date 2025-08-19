'use client'; // This component handles client-side aspects

import Link from 'next/link';
import { useEffect, useState } from 'react'; // useState can be removed if service prop is always defined
import { Service } from '@/lib/services'; // Adjust path as needed
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Assuming path
import styles from '@/app/services/[slug]/ServiceDetail.module.css'; // Adjust path to your CSS module
import { Icon } from '@iconify/react';

interface ServiceDetailClientContentProps {
  service: Service; // Receive the fully resolved service object as a prop
}

export default function ServiceDetailClientContent({ service }: ServiceDetailClientContentProps) {
  const { content } = service;

  // Helper to create slugs for section IDs, used for linking and scroll spying
  const createSectionId = (title: string) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  // Generate sidebar links based on content.sections and other major blocks
  const sidebarLinks = [
    { title: service.title, id: 'main-content-title-section' }, // Link to the new main title
    { title: 'Introduction', id: 'introduction' },
    ...content.sections.map(section => ({ title: section.title, id: createSectionId(section.title) })),
    ...(content.whyChooseUs ? [{ title: content.whyChooseUs.title, id: createSectionId(content.whyChooseUs.title) }] : []),
    ...(content.process ? [{ title: content.process.title, id: createSectionId(content.process.title) }] : []),
    { title: 'Contact Us', id: 'contact-us' },
  ];

  // Active sidebar link highlighting
  useEffect(() => {
    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: '-20% 0px -60% 0px', // Adjust margins to define when a section is "active"
      threshold: 0, // Trigger when any part of the element is visible given rootMargin
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const navLink = document.querySelector(`.${styles.sidebarNav} a[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
          // Remove active class from all links first
          document.querySelectorAll(`.${styles.sidebarNav} a.${styles.activeSidebarLink}`).forEach(activeLink => {
            activeLink.classList.remove(styles.activeSidebarLink);
          });
          // Add active class to the intersecting one
          navLink?.classList.add(styles.activeSidebarLink);
        } else {
          navLink?.classList.remove(styles.activeSidebarLink);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = sidebarLinks.map(link => document.getElementById(link.id)).filter(el => el !== null);

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [sidebarLinks]); // Dependency array

  return (
    <> {/* React Fragment */}
      <header className={styles.hero}>
        <div className={`container ${styles.heroContentWrapper}`}>
          {/* Optional: Breadcrumbs
          <nav className={styles.breadcrumbs}>
            <Link href="/">Home</Link> <span>&gt;</span>
            <Link href="/services">Services</Link> <span>&gt;</span>
            {service.heroTitle || service.title.split(' in ')[0]}
          </nav>
          */}
          <AnimateOnScroll>
            <h1 className={styles.heroTitle}>{service.heroTitle || service.title.split(' in ')[0]}</h1>
          </AnimateOnScroll>
          <AnimateOnScroll>
            {service.heroSubtitle && <p className={styles.heroSubtitle}>{service.heroSubtitle}</p>}
          </AnimateOnScroll>
          <AnimateOnScroll>
            <Link href="/contact" className={`btn btn-accent ${styles.heroCtaButton}`}>
              Schedule Service
            </Link>
          </AnimateOnScroll>
        </div>
      </header>

      <div className={`container ${styles.pageLayoutContainer}`}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarStickyContent}>
            <h4>Explore This Service</h4> {/* UPDATED SIDEBAR TITLE */}
            <ul className={styles.sidebarNav}>
              {sidebarLinks.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={styles.mainContentArea}>
          <article className={styles.serviceContentArticle}>
            {/* MAIN CONTENT TITLE - ADDED AS PER REQUEST */}
            <section id="main-content-title-section" className={styles.mainContentHeader}>
              <h2 className={styles.mainContentTitle}>{service.title}</h2>
              {/* Optional lead paragraph can go here if needed */}
            </section>

            <section id="introduction" className={styles.introductionSection}>
              <p className={styles.introductionText}>{content.introduction}</p>
              <div className={styles.primaryCallToActionBox}>
                <p>Ready to get started or need more information?</p>
                <p className={styles.ctaPhoneNumber}>
                  Call Us Today: <a href={`tel:${content.callToActionNumber.replace(/\D/g, '')}`}>{content.callToActionNumber}</a>
                </p>
              </div>
            </section>

            {content.sections.map((section, index) => (
              <section key={index} id={createSectionId(section.title)} className={styles.contentBlock}>
                <h2 className={styles.blockTitle}>{section.title}</h2>
                {section.description && <p className={styles.blockDescription}>{section.description}</p>}
                {section.points && section.points.length > 0 && (
                  <ul className={styles.list}>
                    {section.points.map((point, pIndex) => (
                      <li key={pIndex} className={styles.listItem}>
                        <Icon icon="mdi:check-circle-outline" className={styles.listIcon} />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {section.subsections && section.subsections.map((subsection, sIndex) => (
                  <div key={sIndex} className={styles.subsectionBlock}>
                    {/* Ensure subsection titles also have IDs if you want to link to them directly */}
                    <h3 id={createSectionId(subsection.title)} className={styles.subsectionTitle}>{subsection.title}</h3>
                    {subsection.description && <p className={styles.subsectionDescription}>{subsection.description}</p>}
                    {subsection.items && subsection.items.length > 0 && (
                       <ul className={styles.list}>
                          {subsection.items.map((item, iIndex) => (
                            <li key={iIndex} className={styles.listItem}>
                              <Icon icon="mdi:arrow-right-circle-outline" className={styles.listIcon} />
                              {item}
                            </li>
                          ))}
                       </ul>
                    )}
                  </div>
                ))}
              </section>
            ))}

            {content.whyChooseUs && (
              <section id={createSectionId(content.whyChooseUs.title)} className={`${styles.contentBlock} ${styles.whyChooseUsBlock}`}>
                <h2 className={styles.blockTitle}>{content.whyChooseUs.title}</h2>
                <ul className={`${styles.list} ${styles.twoColumnList}`}>
                  {content.whyChooseUs.points.map((point, index) => (
                    <li key={index} className={styles.listItem}>
                      <Icon icon="mdi:thumb-up-outline" className={styles.listIcon} />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {content.process && (
              <section id={createSectionId(content.process.title)} className={`${styles.contentBlock} ${styles.processBlock}`}>
                <h2 className={styles.blockTitle}>{content.process.title}</h2>
                <ol className={`${styles.list} ${styles.orderedList}`}>
                  {content.process.steps.map((step, index) => (
                    <li key={index} className={styles.orderedListItem}>
                      <span className={styles.stepNumber}>{index + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section id="contact-us" className={`${styles.contentBlock} ${styles.finalCallToActionSection}`}>
              <h2 className={styles.blockTitle}>Contact Us Today!</h2>
              <p className={styles.blockDescription}>{content.finalCallToAction}</p>
              <div className={styles.finalButtons}>
                <Link href={`tel:${content.callToActionNumber.replace(/\D/g, '')}`} className={`btn btn-primary ${styles.finalCtaButton}`}>
                  <Icon icon="mdi:phone" style={{ marginRight: '8px' }} /> Call {content.callToActionNumber}
                </Link>
                <Link href="/contact" className={`btn btn-secondary ${styles.finalCtaButton}`}>
                   <Icon icon="mdi:email-fast-outline" style={{ marginRight: '8px' }} /> Request Estimate
                </Link>
              </div>
            </section>
          </article>
        </main>
      </div>
    </>
  );
}
