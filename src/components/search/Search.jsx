import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../moviecard/MovieCard";
import SerieCard from "../seriecard/SerieCard";
import Loader from "../loader/Loader";
import PeopleCard from "../people/PeopleCard";

const searchUrl = import.meta.env.VITE_MULTI_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Search() {
  const [searchParams] = useSearchParams();

  const [results, setResults] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [people, setPeople] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get("q");
  console.log("QUERY --> ", query);

  const getSearchMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("entrou getSearchMovies", data);

      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("SEARCH MOVIES ERROR:", error);
    }
  };

  const getResults = async (page) => {
    try {
      const url = `${searchUrl}?${apiKey}&query=${query}&language=en-US&page=${page}`;

      const res = await fetch(url);
      const data = await res.json();
      console.log("entrou getResults", data);

      setResults((prevResults) => [...prevResults, ...data.results]);

      data.results.map((result) => {
        if (result.media_type === "person") {
          setPeople((prevPeople) => [...prevPeople, result]);
        }
        if (result.media_type === "movie") {
          setMovies((prevMovies) => [...prevMovies, result]);
        }
        if (result.media_type === "tv") {
          setSeries((prevSeries) => [...prevSeries, result]);
        }
      });
    } catch (error) {
      console.error("GET RESULTS ERROR:", error);
    }
  };

  useEffect(() => {
    const searchResultsUrl = `${searchUrl}?${apiKey}&query=${query}`;
    setTotalPages(0);
    setResults([]);
    setPeople([]);
    setMovies([]);

    getSearchMovies(searchResultsUrl);
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      for (let page = 1; page <= totalPages; page++) {
        await getResults(page);
      }
    };

    if (totalPages > 0) {
      fetchMovies();
    }
  }, [totalPages]);

  console.log("results", results);
  console.log("people: ", people);
  console.log("movies: ", movies);
  console.log("series: ", series);

  return (
    <main className="home__container">
      {results.length === 0 && <Loader />}
      {results.length > 0 && (
        <div>
          {movies.length > 0 && (
            <MovieCard
              movies={movies}
              title={`Movies search results to ${query}:`}
            />
          )}
          {series.length > 0 && (
            <SerieCard
              series={series}
              title={`TV Series results to ${query}`}
            />
          )}
          {people.length > 0 && (
            <PeopleCard
              people={people}
              title={`People search results to ${query}:`}
            />
          )}
        </div>
      )}
    </main>
  );
}
