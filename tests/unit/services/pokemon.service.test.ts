import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchPokemonList,
  fetchPokemonById,
  fetchPokemonByName,
  fetchPokemonTypes,
  fetchPokemonDetailsByUrl,
  PokemonServiceError,
} from '@/lib/services/pokemon.service';
import { Pokemon, PokemonListResponse } from '@/lib/types';

// Mock fetch
global.fetch = vi.fn();

describe('fetchPokemonList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches Pokemon list successfully', async () => {
    const mockResponse: PokemonListResponse = {
      count: 3,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
      ],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await fetchPokemonList(3);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=3'
    );
  });

  it('uses default limit of 1000', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ count: 0, results: [] }),
    } as Response);

    await fetchPokemonList();

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=1000'
    );
  });

  it('throws PokemonServiceError on HTTP error', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
      status: 404,
    } as Response);

    const error = await fetchPokemonList().catch(e => e);
    expect(error).toBeInstanceOf(PokemonServiceError);
    expect(error.message).toContain('Failed to fetch Pokemon list');
    expect(error.statusCode).toBe(404);
  });

  it('throws PokemonServiceError on network error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchPokemonList()).rejects.toThrow(PokemonServiceError);
    await expect(fetchPokemonList()).rejects.toThrow('Network error while fetching Pokemon list');
  });
});

describe('fetchPokemonById', () => {
  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    types: [],
    height: 4,
    weight: 60,
    stats: [],
    sprites: { front_default: 'sprite.png' },
  };

  it('fetches Pokemon by ID successfully', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    } as Response);

    const result = await fetchPokemonById(25);

    expect(result).toEqual(mockPokemon);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/25'
    );
  });

  it('throws PokemonServiceError on HTTP error', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
      status: 404,
    } as Response);

    const error = await fetchPokemonById(9999).catch(e => e);
    expect(error).toBeInstanceOf(PokemonServiceError);
    expect(error.message).toContain('Failed to fetch Pokemon #9999');
    expect(error.statusCode).toBe(404);
  });

  it('throws PokemonServiceError on network error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchPokemonById(25)).rejects.toThrow('Network error while fetching Pokemon #25');
  });
});

describe('fetchPokemonByName', () => {
  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    types: [],
    height: 4,
    weight: 60,
    stats: [],
    sprites: { front_default: 'sprite.png' },
  };

  it('fetches Pokemon by name (lowercase)', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    } as Response);

    const result = await fetchPokemonByName('PIKACHU');

    expect(result).toEqual(mockPokemon);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });

  it('throws PokemonServiceError when Pokemon not found', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
      status: 404,
    } as Response);

    await expect(fetchPokemonByName('not-a-pokemon')).rejects.toThrow('Failed to fetch Pokemon "not-a-pokemon"');
  });
});

describe('fetchPokemonTypes', () => {
  it('fetches list of Pokemon types', async () => {
    const mockResponse = {
      results: [
        { name: 'normal' },
        { name: 'fire' },
        { name: 'water' },
      ],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await fetchPokemonTypes();

    expect(result).toEqual(['normal', 'fire', 'water']);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/type'
    );
  });

  it('throws PokemonServiceError on error', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      statusText: 'Server Error',
      status: 500,
    } as Response);

    await expect(fetchPokemonTypes()).rejects.toThrow('Failed to fetch Pokemon types');
  });
});

describe('fetchPokemonDetailsByUrl', () => {
  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    types: [],
    height: 7,
    weight: 69,
    stats: [],
    sprites: { front_default: 'sprite.png' },
  };

  it('fetches Pokemon details by URL', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    } as Response);

    const result = await fetchPokemonDetailsByUrl('https://pokeapi.co/api/v2/pokemon/1/');

    expect(result).toEqual(mockPokemon);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/1/'
    );
  });

  it('throws PokemonServiceError on error', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
      status: 404,
    } as Response);

    await expect(fetchPokemonDetailsByUrl('https://pokeapi.co/api/v2/pokemon/9999/')).rejects.toThrow(
      'Failed to fetch Pokemon details'
    );
  });
});

describe('PokemonServiceError', () => {
  it('creates error with status code', () => {
    const error = new PokemonServiceError('Test error', 404);
    
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('PokemonServiceError');
  });

  it('creates error without status code', () => {
    const error = new PokemonServiceError('Test error');
    
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBeUndefined();
  });
});
