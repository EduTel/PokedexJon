import { IPokemonRepository } from '../../domain/repositories/pokemon.repository.interface';
import { PokemonDetail } from '../../domain/models/pokemon-detail.model';

export class GetPokemonDetailUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(idOrName: number | string): Promise<PokemonDetail> {
    if (!idOrName) {
      throw new Error('Se requiere un ID o nombre de Pokémon válido');
    }
    return this.pokemonRepository.getPokemonDetail(idOrName);
  }
}
