import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieCard from "../moviecard/MovieCard";
import SerieCard from "../seriecard/SerieCard";

const findByGenreUrl = "https://api.themoviedb.org/3/discover/";
const apiKey = import.meta.env.VITE_API_KEY;

export default function Genre() {
  const { id, type, name } = useParams();

  const [items, setItems] = useState([]);

  const getPersonInfo = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      setItems(data.results);
    } catch (error) {
      console.error("ERROR getPersonInfo:", error);
    }
  };

  useEffect(() => {
    const url = `${findByGenreUrl}${type}?${apiKey}&with_genres=${id}`;

    console.log(url);
    getPersonInfo(url);
  }, []);

  return (
    <main className="home__container">
      <div>
        {type === "movie" && (
          <MovieCard
            movies={items}
            title={`Movies search results to ${name}:`}
          />
        )}
        {type === "tv" && (
          <SerieCard series={items} title={`TV Series results to ${name}`} />
        )}
      </div>
    </main>
  );
}
