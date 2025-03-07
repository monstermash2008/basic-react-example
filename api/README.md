# Pokemon API

A custom Pokemon API built with Hono, Bun, and PostgreSQL to replace PokeAPI.

## Features

- Type-safe API built with TypeScript
- PostgreSQL database with Drizzle ORM
- Docker for local development
- Shared types between frontend and backend

## Setup and Installation

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Docker](https://www.docker.com/) installed

### Getting Started

1. Start the PostgreSQL database:

```bash
docker-compose up -d
```

2. Generate and run database migrations:

```bash
bun run db:generate
bun run db:migrate
```

3. Seed the database with Pokemon data:

```bash
bun run db:seed
```

4. Start the API server:

```bash
bun run dev
```

The API will be available at http://localhost:3000

## API Endpoints

- `GET /pokemon/:id`: Get Pokemon by ID
- `GET /generation/:id`: Get all Pokemon from a specific generation

## Environment Variables

- `PORT`: API server port (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string (default: postgres://pokemon:pokemon@localhost:5432/pokemon_db)

## Integration with Frontend

The API is designed to be type-safe with the frontend. Types are shared between the backend and frontend through the `api/types` folder. The frontend uses these types to ensure consistent data structures.
