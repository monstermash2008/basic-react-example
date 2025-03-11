# Pokemon API

A custom Pokemon API built with Hono, Bun, and PostgreSQL to replace PokeAPI.

## Features

- Type-safe API built with TypeScript
- Flexible PostgreSQL database with Drizzle ORM
  - Local development with Docker
  - Production-ready with Neon
- Shared types between frontend and backend

## Setup and Installation

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Docker](https://www.docker.com/) installed (only for local development)

### Database Configuration

Choose your database setup:

1. **Local Development (Default)**
   ```bash
   docker-compose up -d
   ```
   No additional configuration needed.

2. **Neon Cloud Database**
   - Sign up at https://neon.tech
   - Create a new project
   - Copy your connection string
   - Create `.env` with:
     ```
     NEON_DATABASE_URL=your_neon_connection_string
     ```

### Getting Started

1. Set up the database (see above options)

2. Generate and run migrations:
   ```bash
   bun run db:generate
   bun run db:migrate
   ```

3. Seed the database:
   ```bash
   bun run db:seed
   ```

4. Start the server:
   ```bash
   bun run dev
   ```

The API will be available at http://localhost:3000

## API Endpoints

- `GET /pokemon/:id`: Get Pokemon by ID
- `GET /generation/:id`: Get all Pokemon from a specific generation

## Environment Variables

- `NEON_DATABASE_URL`: Neon PostgreSQL connection string (optional)
- `DATABASE_URL`: PostgreSQL connection string (default: postgres://pokemon:pokemon@localhost:5432/pokemon_db)
- `PORT`: API server port (default: 3000)

## Database Features

- **Automatic Environment Detection**: The API automatically detects whether to use Neon or local PostgreSQL
- **SSL Support**: Automatically configures SSL for Neon connections
- **Migration Support**: Full database migration system with Drizzle
- **Type Safety**: Complete TypeScript integration with Drizzle ORM

## Development Workflow

### Switching Environments

1. To use Neon:
   - Add NEON_DATABASE_URL to .env
   - The API will automatically use SSL and connect to Neon

2. To use local PostgreSQL:
   - Comment out or remove NEON_DATABASE_URL
   - The API will use the local Docker database

### Database Commands

All commands work with both local and Neon setups:
```bash
bun run db:generate  # Generate new migrations
bun run db:migrate   # Apply migrations
bun run db:seed     # Seed database with Pokemon data
```

## Integration with Frontend

The API is designed to be type-safe with the frontend. Types are shared between the backend and frontend through the `api/types` folder.