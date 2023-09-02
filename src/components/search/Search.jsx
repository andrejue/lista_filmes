import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../moviecard/MovieCard";

import { AiFillStar } from "react-icons/ai";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    const searchMoviesUrl = `${searchUrl}?${apiKey}&query=${query}`;
    console.log(searchMoviesUrl);

    getSearchMovies(searchMoviesUrl);
  }, [query]);

  console.log(movies);

  return (
    <div>
      {movies.length === 0 && <p>Loading movies...</p>}
      {movies.length > 0 && (
        <MovieCard movies={movies} title={`Search results to ${query}`} />
      )}
    </div>
  );
}
