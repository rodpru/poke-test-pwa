'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Pokemon } from '@/lib/types';
import { SortOption } from '@/lib/types/pokedex.types';
import { filterPokemon } from '@/lib/utils/filters';

interface UseFiltersProps {
  pokemon: Pokemon[];
}

interface UseFiltersReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTypes: string[];
  toggleType: (type: string) => void;
  clearTypes: () => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  filteredPokemon: Pokemon[];
  activeFiltersCount: number;
  resetFilters: () => void;
}

export function useFilters({ pokemon }: UseFiltersProps): UseFiltersReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get('types')?.split(',').filter(Boolean) || []
  );
  const [sortOption, setSortOption] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'id-asc'
  );

  // Debounce search query
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (selectedTypes.length > 0) params.set('types', selectedTypes.join(','));
    if (sortOption !== 'id-asc') params.set('sort', sortOption);

    const newUrl = params.toString() 
      ? `${pathname}?${params.toString()}` 
      : pathname;
    
    router.replace(newUrl, { scroll: false });
  }, [debouncedSearch, selectedTypes, sortOption, pathname, router]);

  const toggleType = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  }, []);

  const clearTypes = useCallback(() => {
    setSelectedTypes([]);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSortOption('id-asc');
  }, []);

  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemon, {
      search: debouncedSearch,
      types: selectedTypes,
      sort: sortOption,
    });
  }, [pokemon, debouncedSearch, selectedTypes, sortOption]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (debouncedSearch) count++;
    if (selectedTypes.length > 0) count++;
    if (sortOption !== 'id-asc') count++;
    return count;
  }, [debouncedSearch, selectedTypes, sortOption]);

  return {
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
  };
}
