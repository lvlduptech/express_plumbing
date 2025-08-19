import { Job, JobApplication } from '@prisma/client'
import { prisma } from './prisma'

export async function getAllJobs(): Promise<Job[]> {
  return await prisma.job.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getJobById(id: string): Promise<Job | null> {
  return await prisma.job.findUnique({
    where: {
      id,
    },
  })
}

export async function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
  return await prisma.job.create({
    data,
  })
}

export async function updateJob(id: string, data: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Job> {
  return await prisma.job.update({
    where: {
      id,
    },
    data,
  })
}

export async function deleteJob(id: string): Promise<Job> {
  return await prisma.job.delete({
    where: {
      id,
    },
  })
}

export async function createJobApplication(data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>): Promise<JobApplication> {
  return await prisma.jobApplication.create({
    data,
  })
}

export async function getJobApplications(jobId?: string): Promise<(JobApplication & { job: Job })[]> {
  return await prisma.jobApplication.findMany({
    where: jobId ? { jobId } : undefined,
    include: {
      job: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function updateApplicationStatus(id: string, status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED'): Promise<JobApplication> {
  return await prisma.jobApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })
}

