'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { POKEMON_TYPE_COLORS } from '@/lib/types';
import { usePokemonTypes } from '@/lib/hooks';

interface TypeFilterProps {
  selectedTypes: string[];
  onToggle: (type: string) => void;
  onClear: () => void;
}

export function TypeFilter({ selectedTypes, onToggle, onClear }: TypeFilterProps) {
  const { data: types, isLoading } = usePokemonTypes();

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Filtrar por Tipo</span>
        {selectedTypes.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-auto py-1 px-2">
            <X className="w-3 h-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {types?.map((type) => {
          const isSelected = selectedTypes.includes(type);
          return (
            <button
              key={type}
              onClick={() => onToggle(type)}
              className={`capitalize px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? `${POKEMON_TYPE_COLORS[type] || 'bg-gray-400'} text-white ring-2 ring-offset-1 ring-gray-300`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
      
      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedTypes.map((type) => (
            <Badge
              key={type}
              className={`${POKEMON_TYPE_COLORS[type] || 'bg-gray-400'} text-white capitalize cursor-pointer`}
              onClick={() => onToggle(type)}
            >
              {type} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
