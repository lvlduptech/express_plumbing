'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Icon } from '@iconify/react';
import styles from './ApplicationManagement.module.css';

interface JobApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  availabilityType?: string;
  mondayAvailable: boolean;
  tuesdayAvailable: boolean;
  wednesdayAvailable: boolean;
  thursdayAvailable: boolean;
  fridayAvailable: boolean;
  saturdayAvailable: boolean;
  sundayAvailable: boolean;
  hasReliableTransportation: boolean;
  canTravel: boolean;
  canRelocate: boolean;
  isAtLeast18: boolean;
  canProvideWorkAuth: boolean;
  canPerformJobFunctions: boolean;
  coverLetter?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  digitalSignature?: string;
  agreementAccepted: boolean;
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  job: {
    id: string;
    title: string;
    location: string;
    department: string;
  };
}

const ApplicationManagement: React.FC = () => {
  const { isAdmin, authToken } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (isAdmin) {
      fetchApplications();
    }
  }, [isAdmin]);

  const fetchApplications = async () => {
    try {
      const headers: HeadersInit = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const response = await fetch('/api/admin/applications', { headers });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await fetchApplications();
        // Also update the selected application in the modal if it's open
        if (selectedApplication && selectedApplication.id === applicationId) {
          setSelectedApplication(prev => prev ? { ...prev, status: status as JobApplication['status'] } : null);
        }
        alert('Application status updated successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update application status');
    }
  };

  const getAvailableDays = (application: JobApplication) => {
    const days = [];
    if (application.mondayAvailable) days.push('Mon');
    if (application.tuesdayAvailable) days.push('Tue');
    if (application.wednesdayAvailable) days.push('Wed');
    if (application.thursdayAvailable) days.push('Thu');
    if (application.fridayAvailable) days.push('Fri');
    if (application.saturdayAvailable) days.push('Sat');
    if (application.sundayAvailable) days.push('Sun');
    return days.join(', ') || 'Not specified';
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus.toUpperCase()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return styles.pending;
      case 'REVIEWED': return styles.reviewed;
      case 'ACCEPTED': return styles.accepted;
      case 'REJECTED': return styles.rejected;
      default: return '';
    }
  };

  if (!isAdmin) {
    return (
      <div className={styles.unauthorized}>
        <Icon icon="mdi:lock" />
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Job Applications</h1>
        <div className={styles.filters}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <Icon icon="mdi:loading" className={styles.spinner} />
          Loading applications...
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className={styles.empty}>
          <Icon icon="mdi:file-document-outline" />
          <h3>No applications found</h3>
          <p>No job applications match the current filter.</p>
        </div>
      ) : (
        <div className={styles.applicationsList}>
          {filteredApplications.map((application) => (
            <div key={application.id} className={styles.applicationCard}>
              <div className={styles.applicationHeader}>
                <div className={styles.applicantInfo}>
                  <h3>{application.firstName} {application.lastName}</h3>
                  <div className={styles.applicationMeta}>
                    <span><Icon icon="mdi:briefcase" /> {application.job.title}</span>
                    <span><Icon icon="mdi:map-marker" /> {application.job.location}</span>
                    <span><Icon icon="mdi:email" /> {application.email}</span>
                    {application.phone && <span><Icon icon="mdi:phone" /> {application.phone}</span>}
                  </div>
                </div>
                <div className={styles.applicationActions}>
                  <span className={`${styles.status} ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                  <button
                    onClick={() => setSelectedApplication(application)}
                    className={styles.viewButton}
                    title="View Details"
                  >
                    <Icon icon="mdi:eye" />
                  </button>
                </div>
              </div>
              
              <div className={styles.quickInfo}>
                <div className={styles.infoItem}>
                  <strong>Availability:</strong> {application.availabilityType || 'Not specified'}
                </div>
                <div className={styles.infoItem}>
                  <strong>Days Available:</strong> {getAvailableDays(application)}
                </div>
                <div className={styles.infoItem}>
                  <strong>Applied:</strong> {new Date(application.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className={styles.statusActions}>
                <button
                  onClick={() => updateApplicationStatus(application.id, 'REVIEWED')}
                  className={styles.reviewButton}
                  disabled={application.status === 'REVIEWED'}
                >
                  Mark Reviewed
                </button>
                <button
                  onClick={() => updateApplicationStatus(application.id, 'ACCEPTED')}
                  className={styles.acceptButton}
                  disabled={application.status === 'ACCEPTED'}
                >
                  Accept
                </button>
                <button
                  onClick={() => updateApplicationStatus(application.id, 'REJECTED')}
                  className={styles.rejectButton}
                  disabled={application.status === 'REJECTED'}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

  {selectedApplication && (
        <div className={styles.detailOverlay}>
          <div className={styles.detailContainer}>
            <div className={styles.detailHeader}>
              <h2>Application Details</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className={styles.closeButton}
              >
                <Icon icon="mdi:close" />
              </button>
            </div>

            <div className={styles.detailContent}>
              <div className={styles.section}>
                <h3>Personal Information</h3>
                <div className={styles.detailGrid}>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', backgroundColor: 'lightblue', border: '1px solid blue' }}>
  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'darkblue', marginBottom: '0.25rem' }}>Full Name</span>
  <span style={{ color: 'black' }}>{selectedApplication.firstName} {selectedApplication.lastName}</span>
</div>
<div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', backgroundColor: 'lightgreen', border: '1px solid green' }}>
  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'darkgreen', marginBottom: '0.25rem' }}>Email Address</span>
  <span style={{ color: 'black' }}>{selectedApplication.email}</span>
</div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Phone Number</span>
                    <span className={styles.detailValue}>{selectedApplication.phone || 'Not provided'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date of Birth</span>
                    <span className={styles.detailValue}>{selectedApplication.dateOfBirth || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Address</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Street Address</span>
                    <span className={styles.detailValue}>{selectedApplication.streetAddress || 'Not provided'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>City</span>
                    <span className={styles.detailValue}>{selectedApplication.city || 'Not provided'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>State</span>
                    <span className={styles.detailValue}>{selectedApplication.state || 'Not provided'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>ZIP Code</span>
                    <span className={styles.detailValue}>{selectedApplication.zipCode || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Availability</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Availability Type</span>
                    <span className={styles.detailValue}>{selectedApplication.availabilityType || 'Not specified'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Days Available</span>
                    <span className={styles.detailValue}>{getAvailableDays(selectedApplication)}</span>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Employment Questions</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Reliable Transportation</span>
                    <span className={styles.detailValue}>{selectedApplication.hasReliableTransportation ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Willing to Travel</span>
                    <span className={styles.detailValue}>{selectedApplication.canTravel ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Willing to Relocate</span>
                    <span className={styles.detailValue}>{selectedApplication.canRelocate ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>At Least 18 Years Old</span>
                    <span className={styles.detailValue}>{selectedApplication.isAtLeast18 ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Work Authorization</span>
                    <span className={styles.detailValue}>{selectedApplication.canProvideWorkAuth ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Can Perform Job Functions</span>
                    <span className={styles.detailValue}>{selectedApplication.canPerformJobFunctions ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              {selectedApplication.coverLetter && (
                <div className={styles.section}>
                  <h3>Cover Letter</h3>
                  <div className={styles.coverLetter}>
                    {selectedApplication.coverLetter}
                  </div>
                </div>
              )}

              {selectedApplication.resumeUrl && (
                <div className={styles.section}>
                  <h3>Resume</h3>
                  <div className={styles.resumeSection}>
                    <a
                      href={selectedApplication.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resumeLink}
                    >
                      <Icon icon="mdi:file-document" />
                      {selectedApplication.resumeFileName || 'View Resume'}
                    </a>
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <h3>Application Status</h3>
                <div className={styles.statusSection}>
                  <span className={`${styles.status} ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                  <div className={styles.statusActions}>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'REVIEWED')}
                      className={styles.reviewButton}
                    >
                      Mark Reviewed
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'ACCEPTED')}
                      className={styles.acceptButton}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'REJECTED')}
                      className={styles.rejectButton}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagement;