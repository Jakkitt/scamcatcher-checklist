import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle(){
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="px-3 py-1.5 rounded-lg border dark:border-gray-700">
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
