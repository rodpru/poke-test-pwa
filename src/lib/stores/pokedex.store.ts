import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import localforage from 'localforage';
import { CaughtPokemon } from '@/lib/types/pokedex.types';
import { Pokemon } from '@/lib/types/pokemon.types';

interface PokedexStore {
  caught: CaughtPokemon[];
  addPokemon: (pokemon: Pokemon, note?: string) => void;
  removePokemon: (id: number) => void;
  removeMultiple: (ids: number[]) => void;
  updateNote: (id: number, note: string) => void;
  isCaught: (id: number) => boolean;
  getCaughtCount: () => number;
  getCaughtByType: () => Record<string, number>;
}

// Custom async storage adapter for localforage
const localforageStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await localforage.getItem<string>(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await localforage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await localforage.removeItem(name);
  },
};

const pokemonToCaughtPokemon = (pokemon: Pokemon, note?: string): CaughtPokemon => ({
  id: pokemon.id,
  name: pokemon.name,
  types: pokemon.types.map((t) => t.type.name),
  sprite: pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default,
  caughtAt: new Date().toISOString(),
  note,
  stats: {
    hp: pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat || 0,
    attack: pokemon.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0,
    defense: pokemon.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0,
    specialAttack: pokemon.stats.find((s) => s.stat.name === 'special-attack')?.base_stat || 0,
    specialDefense: pokemon.stats.find((s) => s.stat.name === 'special-defense')?.base_stat || 0,
    speed: pokemon.stats.find((s) => s.stat.name === 'speed')?.base_stat || 0,
  },
  height: pokemon.height,
  weight: pokemon.weight,
});

export const usePokedexStore = create<PokedexStore>()(
  persist(
    (set, get) => ({
      caught: [],

      addPokemon: (pokemon: Pokemon, note?: string) => {
        set((state) => {
          if (state.caught.some((p) => p.id === pokemon.id)) {
            return state;
          }
          return {
            caught: [...state.caught, pokemonToCaughtPokemon(pokemon, note)],
          };
        });
      },

      removePokemon: (id: number) => {
        set((state) => ({
          caught: state.caught.filter((p) => p.id !== id),
        }));
      },

      removeMultiple: (ids: number[]) => {
        set((state) => ({
          caught: state.caught.filter((p) => !ids.includes(p.id)),
        }));
      },

      updateNote: (id: number, note: string) => {
        set((state) => ({
          caught: state.caught.map((p) =>
            p.id === id ? { ...p, note } : p
          ),
        }));
      },

      isCaught: (id: number) => {
        return get().caught.some((p) => p.id === id);
      },

      getCaughtCount: () => {
        return get().caught.length;
      },

      getCaughtByType: () => {
        const typeCount: Record<string, number> = {};
        get().caught.forEach((pokemon) => {
          pokemon.types.forEach((type) => {
            typeCount[type] = (typeCount[type] || 0) + 1;
          });
        });
        return typeCount;
      },
    }),
    {
      name: 'pokedex-storage',
      storage: createJSONStorage(() => localforageStorage),
    }
  )
);
