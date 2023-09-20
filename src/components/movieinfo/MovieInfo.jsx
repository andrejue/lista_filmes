import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LiaImdb } from "react-icons/lia";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

import "./MovieInfo.scss";
import Loader from "../loader/Loader";

const findUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG_ORIGINAL;

export default function MovieInfo() {
  const { id, type } = useParams();

  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState({});
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieDirector, setMovieDirector] = useState([]);
  const [movieImages, setMovieImages] = useState({});
  const [movieVideos, setMovieVideos] = useState([]);
  const [trailerIsPlaying, setTrailerIsPlaying] = useState(false);

  const getMovieInfo = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const { genres } = data;

      const genresDiv = genres.map((genre) => {
        return (
          <Link
            to={`/genre/${genre.id}/movie/${genre.name}`}
            className="genre"
            key={genre.id}
          >
            {genre.name}
          </Link>
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

      console.log(data);

      if (data.logos.length === 0) {
        setLoading(false);
        return null;
      } else {
        const smallestLogo = data.logos.reduce((smallest, img) => {
          if (img.iso_639_1 === "en") {
            return img.width < smallest.width ? img : smallest;
          } else {
            return smallest;
          }
        });
        setMovieImages(smallestLogo);
        setLoading(false);
      }
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

      const first3Actors = first3ActorsArray.map((actor) => {
        return (
          <div className="actor" key={actor.id}>
            {actor.name}
          </div>
        );
      });
      setMovieDirector(director[0]);
      setMovieActors(first3Actors);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const getMovieVideos = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const trailer = data.results.filter((video) => {
        if (
          video.official &&
          (video.type === "Trailer" || video.type === "Clip")
        ) {
          if (
            video.name === "Official Trailer" ||
            video.name === "Digital Trailer" ||
            video.name === "Official Final Trailer" ||
            video.name === "Official 4K Trailer" ||
            video.name === "Main Trailer" ||
            video.name === "Final Trailer" ||
            video.name === "Release Trailer"
          ) {
            return video;
          }
        } else {
          return video[0];
        }
      });

      setMovieVideos(trailer[0].key);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  useEffect(() => {
    const url = `${findUrl}${id}?${apiKey}`;
    const movieImgUrl = `https://api.themoviedb.org/3/movie/${id}/images?${apiKey}`;
    const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=00c1947745acd4bb607e67032972980f`;
    const movieVideosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?${apiKey}`;

    getMovieImages(movieImgUrl);
    getMovieInfo(url);
    getMovieCredits(movieCreditsUrl);
    getMovieVideos(movieVideosUrl);
  }, []);

  const {
    backdrop_path,
    overview,
    release_date,
    runtime,
    title,
    vote_average,
  } = movieInfo;

  console.log(movieInfo);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <main
          className="movie__info__container"
          style={{ backgroundImage: `url(${imgUrl}${backdrop_path})` }}
        >
          <div className="movie__info__card">
            {movieImages.file_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${movieImages.file_path}`}
                alt={`${title} Logo`}
                className="movie__logo"
              />
            ) : (
              <h2 className="tv__title">{title}</h2>
            )}
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
          <section
            className={`movie__trailer__container ${
              trailerIsPlaying ? "playing" : ""
            }`}
          >
            <ReactPlayer
              onPlay={() => setTrailerIsPlaying(true)}
              onPause={() => setTrailerIsPlaying(false)}
              url={`https://www.youtube.com/watch?v=${movieVideos}`}
            />
          </section>
        </main>
      )}
    </>
  );
}
