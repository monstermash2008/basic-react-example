import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import {
  pokemon,
  pokemonTypes,
  pokemonStats,
  pokemonAbilities,
  generations,
  pokemonGenerations,
} from "./db/schema";
import { Pokemon, PokemonGeneration } from "./types/pokemon";

const app = new Hono();

// Add CORS middleware
app.use("/*", cors());

// Health check route
app.get("/", (c) => {
  return c.json({ status: "ok", message: "Pokemon API is running" });
});

// Get Pokemon by ID route
app.get("/pokemon/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }

  try {
    // Fetch base Pokemon data
    const pokemonData = await db.query.pokemon.findFirst({
      where: eq(pokemon.id, id),
    });

    if (!pokemonData) {
      return c.json({ error: "Pokemon not found" }, 404);
    }

    // Fetch Pokemon types
    const types = await db.query.pokemonTypes.findMany({
      where: eq(pokemonTypes.pokemonId, id),
    });

    // Fetch Pokemon stats
    const stats = await db.query.pokemonStats.findMany({
      where: eq(pokemonStats.pokemonId, id),
    });

    // Fetch Pokemon abilities
    const abilities = await db.query.pokemonAbilities.findMany({
      where: eq(pokemonAbilities.pokemonId, id),
    });

    // Format response to match expected Pokemon type
    const result: Pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      sprites: pokemonData.sprites as Pokemon["sprites"],
      types: types.map((type) => ({
        type: {
          name: type.typeName,
          url: `http://localhost:3000/type/${type.typeName}`,
        },
      })),
      stats: stats.map((stat) => ({
        base_stat: stat.baseStat,
        stat: {
          name: stat.statName,
        },
      })),
      abilities: abilities.map((ability) => ({
        ability: {
          name: ability.abilityName,
          url: `http://localhost:3000/ability/${ability.abilityName}`,
        },
        is_hidden: ability.isHidden,
      })),
    };

    return c.json(result);
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get Pokemon by Generation route
app.get("/generation/:id", async (c) => {
  const genNumber = parseInt(c.req.param("id"));
  if (isNaN(genNumber)) {
    return c.json({ error: "Invalid generation ID" }, 400);
  }

  try {
    // Fetch generation data
    const generationData = await db.query.generations.findFirst({
      where: eq(generations.id, genNumber),
    });

    if (!generationData) {
      return c.json({ error: "Generation not found" }, 404);
    }

    // Get all Pokemon IDs in this generation
    const genPokemon = await db.query.pokemonGenerations.findMany({
      where: eq(pokemonGenerations.generationId, genNumber),
    });

    const pokemonIds = genPokemon.map((p) => p.pokemonId);

    // Get Pokemon details
    const pokemonList = await Promise.all(
      pokemonIds.map(async (id) => {
        const pokemonData = await db.query.pokemon.findFirst({
          where: eq(pokemon.id, id),
        });

        if (!pokemonData) return null;

        return {
          name: pokemonData.name,
          id: pokemonData.id,
          image:
            (pokemonData.sprites as any).front_default ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
        };
      })
    );

    // Filter out any null values and sort by ID
    const validPokemon = pokemonList
      .filter((p) => p !== null)
      .sort((a, b) => (a?.id || 0) - (b?.id || 0));

    const result: PokemonGeneration = {
      name: generationData.name,
      pokemon_species: validPokemon as any,
    };

    return c.json(result);
  } catch (error) {
    console.error("Error fetching generation data:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Start the server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
