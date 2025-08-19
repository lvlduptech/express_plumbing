import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth-server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/applications - Get all job applications
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const isAdmin = await verifyAdminToken(authHeader)
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            department: true
          }
        }
      }
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}

