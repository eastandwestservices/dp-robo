import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a preference stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-dark-900', 'text-white');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-dark-900', 'text-white');
      document.body.classList.add('bg-white', 'text-gray-900');
    }

    // Listen for OS theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('bg-dark-900', 'text-white');
          document.body.classList.remove('bg-white', 'text-gray-900');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('bg-dark-900', 'text-white');
          document.body.classList.add('bg-white', 'text-gray-900');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      if (newMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-dark-900', 'text-white');
        document.body.classList.remove('bg-white', 'text-gray-900');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-dark-900', 'text-white');
        document.body.classList.add('bg-white', 'text-gray-900');
      }
      
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);