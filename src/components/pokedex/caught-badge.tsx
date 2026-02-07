'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaughtBadgeProps {
  isCaught: boolean;
  className?: string;
}

export function CaughtBadge({ isCaught, className }: CaughtBadgeProps) {
  if (!isCaught) return null;

  return (
    <div
      className={cn(
        'absolute top-2 right-2 z-10',
        'flex items-center justify-center',
        'w-8 h-8 rounded-full',
        'bg-green-500 text-white',
        'shadow-lg animate-in zoom-in duration-300',
        className
      )}
    >
      <Check className="w-5 h-5" strokeWidth={3} />
    </div>
  );
}
