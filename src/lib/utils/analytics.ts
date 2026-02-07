import { CaughtPokemon } from '@/lib/types/pokedex.types';

export interface AnalyticsStats {
  totalCaught: number;
  totalAvailable: number;
  completionPercentage: number;
  mostCommonType: { type: string; count: number };
  heaviestPokemon: CaughtPokemon | null;
  lightestPokemon: CaughtPokemon | null;
  tallestPokemon: CaughtPokemon | null;
  shortestPokemon: CaughtPokemon | null;
  avgAttack: number;
  avgDefense: number;
  avgSpeed: number;
}

export function calculateStats(caught: CaughtPokemon[], totalAvailable: number = 1000): AnalyticsStats {
  const totalCaught = caught.length;
  
  if (totalCaught === 0) {
    return {
      totalCaught: 0,
      totalAvailable,
      completionPercentage: 0,
      mostCommonType: { type: 'N/A', count: 0 },
      heaviestPokemon: null,
      lightestPokemon: null,
      tallestPokemon: null,
      shortestPokemon: null,
      avgAttack: 0,
      avgDefense: 0,
      avgSpeed: 0,
    };
  }

  // Type counts
  const typeCounts: Record<string, number> = {};
  caught.forEach(p => {
    p.types.forEach(t => {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    });
  });

  const mostCommonTypeEntry = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];

  // Extremes
  const heaviest = [...caught].sort((a, b) => b.weight - a.weight)[0];
  const lightest = [...caught].sort((a, b) => a.weight - b.weight)[0];
  const tallest = [...caught].sort((a, b) => b.height - a.height)[0];
  const shortest = [...caught].sort((a, b) => a.height - b.height)[0];

  // Averages
  const totalAttack = caught.reduce((acc, p) => acc + p.stats.attack, 0);
  const totalDefense = caught.reduce((acc, p) => acc + p.stats.defense, 0);
  const totalSpeed = caught.reduce((acc, p) => acc + p.stats.speed, 0);

  return {
    totalCaught,
    totalAvailable,
    completionPercentage: (totalCaught / totalAvailable) * 100,
    mostCommonType: { type: mostCommonTypeEntry[0], count: mostCommonTypeEntry[1] },
    heaviestPokemon: heaviest,
    lightestPokemon: lightest,
    tallestPokemon: tallest,
    shortestPokemon: shortest,
    avgAttack: Math.round(totalAttack / totalCaught),
    avgDefense: Math.round(totalDefense / totalCaught),
    avgSpeed: Math.round(totalSpeed / totalCaught),
  };
}
