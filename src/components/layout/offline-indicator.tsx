'use client';

import { useOnlineStatus } from '@/lib/hooks/use-online-status';
import { Wifi, WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-medium shadow-sm">
        <Wifi className="w-3 h-3" />
        <span>Online</span>
      </div>
    );
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
