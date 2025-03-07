interface PokemonHeaderProps {
  id: number;
  onBack: () => void;
}

export function PokemonHeader({ id, onBack }: PokemonHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <button
        onClick={onBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        ← Back
      </button>
      <div className="text-sm text-[var(--text)] opacity-60">
        #{String(id).padStart(3, "0")}
      </div>
    </div>
  );
}
