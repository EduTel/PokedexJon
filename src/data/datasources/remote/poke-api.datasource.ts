import {
  PokemonListResponseDto,
  PokemonDetailResponseDto,
} from './poke-api.dto';

export class PokeApiDataSource {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  async fetchPokemonList(
    limit: number = 20,
    offset: number = 0,
  ): Promise<PokemonListResponseDto> {
    try {
      const response = await fetch(
        `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error en la PokéAPI: ${response.status} ${response.statusText}`,
        );
      }
      const data: PokemonListResponseDto = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Fallo al obtener la lista de Pokémon: ${error.message}`,
        );
      }
      throw new Error('Error desconocido de red al consultar PokéAPI');
    }
  }

  async fetchPokemonDetail(id: number): Promise<PokemonDetailResponseDto> {
    try {
      const response = await fetch(`${this.baseUrl}/pokemon/${id}`);
      if (!response.ok) {
        throw new Error(
          `Error en la PokéAPI: ${response.status} ${response.statusText}`,
        );
      }
      const data: PokemonDetailResponseDto = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Fallo al obtener el detalle del Pokémon: ${error.message}`,
        );
      }
      throw new Error(
        'Error desconocido de red al consultar el detalle en PokéAPI',
      );
    }
  }
}
