export type PokemonListItemDto = {
  name: string;
  url: string;
};

export type PokemonListResponseDto = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemDto[];
};

export type PokemonTypeDto = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonAbilityDto = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonStatDto = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonSpritesDto = {
  front_default?: string | null;
  other?: {
    dream_world?: {
      front_default?: string | null;
    };
    home?: {
      front_default?: string | null;
    };
    'official-artwork'?: {
      front_default?: string | null;
    };
  };
};

export type PokemonDetailResponseDto = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSpritesDto;
  types: PokemonTypeDto[];
  abilities: PokemonAbilityDto[];
  stats: PokemonStatDto[];
};
