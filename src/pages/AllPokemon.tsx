import { Link, useSearchParams } from "react-router-dom";
import { usePokemonByGeneration } from "../hooks/usePokemonByGeneration";

function AllPokemon() {
  const [searchParams, setSearchParams] = useSearchParams();
  const genNumber = Number(searchParams.get("gen")) || 1;

  const { data, isFetching, error } = usePokemonByGeneration(genNumber);

  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!data?.pokemon_species || data.pokemon_species.length === 0) {
    return <div>No Pokemon found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon By Generation</h1>
      <select
        value={genNumber}
        onChange={(e) => {
          const newGen = Number(e.target.value);
          setSearchParams({ gen: newGen.toString() });
        }}
        className="mb-6 p-2 border border-gray-300 rounded-sm"
      >
        {[...Array(8)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            Generation {index + 1}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {data.pokemon_species.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-200"
          >
            <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg mb-2">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="text-center">
              <span className="text-gray-500">#{String(pokemon.id).padStart(3, "0")}</span>
              <h2 className="capitalize">{pokemon.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllPokemon;
