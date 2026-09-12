import {
  PokemonListItemDto,
  PokemonDetailResponseDto,
} from '../datasources/remote/poke-api.dto';
import { Pokemon } from '@domain/models/pokemon.model';
import { PokemonDetail } from '@domain/models/pokemon-detail.model';

export class PokemonMapper {
  static extractIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    const id = parseInt(lastPart, 10);
    return isNaN(id) ? 0 : id;
  }

  static getOfficialImgUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  static toDomain(dto: PokemonListItemDto): Pokemon {
    const id = this.extractIdFromUrl(dto.url);
    return {
      id,
      name: dto.name,
      imageUrl: this.getOfficialImgUrl(id), // agregamos url de la imagen del pokemon
    };
  }

  static detailToDomain(dto: PokemonDetailResponseDto): PokemonDetail {
    const fallbackImage = this.getOfficialImgUrl(dto.id);
    /*only 2 img */
    const candidates = [
      dto.sprites.other?.['official-artwork']?.front_default,
      dto.sprites.other?.home?.front_default,
    ].filter((url): url is string => Boolean(url && !url.endsWith('.svg')));

    const uniqueImages = Array.from(new Set(candidates));
    const images = uniqueImages.length > 0 ? uniqueImages : [fallbackImage];

    return {
      id: dto.id,
      name: dto.name,
      imageUrl: images[0],
      images,
      height: dto.height,
      weight: dto.weight,
      types: dto.types.map(t => t.type.name),
      abilities: dto.abilities.map(a => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })),
      stats: dto.stats.map(s => ({
        name: s.stat.name,
        baseStat: s.base_stat,
      })),
    };
  }
}
