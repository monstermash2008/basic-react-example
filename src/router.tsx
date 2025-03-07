import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AllPokemon from "./pages/AllPokemon";
import PokemonDetails from "./pages/Pokemon";
import RootLayout from "./layouts/RootLayout";
import PokemonListLayout from "./layouts/PokemonListLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "pokemon",
        element: <PokemonListLayout />,
        children: [
          { path: "", element: <AllPokemon /> },
        ],
      },
      { path: "pokemon/:id", element: <PokemonDetails /> },
      { path: "*", element: <div>404!</div> },
    ],
  },
]);
