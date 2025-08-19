# Express Plumbing NextJS Website - Setup Instructions

## Overview
This is a complete NextJS website for Express Plumbing with a dynamic careers section, Firebase authentication, admin dashboard, and job application management system.

## Features
- **Dynamic Careers Section**: Job listings pulled from database
- **Job Application System**: Users can apply for jobs with email notifications
- **Admin Dashboard**: Manage job postings and view applications
- **Firebase Authentication**: Secure admin login with role-based access
- **Email Notifications**: Automatic emails when applications are submitted
- **Responsive Design**: Mobile-friendly interface following existing design patterns

## Prerequisites
- Node.js 18+ and npm
- Firebase project
- Email service (Gmail recommended)

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create database and tables
npx prisma db push

# Seed initial data (jobs and admin user)
npx tsx prisma/seed.ts
```

### 3. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication with Email/Password
4. Generate service account key for Admin SDK

#### Configure Environment Variables
Update `.env` file with your Firebase credentials:

```env
# Firebase Configuration (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@expressplumbing.com

# Application URLs
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

#### Create Admin User in Firebase
1. Go to Firebase Console > Authentication > Users
2. Add user with email: `admin@expressplumbing.com`
3. Set a secure password

### 4. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Use this app password in `SMTP_PASS` environment variable

## Development

### Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Admin Access
1. Go to `http://localhost:3000/admin/login`
2. Login with the admin credentials you created in Firebase
3. Access the dashboard at `http://localhost:3000/admin/dashboard`

## Project Structure

```
src/
├── app/
│   ├── admin/                 # Admin pages
│   │   ├── login/            # Admin login
│   │   └── dashboard/        # Admin dashboard
│   ├── api/                  # API routes
│   │   ├── jobs/            # Job management APIs
│   │   ├── applications/    # Application APIs
│   │   └── admin/           # Admin-only APIs
│   ├── careers/             # Careers section
│   │   ├── openings/        # Job listings
│   │   ├── jobs/[jobId]/    # Job details
│   │   └── apply/           # Application pages
│   └── layout.tsx           # Root layout with providers
├── components/              # React components
│   ├── AdminDashboard.tsx   # Admin dashboard
│   ├── AdminLogin.tsx       # Admin login form
│   ├── JobApplicationForm.tsx # Job application form
│   └── ProtectedRoute.tsx   # Route protection
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── lib/                     # Utility libraries
│   ├── prisma.ts           # Database client
│   ├── firebase.ts         # Firebase client config
│   ├── firebase-admin.ts   # Firebase admin config
│   ├── auth.ts             # Authentication utilities
│   ├── jobs.ts             # Job management functions
│   └── email.ts            # Email service
└── styles/                 # CSS modules and global styles
```

## Key Features

### Job Management
- Create, edit, and delete job postings
- Toggle job active/inactive status
- View job applications

### Application System
- User-friendly application forms
- Email notifications to admin
- Application status tracking

### Admin Dashboard
- Statistics overview
- Quick access to management features
- Secure authentication

### Email Notifications
- Professional HTML email templates
- Automatic notifications for new applications
- Configurable email settings

## Deployment

### Environment Variables for Production
Update the following for production:
- `NEXTAUTH_URL`: Your production domain
- Database: Consider upgrading to PostgreSQL for production
- Email: Configure production email service

### Build and Deploy
```bash
npm run build
npm start
```

## Security Notes
- Admin access is protected by Firebase Authentication
- Role-based access control implemented
- Environment variables contain sensitive data - keep secure
- Database uses SQLite for development - consider PostgreSQL for production

## Support
For issues or questions, refer to the documentation or contact the development team.

