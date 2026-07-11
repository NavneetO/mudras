'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X, BookHeart, Compass, Award } from 'lucide-react';
import { useMudra } from '@/context/MudraContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { bookmarks, completedSessions } = useMudra();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme from localStorage/system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark =
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
    { name: 'Daily Practice', path: '/practice' },
    { name: 'Learn', path: '/learn' },
    { name: 'Research', path: '/research' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-sage-500 to-sky-400 text-white font-bold shadow-xs group-hover:scale-105 transition-transform">
                M
              </span>
              <span className="font-outfit font-bold text-xl tracking-tight text-sage-800 dark:text-sage-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Mudra<span className="text-sky-500 font-normal">Mind</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-sage-100/60 dark:bg-sage-900/40 text-sage-800 dark:text-sage-100 font-semibold'
                      : 'text-sage-600 dark:text-sage-300 hover:bg-sage-50/50 dark:hover:bg-sage-950/20 hover:text-sky-600 dark:hover:text-sky-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Quick Stats: Bookmarks Count */}
            {bookmarks.length > 0 && (
              <Link
                href="/library?filter=bookmarked"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-300 border border-sky-100 dark:border-sky-900/30 hover:scale-105 transition-transform"
                title="View Favorites"
              >
                <BookHeart className="h-3.5 w-3.5 fill-sky-500/10" />
                <span>{bookmarks.length}</span>
              </Link>
            )}

            {/* Quick Stats: Session Count */}
            {completedSessions > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sage-50 dark:bg-sage-950/30 text-sage-600 dark:text-sage-300 border border-sage-100 dark:border-sage-900/30">
                <Award className="h-3.5 w-3.5 text-sage-500" />
                <span>{completedSessions} {completedSessions === 1 ? 'session' : 'sessions'}</span>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-glass-border text-sage-500 hover:text-sky-500 hover:bg-sage-50/50 dark:hover:bg-sage-950/20 transition-all"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-glass-border text-sage-500 hover:text-sky-500 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-glass-border text-sage-600 dark:text-sage-300 hover:text-sky-500 transition-colors"
              aria-label="Open Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 bg-wellness-bg/95 backdrop-blur-md border-b border-glass-border">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-sage-50 dark:bg-sage-950/30 text-sage-800 dark:text-sage-100 font-semibold'
                      : 'text-sage-600 dark:text-sage-300 hover:bg-sage-50/20 hover:text-sky-500'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Stats & Reminders */}
            <div className="flex items-center gap-2 pt-3 px-4 border-t border-glass-border">
              {bookmarks.length > 0 && (
                <Link
                  href="/library?filter=bookmarked"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-300 border border-sky-100 dark:border-sky-900/30"
                >
                  <BookHeart className="h-3.5 w-3.5 fill-sky-500/10" />
                  <span>{bookmarks.length} Favorited</span>
                </Link>
              )}

              {completedSessions > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sage-50 dark:bg-sage-950/30 text-sage-600 dark:text-sage-300 border border-sage-100 dark:border-sage-900/30">
                  <Award className="h-3.5 w-3.5 text-sage-500" />
                  <span>{completedSessions} Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
