import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiProvider } from '@/di/context';
import { ApiServices } from '@/di/types';
import { IPokemonRepository } from '@/domain/repositories/pokemon.repository.interface';
import { GetPokemonListUseCase } from '@/application/use-cases/get-pokemon-list.use-case';
import { GetPokemonDetailUseCase } from '@/application/use-cases/get-pokemon-detail.use-case';
import { theme } from '@/presentation/theme/theme';
import { mockPokemonRepository } from './fakes/pokemon.fake';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });

export const RenderHelper = (
  ui: React.ReactElement,
  customRepository: Partial<IPokemonRepository> = {},
  customQueryClient?: QueryClient,
) => {
  const queryClient = customQueryClient || createTestQueryClient();

  /*se crea un mock en lugar de mandar a llamar a pokemon.repository.impl*/
  const pokemonRepository: IPokemonRepository = {
    ...mockPokemonRepository,
    ...customRepository,
  };

  const apiServices: ApiServices = {
    pokemonRepository: pokemonRepository,
    getPokemonListUseCase: new GetPokemonListUseCase(pokemonRepository),
    getPokemonDetailUseCase: new GetPokemonDetailUseCase(pokemonRepository),
  };

  return render(
    <QueryClientProvider client={queryClient}>
      <ApiProvider service={apiServices}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>{ui}</PaperProvider>
        </SafeAreaProvider>
      </ApiProvider>
    </QueryClientProvider>,
  );
};
