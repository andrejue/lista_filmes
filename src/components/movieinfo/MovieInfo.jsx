import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LiaImdb } from "react-icons/lia";

import "./MovieInfo.scss";

const findUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG_ORIGINAL;

export default function MovieInfo() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieImages, setMovieImages] = useState({});
  const [movieCredits, setMovieCredits] = useState({});

  const getMovieInfo = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const { genres } = data;
      console.log(genres);

      const genresDiv = genres.map((genre) => {
        return (
          <div className="genre" key={genre.id}>
            {genre.name}
          </div>
        );
      });
      setMovieGenre(genresDiv);
      setMovieInfo(data);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const getMovieImages = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const enLogos = data.logos.filter((logo) => {
        return logo.iso_639_1 === "en";
      });

      const smallestLogo = enLogos.reduce((smallest, img) => {
        return img.width < smallest.width ? img : smallest;
      });

      setMovieImages(smallestLogo);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const getMovieCredits = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const first3ActorsArray = data.cast.slice(0, 3);
      const first3Actors = first3ActorsArray.map((actor) => {
        return (
          <div className="actor" key={actor.id}>
            {actor.name}
          </div>
        );
      });
      setMovieActors(first3Actors);
      setMovieCredits(data);
    } catch (error) {
      console.error("ERROR:", error);
    }
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
  console.log(movieInfo);
  console.log(movieCredits.cast);

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
        <div className="movie__infos">
          <p>{runtime} min</p>
          <p>{release_date}</p>
          <p className="vote__average">
            {vote_average} <LiaImdb size={30} />
          </p>
        </div>
        <div className="genres">{movieGenre}</div>
        <div className="director">Director</div>
        <div className="cast">{movieActors}</div>

        <div className="overview">
          <p>{overview}</p>
        </div>
      </div>
    </main>
  );
}
