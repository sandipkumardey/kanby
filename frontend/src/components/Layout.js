import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu } from 'lucide-react';

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Toggle the mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-all duration-300`}>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                {/* Logo */}
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Kanby</span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Dashboard Link */}
                  <Link
                    to="/dashboard"
                    className="text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  {/* Board Link */}
                  <Link
                    to="/board"
                    className="text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Board
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2">
            {/* Mobile Dashboard Link */}
            <Link
              to="/dashboard"
              className="block text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            {/* Mobile Board Link */}
            <Link
              to="/board"
              className="block text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Board
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {children}
      </main>
    </div>
  );
}
