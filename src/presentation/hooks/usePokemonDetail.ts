import { useQuery } from '@tanstack/react-query';
import { useContextApiServices } from '../../di/context';

export const usePokemonDetail = (idOrName: number | string) => {
  const { getPokemonDetailUseCase } = useContextApiServices();

  const {
    data: detail,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['pokemonDetail', idOrName],
    queryFn: () => getPokemonDetailUseCase.execute(idOrName),
    enabled: Boolean(idOrName),
  });

  return {
    detail: detail ?? null,
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : null,
    reload: refetch,
  };
};
