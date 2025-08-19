import { User } from '@prisma/client'
import { prisma } from './prisma'

export async function createUser(email: string, name?: string, role: 'USER' | 'ADMIN' = 'USER'): Promise<User> {
  return await prisma.user.create({
    data: {
      email,
      name,
      role,
    },
  })
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function updateUserRole(email: string, role: 'USER' | 'ADMIN'): Promise<User> {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      role,
    },
  })
}

export async function isUserAdmin(email: string): Promise<boolean> {
  const user = await getUserByEmail(email)
  return user?.role === 'ADMIN'
}

export async function getAuthToken(user: any): Promise<string | null> {
  try {
    if (user) {
      return await user.getIdToken()
    }
    return null
  } catch (error) {
    console.error('Error getting auth token:', error)
    return null
  }
}

