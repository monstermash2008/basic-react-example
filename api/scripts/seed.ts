import { db } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

type PokemonAPIResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: any;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
};

type GenerationAPIResponse = {
  id: number;
  name: string;
  pokemon_species: Array<{
    name: string;
    url: string;
  }>;
};

// Helper function to fetch data from PokeAPI
async function fetchFromPokeAPI(endpoint: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from PokeAPI: ${response.statusText}`);
  }
  return response.json();
}

// Helper function to extract ID from PokeAPI URL
function getIdFromUrl(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
}

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // First, seed generations (1-8)
    console.log("Seeding generations...");
    for (let i = 1; i <= 8; i++) {
      const genData = await fetchFromPokeAPI(`generation/${i}`);

      // Insert generation
      await db
        .insert(schema.generations)
        .values({
          id: i,
          name: genData.name,
        })
        .onConflictDoNothing();

      console.log(`Seeded generation ${i}: ${genData.name}`);
    }

    // Now seed Pokemon from all generations
    for (let gen = 1; gen <= 8; gen++) {
      console.log(`Fetching generation ${gen} Pokemon...`);
      const genData: GenerationAPIResponse = await fetchFromPokeAPI(
        `generation/${gen}`
      );

      // Sort Pokemon species by ID
      const sortedSpecies = [...genData.pokemon_species].sort(
        (a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url)
      );

      for (const species of sortedSpecies) {
        const pokemonId = getIdFromUrl(species.url);

        // Skip if we already have this Pokemon
        const existing = await db.query.pokemon.findFirst({
          where: eq(schema.pokemon.id, pokemonId),
        });

        if (existing) {
          console.log(
            `Pokemon #${pokemonId} (${species.name}) already exists, skipping...`
          );
          continue;
        }

        console.log(
          `Fetching data for Pokemon #${pokemonId} (${species.name})...`
        );

        try {
          const pokemonData: PokemonAPIResponse = await fetchFromPokeAPI(
            `pokemon/${pokemonId}`
          );

          // 1. Insert Pokemon base data
          await db.insert(schema.pokemon).values({
            id: pokemonId,
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            sprites: pokemonData.sprites,
          });

          // 2. Insert Pokemon-Generation relationship
          await db
            .insert(schema.pokemonGenerations)
            .values({
              pokemonId: pokemonId,
              generationId: gen,
            })
            .onConflictDoNothing();

          // 3. Insert types
          for (const typeData of pokemonData.types) {
            await db.insert(schema.pokemonTypes).values({
              pokemonId: pokemonId,
              typeName: typeData.type.name,
            });
          }

          // 4. Insert stats
          for (const statData of pokemonData.stats) {
            await db.insert(schema.pokemonStats).values({
              pokemonId: pokemonId,
              statName: statData.stat.name,
              baseStat: statData.base_stat,
            });
          }

          // 5. Insert abilities
          for (const abilityData of pokemonData.abilities) {
            await db.insert(schema.pokemonAbilities).values({
              pokemonId: pokemonId,
              abilityName: abilityData.ability.name,
              isHidden: abilityData.is_hidden,
            });
          }

          console.log(
            `Successfully seeded Pokemon #${pokemonId} (${pokemonData.name})`
          );
        } catch (err) {
          console.error(`Error seeding Pokemon #${pokemonId}:`, err);
        }

        // Add a small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Increased delay to be safer with rate limits
      }

      console.log(`Completed seeding generation ${gen}`);
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();
