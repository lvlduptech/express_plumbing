'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Icon } from '@iconify/react';
import styles from './JobManagement.module.css';

interface Job {
  id: string;
  title: string;
  location: string;
  jobType: string;
  department: string;
  excerpt: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  salary?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const JobManagement: React.FC = () => {
  const { isAdmin, authToken } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    jobType: '',
    department: '',
    excerpt: '',
    description: '',
    requirements: '',
    benefits: '',
    salary: '',
    isActive: true,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchJobs();
    }
  }, [isAdmin]);

  const fetchJobs = async () => {
    try {
      // Get auth headers
      const headers: HeadersInit = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const response = await fetch('/api/admin/jobs', { headers });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]); // Set empty array on error to prevent map errors
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      jobType: '',
      department: '',
      excerpt: '',
      description: '',
      requirements: '',
      benefits: '',
      salary: '',
      isActive: true,
    });
    setEditingJob(null);
    setShowCreateForm(false);
  };

  const handleCreateJob = () => {
    resetForm();
    setShowCreateForm(true);
  };

  const handleEditJob = (job: Job) => {
    setFormData({
      title: job.title,
      location: job.location,
      jobType: job.jobType,
      department: job.department,
      excerpt: job.excerpt,
      description: job.description || '',
      requirements: job.requirements || '',
      benefits: job.benefits || '',
      salary: job.salary || '',
      isActive: job.isActive,
    });
    setEditingJob(job);
    setShowCreateForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : '/api/admin/jobs';
      const method = editingJob ? 'PUT' : 'POST';

      // BUG FIX: Added authorization headers for create/update operations
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchJobs();
        resetForm();
        alert(editingJob ? 'Job updated successfully!' : 'Job created successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save job');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      // BUG FIX: Added authorization headers for delete operation
      const headers: HeadersInit = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        await fetchJobs();
        alert('Job deleted successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  const toggleJobStatus = async (jobId: string, isActive: boolean) => {
    try {
      // BUG FIX: Added authorization headers for update operation
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        await fetchJobs();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status');
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
        <h1>Job Management</h1>
        <button onClick={handleCreateJob} className={styles.createButton}>
          <Icon icon="mdi:plus" />
          Create New Job
        </button>
      </div>

      {showCreateForm && (
        <div className={styles.formOverlay}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2>{editingJob ? 'Edit Job' : 'Create New Job'}</h2>
              <button onClick={resetForm} className={styles.closeButton}>
                <Icon icon="mdi:close" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Job Type *</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Heating">Heating</option>
                    <option value="Cooling">Cooling</option>
                    <option value="Roofing">Roofing</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label>Salary Range</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g., $50,000 - $70,000"
                />
              </div>

              <div className={styles.field}>
                <label>Job Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description for job listings..."
                  rows={3}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Job Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed job description..."
                  rows={5}
                />
              </div>

              <div className={styles.field}>
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Job requirements and qualifications..."
                  rows={4}
                />
              </div>

              <div className={styles.field}>
                <label>Benefits</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  placeholder="Benefits and perks..."
                  rows={4}
                />
              </div>

              <div className={styles.checkbox}>
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  Active (visible to applicants)
                </label>
              </div>

              <div className={styles.formActions}>
                <button type="button" onClick={resetForm} className={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" disabled={loading} className={styles.saveButton}>
                  {loading ? 'Saving...' : editingJob ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.jobsList}>
        {loading ? (
          <div className={styles.loading}>
            <Icon icon="mdi:loading" className={styles.spinner} />
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className={styles.empty}>
            <Icon icon="mdi:briefcase-outline" />
            <h3>No jobs found</h3>
            <p>Create your first job posting to get started.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className={`${styles.jobCard} ${!job.isActive ? styles.inactive : ''}`}>
              <div className={styles.jobHeader}>
                <div className={styles.jobInfo}>
                  <h3>{job.title}</h3>
                  <div className={styles.jobMeta}>
                    <span><Icon icon="mdi:map-marker" /> {job.location}</span>
                    <span><Icon icon="mdi:briefcase" /> {job.department}</span>
                    <span><Icon icon="mdi:clock" /> {job.jobType}</span>
                    <span className={`${styles.status} ${job.isActive ? styles.active : styles.inactive}`}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className={styles.jobActions}>
                  <button
                    onClick={() => toggleJobStatus(job.id, job.isActive)}
                    className={styles.toggleButton}
                    title={job.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <Icon icon={job.isActive ? 'mdi:eye-off' : 'mdi:eye'} />
                  </button>
                  <button
                    onClick={() => handleEditJob(job)}
                    className={styles.editButton}
                    title="Edit"
                  >
                    <Icon icon="mdi:pencil" />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className={styles.deleteButton}
                    title="Delete"
                  >
                    <Icon icon="mdi:delete" />
                  </button>
                </div>
              </div>
              <p className={styles.jobExcerpt}>{job.excerpt}</p>
              <div className={styles.jobFooter}>
                <span>Created: {new Date(job.createdAt).toLocaleDateString()}</span>
                <span>Updated: {new Date(job.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobManagement;