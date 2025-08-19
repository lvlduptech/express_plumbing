import React from 'react';
import JobManagement from '@/components/JobManagement';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata = {
  title: 'Manage Jobs | Admin | Express Plumbing',
  description: 'Admin interface for managing job postings at Express Plumbing.',
};

const ManageJobsPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <section className="section bg-[var(--color-background)]">
        <div className="container">
          <JobManagement />
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default ManageJobsPage;

