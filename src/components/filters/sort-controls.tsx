'use client';

import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/lib/types/pokedex.types';

interface SortControlsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'id-asc', label: 'Número Pokédex (↑)' },
  { value: 'id-desc', label: 'Número Pokédex (↓)' },
  { value: 'name-asc', label: 'Nome (A-Z)' },
  { value: 'name-desc', label: 'Nome (Z-A)' },
  { value: 'height-asc', label: 'Altura (↑)' },
  { value: 'height-desc', label: 'Altura (↓)' },
  { value: 'weight-asc', label: 'Peso (↑)' },
  { value: 'weight-desc', label: 'Peso (↓)' },
];

export function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <ArrowUpDown className="w-4 h-4 text-gray-400" />
      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as SortOption)}
        className="flex h-10 w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
