import { useState, useEffect } from "react";
import MovieCard from "../components/moviecard/MovieCard";

const url = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
  const [bestMovies, setBestMovies] = useState([]);

  const getBestRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setBestMovies(data.results);
  };

  useEffect(() => {
    const bestRatedUrl = `${url}popular?${apiKey}`;

    getBestRatedMovies(bestRatedUrl);
  }, []);

  console.log(bestMovies);

  return (
    <div>
      <h1>Home here</h1>
      <p>url: {url}</p>
      <p>API key: {apiKey}</p>

      {bestMovies.lenght === 0 && <div>Loading movies...</div>}

      {bestMovies.length > 0 && <MovieCard movies={bestMovies} />}
    </div>
  );
}
