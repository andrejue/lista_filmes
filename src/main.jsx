import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import "./App.css";
import Home from "./pages/Home";
import Search from "./components/search/Search";
import MovieInfo from "./components/movieinfo/MovieInfo";
import TvInfo from "./components/tvinfo/TvInfo";
import PageReload from "./components/PageReload";
import PersonInfo from "./components/people/PersonInfo";
import Genre from "./components/genres/Genre";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <PageReload />,
      },
      {
        path: "/movie/:id/:type",
        element: <MovieInfo />,
      },
      {
        path: "/tv/:id/:type",
        element: <TvInfo />,
      },
      {
        path: "/person/:id",
        element: <PersonInfo />,
      },
      {
        path: "/genre/:id/:type/:name",
        element: <Genre />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
