import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Database connection string
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://pokemon:pokemon@localhost:5432/pokemon_db";

// Create postgres client
const client = postgres(connectionString);

// Create drizzle database instance
export const db = drizzle(client, { schema });
