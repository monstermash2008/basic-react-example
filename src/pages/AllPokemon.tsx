import { Link, useSearchParams } from "react-router-dom";
import { usePokemonByGeneration } from "../hooks/usePokemonByGeneration";

// Generation info for enhanced dropdown
const generationInfo = [
  { number: 1, region: "Kanto", years: "1996-1999", count: 151, color: "from-red-500 to-blue-500" },
  { number: 2, region: "Johto", years: "1999-2002", count: 100, color: "from-gold-500 to-silver-500" },
  { number: 3, region: "Hoenn", years: "2002-2006", count: 135, color: "from-red-500 to-green-500" },
  { number: 4, region: "Sinnoh", years: "2006-2010", count: 107, color: "from-blue-500 to-pink-500" },
  { number: 5, region: "Unova", years: "2010-2013", count: 156, color: "from-black-500 to-white-500" },
  { number: 6, region: "Kalos", years: "2013-2016", count: 72, color: "from-blue-400 to-red-400" },
  { number: 7, region: "Alola", years: "2016-2019", count: 88, color: "from-yellow-400 to-purple-400" },
  { number: 8, region: "Galar", years: "2019-2022", count: 96, color: "from-blue-600 to-red-600" }
];

function AllPokemon() {
  const [searchParams, setSearchParams] = useSearchParams();
  const genNumber = Number(searchParams.get("gen")) || 1;

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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );
  }

  if (!data?.pokemon_species || data.pokemon_species.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500 text-xl">No Pokémon found</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 bg-white z-10 pb-4 shadow-sm">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center md:text-left">Pokémon By Generation</h1>
          
          {/* Enhanced Generation Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {generationInfo.map((gen) => (
              <button
                key={gen.number}
                onClick={() => setSearchParams({ gen: gen.number.toString() })}
                className={`relative group p-3 rounded-lg transition-all duration-200 ${
                  genNumber === gen.number
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ring-2 ring-blue-500 ring-offset-2"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-blue-500"
                }`}
              >
                <div className="text-center">
                  <div className="font-bold mb-1">Gen {gen.number}</div>
                  <div className={`text-xs ${genNumber === gen.number ? "text-blue-100" : "text-gray-500"}`}>
                    {gen.region}
                  </div>
                </div>
                {/* Info tooltip on hover */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 hidden group-hover:block">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
                    <div className="font-semibold">{gen.region} Region</div>
                    <div>{gen.years}</div>
                    <div>{gen.count} Pokémon</div>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="border-solid border-t-gray-800 border-t-8 border-x-transparent border-x-8 border-b-0 h-0 w-0 mx-auto"></div>
                </div>
              </button>
            ))}
          </div>

          {/* Pokemon count indicator */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            Showing {data.pokemon_species.length} Pokémon from the {generationInfo[genNumber - 1].region} region
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-2">
          {data.pokemon_species.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.id}`}
              className="group block bg-white p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg mb-3 group-hover:bg-blue-50 transition-colors duration-200">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-500 font-medium">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
                <h2 className="capitalize font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {pokemon.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPokemon;
