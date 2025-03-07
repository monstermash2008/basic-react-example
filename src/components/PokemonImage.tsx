import { PokemonType } from "../hooks/usePokemonById";
import { typeColorMap } from "../utils/pokemonUtils";

interface PokemonImageProps {
  name: string;
  types: PokemonType[];
  imageUrl: string;
}

export function PokemonImage({ name, types, imageUrl }: PokemonImageProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-4">
        <div className="absolute inset-0 bg-[var(--sidebar-hover)] rounded-full" />
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain relative z-10"
        />
      </div>
      <h1 className="text-3xl font-bold capitalize mb-4">{name}</h1>
      <div className="flex gap-2">
        {types.map((type) => (
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
  );
}
