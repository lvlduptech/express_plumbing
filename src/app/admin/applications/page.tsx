import React from 'react';
import ApplicationManagement from '@/components/ApplicationManagement';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata = {
  title: 'View Applications | Admin | Express Plumbing',
  description: 'Admin interface for viewing and managing job applications at Express Plumbing.',
};

const ViewApplicationsPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <section className="section bg-[var(--color-background)]">
        <div className="container">
          <ApplicationManagement />
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default ViewApplicationsPage;

