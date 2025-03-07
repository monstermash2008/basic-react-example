import { Link } from "react-router-dom";

function Home() {
  // Featured Pokemon IDs (some iconic Pokemon)
  const featuredPokemon = [
    { id: 25, name: "Pikachu" },
    { id: 1, name: "Bulbasaur" },
    { id: 4, name: "Charmander" },
    { id: 7, name: "Squirtle" },
  ];

  return (
    <div className="flex flex-col items-center min-h-full p-4 md:p-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
          Welcome to PokéExplorer
        </h1>
        <p className="text-lg mb-8">
          Discover and learn about all your favorite Pokémon across different
          generations. Browse through detailed information, stats, and more!
        </p>
        <Link
          to="/pokemon"
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
        >
          Explore Pokémon →
        </Link>
      </div>

      {/* Featured Pokemon Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Featured Pokémon
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredPokemon.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.id}`}
              className="group bg-[var(--sidebar)] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 bg-[var(--sidebar-hover)] rounded-full transform group-hover:scale-105 transition-transform duration-200" />
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-full h-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="text-sm text-[var(--text)] opacity-60">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              <h3 className="font-semibold text-lg group-hover:text-blue-500 transition-colors duration-200">
                {pokemon.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="w-full max-w-4xl mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, index) => (
            <Link
              key={index + 1}
              to={`/pokemon?gen=${index + 1}`}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <h3 className="text-xl font-bold mb-2">Generation {index + 1}</h3>
              <p className="text-blue-100 mb-4">
                {index === 0
                  ? "Explore the original 151 Pokémon that started it all!"
                  : "Discover the Gold and Silver era Pokémon and their unique abilities!"}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-200">
                Browse Generation {index + 1} →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* App Features */}
      <div className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <div className="text-blue-500 text-2xl mb-2">🔍</div>
          <h3 className="font-semibold mb-2">Detailed Info</h3>
          <p className="text-[var(--text)] opacity-60 text-sm">
            Get comprehensive details about each Pokémon's abilities, stats, and
            more
          </p>
        </div>
        <div className="text-center p-4">
          <div className="text-blue-500 text-2xl mb-2">⚡</div>
          <h3 className="font-semibold mb-2">All Generations</h3>
          <p className="text-[var(--text)] opacity-60 text-sm">
            Browse Pokémon from different generations with easy navigation
          </p>
        </div>
        <div className="text-center p-4">
          <div className="text-blue-500 text-2xl mb-2">📱</div>
          <h3 className="font-semibold mb-2">Responsive Design</h3>
          <p className="text-[var(--text)] opacity-60 text-sm">
            Access PokéExplorer on any device with our mobile-friendly interface
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
