'use client';

import { PokemonCard } from './pokemon-card';
import { Pokemon } from '@/lib/types';

interface PokemonGridProps {
  pokemon: Pokemon[];
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum Pokémon encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
