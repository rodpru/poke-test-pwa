"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { useToggleCatch } from "@/lib/hooks";
import { POKEMON_TYPE_COLORS, Pokemon } from "@/lib/types";
import { formatPokemonId } from "@/lib/utils/formatters";
import { Check, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function PokemonCard({
  pokemon,
  isSelectionMode = false,
  isSelected = false,
  onSelect,
}: PokemonCardProps) {
  const { caught, toggle } = useToggleCatch(pokemon);
  const { addToast } = useToast();

  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  const handleToggle = () => {
    toggle();
    if (!caught) {
      addToast({
        title: "Pokémon Capturado!",
        message: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} foi adicionado a tua Pokedex.`,
        variant: "success",
      });
    } else {
      addToast({
        title: "Pokémon Libertado",
        message: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} foi removido da tua Pokedex.`,
        variant: "info",
      });
    }
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-red-500 shadow-md scale-[1.02]"
          : "hover:shadow-lg"
      }`}
      onClick={isSelectionMode ? onSelect : undefined}
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center relative">
          {/* Selection Checkbox */}
          {isSelectionMode && (
            <div className="absolute top-0 left-0 z-20">
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                {isSelected && <Check className="w-4 h-4" strokeWidth={3} />}
              </div>
            </div>
          )}

          {/* Caught Badge */}
          {caught && !isSelectionMode && (
            <div className="absolute top-0 right-0 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white shadow-lg">
              <Check className="w-5 h-5" strokeWidth={3} />
            </div>
          )}

          {/* Pokemon Image */}
          <Link
            href={isSelectionMode ? "#" : `/pokemon/${pokemon.id}`}
            onClick={(e) => isSelectionMode && e.preventDefault()}
            className="relative w-32 h-32 mb-3 cursor-pointer"
          >
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              className="object-contain hover:scale-110 transition-transform duration-200"
              sizes="128px"
              loading="lazy"
            />
          </Link>

          {/* Pokemon Info */}
          <div className="text-center w-full">
            <p className="text-gray-500 text-sm font-medium">
              {formatPokemonId(pokemon.id)}
            </p>
            <Link
              href={isSelectionMode ? "#" : `/pokemon/${pokemon.id}`}
              onClick={(e) => isSelectionMode && e.preventDefault()}
              className="block text-lg font-bold text-gray-900 hover:text-red-500 transition-colors capitalize mb-2"
            >
              {pokemon.name}
            </Link>

            {/* Types */}
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  className={`${POKEMON_TYPE_COLORS[type.type.name] || "bg-gray-400"} text-white border-0 capitalize`}
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>

            {/* Catch Button - Disabled in selection mode */}
            <Button
              onClick={handleToggle}
              variant={caught ? "default" : "outline"}
              size="sm"
              className="w-full"
              disabled={isSelectionMode}
            >
              {caught ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Libertar
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Capturar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
