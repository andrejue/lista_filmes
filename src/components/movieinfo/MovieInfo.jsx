import { useEffect, useState, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { LiaImdb } from "react-icons/lia";

import "./MovieInfo.scss";

const findUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG_ORIGINAL;

export default function MovieInfo() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState({});
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieDirector, setMovieDirector] = useState([]);
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
        if (logo.iso_639_1 === null) {
          return logo;
        } else {
          return logo.iso_639_1 === "en";
        }
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
      const director = data.crew.filter((director) => {
        if (director.job === "Director") {
          return director;
        }
      });

      console.log(director);
      const first3Actors = first3ActorsArray.map((actor) => {
        return (
          <div className="actor" key={actor.id}>
            {actor.name}
          </div>
        );
      });
      setMovieDirector(director[0]);
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

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);

      window.removeEventListener("load", handleLoad);
    }
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
  console.log(movieCredits.crew);
  console.log(movieImages);

  const { cast, crew } = movieCredits;

  return (
    <>
      {loading && (
        <div className="loading__spinner__div">
          <div className="loading__spinner"></div>
        </div>
      )}
      {!loading && (
        <main
          className="movie__info__container"
          style={{ backgroundImage: `url(${imgUrl}${backdrop_path})` }}
        >
          <div className="movie__info__card">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieImages.file_path}`}
              alt={`${title} Logo`}
              className="movie__logo"
            />
            <div className="movie__infos">
              <p>{runtime} min</p>
              {release_date && <p>{release_date.substring(0, 4)}</p>}
              {vote_average && (
                <p className="vote__average">
                  {vote_average.toFixed(1)} <LiaImdb size={40} />
                </p>
              )}
            </div>
            <div className="movie__data">
              <span>Genres</span>
              <div className="genres">{movieGenre}</div>
              <span>Directors</span>
              <div className="director">{movieDirector.name}</div>
              <span>Cast</span>
              <div className="cast">{movieActors}</div>
              <span>Summary</span>
              <div className="overview">
                <p>{overview}</p>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
