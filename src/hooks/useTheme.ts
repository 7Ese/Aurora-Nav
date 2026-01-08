import { useState, useEffect } from 'react';

export type Theme = 'blue' | 'purple' | 'green' | 'orange' | 'japanese' | 'cyberpunk' | 'minimal' | 'sunset' | 'deepsea' | 'rosegold';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('navigation-theme') as Theme;
    if (savedTheme && ['blue', 'purple', 'green', 'orange', 'japanese', 'cyberpunk', 'minimal', 'sunset', 'deepsea', 'rosegold'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('navigation-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};