'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Icon } from '@iconify/react';
import styles from './JobApplicationForm.module.css';

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          ...formData,
        }),
      });

      if (response.ok) {
        // Redirect to success page or show success message
        router.push(`/careers/apply/success?job=${encodeURIComponent(jobTitle)}`);
      } else {
        const error = await response.json();
        alert(`Error submitting application: ${error.error}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`container ${styles.applicationContainer}`}>
      <AnimateOnScroll>
        <header className={styles.header}>
          <Link href={`/careers/jobs/${jobId}`} className={styles.backLink}>
            &lt; Back to Job Details
          </Link>
          <h1 className={styles.title}>Apply for {jobTitle}</h1>
          <p className={styles.subtitle}>
            We're excited to learn more about you! Please fill out the form below to submit your application.
          </p>
        </header>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>
                <Icon icon="mdi:account-outline" className={styles.labelIcon} />
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="Enter your first name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>
                <Icon icon="mdi:account-outline" className={styles.labelIcon} />
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                <Icon icon="mdi:email-outline" className={styles.labelIcon} />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="Enter your email address"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                <Icon icon="mdi:phone-outline" className={styles.labelIcon} />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="coverLetter" className={styles.label}>
              <Icon icon="mdi:text-box-outline" className={styles.labelIcon} />
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={6}
              className={styles.textarea}
              placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
            />
          </div>

          <div className={styles.submitSection}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary ${styles.submitButton}`}
            >
              {isSubmitting ? (
                <>
                  <Icon icon="mdi:loading" className={`${styles.submitIcon} ${styles.spinning}`} />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Icon icon="mdi:send-outline" className={styles.submitIcon} />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </AnimateOnScroll>
    </div>
  );
};

export default JobApplicationForm;

