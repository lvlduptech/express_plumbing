'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Icon } from '@iconify/react';
import styles from './AdminLogin.module.css';

const AdminLogin: React.FC = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn(formData.email, formData.password);
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className={`container ${styles.loginContainer}`}>
        <AnimateOnScroll>
          <div className={styles.loginCard}>
            <div className={styles.header}>
              <Icon icon="mdi:shield-account-outline" className={styles.headerIcon} />
              <h1 className={styles.title}>Admin Login</h1>
              <p className={styles.subtitle}>
                Access the admin dashboard to manage job postings and applications.
              </p>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                <Icon icon="mdi:alert-circle-outline" className={styles.errorIcon} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  <Icon icon="mdi:email-outline" className={styles.labelIcon} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Enter your admin email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  <Icon icon="mdi:lock-outline" className={styles.labelIcon} />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary ${styles.submitButton}`}
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className={`${styles.submitIcon} ${styles.spinning}`} />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:login" className={styles.submitIcon} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default AdminLogin;

