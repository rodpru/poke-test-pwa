'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  pokemon: {
    id: number;
    name: string;
    stats: { base_stat: number; stat: { name: string } }[];
  };
}

export function ShareButton({ pokemon }: ShareButtonProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const hp = pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat || 0;
  const attack = pokemon.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0;

  const shareData = {
    title: `${pokemon.name} #${pokemon.id}`,
    text: `Check out my ${pokemon.name}! HP: ${hp}, Attack: ${attack}`,
    url: typeof window !== 'undefined' ? `${window.location.origin}/pokemon/${pokemon.id}` : '',
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        addToast({
          title: 'Partilhado!',
          message: 'O link foi partilhado com sucesso.',
          variant: 'success',
        });
      } catch (error) {
        // User cancelled share
        if ((error as Error).name !== 'AbortError') {
          fallbackCopy();
        }
      }
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      addToast({
        title: 'Link copiado!',
        message: 'O link foi copiado para a área de transferência.',
        variant: 'success',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({
        title: 'Erro ao copiar',
        message: 'Não foi possível copiar o link.',
        variant: 'error',
      });
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="flex items-center space-x-2"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copiado!</span>
        </>
      ) : (
        <>
          {'share' in navigator ? <Share2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>Partilhar</span>
        </>
      )}
    </Button>
  );
}
