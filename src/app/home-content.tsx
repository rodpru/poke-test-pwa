'use client';

import { usePokemonWithDetails, useViewMode, useFilters } from '@/lib/hooks';
import { PokemonGrid, PokemonTable } from '@/components/pokemon';
import { ViewModeToggle, SearchBar, TypeFilter, SortControls } from '@/components/filters';
import { LoadingState, ErrorState, EmptyState } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { POKEDEX_MAX } from '@/lib/constants';

export function HomeContent() {
  const { viewMode, setViewMode } = useViewMode();
  const { pokemon, totalCount, loadedCount, isLoading, error } = usePokemonWithDetails();

  const {
    searchQuery,
    setSearchQuery,
    selectedTypes,
    toggleType,
    clearTypes,
    sortOption,
    setSortOption,
    filteredPokemon,
    activeFiltersCount,
    resetFilters,
  } = useFilters({ pokemon });

  // Show loading only on initial load (when we have no pokemon yet)
  if (isLoading && pokemon.length === 0) {
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

  const displayTotal = Math.min(totalCount, POKEDEX_MAX);
  const progressValue = Math.min(loadedCount, POKEDEX_MAX);
  const progressPercent = (progressValue / POKEDEX_MAX) * 100;
  const isLoadingMore = loadedCount < displayTotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="text-red-500">Pokédex</span> PWA
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Aplicacao web progressiva para gestao da tua colecao de Pokemon.
          Captura, organiza e analisa os teus Pokemon favoritos!
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <span className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 md:py-4 md:text-lg md:px-10">
              <Sparkles className="w-5 h-5 mr-2" />
              {displayTotal} Pokémon disponíveis!
            </span>
          </div>
        </div>
      </div>

      {/* Loading Progress */}
      {isLoadingMore && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">
              A carregar Pokemon...
            </span>
            <span className="text-sm text-blue-600">
              {progressValue} / {POKEDEX_MAX}
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-blue-600 mt-2 flex items-center">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            A carregar mais Pokémon em background...
          </p>
        </div>
      )}

      {/* Filters Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Pesquisar por nome ou número..."
            />
          </div>
          
          {/* Sort */}
          <SortControls value={sortOption} onChange={setSortOption} />
          
          {/* View Mode */}
          <ViewModeToggle mode={viewMode} onChange={setViewMode} />
        </div>

        {/* Type Filter */}
        <TypeFilter
          selectedTypes={selectedTypes}
          onToggle={toggleType}
          onClear={clearTypes}
        />

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filtros ativos:</span>
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                {activeFiltersCount}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar todos
            </Button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lista de Pokémon</h2>
          <p className="text-gray-500 text-sm mt-1">
            Mostrando {filteredPokemon.length} Pokémon
            {searchQuery && ` (pesquisa em ${loadedCount} carregados)`}
          </p>
        </div>
      </div>

      {/* Pokemon List */}
      {filteredPokemon.length === 0 ? (
        <div className="flex flex-col items-center">
          <EmptyState
            title="Nenhum Pokémon encontrado"
            description={isLoadingMore 
              ? "Ainda estamos a carregar todos os Pokémon. Tenta novamente dentro de momentos." 
              : "Tente ajustar os filtros para ver mais resultados."
            }
          />
          {!isLoadingMore && (
            <Button onClick={resetFilters} variant="outline" className="mt-4">
              Limpar filtros
            </Button>
          )}
        </div>
      ) : (
        viewMode === 'grid' ? (
          <PokemonGrid pokemon={filteredPokemon} />
        ) : (
          <PokemonTable pokemon={filteredPokemon} />
        )
      )}
    </div>
  );
}
