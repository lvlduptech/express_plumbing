'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import styles from './JobApplicationFormNew.module.css';

interface Job {
  id: string;
  title: string;
  location: string;
  jobType: string;
  department: string;
}

interface JobApplicationFormProps {
  job: Job;
}

interface FormData {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Address Information
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Availability
  availabilityType: string;
  mondayAvailable: boolean;
  tuesdayAvailable: boolean;
  wednesdayAvailable: boolean;
  thursdayAvailable: boolean;
  fridayAvailable: boolean;
  saturdayAvailable: boolean;
  sundayAvailable: boolean;
  
  // Employment Questions
  hasReliableTransportation: boolean;
  canTravel: boolean;
  canRelocate: boolean;
  isAtLeast18: boolean;
  canProvideWorkAuth: boolean;
  canPerformJobFunctions: boolean;
  
  // Files and Additional Info
  coverLetter: string;
  resumeFile: File | null;
  resumeUrl: string;
  resumeFileName: string;
  
  // Signature and Agreement
  digitalSignature: string;
  agreementAccepted: boolean;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    availabilityType: '',
    mondayAvailable: false,
    tuesdayAvailable: false,
    wednesdayAvailable: false,
    thursdayAvailable: false,
    fridayAvailable: false,
    saturdayAvailable: false,
    sundayAvailable: false,
    hasReliableTransportation: false,
    canTravel: false,
    canRelocate: false,
    isAtLeast18: false,
    canProvideWorkAuth: false,
    canPerformJobFunctions: false,
    coverLetter: '',
    resumeFile: null,
    resumeUrl: '',
    resumeFileName: '',
    digitalSignature: '',
    agreementAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setUploadingResume(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/upload/resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          resumeFile: file,
          resumeUrl: result.url,
          resumeFileName: result.filename,
        }));
      } else {
        alert(result.error || 'Failed to upload resume');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreementAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }

    if (!formData.digitalSignature.trim()) {
      alert('Please provide your digital signature.');
      return;
    }

    setLoading(true);

    try {
      const applicationData = {
        jobId: job.id,
        ...formData,
        resumeFile: undefined, // Don't send the file object
      };

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        router.push('/careers/apply/success');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Express Plumbing Service</h1>
        <h2>Employment Application</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Position and Date */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Position(s) applied for</label>
            <input
              type="text"
              value={job.title}
              readOnly
              className={styles.readOnly}
            />
          </div>
          <div className={styles.field}>
            <label>Date of application</label>
            <input
              type="date"
              value={new Date().toISOString().split('T')[0]}
              readOnly
              className={styles.readOnly}
            />
          </div>
        </div>

        {/* Full Name */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Print full name *</label>
            <div className={styles.nameFields}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Street address</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.field}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.field}>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.field}>
            <label>ZIP</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Main phone number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.field}>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Days/Hours Available */}
        <div className={styles.section}>
          <h3>Days/hours available to work:</h3>
          <div className={styles.daysGrid}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className={styles.dayField}>
                <label>
                  <input
                    type="checkbox"
                    name={`${day.toLowerCase()}Available`}
                    checked={formData[`${day.toLowerCase()}Available` as keyof FormData] as boolean}
                    onChange={handleInputChange}
                  />
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Type */}
        <div className={styles.section}>
          <h3>1. Are you available to work?</h3>
          <div className={styles.checkboxGroup}>
            {['Full time', 'Part time', 'Shift work', 'Temporary'].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="availabilityType"
                  value={type}
                  checked={formData.availabilityType === type}
                  onChange={handleInputChange}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Employment Questions */}
        <div className={styles.section}>
          <div className={styles.question}>
            <h3>2. If hired, do you have a reliable means of transportation to and from work?</h3>
            <div className={styles.yesNo}>
              <label>
                <input
                  type="radio"
                  name="hasReliableTransportation"
                  value="true"
                  checked={formData.hasReliableTransportation === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasReliableTransportation: e.target.value === 'true' }))}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="hasReliableTransportation"
                  value="false"
                  checked={formData.hasReliableTransportation === false}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasReliableTransportation: e.target.value === 'true' }))}
                />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <h3>3. Can you travel if the position requires it?</h3>
            <div className={styles.yesNo}>
              <label>
                <input
                  type="radio"
                  name="canTravel"
                  value="true"
                  checked={formData.canTravel === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, canTravel: e.target.value === 'true' }))}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="canTravel"
                  value="false"
                  checked={formData.canTravel === false}
                  onChange={(e) => setFormData(prev => ({ ...prev, canTravel: e.target.value === 'true' }))}
                />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <h3>4. Can you relocate if the position requires it?</h3>
            <div className={styles.yesNo}>
              <label>
                <input
                  type="radio"
                  name="canRelocate"
                  value="true"
                  checked={formData.canRelocate === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, canRelocate: e.target.value === 'true' }))}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="canRelocate"
                  value="false"
                  checked={formData.canRelocate === false}
                  onChange={(e) => setFormData(prev => ({ ...prev, canRelocate: e.target.value === 'true' }))}
                />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <h3>5. Are you at least 18 years old?</h3>
            <div className={styles.yesNo}>
              <label>
                <input
                  type="radio"
                  name="isAtLeast18"
                  value="true"
                  checked={formData.isAtLeast18 === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAtLeast18: e.target.value === 'true' }))}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isAtLeast18"
                  value="false"
                  checked={formData.isAtLeast18 === false}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAtLeast18: e.target.value === 'true' }))}
                />
                No
              </label>
            </div>
            <p className={styles.note}>Note: If under 18, hire is subject to verification that you are of minimum legal age.</p>
          </div>

          <div className={styles.question}>
            <h3>6. If hired, can you present evidence of your identity and legal right to work in this country?</h3>
            <div className={styles.yesNo}>
              <label>
                <input
                  type="radio"
                  name="canProvideWorkAuth"
                  value="true"
                  checked={formData.canProvideWorkAuth === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, canProvideWorkAuth: e.target.value === 'true' }))}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="canProvideWorkAuth"
                  value="false"
                  checked={formData.canProvideWorkAuth === false}
                  onChange={(e) => setFormData(prev => ({ ...prev, canProvideWorkAuth: e.target.value === 'true' }))}
                />
                No
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <h3>7. Are you able to perform the essential job functions of the job for which you are applying with or without reasonable accommodation?</h3>
            <div className={styles.yesNo}>
              <label>
                <input
                  type="radio"
                  name="canPerformJobFunctions"
                  value="true"
                  checked={formData.canPerformJobFunctions === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, canPerformJobFunctions: e.target.value === 'true' }))}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="canPerformJobFunctions"
                  value="false"
                  checked={formData.canPerformJobFunctions === false}
                  onChange={(e) => setFormData(prev => ({ ...prev, canPerformJobFunctions: e.target.value === 'true' }))}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className={styles.section}>
          <h3>Resume Upload</h3>
          <div className={styles.fileUpload}>
            <label htmlFor="resume" className={styles.fileLabel}>
              <Icon icon="mdi:file-upload" />
              {uploadingResume ? 'Uploading...' : 'Choose Resume (PDF or Word)'}
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              disabled={uploadingResume}
              className={styles.fileInput}
            />
            {formData.resumeFileName && (
              <p className={styles.fileName}>
                <Icon icon="mdi:check-circle" className={styles.successIcon} />
                {formData.resumeFileName}
              </p>
            )}
          </div>
        </div>

        {/* Cover Letter */}
        <div className={styles.section}>
          <h3>Cover Letter (Optional)</h3>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            placeholder="Tell us why you're interested in this position..."
            rows={4}
            className={styles.textarea}
          />
        </div>

        {/* Agreement and Signature */}
        <div className={styles.section}>
          <p className={styles.agreement}>
            My signature attests to the fact that I have read, understand, and agree to all of the above terms.
          </p>
          
          <div className={styles.signatureSection}>
            <div className={styles.field}>
              <label>Digital Signature *</label>
              <input
                type="text"
                name="digitalSignature"
                value={formData.digitalSignature}
                onChange={handleInputChange}
                placeholder="Type your full name as your digital signature"
                required
              />
            </div>
          </div>

          <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                name="agreementAccepted"
                checked={formData.agreementAccepted}
                onChange={handleInputChange}
                required
              />
              I agree to the terms and conditions stated above *
            </label>
          </div>
        </div>

        <div className={styles.submitSection}>
          <button
            type="submit"
            disabled={loading || uploadingResume}
            className={styles.submitButton}
          >
            {loading ? (
              <>
                <Icon icon="mdi:loading" className={styles.spinner} />
                Submitting Application...
              </>
            ) : (
              <>
                <Icon icon="mdi:send" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;

