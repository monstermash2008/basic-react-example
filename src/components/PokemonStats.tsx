import { PokemonStat } from "../hooks/usePokemonById";
import { formatStatName } from "../utils/pokemonUtils";

interface PokemonStatsProps {
  stats: PokemonStat[];
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Base Stats</h2>
      <div className="space-y-4">
        {stats.map((stat) => (
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
                  width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
