import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AllPokemon from "./pages/AllPokemon";
import Pokemon from "./pages/Pokemon";
import RootLayout from "./layouts/RootLayout";
import PokemonLayout from "./layouts/PokemonLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "pokemon",
        element: <PokemonLayout />,
        children: [
          { path: "", element: <AllPokemon /> },
          { path: ":id", element: <Pokemon /> },
        ],
      },
      { path: "*", element: <div>404!</div> },
    ],
  },
]);
