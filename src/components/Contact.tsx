// src/components/Contact.tsx
'use client'; // Keep for form handling

import React from 'react';
// import Link from 'next/link'; // Not used in this version
import AnimateOnScroll from './AnimateOnScroll'; // Assuming this component exists
import styles from './Contact.module.css'; // Import the CSS Module
// Assuming Font Awesome icons are loaded globally for i tags
// import { Icon } from '@iconify/react'; // Or use Iconify

const Contact: React.FC = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement form submission logic here
    console.log("Form submitted (Implement backend logic)");
    alert("Thank you for your request! (Implement actual submission)");
    // const form = event.target as HTMLFormElement;
    // form.reset();
  };

  return (
    // Use global 'section' and 'contact' classes if they have general layout/padding
    <section className="section contact" id="contact">
      {/* Use global 'container' class */}
      <div className="container">
        <AnimateOnScroll>
          {/* Use global 'section-title' class */}
          <h2 className="section-title">Request Service or Get a Quote</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          {/* Use global 'section-subtitle' class */}
          <p className="section-subtitle">
            Fill out the form below or give us a call. We're ready to help with your plumbing, heating, cooling, or roofing needs.
          </p>
        </AnimateOnScroll>

        {/* Use module style for the form container */}
        <div className={styles.formContainer}>
          <AnimateOnScroll className={styles.info}>
            <h3>Contact Information</h3> {/* Styled by .info h3 in module */}
            <p>Reach out directly or use the form:</p>
            <p><i className="fas fa-phone"></i> <a href="tel:+16093612727">(609) 361-2727</a></p>
            <p><i className="fas fa-envelope"></i> <a href="mailto:service@expresshvacnj.fake">service@expresslbi.co</a></p>
            <p><i className="fas fa-map-marker-alt"></i> 2101 Long Beach Blvd, Ship Bottom, NJ 08008</p>
            <h4 style={{ marginTop: '2rem' }}>Business Hours</h4> {/* Styled by .info h4 in module */}
            <p><i className="fas fa-clock"></i> Mon-Fri: 8:00 AM - 5:00 PM</p>
            <p><i className="fas fa-exclamation-circle"></i> 24/7 Emergency Service Available</p>
          </AnimateOnScroll>

          <AnimateOnScroll> {/* Wrapper for form animation */}
            <form className={styles.form} onSubmit={handleSubmit} method="post">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" required />

              <label htmlFor="message">How can we help?</label>
              <textarea id="message" name="message" required></textarea>

              {/* Use global .btn .btn-secondary and module-specific .formButton */}
              <button type="submit" className={`btn btn-secondary ${styles.formButton}`}>Send Request</button>

              <p className={styles.complianceText}>
                By submitting this form, you consent to receive communications from us. We respect your privacy (DL10/A2P Placeholder).
                Message and data rates may apply.
              </p>
            </form>
          </AnimateOnScroll>          
        </div>
      </div>
    </section>
  );
};

export default Contact;
