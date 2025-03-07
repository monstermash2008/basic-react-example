import { generationInfo } from "../data/generationInfo";

type GenerationHeaderProps = {
  genNumber: number;
  setSearchParams: (params: { gen: string }) => void;
  pokemonCount: number;
};

function GenerationHeader({
  genNumber,
  setSearchParams,
  pokemonCount,
}: GenerationHeaderProps) {
  return (
    <div className="sticky w-full top-0 bg-[var(--background)] z-10 pb-4 shadow-sm">
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-3xl font-bold text-center md:text-left">
          Pokémon By Generation
        </h1>

        {/* Enhanced Generation Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {generationInfo.map((gen) => (
            <button
              key={gen.number}
              onClick={() => setSearchParams({ gen: gen.number.toString() })}
              className={`relative group p-3 rounded-lg transition-all duration-200 ${
                genNumber === gen.number
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--background)]"
                  : "bg-[var(--sidebar)] hover:bg-[var(--sidebar-hover)] text-[var(--text)] border border-[var(--sidebar-hover)]"
              }`}
            >
              <div className="text-center">
                <div className="font-bold mb-1">Gen {gen.number}</div>
                <div
                  className={`text-xs ${
                    genNumber === gen.number
                      ? "text-blue-100"
                      : "text-[var(--text)] opacity-60"
                  }`}
                >
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
        <div className="text-sm text-[var(--text)] opacity-60 text-center md:text-left">
          Showing {pokemonCount} Pokémon from the{" "}
          {generationInfo[genNumber - 1].region} region
        </div>
      </div>
    </div>
  );
}

export default GenerationHeader;
