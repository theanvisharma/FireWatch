import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ThemeToggle({ className = '', compact = false }) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      aria-label="Toggle theme"
      className={`relative inline-flex items-center justify-center p-2 rounded-panel border transition-all duration-200 ${
        isDark
          ? 'bg-[#202526] hover:bg-[#2B3031] text-[#E69A5C] border-[#2B3031]'
          : 'bg-[#F0F4F2] hover:bg-[#E5E9E7] text-[#C96B2C] border-[#E5E9E7]'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" />
        )}
      </div>
      {!compact && (
        <span className="hidden sm:inline-block ml-2 text-xs font-medium capitalize text-text-secondary">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}

