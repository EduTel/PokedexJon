import { useQuery } from '@tanstack/react-query';
import { useContextApiServices } from '../../di/context';

export const usePokemonDetail = (id: number) => {
  const { getPokemonDetailUseCase } = useContextApiServices();

  const {
    data: detail,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['pokemonDetail', id],
    queryFn: () => getPokemonDetailUseCase.execute(id),
    enabled: Boolean(id && id > 0),
  });

  return {
    detail: detail ?? null,
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : null,
    reload: refetch,
  };
};
