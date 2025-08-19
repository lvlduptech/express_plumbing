'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import styles from './AdminDashboard.module.css';

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  recentApplications: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    job: {
      title: string;
    };
  }>;
}

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, signOutUser, authToken } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    recentApplications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardStats();
    }
  }, [isAdmin]);

  const fetchDashboardStats = async () => {
    try {
      // Get auth headers
      const headers: HeadersInit = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      // Fetch jobs stats
      const jobsResponse = await fetch('/api/admin/jobs', { headers });
      if (!jobsResponse.ok) {
        throw new Error(`Jobs API error: ${jobsResponse.status}`);
      }
      const jobs = await jobsResponse.json();
      
      // Fetch applications stats
      const applicationsResponse = await fetch('/api/admin/applications', { headers });
      if (!applicationsResponse.ok) {
        throw new Error(`Applications API error: ${applicationsResponse.status}`);
      }
      const applications = await applicationsResponse.json();

      setStats({
        totalJobs: jobs.length,
        activeJobs: jobs.filter((job: any) => job.isActive).length,
        totalApplications: applications.length,
        pendingApplications: applications.filter((app: any) => app.status === 'PENDING').length,
        recentApplications: applications.slice(0, 5), // Get 5 most recent
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
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
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name || user?.email}</p>
        </div>
        <button onClick={signOutUser} className={styles.signOutButton}>
          <Icon icon="mdi:logout" />
          Sign Out
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <Icon icon="mdi:loading" className={styles.spinner} />
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon icon="mdi:briefcase" />
              </div>
              <div className={styles.statContent}>
                <h3>Total Jobs</h3>
                <p className={styles.statNumber}>{stats.totalJobs}</p>
                <span className={styles.statSubtext}>{stats.activeJobs} active</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon icon="mdi:eye" />
              </div>
              <div className={styles.statContent}>
                <h3>Active Jobs</h3>
                <p className={styles.statNumber}>{stats.activeJobs}</p>
                <span className={styles.statSubtext}>Visible to applicants</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon icon="mdi:file-document" />
              </div>
              <div className={styles.statContent}>
                <h3>Total Applications</h3>
                <p className={styles.statNumber}>{stats.totalApplications}</p>
                <span className={styles.statSubtext}>All time</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icon icon="mdi:clock" />
              </div>
              <div className={styles.statContent}>
                <h3>Pending Applications</h3>
                <p className={styles.statNumber}>{stats.pendingApplications}</p>
                <span className={styles.statSubtext}>Needs review</span>
              </div>
            </div>
          </div>

          <div className={styles.actionsGrid}>
            <Link href="/admin/jobs" className={styles.actionCard}>
              <div className={styles.actionIcon}>
                <Icon icon="mdi:briefcase-plus" />
              </div>
              <div className={styles.actionContent}>
                <h3>Manage Jobs</h3>
                <p>Create, edit, and manage job postings</p>
              </div>
              <Icon icon="mdi:arrow-right" className={styles.actionArrow} />
            </Link>

            <Link href="/admin/applications" className={styles.actionCard}>
              <div className={styles.actionIcon}>
                <Icon icon="mdi:file-document-multiple" />
              </div>
              <div className={styles.actionContent}>
                <h3>View Applications</h3>
                <p>Review and manage job applications</p>
              </div>
              <Icon icon="mdi:arrow-right" className={styles.actionArrow} />
            </Link>
          </div>

          {stats.recentApplications.length > 0 && (
            <div className={styles.recentSection}>
              <div className={styles.sectionHeader}>
                <h2>Recent Applications</h2>
                <Link href="/admin/applications" className={styles.viewAllLink}>
                  View All <Icon icon="mdi:arrow-right" />
                </Link>
              </div>
              
              <div className={styles.applicationsList}>
                {stats.recentApplications.map((application) => (
                  <div key={application.id} className={styles.applicationItem}>
                    <div className={styles.applicantInfo}>
                      <h4>{application.firstName} {application.lastName}</h4>
                      <p>{application.email}</p>
                      <span className={styles.jobTitle}>{application.job.title}</span>
                    </div>
                    <div className={styles.applicationDate}>
                      {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

