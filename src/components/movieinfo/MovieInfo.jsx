import { useEffect, useState } from "react";
import { useParams } from "react-router";

const findUrl = import.meta.env.VITE_ID_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function MovieInfo() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState([]);

  const getMovieInfo = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovieInfo(data.results);
  };

  useEffect(() => {
    const url = `${findUrl}${id}?external_source=imdb_id?${apiKey}`;

    console.log(url);

    getMovieInfo(url);
  }, []);

  return <div>MovieInfo</div>;
}
