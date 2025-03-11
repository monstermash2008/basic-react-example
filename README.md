# Pokemon Explorer Application

A Pokemon exploration app built with React, TypeScript, and Vite, featuring a custom Pokemon API built with Hono, Bun, and PostgreSQL.

## Features

- Browse Pokemon by generation
- View detailed Pokemon information (stats, types, abilities)
- Custom Pokemon API with PostgreSQL database (supports both local and Neon)
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
- PostgreSQL for the database (via Docker or Neon)
- Drizzle ORM for database operations

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Docker](https://www.docker.com/) installed (only needed for local development)

### Database Configuration

Choose one of the following database options:

1. **Local Development (Default)**
   - Uses Docker PostgreSQL
   - No additional configuration needed
   - Great for development and testing

2. **Neon Cloud Database**
   - Sign up at https://neon.tech
   - Create a new project
   - Copy your connection string
   - Create `api/.env` with:
     ```
     NEON_DATABASE_URL=your_neon_connection_string
     ```

### Setup Steps

1. Install dependencies:
   ```bash
   bun install
   cd api && bun install && cd ..
   ```

2. Run the setup script:
   ```bash
   ./setup.sh
   ```
   This will:
   - Use Neon if configured, otherwise use local PostgreSQL
   - Set up the database and run migrations
   - Seed Pokemon data
   - Provide next steps

3. Start the API server:
   ```bash
   cd api && bun run dev
   ```

4. Start the frontend:
   ```bash
   bun run dev
   ```

## Environment Variables

### Frontend
- `VITE_API_URL` - API URL (default: http://localhost:3000)

### Backend
- `NEON_DATABASE_URL` - Neon PostgreSQL connection string (optional)
- `DATABASE_URL` - PostgreSQL connection string (defaults to local Docker setup)
- `PORT` - API server port (default: 3000)

## Development

### Working with the Database

Database commands (run from api/ directory):
```bash
bun run db:generate  # Generate new migrations
bun run db:migrate   # Apply migrations
bun run db:seed     # Seed database with Pokemon data
```

### Switching Database Environments

You can easily switch between environments:

1. To use Neon: Add NEON_DATABASE_URL to api/.env
2. To use local: Comment out or remove NEON_DATABASE_URL from api/.env

The application will automatically detect and use the appropriate configuration.