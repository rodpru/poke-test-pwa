'use client';

import { useState, useEffect } from 'react';
import { usePokemonList } from './use-pokemon-list';
import { fetchPokemonDetailsByUrl } from '@/lib/services';
import { Pokemon, PokemonListItem } from '@/lib/types';

export function usePokemonWithDetails() {
  const { data: listData, isLoading: isListLoading, error: listError } = usePokemonList();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<Error | null>(null);

  useEffect(() => {
    if (!listData?.results) return;

    const fetchDetails = async () => {
      setIsLoadingDetails(true);
      setDetailsError(null);

      try {
        // Fetch details for first 20 Pokemon only for performance
        const firstBatch = listData.results.slice(0, 20);
        const details = await Promise.all(
          firstBatch.map((item: PokemonListItem) => fetchPokemonDetailsByUrl(item.url))
        );
        setPokemon(details);
      } catch (err) {
        setDetailsError(err instanceof Error ? err : new Error('Failed to fetch Pokemon details'));
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [listData]);

  return {
    pokemon,
    totalCount: listData?.count || 0,
    isLoading: isListLoading || isLoadingDetails,
    error: listError || detailsError,
  };
}
