import React from 'react';
import { screen, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '@/presentation/screens/HomeScreen/HomeScreen';
import { RenderHelper } from '../../test-utils/RenderHelper';

const mockNavigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('HomeScreen Integration Test con RenderHelper', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });
  it('debe renderizar el listado de Pokémon inyectando datos mockeados en el ApiProvider', async () => {
    await RenderHelper(
      <HomeScreen navigation={mockNavigation} route={{} as any} />,
    );

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeTruthy();
      expect(screen.getByText(/pikachu/i)).toBeTruthy();
    });
  });

  it('debe mostrar ErrorState cuando el repositorio inyectado falla', async () => {
    await RenderHelper(
      <HomeScreen navigation={mockNavigation} route={{} as any} />,
      {
        getPokemonList: jest
          .fn()
          .mockRejectedValue(new Error('Fallo de conexión')),
      },
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeTruthy();
    });
  });
});
