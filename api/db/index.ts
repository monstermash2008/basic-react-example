import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Database connection string - prefer Neon URL in production
const connectionString =
  process.env.NEON_DATABASE_URL ||
  process.env.DATABASE_URL ||
  "postgres://pokemon:pokemon@localhost:5432/pokemon_db";

// Configure postgres client with SSL for Neon and production
const client = postgres(connectionString, {
  ssl: process.env.NEON_DATABASE_URL ? { rejectUnauthorized: true } : false,
});

// Create drizzle database instance
export const db = drizzle(client, { schema });