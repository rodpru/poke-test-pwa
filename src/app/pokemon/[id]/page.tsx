'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePokemonDetails } from '@/lib/hooks';
import { usePokedex } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PokemonStats, PokemonTotalStats } from '@/components/pokemon/pokemon-stats';
import { NoteEditor } from '@/components/pokedex/note-editor';
import { ShareButton } from '@/components/pokemon/share-button';
import { LoadingState, ErrorState } from '@/components/shared';
import { POKEMON_TYPE_COLORS } from '@/lib/types';
import { formatPokemonId, formatHeight, formatWeight } from '@/lib/utils/formatters';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Check, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface PokemonDetailsPageProps {
  params: { id: string };
}

export default function PokemonDetailsPage({ params }: PokemonDetailsPageProps) {
  const pokemonId = parseInt(params.id, 10);
  
  const { data: pokemon, isLoading, error } = usePokemonDetails(pokemonId);
  const { isCaught, addPokemon, removePokemon, caught, updateNote } = usePokedex();
  const { addToast } = useToast();

  const caughtPokemon = caught.find((p) => p.id === pokemonId);
  const caughtStatus = isCaught(pokemonId);

  const handleToggleCatch = () => {
    if (!pokemon) return;

    if (caughtStatus) {
      removePokemon(pokemonId);
      addToast({
        title: 'Pokémon Libertado',
        message: `${pokemon.name} foi removido da sua Pokédex.`,
        variant: 'info',
      });
    } else {
      addPokemon(pokemon);
      addToast({
        title: 'Pokémon Capturado!',
        message: `${pokemon.name} foi adicionado à sua Pokédex.`,
        variant: 'success',
      });
    }
  };

  const handleNoteSave = (note: string) => {
    if (caughtStatus) {
      updateNote(pokemonId, note);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingState mode="grid" />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorState error={error || new Error('Pokémon não encontrado')} />
      </div>
    );
  }

  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || 
                   pokemon.sprites.front_default;

  const prevId = pokemonId > 1 ? pokemonId - 1 : null;
  const nextId = pokemonId < 1025 ? pokemonId + 1 : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Home
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-8">
        {prevId ? (
          <Link href={`/pokemon/${prevId}`}>
            <Button variant="outline" className="flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
          </Link>
        ) : (
          <div />
        )}
        
        {nextId && (
          <Link href={`/pokemon/${nextId}`}>
            <Button variant="outline" className="flex items-center">
              Próximo
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src={imageUrl}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </CardContent>
          </Card>

          {/* Note Editor - Only if caught */}
          {caughtStatus && (
            <NoteEditor 
              note={caughtPokemon?.note} 
              onSave={handleNoteSave} 
            />
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <p className="text-gray-500 text-lg font-medium">
              {formatPokemonId(pokemon.id)}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 capitalize mt-1">
              {pokemon.name}
            </h1>
            
            {/* Types */}
            <div className="flex flex-wrap gap-2 mt-4">
              {pokemon.types.map((type: { type: { name: string } }) => (
                <Badge
                  key={type.type.name}
                  className={`${POKEMON_TYPE_COLORS[type.type.name] || 'bg-gray-400'} text-white border-0 capitalize text-base px-4 py-1`}
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Caught Date */}
          {caughtStatus && caughtPokemon && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
              <Sparkles className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm text-green-800 font-medium">Capturado!</p>
                <p className="text-xs text-green-600">
                  em {new Date(caughtPokemon.caughtAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          )}

          {/* Physical Stats */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informações
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Altura</p>
                  <p className="text-lg font-medium text-gray-900">
                    {formatHeight(pokemon.height)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Peso</p>
                  <p className="text-lg font-medium text-gray-900">
                    {formatWeight(pokemon.weight)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experiência Base</p>
                  <p className="text-lg font-medium text-gray-900">
                    {pokemon.base_experience || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipos</p>
                  <p className="text-lg font-medium text-gray-900 capitalize">
                    {pokemon.types.map((t: { type: { name: string } }) => t.type.name).join(', ')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base Stats */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Estatísticas Base
              </h2>
              <PokemonStats stats={pokemon.stats} />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <PokemonTotalStats stats={pokemon.stats} />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleToggleCatch}
              className={`flex-1 ${caughtStatus ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-500 hover:bg-red-600'}`}
              size="lg"
            >
              {caughtStatus ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Libertar Pokémon
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Capturar Pokémon
                </>
              )}
            </Button>
            
            <ShareButton pokemon={pokemon} />
          </div>
        </div>
      </div>
    </div>
  );
}
