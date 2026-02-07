'use client';

import { useState, useEffect } from 'react';

export type ViewMode = 'grid' | 'table';

const STORAGE_KEY = 'pokedex-view-mode';

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'grid' || stored === 'table') {
        setViewMode(stored);
      }
    } catch (error) {
      console.warn('Failed to read view mode from localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, viewMode);
      } catch (error) {
        console.warn('Failed to save view mode to localStorage:', error);
      }
    }
  }, [viewMode, isInitialized]);

  return { viewMode, setViewMode, isInitialized };
}
