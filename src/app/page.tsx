'use client';

import { usePokemonWithDetails, useViewMode } from '@/lib/hooks';
import { PokemonGrid, PokemonTable } from '@/components/pokemon';
import { ViewModeToggle } from '@/components/filters';
import { LoadingState, ErrorState } from '@/components/shared';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const { viewMode, setViewMode } = useViewMode();
  const { pokemon, totalCount, isLoading, error } = usePokemonWithDetails();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingState mode={viewMode} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorState error={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="text-red-500">Pokédex</span> PWA
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Aplicação web progressiva para gestão da sua coleção de Pokémon.
          Capture, organize e analise seus Pokémon favoritos!
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <span className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 md:py-4 md:text-lg md:px-10">
              <Sparkles className="w-5 h-5 mr-2" />
              {totalCount} Pokémon disponíveis!
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lista de Pokémon</h2>
          <p className="text-gray-500 text-sm mt-1">
            Mostrando {pokemon.length} de {totalCount} Pokémon
          </p>
        </div>
        <ViewModeToggle mode={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === 'grid' ? (
        <PokemonGrid pokemon={pokemon} />
      ) : (
        <PokemonTable pokemon={pokemon} />
      )}
    </div>
  );
}
