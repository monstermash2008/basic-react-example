import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql", // Required field now
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgres://pokemon:pokemon@localhost:5432/pokemon_db",
  },
} satisfies Config;
