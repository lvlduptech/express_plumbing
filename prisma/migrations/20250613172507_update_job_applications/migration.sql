-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "description" TEXT,
    "requirements" TEXT,
    "benefits" TEXT,
    "salary" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "job_applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "dateOfBirth" TEXT,
    "streetAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "availabilityType" TEXT,
    "mondayAvailable" BOOLEAN NOT NULL DEFAULT false,
    "tuesdayAvailable" BOOLEAN NOT NULL DEFAULT false,
    "wednesdayAvailable" BOOLEAN NOT NULL DEFAULT false,
    "thursdayAvailable" BOOLEAN NOT NULL DEFAULT false,
    "fridayAvailable" BOOLEAN NOT NULL DEFAULT false,
    "saturdayAvailable" BOOLEAN NOT NULL DEFAULT false,
    "sundayAvailable" BOOLEAN NOT NULL DEFAULT false,
    "hasReliableTransportation" BOOLEAN NOT NULL DEFAULT false,
    "canTravel" BOOLEAN NOT NULL DEFAULT false,
    "canRelocate" BOOLEAN NOT NULL DEFAULT false,
    "isAtLeast18" BOOLEAN NOT NULL DEFAULT false,
    "canProvideWorkAuth" BOOLEAN NOT NULL DEFAULT false,
    "canPerformJobFunctions" BOOLEAN NOT NULL DEFAULT false,
    "coverLetter" TEXT,
    "resumeUrl" TEXT,
    "resumeFileName" TEXT,
    "digitalSignature" TEXT,
    "agreementAccepted" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "job_applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
