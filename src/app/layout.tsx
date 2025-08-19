// src/app/layout.tsx

import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCTA from '@/components/MobileCTA';
import BackToTop from '@/components/BackToTop';
import ThemeToggle from '@/components/ThemeToggle';

import './globals.css'; // Your main styles - KEEP THIS
// REMOVE the local Font Awesome import: import './fontawesome.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-primary',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-secondary',
});

export const metadata: Metadata = {
  title: 'Express Plumbing, Heating, Cooling, & Roofing | Ship Bottom, NJ',
  description: 'Expert plumbing, HVAC, and roofing services in Ship Bottom, NJ and surrounding areas. Reliable repairs, installations, and 24/7 emergency support.',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <head>
        {/* ADD Font Awesome CDN Link */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <ThemeProvider>
          <ProvidersWrapper>
            <MobileCTA phone="tel:+6093612727" scheduleLink="#contact" />
            <Header />
            <main>{children}</main>
            <Footer />
            <BackToTop />
            <ThemeToggle />
          </ProvidersWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

function ProvidersWrapper({ children }: { children: React.ReactNode }) {
    'use client';
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    );
}