import React from 'react';
import AdminDashboard from '@/components/AdminDashboardNew';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata = {
  title: 'Admin Dashboard | Express Plumbing',
  description: 'Admin dashboard for managing jobs and applications at Express Plumbing.',
};

const AdminDashboardPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <section className="section bg-[var(--color-background)]">
        <div className="container">
          <AdminDashboard />
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default AdminDashboardPage;

