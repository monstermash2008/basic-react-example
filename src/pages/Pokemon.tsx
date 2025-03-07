import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { usePokemonById } from "../hooks/usePokemonById";
import { PokemonHeader } from "../components/PokemonHeader";
import { PokemonImage } from "../components/PokemonImage";
import { PokemonStats } from "../components/PokemonStats";
import { PokemonInfo } from "../components/PokemonInfo";

function Pokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const genNumber = searchParams.get("gen") || "1";
  const { data, isFetching, error } = usePokemonById(Number(id));

  const handleBack = () => {
    navigate(`/pokemon?gen=${genNumber}`);
  };

  if (isFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-bounce text-2xl font-bold text-blue-500">
          Loading Pokémon...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full p-4 flex flex-col items-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:border-red-800 dark:text-red-100"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
        <button
          onClick={handleBack}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container mx-auto p-4">
      <PokemonHeader id={data.id} onBack={handleBack} />

      <div className="bg-[var(--sidebar)] rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PokemonImage
            name={data.name}
            types={data.types}
            imageUrl={data.sprites.other["official-artwork"].front_default}
          />

          <div>
            <PokemonStats stats={data.stats} />
            <PokemonInfo
              height={data.height}
              weight={data.weight}
              abilities={data.abilities}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
