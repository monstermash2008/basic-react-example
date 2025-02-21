import { useQuery } from "@tanstack/react-query";

type Pokemon = {
  name: string;
  id: number;
  height: number;
  weight: number;
  abilities: Ability[];
};

type Ability = {
  name: string;
  url: string;
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
