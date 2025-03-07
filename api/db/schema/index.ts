import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  json,
  primaryKey,
} from "drizzle-orm/pg-core";

// Pokemon table schema
export const pokemon = pgTable("pokemon", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  height: integer("height").notNull(),
  weight: integer("weight").notNull(),
  sprites: json("sprites").notNull(),
});

// Pokemon types table schema
export const pokemonTypes = pgTable("pokemon_types", {
  id: serial("id").primaryKey(),
  pokemonId: integer("pokemon_id")
    .notNull()
    .references(() => pokemon.id),
  typeName: text("type_name").notNull(),
});

// Pokemon stats table schema
export const pokemonStats = pgTable("pokemon_stats", {
  id: serial("id").primaryKey(),
  pokemonId: integer("pokemon_id")
    .notNull()
    .references(() => pokemon.id),
  statName: text("stat_name").notNull(),
  baseStat: integer("base_stat").notNull(),
});

// Pokemon abilities table schema
export const pokemonAbilities = pgTable("pokemon_abilities", {
  id: serial("id").primaryKey(),
  pokemonId: integer("pokemon_id")
    .notNull()
    .references(() => pokemon.id),
  abilityName: text("ability_name").notNull(),
  isHidden: boolean("is_hidden").notNull().default(false),
});

// Generation table schema
export const generations = pgTable("generations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// Pokemon to generation mapping
export const pokemonGenerations = pgTable(
  "pokemon_generations",
  {
    pokemonId: integer("pokemon_id")
      .notNull()
      .references(() => pokemon.id),
    generationId: integer("generation_id")
      .notNull()
      .references(() => generations.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.pokemonId, table.generationId] }),
    };
  }
);
