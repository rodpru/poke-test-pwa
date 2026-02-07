"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToggleCatch } from "@/lib/hooks";
import { Pokemon, POKEMON_TYPE_COLORS } from "@/lib/types";
import {
  formatHeight,
  formatPokemonId,
  formatWeight,
} from "@/lib/utils/formatters";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface PokemonTableProps {
  pokemon: Pokemon[];
}

const ROW_HEIGHT = 64;

function PokemonTableRow({ pokemon }: { pokemon: Pokemon }) {
  const { caught, toggle } = useToggleCatch(pokemon);
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 whitespace-nowrap">
        <Link
          href={`/pokemon/${pokemon.id}`}
          className="flex items-center space-x-3"
        >
          <div className="relative w-12 h-12">
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="48px"
              loading="lazy"
            />
          </div>
          <span className="text-gray-500 font-medium">
            {formatPokemonId(pokemon.id)}
          </span>
        </Link>
      </td>
      <td className="px-4 py-3">
        <Link
          href={`/pokemon/${pokemon.id}`}
          className="font-semibold text-gray-900 hover:text-red-500 transition-colors capitalize"
        >
          {pokemon.name}
        </Link>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              className={`${POKEMON_TYPE_COLORS[type.type.name] || "bg-gray-400"} text-white border-0 capitalize text-xs`}
            >
              {type.type.name}
            </Badge>
          ))}
        </div>
      </td>
      <td className="px-4 py-3 text-gray-600">
        {formatHeight(pokemon.height)}
      </td>
      <td className="px-4 py-3 text-gray-600">
        {formatWeight(pokemon.weight)}
      </td>
      <td className="px-4 py-3">
        <Button
          onClick={toggle}
          variant={caught ? "default" : "outline"}
          size="sm"
        >
          {caught ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Libertar</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Capturar</span>
            </>
          )}
        </Button>
      </td>
    </tr>
  );
}

export function PokemonTable({ pokemon }: PokemonTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: pokemon.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum Pokemon encontrado.</p>
      </div>
    );
  }

  return (
    <div ref={parentRef} className="overflow-auto h-[70vh]">
      <table className="w-full">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              #
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Nome
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Tipos
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Altura
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Peso
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Acao
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} style={{ padding: 0, border: "none" }}>
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                <table
                  className="w-full"
                  style={{ position: "absolute", top: 0, left: 0 }}
                >
                  <tbody>
                    {virtualizer.getVirtualItems().map((virtualRow) => (
                      <PokemonTableRow
                        key={pokemon[virtualRow.index].id}
                        pokemon={pokemon[virtualRow.index]}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
