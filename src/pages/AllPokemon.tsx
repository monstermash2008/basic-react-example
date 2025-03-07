import { Link, useOutletContext } from "react-router-dom";
import { usePokemonByGeneration } from "../hooks/usePokemonByGeneration";

interface PokemonLayoutContext {
  genNumber: number;
}

function AllPokemon() {
  const { genNumber } = useOutletContext<PokemonLayoutContext>();
  const { data, isFetching, error } = usePokemonByGeneration(genNumber);

  if (isFetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-bounce text-2xl font-bold text-blue-500">
          Loading Pokémon...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:border-red-800 dark:text-red-100"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );
  }

  if (!data?.pokemon_species || data.pokemon_species.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[var(--text)] opacity-60 text-xl">
          No Pokémon found
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
        {data.pokemon_species.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}?gen=${genNumber}`}
            className="group block bg-[var(--sidebar)] p-4 border border-[var(--sidebar-hover)] rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <div className="aspect-square flex items-center justify-center bg-[var(--sidebar-hover)] rounded-lg mb-3 group-hover:bg-blue-50/10 transition-colors duration-200">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div className="text-center">
              <span className="text-sm text-[var(--text)] opacity-60 font-medium">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              <h2 className="capitalize font-semibold text-[var(--text)] group-hover:text-blue-500 transition-colors duration-200">
                {pokemon.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllPokemon;
