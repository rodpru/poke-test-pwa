import { Pokemon } from '@/lib/types';
import { SortOption } from '@/lib/types/pokedex.types';

export function filterByName(pokemon: Pokemon[], query: string): Pokemon[] {
  if (!query.trim()) return pokemon;
  
  const normalizedQuery = query.toLowerCase().trim();
  return pokemon.filter((p) =>
    p.name.toLowerCase().includes(normalizedQuery) ||
    p.id.toString().includes(normalizedQuery)
  );
}

export function filterByType(pokemon: Pokemon[], types: string[]): Pokemon[] {
  if (types.length === 0) return pokemon;
  
  return pokemon.filter((p) =>
    types.some((type) => p.types.some((t) => t.type.name === type))
  );
}

export function sortPokemon(
  pokemon: Pokemon[],
  sortBy: SortOption
): Pokemon[] {
  const sorted = [...pokemon];
  
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'id-asc':
      return sorted.sort((a, b) => a.id - b.id);
    case 'id-desc':
      return sorted.sort((a, b) => b.id - a.id);
    case 'height-asc':
      return sorted.sort((a, b) => a.height - b.height);
    case 'height-desc':
      return sorted.sort((a, b) => b.height - a.height);
    case 'weight-asc':
      return sorted.sort((a, b) => a.weight - b.weight);
    case 'weight-desc':
      return sorted.sort((a, b) => b.weight - a.weight);
    default:
      return sorted;
  }
}

export function filterPokemon(
  pokemon: Pokemon[],
  filters: {
    search?: string;
    types?: string[];
    sort?: SortOption;
  }
): Pokemon[] {
  let result = [...pokemon];
  
  if (filters.search) {
    result = filterByName(result, filters.search);
  }
  
  if (filters.types && filters.types.length > 0) {
    result = filterByType(result, filters.types);
  }
  
  if (filters.sort) {
    result = sortPokemon(result, filters.sort);
  }
  
  return result;
}
