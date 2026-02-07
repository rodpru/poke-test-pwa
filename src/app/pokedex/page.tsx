'use client';

import Link from 'next/link';
import { usePokedex } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { POKEMON_TYPE_COLORS } from '@/lib/types';
import { formatPokemonId, formatHeight, formatWeight } from '@/lib/utils/formatters';
import { Trash2, Eye, Sparkles, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/components/ui/toast';


export default function PokedexPage() {
  const { caught, removePokemon, getCaughtCount, getCaughtByType } = usePokedex();
  const { addToast } = useToast();
  

  const handleRemove = (id: number, name: string) => {
    if (confirm(`Tem certeza que deseja libertar ${name}?`)) {
      removePokemon(id);
      addToast({
        title: 'Pokémon Libertado',
        message: `${name} foi removido da sua Pokédex.`,
        variant: 'info',
      });
    }
  };

  const caughtByType = getCaughtByType();
  const totalCaught = getCaughtCount();

  if (caught.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-red-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Minha <span className="text-red-500">Pokédex</span>
          </h1>
          <p className="mt-3 text-gray-500">
            Gerencie sua coleção de Pokémon capturados
          </p>
        </div>

        <div className="max-w-md mx-auto p-12 bg-white rounded-lg shadow-lg text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum Pokémon capturado
          </h2>
          <p className="text-gray-500 mb-6">
            Sua Pokédex está vazia. Capture seus primeiros Pokémon na página inicial!
          </p>
          <Link href="/">
            <Button className="bg-red-500 hover:bg-red-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Ir capturar Pokémon
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Home
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Minha <span className="text-red-500">Pokédex</span>
        </h1>
        <p className="mt-3 text-gray-500">
          Você capturou {totalCaught} Pokémon
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Por Tipo
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(caughtByType)
            .sort(([, a], [, b]) => b - a)
            .map(([type, count]) => (
              <Badge
                key={type}
                className={`${POKEMON_TYPE_COLORS[type] || 'bg-gray-400'} text-white border-0 capitalize`}
              >
                {type}: {count}
              </Badge>
            ))}
        </div>
      </div>

      {/* Pokemon List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Pokémon
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Tipos
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Altura
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Peso
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Capturado em
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {caught.map((pokemon) => (
                <tr key={pokemon.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={pokemon.sprite}
                          alt={pokemon.name}
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          {formatPokemonId(pokemon.id)}
                        </p>
                        <p className="font-medium text-gray-900 capitalize">
                          {pokemon.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {pokemon.types.map((type) => (
                        <Badge
                          key={type}
                          className={`${POKEMON_TYPE_COLORS[type] || 'bg-gray-400'} text-white border-0 capitalize text-xs`}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatHeight(pokemon.height)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatWeight(pokemon.weight)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(pokemon.caughtAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Link href={`/pokemon/${pokemon.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleRemove(pokemon.id, pokemon.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
