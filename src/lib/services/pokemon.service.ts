import { Pokemon, PokemonListResponse } from '@/lib/types/pokemon.types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonServiceError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'PokemonServiceError';
  }
}

export async function fetchPokemonList(limit: number = 1000): Promise<PokemonListResponse> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);

    if (!response.ok) {
      throw new PokemonServiceError(
        `Failed to fetch Pokemon list: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof PokemonServiceError) {
      throw error;
    }
    throw new PokemonServiceError('Network error while fetching Pokemon list');
  }
}

export async function fetchPokemonById(id: number): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new PokemonServiceError(
        `Failed to fetch Pokemon #${id}: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof PokemonServiceError) {
      throw error;
    }
    throw new PokemonServiceError(`Network error while fetching Pokemon #${id}`);
  }
}

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);

    if (!response.ok) {
      throw new PokemonServiceError(
        `Failed to fetch Pokemon "${name}": ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof PokemonServiceError) {
      throw error;
    }
    throw new PokemonServiceError(`Network error while fetching Pokemon "${name}"`);
  }
}

export async function fetchPokemonTypes(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/type`);

    if (!response.ok) {
      throw new PokemonServiceError(
        `Failed to fetch Pokemon types: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data.results.map((type: { name: string }) => type.name);
  } catch (error) {
    if (error instanceof PokemonServiceError) {
      throw error;
    }
    throw new PokemonServiceError('Network error while fetching Pokemon types');
  }
}

export async function fetchPokemonDetailsByUrl(url: string): Promise<Pokemon> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new PokemonServiceError(
        `Failed to fetch Pokemon details: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof PokemonServiceError) {
      throw error;
    }
    throw new PokemonServiceError('Network error while fetching Pokemon details');
  }
}
