import { Link, useParams } from "react-router-dom";
import { usePokemonById } from "../hooks/usePokemonById";

function Pokemon() {
  const { id } = useParams();

  const { data, isFetching, error } = usePokemonById(Number(id));

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="w-full h-full p-8 flex flex-col">
      <Link
        to={"/pokemon"}
        className="bg-slate-500 text-white p-2 rounded-sm mb-8 w-fit"
      >
        Back
      </Link>
      <h1 className="text-3xl font-bold mb-6">{data?.name}</h1>
      <div className="flex justify-center px-8 gap-4">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`}
          alt={data?.name}
          className="w-48 h-48 border-2 border-gray-200 rounded-lg"
        />
        <div className="flex flex-col p-2 w-full gap-x-4 border-2 border-gray-200 rounded-lg">
          <div className="flex flex-col">
            <p>
              <strong>Height: </strong>
              {data?.height} m
            </p>
            <p>
              <strong>Weight: </strong>
              {data?.weight} kg
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Pokemon;
