import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useContextApiServices } from '../../di/context';
import { useNetworkStatus } from './useNetworkStatus';

const PAGE_SIZE = 20;

export const usePokemonList = () => {
  const { getPokemonListUseCase } = useContextApiServices();
  const { isOffline } = useNetworkStatus();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: ({ pageParam = 0 }) =>
      getPokemonListUseCase.execute(PAGE_SIZE, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.reduce((acc, page) => acc + page.pokemons.length, 0);
    },
  });

  // Aplanar las páginas acumuladas en un único array continuo de Pokémon
  const pokemonList = useMemo(
    () => data?.pages.flatMap((page) => page.pokemons) ?? [],
    [data],
  );

  return {
    pokemonList,
    isLoading,
    isError,
    isEmpty: !isLoading && !isError && pokemonList.length === 0,
    errorMessage: error instanceof Error ? error.message : null,
    isRefreshing: isRefetching,
    isLoadingMore: isFetchingNextPage,
    hasMore: Boolean(hasNextPage),
    isOffline,
    reload: refetch,
    refresh: refetch,
    loadMore: () => {
      if (hasNextPage && !isFetchingNextPage && !isOffline) {
        fetchNextPage();
      }
    },
  };
};
