import { useState, useEffect } from "react";
import MovieCard from "../components/moviecard/MovieCard";
import SerieieCard from "../components/seriecard/SerieCard";

const moviesUrl = import.meta.env.VITE_API_MOVIES;
const seriesUrl = import.meta.env.VITE_API_SERIES;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
  const [bestMovies, setBestMovies] = useState([]);
  const [bestSeries, setBestSeries] = useState([]);

  console.log(bestMovies);

  const getBestRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setBestMovies(data.results);
  };

  const getBestRatedSeries = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setBestSeries(data.results);
  };

  useEffect(() => {
    const bestRatedMoviesUrl = `${moviesUrl}popular?${apiKey}`;
    const bestRatedSeriesUrl = `${seriesUrl}popular?${apiKey}`;

    getBestRatedMovies(bestRatedMoviesUrl);
    getBestRatedSeries(bestRatedSeriesUrl);
  }, []);

  return (
    <main>
      {bestMovies.lenght === 0 && <div>Loading movies...</div>}

      {bestMovies.length > 0 && (
        <MovieCard movies={bestMovies} title="Top Movies" />
      )}

      {bestSeries.lenght === 0 && <div>Loading series...</div>}

      {bestSeries.length > 0 && <SerieieCard series={bestSeries} />}
    </main>
  );
}
