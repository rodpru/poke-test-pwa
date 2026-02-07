import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ 
  title = 'Nenhum resultado encontrado',
  description = 'Tente ajustar seus filtros ou critérios de busca.'
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <SearchX className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md">{description}</p>
    </div>
  );
}
