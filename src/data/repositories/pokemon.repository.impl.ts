import {
  IPokemonRepository,
  PokemonListResult,
} from '@/domain/repositories/pokemon.repository.interface';
import { PokemonDetail } from '@/domain/models/pokemon-detail.model';
import { PokeApiDataSource } from '@/data/datasources/remote/poke-api.datasource';
import { MMKVStorageDataSource } from '@/data/datasources/local/mmkv-storage.datasource';
import { PokemonMapper } from '@/data/mappers/pokemon.mapper';

export class PokemonRepositoryImpl implements IPokemonRepository {
  constructor(
    private readonly remoteDataSource: PokeApiDataSource,
    private readonly localDataSource: MMKVStorageDataSource,
  ) {}

  async getPokemonList(
    limit: number = 20,
    offset: number = 0,
  ): Promise<PokemonListResult> {
    try {
      // 1. Intentamos obtener datos frescos de la PokéAPI con paginación
      const response = await this.remoteDataSource.fetchPokemonList(
        limit,
        offset,
      );
      const domainList = response.results.map(item =>
        PokemonMapper.toDomain(item),
      );
      const hasMore = Boolean(response.next);

      // 2. Persistimos incrementalmente en MMKV
      if (domainList.length > 0) {
        if (offset === 0) {
          this.localDataSource.savePokemonList(domainList);
        } else {
          this.localDataSource.appendPokemonList(domainList);
        }
      }

      return {
        pokemons: domainList,
        hasMore,
      };
    } catch (networkError) {
      // 3. Fallback a caché local persistido
      const cachedList = this.localDataSource.getPokemonList();
      if (cachedList && cachedList.length > 0) {
        const sliced = cachedList.slice(offset, offset + limit);
        const hasMoreCached = offset + limit < cachedList.length;
        return {
          pokemons: sliced.length > 0 ? sliced : offset === 0 ? cachedList : [],
          hasMore: hasMoreCached,
        };
      }

      throw networkError;
    }
  }

  async getPokemonDetail(id: number): Promise<PokemonDetail> {
    try {
      const response = await this.remoteDataSource.fetchPokemonDetail(id);
      const domainDetail = PokemonMapper.detailToDomain(response);

      this.localDataSource.savePokemonDetail(domainDetail);

      return domainDetail;
    } catch (networkError) {
      const cachedDetail = this.localDataSource.getPokemonDetail(id);
      if (cachedDetail) {
        return cachedDetail;
      }

      throw networkError;
    }
  }
}
