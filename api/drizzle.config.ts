import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dbCredentials: {
    url:
      process.env.NEON_DATABASE_URL ||
      process.env.DATABASE_URL ||
      "postgres://pokemon:pokemon@localhost:5432/pokemon_db",
  },
} satisfies Config;
