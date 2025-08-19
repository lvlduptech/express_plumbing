'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getAuthToken } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  authToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Get Firebase auth token
          const token = await getAuthToken(firebaseUser);
          setAuthToken(token);
          
          // Check if user exists in our database via API
          const userResponse = await fetch(`/api/auth/user?email=${encodeURIComponent(firebaseUser.email!)}`);
          const userData = await userResponse.json();
          
          let dbUser = userData.user;
          
          // If user doesn't exist, create them via API
          if (!dbUser) {
            const createResponse = await fetch('/api/auth/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: firebaseUser.email!,
                name: firebaseUser.displayName || undefined,
                role: 'USER'
              }),
            });
            const createData = await createResponse.json();
            dbUser = createData.user;
          }
          
          // Check if user is admin
          setIsAdmin(dbUser?.role === 'ADMIN');
        } catch (error) {
          console.error('Error checking user status:', error);
          setIsAdmin(false);
          setAuthToken(null);
        }
      } else {
        setIsAdmin(false);
        setAuthToken(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    isAdmin,
    loading,
    authToken,
    signIn,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

