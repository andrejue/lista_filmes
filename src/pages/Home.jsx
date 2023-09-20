import { useState, useEffect } from "react";
import InputSearch from "../components/search/InputSearch";
import MovieCard from "../components/moviecard/MovieCard";
import SerieieCard from "../components/seriecard/SerieCard";
import Loader from "../components/loader/Loader";

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
    const bestRatedSeriesUrl = `https://api.themoviedb.org/3/tv/top_rated?${apiKey}`;

    console.log(bestRatedSeriesUrl);
    getBestRatedMovies(bestRatedMoviesUrl);
    getBestRatedSeries(bestRatedSeriesUrl);
  }, []);

  return (
    <main className="home__container">
      <InputSearch />
      {bestMovies.lenght === 0 && <Loader />}

      {bestMovies.length > 0 && (
        <MovieCard movies={bestMovies} title="Top Movies" type="1" />
      )}

      {bestSeries.lenght === 0 && <div>Loading series...</div>}

      {bestSeries.length > 0 && (
        <SerieieCard series={bestSeries} title="Top TV Series" type="2" />
      )}
    </main>
  );
}
