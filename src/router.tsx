import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AllPokemon from "./pages/AllPokemon";
import Pokemon from "./pages/Pokemon";
import RootLayout from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pokemon", element: <AllPokemon /> },
      { path: "/pokemon/:id", element: <Pokemon /> },
      { path: "*", element: <div>404!</div> },
    ],
  },
]);
