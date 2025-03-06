import { Link, useParams, useNavigate } from "react-router-dom";
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
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  const formattedId = String(data?.id).padStart(3, "0");
  const officialArtwork =
    data?.sprites?.other?.["official-artwork"]?.front_default;

  return (
    <main className="w-full h-full p-2 md:p-4 flex flex-col max-w-6xl mx-auto">
      {/* Header with back button */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md transition duration-300 ease-in-out flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
        <div className="text-gray-500">#{formattedId}</div>
      </div>

      {/* Pokemon name */}
      <h1 className="text-3xl font-extrabold mb-2 capitalize text-center">
        {data?.name}
      </h1>

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Left column - Image and types */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100 rounded-full -z-10 transform scale-90 opacity-50 blur-md"></div>
            <img
              src={
                officialArtwork ||
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`
              }
              alt={data?.name}
              className="w-48 h-48 object-contain z-10"
            />
          </div>

          {/* Pokemon types */}
          <div className="flex gap-2 mt-2">
            {data?.types?.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`${
                  typeColorMap[typeInfo.type.name] || "bg-gray-400"
                } text-white px-3 py-1 rounded-full capitalize font-medium text-sm`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          {/* Basic info - moved from right column for better layout */}
          <div className="grid grid-cols-2 gap-3 w-full mt-3">
            <div className="bg-gray-50 p-2 rounded-lg text-center">
              <h2 className="text-xs text-gray-500">Height</h2>
              <p className="text-lg font-bold">{(data?.height || 0) / 10} m</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg text-center">
              <h2 className="text-xs text-gray-500">Weight</h2>
              <p className="text-lg font-bold">{(data?.weight || 0) / 10} kg</p>
            </div>
          </div>

          {/* Sprite variants */}
          <div className="w-full mt-3">
            <h2 className="text-lg font-bold mb-1">Sprites</h2>
            <div className="grid grid-cols-4 gap-1">
              {data?.sprites?.front_default && (
                <img
                  src={data.sprites.front_default}
                  alt={`${data.name} front`}
                  className="w-12 h-12 bg-gray-100 rounded-md"
                />
              )}
              {data?.sprites?.back_default && (
                <img
                  src={data.sprites.back_default}
                  alt={`${data.name} back`}
                  className="w-12 h-12 bg-gray-100 rounded-md"
                />
              )}
              {data?.sprites?.front_shiny && (
                <div className="relative">
                  <img
                    src={data.sprites.front_shiny}
                    alt={`${data.name} shiny`}
                    className="w-12 h-12 bg-gray-100 rounded-md"
                  />
                  <span className="absolute bottom-0 right-0 bg-yellow-400 text-xs px-0.5 rounded-sm text-[0.6rem]">
                    ✨
                  </span>
                </div>
              )}
              {data?.sprites?.back_shiny && (
                <div className="relative">
                  <img
                    src={data.sprites.back_shiny}
                    alt={`${data.name} shiny back`}
                    className="w-12 h-12 bg-gray-100 rounded-md"
                  />
                  <span className="absolute bottom-0 right-0 bg-yellow-400 text-xs px-0.5 rounded-sm text-[0.6rem]">
                    ✨
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Stats and details */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
          {/* Abilities */}
          <div>
            <h2 className="text-lg font-bold mb-1">Abilities</h2>
            <div className="flex flex-wrap gap-1">
              {data?.abilities?.map((abilityInfo) => (
                <span
                  key={abilityInfo.ability.name}
                  className={`bg-gray-200 px-2 py-0.5 rounded-lg text-xs capitalize ${
                    abilityInfo.is_hidden
                      ? "border border-dashed border-gray-400"
                      : ""
                  }`}
                >
                  {abilityInfo.ability.name.replace(/-/g, " ")}
                  {abilityInfo.is_hidden && (
                    <span className="text-xs ml-0.5">(hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1">Base Stats</h2>
            <div className="space-y-1.5">
              {data?.stats?.map((statInfo) => {
                const statName = formatStatName(statInfo.stat.name);
                const statValue = statInfo.base_stat;
                const statPercentage = Math.min(100, (statValue / 255) * 100);

                // Choose color based on stat value
                let statColor = "bg-red-500";
                if (statValue >= 80) statColor = "bg-green-500";
                else if (statValue >= 50) statColor = "bg-yellow-500";

                return (
                  <div key={statInfo.stat.name} className="flex items-center">
                    <div className="w-16 text-sm font-medium text-gray-700">
                      {statName}
                    </div>
                    <div className="w-10 text-center text-sm font-bold">
                      {statValue}
                    </div>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full ml-1">
                      <div
                        className={`h-full rounded-full ${statColor}`}
                        style={{ width: `${statPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Pokemon;
