import { useQuery } from "@tanstack/react-query";

// Import types from our API
import type {
  Pokemon,
  PokemonType,
  PokemonStat,
  PokemonAbility
} from "../../api/types/pokemon";

// Re-export types for other components that might be using them
export type { PokemonType, PokemonStat, PokemonAbility, Pokemon };

// Always use the configured API URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon #${id}: ${response.statusText}`);
  }
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