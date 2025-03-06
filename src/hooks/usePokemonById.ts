import { useQuery } from "@tanstack/react-query";

type PokemonType = {
  type: {
    name: string;
    url: string;
  };
};

type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
};

type Pokemon = {
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

const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
};

export const usePokemonById = (id: number) => {
  return useQuery({
    queryKey: ["pokemon-by-id", id],
    queryFn: () => fetchPokemonById(id),
    enabled: !!id,
  });
};
