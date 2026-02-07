import { usePokedexStore } from '@/lib/stores/pokedex.store';
import { Pokemon } from '@/lib/types/pokemon.types';

// Public facade over the Zustand store. Keeps components decoupled from
// the store implementation and provides a single import point together
// with useToggleCatch below.
export function usePokedex() {
  const store = usePokedexStore();

  return {
    caught: store.caught,
    addPokemon: store.addPokemon,
    removePokemon: store.removePokemon,
    removeMultiple: store.removeMultiple,
    updateNote: store.updateNote,
    isCaught: store.isCaught,
    getCaughtCount: store.getCaughtCount,
    getCaughtByType: store.getCaughtByType,
  };
}

export function useToggleCatch(pokemon: Pokemon) {
  const { isCaught, addPokemon, removePokemon } = usePokedex();
  const caught = isCaught(pokemon.id);

  const toggle = () => {
    if (caught) {
      removePokemon(pokemon.id);
    } else {
      addPokemon(pokemon);
    }
  };

  return { caught, toggle };
}
