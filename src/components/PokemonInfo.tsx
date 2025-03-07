import { PokemonAbility } from "../hooks/usePokemonById";

interface PokemonInfoProps {
  height: number;
  weight: number;
  abilities: PokemonAbility[];
}

export function PokemonInfo({ height, weight, abilities }: PokemonInfoProps) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Physical</h3>
        <p className="text-[var(--text)] opacity-80">Height: {height / 10}m</p>
        <p className="text-[var(--text)] opacity-80">Weight: {weight / 10}kg</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Abilities</h3>
        <div className="space-y-1">
          {abilities.map((ability) => (
            <p
              key={ability.ability.name}
              className="text-[var(--text)] opacity-80 capitalize"
            >
              {ability.ability.name.replace("-", " ")}
              {ability.is_hidden && (
                <span className="text-sm text-blue-500 ml-2">(Hidden)</span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
