'use client';

import { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PokemonCard } from './pokemon-card';
import { Pokemon } from '@/lib/types';

interface PokemonGridProps {
  pokemon: Pokemon[];
}

const CARD_HEIGHT = 310; // Approximate card height in px
const GAP = 16;

function useColumns() {
  // Return a static column count based on a reasonable default.
  // CSS grid handles the actual responsive layout; the virtualizer
  // only needs the row count to decide which rows are visible.
  if (typeof window === 'undefined') return 5;
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 768) return 2;
  if (w < 1024) return 3;
  if (w < 1280) return 4;
  return 5;
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const columns = useColumns();

  const rows = useMemo(() => {
    const result: Pokemon[][] = [];
    for (let i = 0; i < pokemon.length; i += columns) {
      result.push(pokemon.slice(i, i + columns));
    }
    return result;
  }, [pokemon, columns]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT + GAP,
    overscan: 3,
  });

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum Pokemon encontrado.</p>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-[70vh] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {rows[virtualRow.index].map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
