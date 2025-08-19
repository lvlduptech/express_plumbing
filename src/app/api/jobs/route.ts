import { NextRequest, NextResponse } from 'next/server'
import { getAllJobs } from '@/lib/jobs'

export async function GET() {
  try {
    const jobs = await getAllJobs()
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

