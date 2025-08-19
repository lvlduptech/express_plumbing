'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import styles from './AdminDashboard.module.css';

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
}

const AdminDashboard: React.FC = () => {
  const { user, signOutUser } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch jobs stats
        const jobsResponse = await fetch('/api/admin/jobs');
        const jobs = await jobsResponse.json();
        
        // Fetch applications stats
        const applicationsResponse = await fetch('/api/admin/applications');
        const applications = await applicationsResponse.json();

        setStats({
          totalJobs: jobs.length,
          activeJobs: jobs.filter((job: any) => job.isActive).length,
          totalApplications: applications.length,
          pendingApplications: applications.filter((app: any) => app.status === 'PENDING').length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <section className="section">
        <div className={`container ${styles.dashboardContainer}`}>
          <AnimateOnScroll>
            <div className={styles.header}>
              <div>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <p className={styles.subtitle}>
                  Welcome back, {user?.displayName || user?.email}
                </p>
              </div>
              <button onClick={handleSignOut} className={`btn btn-secondary ${styles.signOutButton}`}>
                <Icon icon="mdi:logout" className={styles.buttonIcon} />
                Sign Out
              </button>
            </div>
          </AnimateOnScroll>

          {loading ? (
            <div className={styles.loading}>
              <Icon icon="mdi:loading" className={styles.loadingIcon} />
              Loading dashboard...
            </div>
          ) : (
            <>
              <AnimateOnScroll>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <Icon icon="mdi:briefcase-outline" className={styles.statIcon} />
                    <div className={styles.statContent}>
                      <h3 className={styles.statNumber}>{stats.totalJobs}</h3>
                      <p className={styles.statLabel}>Total Jobs</p>
                    </div>
                  </div>
                  <div className={styles.statCard}>
                    <Icon icon="mdi:briefcase-check-outline" className={styles.statIcon} />
                    <div className={styles.statContent}>
                      <h3 className={styles.statNumber}>{stats.activeJobs}</h3>
                      <p className={styles.statLabel}>Active Jobs</p>
                    </div>
                  </div>
                  <div className={styles.statCard}>
                    <Icon icon="mdi:account-multiple-outline" className={styles.statIcon} />
                    <div className={styles.statContent}>
                      <h3 className={styles.statNumber}>{stats.totalApplications}</h3>
                      <p className={styles.statLabel}>Total Applications</p>
                    </div>
                  </div>
                  <div className={styles.statCard}>
                    <Icon icon="mdi:clock-outline" className={styles.statIcon} />
                    <div className={styles.statContent}>
                      <h3 className={styles.statNumber}>{stats.pendingApplications}</h3>
                      <p className={styles.statLabel}>Pending Reviews</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <div className={styles.actionsGrid}>
                  <Link href="/admin/jobs" className={styles.actionCard}>
                    <Icon icon="mdi:briefcase-edit-outline" className={styles.actionIcon} />
                    <h3 className={styles.actionTitle}>Manage Jobs</h3>
                    <p className={styles.actionDescription}>
                      Create, edit, and delete job postings
                    </p>
                  </Link>
                  <Link href="/admin/applications" className={styles.actionCard}>
                    <Icon icon="mdi:file-document-multiple-outline" className={styles.actionIcon} />
                    <h3 className={styles.actionTitle}>View Applications</h3>
                    <p className={styles.actionDescription}>
                      Review and manage job applications
                    </p>
                  </Link>
                  <Link href="/admin/jobs/new" className={styles.actionCard}>
                    <Icon icon="mdi:plus-circle-outline" className={styles.actionIcon} />
                    <h3 className={styles.actionTitle}>Create New Job</h3>
                    <p className={styles.actionDescription}>
                      Post a new job opening
                    </p>
                  </Link>
                </div>
              </AnimateOnScroll>
            </>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default AdminDashboard;

