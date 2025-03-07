import { useParams, useNavigate } from "react-router-dom";
import { usePokemonById } from "../hooks/usePokemonById";

// Type mapping for styling Pokemon type badges
const typeColorMap: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

// Function to format stat names
const formatStatName = (statName: string): string => {
  const statNameMap: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return statNameMap[statName] || statName.replace(/-/g, " ");
};

function Pokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = usePokemonById(Number(id));

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
          onClick={() => navigate(-1)}
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
      {/* Navigation */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          ← Back
        </button>
        <div className="text-sm text-[var(--text)] opacity-60">
          #{String(data.id).padStart(3, "0")}
        </div>
      </div>

      {/* Pokemon Card */}
      <div className="bg-[var(--sidebar)] rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 mb-4">
              <div className="absolute inset-0 bg-[var(--sidebar-hover)] rounded-full" />
              <img
                src={data.sprites.other["official-artwork"].front_default}
                alt={data.name}
                className="w-full h-full object-contain relative z-10"
              />
            </div>
            <h1 className="text-3xl font-bold capitalize mb-4">{data.name}</h1>
            <div className="flex gap-2">
              {data.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`${
                    typeColorMap[type.type.name]
                  } text-white px-3 py-1 rounded-full text-sm font-semibold`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Base Stats</h2>
            <div className="space-y-4">
              {data.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--text)]">
                      {formatStatName(stat.stat.name)}
                    </span>
                    <span className="text-sm font-medium text-[var(--text)]">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--background)] rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          (stat.base_stat / 255) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Physical</h3>
                <p className="text-[var(--text)] opacity-80">
                  Height: {data.height / 10}m
                </p>
                <p className="text-[var(--text)] opacity-80">
                  Weight: {data.weight / 10}kg
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Abilities</h3>
                <div className="space-y-1">
                  {data.abilities.map((ability) => (
                    <p
                      key={ability.ability.name}
                      className="text-[var(--text)] opacity-80 capitalize"
                    >
                      {ability.ability.name.replace("-", " ")}
                      {ability.is_hidden && (
                        <span className="text-sm text-blue-500 ml-2">
                          (Hidden)
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
