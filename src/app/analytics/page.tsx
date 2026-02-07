'use client';

import Link from 'next/link';
import { usePokedex } from '@/lib/hooks';
import { ProgressBar } from '@/components/pokedex/progress-bar';
import { calculateStats } from '@/lib/utils/analytics';
import { ArrowLeft, Trophy, Scale, Ruler, Zap, Shield, Swords } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { POKEMON_TYPE_COLORS } from '@/lib/types';
import { formatWeight, formatHeight } from '@/lib/utils/formatters';
import Image from 'next/image';

export default function AnalyticsPage() {
  const { caught, getCaughtByType } = usePokedex();
  const POKEDEX_MAX = 1000;
  
  const stats = calculateStats(caught, POKEDEX_MAX);
  const typeCounts = getCaughtByType();

  const StatCard = ({ icon: Icon, title, value, subtext }: { icon: React.ElementType, title: string, value: string | number, subtext?: string }) => (
    <Card>
      <CardContent className="p-6 flex items-center space-x-4">
        <div className="p-3 bg-red-100 rounded-full text-red-600">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
        </div>
      </CardContent>
    </Card>
  );

  const PokemonShowcase = ({ title, pokemon, metric, unit, icon: Icon }: { title: string, pokemon: { sprite: string, name: string, types: string[], weight?: number, height?: number } | null, metric: string | null, unit: string, icon: React.ElementType }) => {
    if (!pokemon) return null;
    return (
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 border-b py-3">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Icon className="w-4 h-4" /> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image 
                src={pokemon.sprite} 
                alt={pokemon.name} 
                fill 
                className="object-contain" 
              />
            </div>
            <div>
              <p className="font-bold capitalize">{pokemon.name}</p>
              <div className="flex gap-1">
                {pokemon.types.map((t: string) => (
                  <span key={t} className={`w-2 h-2 rounded-full ${POKEMON_TYPE_COLORS[t] || 'bg-gray-400'}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-red-600">{metric}</span>
            <span className="text-xs text-gray-500 ml-1">{unit}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
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
          Dashboard <span className="text-red-500">Analytics</span>
        </h1>
        <p className="mt-3 text-gray-500">
          Acompanhe o progresso da sua jornada Pokémon
        </p>
      </div>

      {/* Hero Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Progresso da Pokédex
          </h2>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {stats.completionPercentage.toFixed(1)}%
          </Badge>
        </div>
        <ProgressBar value={stats.totalCaught} max={stats.totalAvailable} />
        <p className="text-center mt-4 text-gray-500 text-sm">
          Você capturou <strong>{stats.totalCaught}</strong> de <strong>{stats.totalAvailable}</strong> Pokémon disponíveis.
          Faltam <strong>{stats.totalAvailable - stats.totalCaught}</strong> para completar a coleção!
        </p>
      </div>

      {caught.length > 0 ? (
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              icon={Swords} 
              title="Média de Ataque" 
              value={stats.avgAttack} 
              subtext="Pontos de força"
            />
            <StatCard 
              icon={Shield} 
              title="Média de Defesa" 
              value={stats.avgDefense} 
              subtext="Pontos de resistência"
            />
            <StatCard 
              icon={Zap} 
              title="Média de Vel." 
              value={stats.avgSpeed} 
              subtext="Agilidade média"
            />
            <StatCard 
              icon={Trophy} 
              title="Tipo Comum" 
              value={stats.mostCommonType.type} 
              subtext={`${stats.mostCommonType.count} capturados`}
            />
          </div>

          {/* Extremes Grid */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 px-1">Recordes da Coleção</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <PokemonShowcase 
              title="Mais Pesado" 
              pokemon={stats.heaviestPokemon} 
              metric={stats.heaviestPokemon && formatWeight(stats.heaviestPokemon.weight)} 
              unit=""
              icon={Scale}
            />
            <PokemonShowcase 
              title="Mais Leve" 
              pokemon={stats.lightestPokemon} 
              metric={stats.lightestPokemon && formatWeight(stats.lightestPokemon.weight)} 
              unit=""
              icon={Scale}
            />
            <PokemonShowcase 
              title="Mais Alto" 
              pokemon={stats.tallestPokemon} 
              metric={stats.tallestPokemon && formatHeight(stats.tallestPokemon.height)} 
              unit=""
              icon={Ruler}
            />
            <PokemonShowcase 
              title="Mais Baixo" 
              pokemon={stats.shortestPokemon} 
              metric={stats.shortestPokemon && formatHeight(stats.shortestPokemon.height)} 
              unit=""
              icon={Ruler}
            />
          </div>

          {/* Type Distribution - Simple Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(typeCounts)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10) // Top 10 types
                  .map(([type, count]) => (
                    <div key={type} className="flex items-center gap-4">
                      <div className="w-24 font-medium capitalize text-sm">{type}</div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${POKEMON_TYPE_COLORS[type] || 'bg-gray-400'}`}
                            style={{ width: `${(count / stats.totalCaught) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm text-gray-500">{count}</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-100">
          <p className="text-gray-500">Capture Pokémon para desbloquear estatísticas detalhadas!</p>
          <Link href="/">
            <div className="mt-4 inline-block text-red-500 font-medium hover:underline">
              Ir para a Pokédex
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
