import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonById, fetchPokemonTypes } from '@/lib/services/pokemon.service';

export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: () => fetchPokemonList(1000),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export function usePokemonDetails(id: number) {
  return useQuery({
    queryKey: ['pokemon', 'details', id],
    queryFn: () => fetchPokemonById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: id > 0,
  });
}

export function usePokemonTypes() {
  return useQuery({
    queryKey: ['pokemon', 'types'],
    queryFn: fetchPokemonTypes,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (types don't change often)
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}
