import {
  IPokemonRepository,
  PokemonListResult,
} from '@/domain/repositories/pokemon.repository.interface';

export class GetPokemonListUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(
    limit: number = 20,
    offset: number = 0,
  ): Promise<PokemonListResult> {
    return this.pokemonRepository.getPokemonList(limit, offset);
  }
}
