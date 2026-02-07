'use client';

import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'grid' | 'table';

interface ViewModeToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
      <Button
        variant={mode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('grid')}
        className="flex items-center space-x-1"
      >
        <Grid3X3 className="w-4 h-4" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
      <Button
        variant={mode === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('table')}
        className="flex items-center space-x-1"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">Lista</span>
      </Button>
    </div>
  );
}

export type { ViewMode };
