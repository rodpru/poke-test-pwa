'use client';

import { useOnlineStatus } from '@/lib/hooks/use-online-status';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  // Only show indicator when offline to avoid overlap with toasts
  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black py-2 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
        <WifiOff className="w-4 h-4" />
        <span className="font-medium text-sm">
          Modo Offline - Dados em cache
        </span>
      </div>
    </div>
  );
}
