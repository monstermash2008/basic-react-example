// Types that will be shared between API and frontend

export type PokemonType = {
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
};

export type Pokemon = {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
};

export type PokemonResource = {
  name: string;
  url: string;
};

export type PokemonWithID = {
  name: string;
  id: number;
  image: string;
};

export type PokemonGeneration = {
  name: string;
  pokemon_species: PokemonWithID[];
};