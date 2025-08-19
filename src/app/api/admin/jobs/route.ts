import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth-server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/jobs - Get all jobs (including inactive)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const isAdmin = await verifyAdminToken(authHeader)
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true }
        }
      }
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

// POST /api/admin/jobs - Create new job
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const isAdmin = await verifyAdminToken(authHeader)
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      location,
      jobType,
      department,
      excerpt,
      description,
      requirements,
      benefits,
      salary,
      isActive
    } = body

    // Validate required fields
    if (!title || !location || !jobType || !department || !excerpt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const job = await prisma.job.create({
      data: {
        title,
        location,
        jobType,
        department,
        excerpt,
        description,
        requirements,
        benefits,
        salary,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}

