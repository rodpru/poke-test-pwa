export interface CaughtPokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  caughtAt: string;
  note?: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  height: number;
  weight: number;
}

export interface PokedexState {
  caught: CaughtPokemon[];
}

export type SortOption = 
  | 'name-asc' 
  | 'name-desc' 
  | 'id-asc' 
  | 'id-desc' 
  | 'height-asc' 
  | 'height-desc' 
  | 'weight-asc' 
  | 'weight-desc'
  | 'caught-date-asc'
  | 'caught-date-desc';

export interface Filters {
  search: string;
  types: string[];
  status: 'all' | 'caught' | 'uncaught';
  sort: SortOption;
}
