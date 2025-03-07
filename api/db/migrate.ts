import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgres://pokemon:pokemon@localhost:5432/pokemon_db';

// For migrations, we need a separate client with max 1 connection
const migrationClient = postgres(connectionString, { max: 1 });

async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    // Create a Drizzle ORM instance for migrations
    const db = drizzle(migrationClient);
    
    // Run migrations from the migrations folder
    await migrate(db, { migrationsFolder: './db/migrations' });
    
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    // Close the migration client connection
    await migrationClient.end();
    process.exit(0);
  }
}

runMigrations();