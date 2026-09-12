import React from 'react';
import { screen, fireEvent } from '@testing-library/react-native';
import { PokemonCard } from '../../src/presentation/components/PokemonCard';
import { RenderHelper } from '../../test-utils/RenderHelper';

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    imageUrl: 'https://example.com/pikachu.png',
  };

  it('debe renderizar el nombre capitalizado y el ID formateado correctamente', async () => {
    const { getByText } = await RenderHelper(
      <PokemonCard pokemon={mockPokemon} onPress={jest.fn()} />,
    );

    expect(getByText(/pikachu/i)).toBeTruthy();
    expect(getByText('#025')).toBeTruthy();
  });

  it('debe invocar onPress al presionar la tarjeta', async () => {
    const handlePress = jest.fn();
    await RenderHelper(
      <PokemonCard pokemon={mockPokemon} onPress={handlePress} />,
    );

    const card = screen.getByTestId('pokemon-card-25');
    fireEvent.press(card);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
