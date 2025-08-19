import { User } from '@prisma/client'
import { prisma } from './prisma'
import admin from './firebase-admin'

export async function verifyAdminToken(authHeader: string | null): Promise<boolean> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token)
    const userEmail = decodedToken.email
    
    if (!userEmail) {
      return false
    }
    
    // Check if user is admin in our database
    return await isUserAdmin(userEmail)
  } catch (error) {
    console.error('Error verifying admin token:', error)
    return false
  }
}

export async function isUserAdmin(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return user?.role === 'ADMIN'
}

