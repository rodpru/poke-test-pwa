'use client';

import { X, Trash2, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BulkActionsProps {
  selectedCount: number;
  onClear: () => void;
  onSelectAll: () => void;
  onRemove: () => void;
  isAllSelected: boolean;
}

export function BulkActions({
  selectedCount,
  onClear,
  onSelectAll,
  onRemove,
  isAllSelected,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
          <span className="font-medium text-gray-900">
            {selectedCount} selecionado{selectedCount !== 1 && 's'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="text-gray-600"
          >
            {isAllSelected ? (
              <>
                <CheckSquare className="w-4 h-4 mr-2" />
                Todos
              </>
            ) : (
              <>
                <Square className="w-4 h-4 mr-2" />
                Todos
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onRemove}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remover
          </Button>
        </div>
      </div>
    </div>
  );
}
