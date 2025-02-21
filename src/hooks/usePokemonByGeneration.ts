import { useQuery } from "@tanstack/react-query";

type PokemonResource = {
  name: string;
  url: string;
};

type PokemonGeneration = {
  name: string;
  pokemon_species: PokemonWithID[];
};

type PokemonWithID = {
  name: string;
  id: number;
  image: string;
};

const fetchPokemonByGeneration = async (
  genNumber: number
): Promise<PokemonGeneration> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/generation/${genNumber}`
  );
  const data = await response.json();

  data.pokemon_species.sort((a: PokemonResource, b: PokemonResource) => {
    const aId = parseInt(a.url.split("/").slice(-2, -1)[0]);
    const bId = parseInt(b.url.split("/").slice(-2, -1)[0]);
    return aId - bId;
  });

  const pokemonWithIDs = data.pokemon_species.map(
    (pokemon: PokemonResource) => {
      const id = parseInt(pokemon.url.split("/").slice(-2, -1)[0]); // Extract ID from URL
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      return {
        name: pokemon.name,
        id,
        image,
      };
    }
  );

  return {
    name: data.name,
    pokemon_species: pokemonWithIDs,
  };
};

export const usePokemonByGeneration = (genNumber: number) => {
  return useQuery({
    queryKey: ["first-gen-pokemon", genNumber],
    queryFn: () => fetchPokemonByGeneration(genNumber),
  });
};
