'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePokemonList } from './use-pokemon-list';
import { fetchPokemonDetailsByUrl, fetchPokemonById } from '@/lib/services';
import { Pokemon, PokemonListItem } from '@/lib/types';

const BATCH_SIZE = 50;
const INITIAL_BATCH_SIZE = 50;

export function usePokemonWithDetails() {
  const { data: listData, isLoading: isListLoading, error: listError } = usePokemonList();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<Error | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load initial batch immediately
  useEffect(() => {
    if (!listData?.results) return;

    // Abort previous fetch if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    let cancelled = false;

    const fetchAllBatches = async () => {
      setIsLoadingDetails(true);
      setDetailsError(null);

      try {
        // Load first batch immediately so user sees something
        const initialBatch = listData.results.slice(0, INITIAL_BATCH_SIZE);
        const initialResults = await Promise.allSettled(
          initialBatch.map((item: PokemonListItem) => fetchPokemonDetailsByUrl(item.url))
        );

        if (cancelled) return;

        const initialDetails = initialResults
          .filter((result): result is PromiseFulfilledResult<Pokemon> => result.status === 'fulfilled')
          .map(result => result.value);

        setPokemon(initialDetails);
        setLoadedCount(initialDetails.length);

        // Load remaining in background
        const remainingResults = listData.results.slice(INITIAL_BATCH_SIZE);
        const allDetails = [...initialDetails];

        for (let i = 0; i < remainingResults.length; i += BATCH_SIZE) {
          if (cancelled) return;

          const batch = remainingResults.slice(i, i + BATCH_SIZE);
          try {
            const batchResults = await Promise.allSettled(
              batch.map((item: PokemonListItem) => fetchPokemonDetailsByUrl(item.url))
            );

            if (cancelled) return;

            const batchDetails = batchResults
              .filter((result): result is PromiseFulfilledResult<Pokemon> => result.status === 'fulfilled')
              .map(result => result.value);

            allDetails.push(...batchDetails);
            setPokemon([...allDetails]);
            setLoadedCount(allDetails.length);
          } catch (batchErr) {
            console.warn('Failed to load batch:', batchErr);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setDetailsError(err instanceof Error ? err : new Error('Failed to fetch Pokemon details'));
        }
      } finally {
        if (!cancelled) {
          setIsLoadingDetails(false);
        }
      }
    };

    fetchAllBatches();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [listData]);

  // Function to fetch a specific Pokemon by ID (for search)
  const fetchPokemonByIdForSearch = useCallback(async (id: number): Promise<Pokemon | null> => {
    try {
      // Check if already loaded
      const existing = pokemon.find(p => p.id === id);
      if (existing) return existing;
      
      // Fetch from API
      const fetched = await fetchPokemonById(id);
      if (fetched) {
        setPokemon(prev => {
          // Avoid duplicates
          if (prev.some(p => p.id === fetched.id)) return prev;
          return [...prev, fetched];
        });
      }
      return fetched;
    } catch (err) {
      console.error('Failed to fetch Pokemon by ID:', err);
      return null;
    }
  }, [pokemon]);

  return {
    pokemon,
    totalCount: listData?.count || 0,
    loadedCount,
    isLoading: isListLoading || isLoadingDetails,
    error: listError || detailsError,
    fetchPokemonByIdForSearch,
  };
}
