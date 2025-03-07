import { Outlet, useSearchParams } from "react-router-dom";
import GenerationHeader from "../components/GenerationHeader";
import { usePokemonByGeneration } from "../hooks/usePokemonByGeneration";

export default function PokemonLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const genNumber = Number(searchParams.get("gen")) || 1;
  const { data } = usePokemonByGeneration(genNumber);

  return (
    <div className="h-full flex flex-col">
      <GenerationHeader
        genNumber={genNumber}
        setSearchParams={setSearchParams}
        pokemonCount={data?.pokemon_species?.length || 0}
      />
      <div className="flex-1 overflow-auto">
        <Outlet context={{ genNumber }} />
      </div>
    </div>
  );
}