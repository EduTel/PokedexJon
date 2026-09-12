import { Pokemon } from '../models/pokemon.model';
import { PokemonDetail } from '../models/pokemon-detail.model';

export interface PokemonListResult {
  pokemons: Pokemon[];
  hasMore: boolean;
}

export interface IPokemonRepository {
  getPokemonList(limit?: number, offset?: number): Promise<PokemonListResult>;
  getPokemonDetail(idOrName: number | string): Promise<PokemonDetail>;
}
