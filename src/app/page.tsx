import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchPokemonList } from '@/lib/services/pokemon.service';
import { HomeContent } from './home-content';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: () => fetchPokemonList(1000),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContent />
    </HydrationBoundary>
  );
}
