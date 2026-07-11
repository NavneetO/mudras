'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MudraContextType {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  reminderEnabled: boolean;
  setReminderEnabled: (enabled: boolean) => void;
  reminderTime: string;
  setReminderTime: (time: string) => void;
  completedSessions: number;
  incrementCompletedSessions: () => void;
}

const MudraContext = createContext<MudraContextType | undefined>(undefined);

export const MudraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(false);
  const [reminderTime, setReminderTime] = useState<string>('08:00');
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedBookmarks = localStorage.getItem('mudramind_bookmarks');
        if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));

        const storedReminderTime = localStorage.getItem('mudramind_reminder_time');
        if (storedReminderTime) setReminderTime(storedReminderTime);

        const storedReminderEnabled = localStorage.getItem('mudramind_reminder_enabled');
        if (storedReminderEnabled) setReminderEnabled(JSON.parse(storedReminderEnabled));

        const storedCompleted = localStorage.getItem('mudramind_completed_sessions');
        if (storedCompleted) setCompletedSessions(parseInt(storedCompleted, 10) || 0);
      } catch (e) {
        console.error('Failed to load local storage state:', e);
      }
      setIsLoaded(true);
    }
  }, []);

  // Register PWA service worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('MudraMind Service Worker registered scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('MudraMind Service Worker registration failed:', err);
          });
      });
    }
  }, []);


  // Save state to localStorage when values change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mudramind_bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mudramind_reminder_time', reminderTime);
    }
  }, [reminderTime, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mudramind_reminder_enabled', JSON.stringify(reminderEnabled));
    }
  }, [reminderEnabled, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mudramind_completed_sessions', completedSessions.toString());
    }
  }, [completedSessions, isLoaded]);

  // Request notification permission and handle reminder configuration
  useEffect(() => {
    if (reminderEnabled && typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') {
            setReminderEnabled(false);
          }
        });
      } else if (Notification.permission === 'denied') {
        setReminderEnabled(false);
      }
    }
  }, [reminderEnabled]);

  // Simple interval check for daily reminders while the tab is open
  useEffect(() => {
    if (!reminderEnabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTimeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      if (currentTimeString === reminderTime) {
        // Send notification
        if ('Notification' in window && Notification.permission === 'granted') {
          // Prevent multiple triggers in the same minute
          const lastNotified = localStorage.getItem('mudramind_last_notified');
          const todayDateString = now.toDateString();
          
          if (lastNotified !== todayDateString) {
            new Notification('MudraMind Daily Practice', {
              body: 'It is time for your scheduled hand mudra relaxation routine. Pause and take a 5-minute break!',
              icon: '/favicon.ico'
            });
            localStorage.setItem('mudramind_last_notified', todayDateString);
          }
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [reminderEnabled, reminderTime]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bookmarkId) => bookmarkId !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const incrementCompletedSessions = () => {
    setCompletedSessions((prev) => prev + 1);
  };

  return (
    <MudraContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
        isBookmarked,
        reminderEnabled,
        setReminderEnabled,
        reminderTime,
        setReminderTime,
        completedSessions,
        incrementCompletedSessions
      }}
    >
      {children}
    </MudraContext.Provider>
  );
};

export const useMudra = () => {
  const context = useContext(MudraContext);
  if (context === undefined) {
    throw new Error('useMudra must be used within a MudraProvider');
  }
  return context;
};
