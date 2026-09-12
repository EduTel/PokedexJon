import { PokeApiDataSource } from '../data/datasources/remote/poke-api.datasource';
import { MMKVStorageDataSource } from '../data/datasources/local/mmkv-storage.datasource';
import { PokemonRepositoryImpl } from '../data/repositories/pokemon.repository.impl';
import { GetPokemonListUseCase } from '../application/use-cases/get-pokemon-list.use-case';
import { GetPokemonDetailUseCase } from '../application/use-cases/get-pokemon-detail.use-case';
import { ApiServices } from './types';

// 1. Instanciamos las fuentes de datos (DataSources)
export const pokeApiDataSource = new PokeApiDataSource();
export const mmkvStorageDataSource = new MMKVStorageDataSource();

// 2. Inyectamos las fuentes de datos en la implementación del Repositorio
export const pokemonRepository = new PokemonRepositoryImpl(
  pokeApiDataSource,
  mmkvStorageDataSource,
);

export const getPokemonListUseCase = new GetPokemonListUseCase(
  pokemonRepository,
);
export const getPokemonDetailUseCase = new GetPokemonDetailUseCase(
  pokemonRepository,
);

export const apiServices: ApiServices = {
  pokemonRepository,
  getPokemonListUseCase,
  getPokemonDetailUseCase,
};
