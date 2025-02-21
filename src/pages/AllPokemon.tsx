import { useState } from "react";
import { Link } from "react-router-dom";
import { usePokemonByGeneration } from "../hooks/usePokemonByGeneration";

function AllPokemon() {
  const [genNumber, setGenNumber] = useState(1);

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
        onChange={(e) => setGenNumber(Number(e.target.value))}
        className="mb-6 p-2 border border-gray-300 rounded-sm"
      >
        {[...Array(8)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            Generation {index + 1}
          </option>
        ))}
      </select>

      <ul className="grid grid-cols-3 gap-4">
        {data.pokemon_species.map((pokemon) => (
          <li
            className="h-44 w-full border border-gray-200 rounded-lg"
            key={pokemon.name}
          >
            <Link
              to={`/pokemon/${pokemon.id}`}
              className="w-full h-full p-4 flex flex-col items-center justify-center"
            >
              <span className="text-slate-700">
                {pokemon.id} - {pokemon.name}
              </span>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="flex object-scale-down"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllPokemon;
