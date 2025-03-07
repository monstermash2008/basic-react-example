import { useQuery } from "@tanstack/react-query";
import type { PokemonGeneration, PokemonResource, PokemonWithID } from "../../api/types/pokemon";

// Re-export types for components that might be using them
export type { PokemonGeneration, PokemonResource, PokemonWithID };

// Update to use our local API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const fetchPokemonByGeneration = async (
  genNumber: number
): Promise<PokemonGeneration> => {
  const response = await fetch(
    `${API_BASE_URL}/generation/${genNumber}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch generation ${genNumber}: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Our custom API already returns sorted Pokemon with proper IDs and images
  return data;
};

export const usePokemonByGeneration = (genNumber: number) => {
  return useQuery({
    queryKey: ["pokemon-by-generation", genNumber],
    queryFn: () => fetchPokemonByGeneration(genNumber),
  });
};
