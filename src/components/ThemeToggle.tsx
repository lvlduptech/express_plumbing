'use client';

import React from 'react';
import { useTheme } from '@/providers/ThemeProvider'; // Use the custom hook

const ThemeToggle: React.FC = () => {
  // Destructure theme and toggleTheme from the context hook
  const { theme, toggleTheme } = useTheme();

  // Return null or a placeholder if context is not ready (optional)
  // This might happen during the very initial server render pass before hydration
  // But ThemeProvider tries to mitigate this.
   if (!theme) {
      // Optionally return a placeholder or null
      // return <button className="theme-toggle invisible"></button>;
      return null;
   }


  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} // More descriptive label
      onClick={toggleTheme}
      type="button" // Explicitly set type for buttons
    >
      <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
    </button>
  );
};

export default ThemeToggle;