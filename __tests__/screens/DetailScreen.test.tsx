import React from 'react';
import { screen, waitFor } from '@testing-library/react-native';
import { DetailScreen } from '@/presentation/screens/DetailScreen/DetailScreen';
import { RenderHelper } from '../../test-utils/RenderHelper';
import { fakePokemonDetail } from '../../test-utils/fakes/pokemon.fake';

const mockNavigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('DetailScreen Integration Test con RenderHelper y React Query', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });
  it('debe renderizar los detalles del Pokémon usando useQuery', async () => {
    await RenderHelper(
      <DetailScreen
        navigation={mockNavigation}
        route={{ params: { pokemonId: 25, pokemonName: 'pikachu' } } as any}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeTruthy();
      expect(screen.getByText('electric')).toBeTruthy();
      expect(screen.getByTestId('pokemon-image-slider')).toBeTruthy();
      expect(screen.getByTestId('pagination-dots')).toBeTruthy();
      expect(screen.getByTestId('slider-next-button')).toBeTruthy();
    });
  });

  it('debe renderizar imagen fija sin slider cuando solo tiene una imagen', async () => {
    await RenderHelper(
      <DetailScreen
        navigation={mockNavigation}
        route={{ params: { pokemonId: 1, pokemonName: 'bulbasaur' } } as any}
      />,
      {
        getPokemonDetail: jest.fn().mockResolvedValue({
          ...fakePokemonDetail,
          images: ['https://example.com/1.png'],
        }),
      },
    );

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-detail-image')).toBeTruthy();
      expect(screen.queryByTestId('pokemon-image-slider')).toBeNull();
    });
  });

  it('debe mostrar ErrorState cuando falla la carga del detalle', async () => {
    await RenderHelper(
      <DetailScreen
        navigation={mockNavigation}
        route={
          { params: { pokemonId: 999, pokemonName: 'desconocido' } } as any
        }
      />,
      {
        getPokemonDetail: jest
          .fn()
          .mockRejectedValue(new Error('No encontrado')),
      },
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeTruthy();
    });
  });
});
