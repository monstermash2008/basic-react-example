#!/bin/bash
set -e

echo "🚀 Setting up Pokemon Application..."

# Step 1: Start the database
echo "📦 Starting PostgreSQL database with Docker..."
cd api
docker-compose up -d
echo "✅ PostgreSQL started successfully"

# Step 2: Generate and run database migrations
echo "🔄 Running database migrations..."
bun run db:generate
bun run db:migrate
echo "✅ Migrations completed successfully"

# Step 3: Seed the database
echo "🌱 Seeding database with Pokemon data..."
bun run db:seed
echo "✅ Database seeded successfully"

# Step 4: Instructions for starting the application
echo ""
echo "🎮 Setup complete! To start the application:"
echo ""
echo "1. Start the API server (in one terminal):"
echo "   cd api && bun run dev"
echo ""
echo "2. Start the frontend (in another terminal):"
echo "   bun run dev"
echo ""
echo "The API will be available at: http://localhost:3000"
echo "The frontend will be available at: http://localhost:5173"