'use client';

import Link from 'next/link';
import { usePokedex } from '@/lib/hooks';

export function Header() {
  const { getCaughtCount } = usePokedex();
  const caughtCount = getCaughtCount();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Poké<span className="text-red-500">dex</span>
            </span>
          </Link>

          {/* Stats */}
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {caughtCount} capturados
              </span>
            </div>

            <Link
              href="/pokedex"
              className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
            >
              <span>Minha Pokédex</span>
              {caughtCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {caughtCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
