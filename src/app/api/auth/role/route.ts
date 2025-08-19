import { NextRequest, NextResponse } from 'next/server'
import { updateUserRole } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, role } = body

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required' }, { status: 400 })
    }

    const user = await updateUserRole(email, role)
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 })
  }
}

