import { IPokemonRepository } from '../../domain/repositories/pokemon.repository.interface';
import { PokemonDetail } from '../../domain/models/pokemon-detail.model';

export class GetPokemonDetailUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: number): Promise<PokemonDetail> {
    if (!id || id <= 0) {
      throw new Error('Se requiere un ID de Pokémon válido mayor a 0');
    }
    return this.pokemonRepository.getPokemonDetail(id);
  }
}
