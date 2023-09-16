import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../moviecard/MovieCard";
import Loader from "../loader/Loader";
import InputSearch from "./InputSearch";
import PeopleCard from "../people/PeopleCard";

const searchUrl = import.meta.env.VITE_MULTI_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Search() {
  const [searchParams] = useSearchParams();

  const [results, setResults] = useState([]);
  const [people, setPeople] = useState([]);
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

  const getResults = async (page) => {
    try {
      const url = `${searchUrl}?${apiKey}&query=${query}&language=en-US&page=${page}`;

      const res = await fetch(url);
      const data = await res.json();

      setResults((prevResults) => [...prevResults, ...data.results]);

      data.results.map((result) => {
        if (result.media_type === "person") {
          setPeople((prevPeople) => [...prevPeople, result]);
        }
      });
    } catch (error) {
      console.error("GET RESULTS ERROR:", error);
    }
  };

  useEffect(() => {
    const searchResultsUrl = `${searchUrl}?${apiKey}&query=${query}`;

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

  return (
    <main className="home__container">
      <InputSearch />
      {results.length === 0 && <Loader />}
      {results.length > 0 && (
        <div>
          <MovieCard
            movies={results}
            title={`Movies search results to ${query}:`}
          />
          <PeopleCard
            people={people}
            title={`People search results to ${query}:`}
          />
        </div>
      )}
    </main>
  );
}
