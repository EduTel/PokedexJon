import { createMMKV, type MMKV } from 'react-native-mmkv';
import { Pokemon } from '@domain/models/pokemon.model';
import { PokemonDetail } from '@domain/models/pokemon-detail.model';

export const storage = createMMKV({
  id: 'pokedex-storage',
});

export const STORAGE_KEYS = {
  POKEMON_LIST: 'cache_pokemon_list',
  POKEMON_DETAIL_PREFIX: 'cache_pokemon_detail_',
} as const;

export class MMKVStorageDataSource {
  private readonly mmkv: MMKV;

  constructor(customStorage?: MMKV) {
    this.mmkv = customStorage ?? storage;
  }

  savePokemonList(list: Pokemon[]): void {
    try {
      this.mmkv.set(STORAGE_KEYS.POKEMON_LIST, JSON.stringify(list));
    } catch (error) {
      console.warn('Error al guardar lista de Pokémon en MMKV:', error);
    }
  }

  appendPokemonList(newPokemons: Pokemon[]): void {
    try {
      const existing = this.getPokemonList() || [];
      const existingIds = new Set(existing.map(p => p.id));
      const filteredNew = newPokemons.filter(p => !existingIds.has(p.id));
      const combined = [...existing, ...filteredNew];
      this.savePokemonList(combined);
    } catch (error) {
      console.warn('Error al anexar lista de Pokémon en MMKV:', error);
    }
  }

  getPokemonList(): Pokemon[] | null {
    try {
      const data = this.mmkv.getString(STORAGE_KEYS.POKEMON_LIST);
      if (!data) return null;
      return JSON.parse(data) as Pokemon[];
    } catch (error) {
      console.warn('Error al leer lista de Pokémon de MMKV:', error);
      return null;
    }
  }

  savePokemonDetail(detail: PokemonDetail): void {
    try {
      const key = `${STORAGE_KEYS.POKEMON_DETAIL_PREFIX}${detail.id}`;
      this.mmkv.set(key, JSON.stringify(detail));
    } catch (error) {
      console.warn(
        `Error al guardar detalle de Pokémon #${detail.id} en MMKV:`,
        error,
      );
    }
  }

  getPokemonDetail(id: number): PokemonDetail | null {
    try {
      const key = `${STORAGE_KEYS.POKEMON_DETAIL_PREFIX}${id}`;
      const data = this.mmkv.getString(key);
      if (!data) return null;
      return JSON.parse(data) as PokemonDetail;
    } catch (error) {
      console.warn(`Error al leer detalle de Pokémon #${id} de MMKV:`, error);
      return null;
    }
  }

  clearCache(): void {
    this.mmkv.clearAll();
  }
}
