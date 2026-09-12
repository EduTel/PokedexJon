import { IPokemonRepository } from '../domain/repositories/pokemon.repository.interface';
import { GetPokemonListUseCase } from '../application/use-cases/get-pokemon-list.use-case';
import { GetPokemonDetailUseCase } from '../application/use-cases/get-pokemon-detail.use-case';

export interface ApiServices {
  pokemonRepository: IPokemonRepository;
  getPokemonListUseCase: GetPokemonListUseCase;
  getPokemonDetailUseCase: GetPokemonDetailUseCase;
}

