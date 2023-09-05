import { useEffect, useState } from "react";
import { useParams } from "react-router";

const findUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG;

export default function MovieInfo() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});

  const getMovieInfo = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovieInfo(data);
    console.log(data);
  };

  useEffect(() => {
    const url = `${findUrl}${id}?${apiKey}`;

    getMovieInfo(url);
  }, []);

  const {
    genres,
    imdb_id,
    overview,
    poster_path,
    production_companies,
    release_date,
    runtime,
    tagline,
    title,
    vote_average,
  } = movieInfo;

  return (
    <div className="movie__info__container">
      <h1>{title}</h1>
      <img src={`${imgUrl}${poster_path}`} alt="" />
      <p>{release_date}</p>
      <p>{overview}</p>
    </div>
  );
}
