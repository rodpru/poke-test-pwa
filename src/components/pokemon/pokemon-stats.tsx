'use client';

import { PokemonStat } from '@/lib/types/pokemon.types';
import { cn } from '@/lib/utils/formatters';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const statNames: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const statColors: Record<string, string> = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-blue-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-pink-500',
};

const MAX_STAT = 255;

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="space-y-3">
      {stats.map((stat) => {
        const statName = stat.stat.name;
        const displayName = statNames[statName] || statName;
        const percentage = (stat.base_stat / MAX_STAT) * 100;
        const colorClass = statColors[statName] || 'bg-gray-500';

        return (
          <div key={statName} className="flex items-center gap-3">
            <div className="w-20 text-sm font-medium text-gray-600 capitalize">
              {displayName}
            </div>
            <div className="w-12 text-sm font-bold text-gray-900 text-right">
              {stat.base_stat}
            </div>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', colorClass)}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PokemonTotalStats({ stats }: PokemonStatsProps) {
  const total = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
      <span className="text-sm font-medium text-gray-600">Total</span>
      <span className="text-lg font-bold text-gray-900">{total}</span>
    </div>
  );
}
