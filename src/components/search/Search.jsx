import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../moviecard/MovieCard";
import Loader from "../loader/Loader";
import InputSearch from "./InputSearch";

const searchUrl = import.meta.env.VITE_MULTI_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get("q");

  const getSearchMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("SEARCH MOVIES ERROR:", error);
    }
  };

  const getMovies = async (page) => {
    try {
      const url = `${searchUrl}?${apiKey}&query=${query}&language=en-US&page=${page}`;

      const res = await fetch(url);
      const data = await res.json();

      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error("GET MOVIES ERROR:", error);
    }
  };

  console.log(movies);

  useEffect(() => {
    const searchMoviesUrl = `${searchUrl}?${apiKey}&query=${query}`;
    console.log(searchMoviesUrl);

    getSearchMovies(searchMoviesUrl);
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      for (let page = 1; page <= totalPages; page++) {
        await getMovies(page);
      }
    };

    if (totalPages > 0) {
      fetchMovies();
    }
  }, [totalPages]);

  return (
    <main className="home__container">
      <InputSearch />
      {movies.length === 0 && <Loader />}
      {movies.length > 0 && (
        <MovieCard movies={movies} title={`Search results to ${query}:`} />
      )}
    </main>
  );
}
