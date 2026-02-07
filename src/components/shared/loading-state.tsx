import { Skeleton } from '@/components/ui/skeleton';

export function PokemonCardSkeleton() {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex flex-col items-center">
        <Skeleton className="w-32 h-32 rounded-full mb-3" />
        <Skeleton className="w-16 h-4 mb-2" />
        <Skeleton className="w-24 h-6 mb-2" />
        <div className="flex gap-1 mb-3">
          <Skeleton className="w-16 h-5 rounded-full" />
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <Skeleton className="w-full h-9" />
      </div>
    </div>
  );
}

export function PokemonGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PokemonTableSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {['#', 'Nome', 'Tipos', 'Altura', 'Peso', 'Ação'].map((header) => (
              <th key={header} className="px-4 py-3">
                <Skeleton className="w-16 h-4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }).map((_, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="w-12 h-4" />
                </div>
              </td>
              <td className="px-4 py-3"><Skeleton className="w-24 h-5" /></td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <Skeleton className="w-14 h-5 rounded-full" />
                </div>
              </td>
              <td className="px-4 py-3"><Skeleton className="w-12 h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-12 h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-24 h-8" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LoadingState({ mode = 'grid' }: { mode?: 'grid' | 'table' }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="w-32 h-8" />
        <Skeleton className="w-24 h-10" />
      </div>
      {mode === 'grid' ? <PokemonGridSkeleton /> : <PokemonTableSkeleton />}
    </div>
  );
}
