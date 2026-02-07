import { describe, it, expect } from 'vitest';
import {
  filterByName,
  filterByType,
  sortPokemon,
  filterPokemon,
} from '@/lib/utils/filters';
import { Pokemon } from '@/lib/types';

// Mock data
const mockPokemon: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    types: [{ slot: 1, type: { name: 'grass', url: '' } }, { slot: 2, type: { name: 'poison', url: '' } }],
    height: 7,
    weight: 69,
    stats: [],
    sprites: { front_default: '' },
  },
  {
    id: 2,
    name: 'ivysaur',
    types: [{ slot: 1, type: { name: 'grass', url: '' } }, { slot: 2, type: { name: 'poison', url: '' } }],
    height: 10,
    weight: 130,
    stats: [],
    sprites: { front_default: '' },
  },
  {
    id: 25,
    name: 'pikachu',
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
    height: 4,
    weight: 60,
    stats: [],
    sprites: { front_default: '' },
  },
  {
    id: 6,
    name: 'charizard',
    types: [{ slot: 1, type: { name: 'fire', url: '' } }, { slot: 2, type: { name: 'flying', url: '' } }],
    height: 17,
    weight: 905,
    stats: [],
    sprites: { front_default: '' },
  },
];

describe('filterByName', () => {
  it('filters by partial name match', () => {
    const result = filterByName(mockPokemon, 'bulba');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('bulbasaur');
  });

  it('filters by ID', () => {
    const result = filterByName(mockPokemon, '25');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(25);
  });

  it('is case insensitive', () => {
    const result = filterByName(mockPokemon, 'PIKACHU');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('pikachu');
  });

  it('returns all when query is empty', () => {
    const result = filterByName(mockPokemon, '');
    expect(result).toHaveLength(4);
  });

  it('returns all when query is whitespace', () => {
    const result = filterByName(mockPokemon, '   ');
    expect(result).toHaveLength(4);
  });

  it('returns empty array when no matches', () => {
    const result = filterByName(mockPokemon, 'xyz');
    expect(result).toHaveLength(0);
  });
});

describe('filterByType', () => {
  it('filters by single type', () => {
    const result = filterByType(mockPokemon, ['electric']);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('pikachu');
  });

  it('filters by multiple types (OR logic)', () => {
    const result = filterByType(mockPokemon, ['grass', 'electric']);
    expect(result).toHaveLength(3); // bulbasaur, ivysaur, pikachu
  });

  it('returns all when no types specified', () => {
    const result = filterByType(mockPokemon, []);
    expect(result).toHaveLength(4);
  });

  it('filters by secondary type', () => {
    const result = filterByType(mockPokemon, ['poison']);
    expect(result).toHaveLength(2); // bulbasaur, ivysaur
  });
});

describe('sortPokemon', () => {
  it('sorts by name ascending', () => {
    const result = sortPokemon(mockPokemon, 'name-asc');
    expect(result[0].name).toBe('bulbasaur');
    expect(result[1].name).toBe('charizard');
    expect(result[2].name).toBe('ivysaur');
    expect(result[3].name).toBe('pikachu');
  });

  it('sorts by name descending', () => {
    const result = sortPokemon(mockPokemon, 'name-desc');
    expect(result[0].name).toBe('pikachu');
    expect(result[3].name).toBe('bulbasaur');
  });

  it('sorts by ID ascending', () => {
    const result = sortPokemon(mockPokemon, 'id-asc');
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(6);
    expect(result[3].id).toBe(25);
  });

  it('sorts by ID descending', () => {
    const result = sortPokemon(mockPokemon, 'id-desc');
    expect(result[0].id).toBe(25);
    expect(result[3].id).toBe(1);
  });

  it('sorts by height ascending', () => {
    const result = sortPokemon(mockPokemon, 'height-asc');
    expect(result[0].height).toBe(4); // pikachu
    expect(result[1].height).toBe(7); // bulbasaur
  });

  it('sorts by height descending', () => {
    const result = sortPokemon(mockPokemon, 'height-desc');
    expect(result[0].height).toBe(17); // charizard
  });

  it('sorts by weight ascending', () => {
    const result = sortPokemon(mockPokemon, 'weight-asc');
    expect(result[0].weight).toBe(60); // pikachu
  });

  it('sorts by weight descending', () => {
    const result = sortPokemon(mockPokemon, 'weight-desc');
    expect(result[0].weight).toBe(905); // charizard
  });

  it('returns original array for unknown sort option', () => {
    const result = sortPokemon(mockPokemon, 'unknown' as any);
    expect(result).toHaveLength(4);
  });
});

describe('filterPokemon', () => {
  it('applies multiple filters', () => {
    const result = filterPokemon(mockPokemon, {
      search: 'saur',
      types: ['grass'],
      sort: 'id-asc',
    });
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('bulbasaur');
  });

  it('applies only search filter', () => {
    const result = filterPokemon(mockPokemon, { search: 'char' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('charizard');
  });

  it('applies only type filter', () => {
    const result = filterPokemon(mockPokemon, { types: ['fire'] });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('charizard');
  });

  it('applies only sort filter', () => {
    const result = filterPokemon(mockPokemon, { sort: 'name-asc' });
    expect(result).toHaveLength(4);
    expect(result[0].name).toBe('bulbasaur');
  });

  it('returns all when no filters', () => {
    const result = filterPokemon(mockPokemon, {});
    expect(result).toHaveLength(4);
  });
});
