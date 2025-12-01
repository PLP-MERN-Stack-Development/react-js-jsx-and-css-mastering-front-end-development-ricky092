import React from 'react';
import Button from './Button';

/**
 * Navbar component for site navigation
 */
const Navbar = ({ onThemeToggle, isDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              📝 PLP Task Manager
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#tasks"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Tasks
            </a>
            <a
              href="#api"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              API Data
            </a>
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
