# Pokemon Explorer Application

A Pokemon exploration app built with React, TypeScript, and Vite, featuring a custom Pokemon API built with Hono, Bun, and PostgreSQL.

## Features

- Browse Pokemon by generation
- View detailed Pokemon information (stats, types, abilities)
- Custom Pokemon API with PostgreSQL database
- Type-safe frontend and backend integration
- Responsive design with theme support

## Tech Stack

### Frontend
- React with TypeScript
- Vite as the build tool
- TanStack Query for data fetching
- React Router for navigation

### Backend
- Bun as the JavaScript runtime
- Hono as the web framework
- PostgreSQL for the database (via Docker)
- Drizzle ORM for database operations

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Docker](https://www.docker.com/) installed

### Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   cd api && bun install && cd ..
   ```

3. Run the setup script to initialize the database and seed it with Pokemon data:
   ```bash
   ./setup.sh
   ```

This script will:
- Start the PostgreSQL database via Docker
- Run database migrations
- Seed the database with Pokemon data
- Provide instructions for next steps

4. Start the API server (in one terminal):
   ```bash
   cd api && bun run dev
   ```

5. Start the frontend application (in another terminal):
   ```bash
   bun run dev
   ```

## API Endpoints

The custom Pokemon API provides endpoints that match the PokeAPI functionality used by the frontend:

- `GET /pokemon/:id` - Get detailed information about a Pokemon by ID
- `GET /generation/:id` - Get all Pokemon from a specific generation

## Environment Variables

- `VITE_API_URL` - URL for the API (default: http://localhost:3000)
- `PORT` - Port for the API server (default: 3000)
- `DATABASE_URL` - PostgreSQL connection string

## Project Structure

- `src/` - Frontend React application
- `api/` - Backend API with Hono and Bun
  - `db/` - Database schema and migrations
  - `types/` - Shared TypeScript types
  - `scripts/` - Utility scripts including database seeding

## Development

During development, you can make changes to both the frontend and backend code. The development servers support hot reloading, so changes will be reflected immediately.

### Working with the Database

To regenerate database migrations after schema changes:
```bash
cd api && bun run db:generate
```

To apply migrations:
```bash
cd api && bun run db:migrate
```

To reseed the database:
```bash
cd api && bun run db:seed
```
