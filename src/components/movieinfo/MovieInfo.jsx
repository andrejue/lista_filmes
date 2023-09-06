import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./MovieInfo.scss";

const findUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG_ORIGINAL;

export default function MovieInfo() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [movieImages, setMovieImages] = useState({});
  const [movieCredits, setMovieCredits] = useState({});

  const getMovieInfo = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovieInfo(data);
  };

  const getMovieImages = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data.logos);

      const enLogos = data.logos.filter((logo) => {
        return logo.iso_639_1 === "en";
      });

      console.log(enLogos);

      const smallestLogo = enLogos.reduce((smallest, img) => {
        return img.width < smallest.width ? img : smallest;
      });

      setMovieImages(smallestLogo);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const getMovieCredits = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setMovieCredits(data);
  };

  useEffect(() => {
    const url = `${findUrl}${id}?${apiKey}`;
    const movieImgUrl = `https://api.themoviedb.org/3/movie/${id}/images?${apiKey}`;
    const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=00c1947745acd4bb607e67032972980f`;

    getMovieImages(movieImgUrl);
    getMovieInfo(url);
    getMovieCredits(movieCreditsUrl);
  }, []);

  const {
    backdrop_path,
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

  const { cast, crew } = movieCredits;

  return (
    <main
      className="movie__info__container"
      style={{ backgroundImage: `url(${imgUrl}${backdrop_path})` }}
    >
      <div className="movie__info__card">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieImages.file_path}`}
          alt="Movie Logo"
          className="movie__logo"
        />
        <p>{release_date}</p>
        <p>{overview}</p>
      </div>
    </main>
  );
}
