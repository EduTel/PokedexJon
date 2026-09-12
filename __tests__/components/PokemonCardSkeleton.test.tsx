import React from 'react';
import { screen } from '@testing-library/react-native';
import {
  PokemonCardSkeleton,
  PokemonListSkeleton,
} from '../../src/presentation/components/PokemonCardSkeleton';
import { RenderHelper } from '../../test-utils/RenderHelper';

describe('PokemonCardSkeleton', () => {
  it('debe renderizar la tarjeta skeleton correctamente', async () => {
    await RenderHelper(<PokemonCardSkeleton />);
    expect(screen.getByTestId('pokemon-card-skeleton')).toBeTruthy();
  });

  it('debe renderizar el número de skeletons especificado en PokemonListSkeleton', async () => {
    await RenderHelper(<PokemonListSkeleton count={4} />);
    const skeletons = screen.getAllByTestId('pokemon-card-skeleton');
    expect(skeletons).toHaveLength(4);
  });
});
