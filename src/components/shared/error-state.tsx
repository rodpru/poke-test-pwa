import { AlertCircle, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const isOffline = error.message.includes('Network error') || 
                    error.message.includes('offline') ||
                    (typeof window !== 'undefined' && !navigator.onLine);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="rounded-full bg-red-100 p-4 mb-4">
        {isOffline ? (
          <WifiOff className="w-8 h-8 text-red-600" />
        ) : (
          <AlertCircle className="w-8 h-8 text-red-600" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {isOffline ? 'Estas offline' : 'Algo correu mal'}
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-4">
        {isOffline
          ? 'Verifica a tua ligacao a internet e tenta novamente.'
          : error.message || 'Nao foi possivel carregar os dados. Tenta novamente.'}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
