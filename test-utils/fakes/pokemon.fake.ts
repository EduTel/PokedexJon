import { IPokemonRepository } from '@domain/repositories/pokemon.repository.interface';
import { Pokemon } from '@domain/models/pokemon.model';
import { PokemonDetail } from '@domain/models/pokemon-detail.model';

export const fakePokemonList: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    imageUrl: 'https://example.com/1.png',
  },
  {
    id: 25,
    name: 'pikachu',
    imageUrl: 'https://example.com/25.png',
  },
];

export const fakePokemonDetail: PokemonDetail = {
  id: 25,
  name: 'pikachu',
  imageUrl: 'https://example.com/25.png',
  images: ['https://example.com/25.png', 'https://example.com/25-artwork.png'],
  height: 4,
  weight: 60,
  types: ['electric'],
  abilities: [{ name: 'static', isHidden: false }],
  stats: [
    { name: 'hp', baseStat: 35 },
    { name: 'speed', baseStat: 90 },
  ],
};

export const mockPokemonRepository: jest.Mocked<IPokemonRepository> = {
  getPokemonList: jest.fn().mockResolvedValue({
    pokemons: fakePokemonList,
    hasMore: false,
  }),
  getPokemonDetail: jest.fn().mockResolvedValue(fakePokemonDetail),
};
