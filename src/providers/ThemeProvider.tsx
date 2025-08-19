'use client';

import React, { createContext, useState, useEffect, useContext, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Provide a default context value matching the interface
const defaultContextValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => { console.warn('toggleTheme function not yet initialized'); },
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);


export const useTheme = (): ThemeContextType => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('theme');
    // Type assertion for stored theme
    if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
    } else {
        // Optional: check system preference if no theme stored
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.className = theme; // Set class on <html>
      localStorage.setItem('theme', theme);
    }
  }, [theme, isMounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // Avoid rendering mismatch by waiting for mount
  if (!isMounted) {
    // Render children without theme context initially or return null/loader
    // Returning null might cause layout shifts, rendering children might be better
    // but theme won't be applied server-side correctly without extra setup.
    // Consider adding a loading state or default class if needed.
     return <>{children}</>; // Render children directly before mount to prevent hydration errors
     // Or return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};