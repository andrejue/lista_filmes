import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LiaImdb } from "react-icons/lia";

import "./TvInfo.scss";
import Loader from "../loader/Loader";

const findUrl = "https://api.themoviedb.org/3/tv/";
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG_ORIGINAL;

export default function TvInfo() {
  const { id, type } = useParams();

  const [loading, setLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieDirector, setMovieDirector] = useState({});
  const [movieImages, setMovieImages] = useState({});
  const [movieVideos, setMovieVideos] = useState([]);

  const getTvShowInfo = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const { genres } = data;

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

  const getTvShowImages = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const smallestLogo = data.logos.reduce((smallest, img) => {
        if (img.iso_639_1 === "en") {
          return img.width < smallest.width ? img : smallest;
        } else {
          return smallest;
        }
      });

      setMovieImages(smallestLogo);
      setLoading(false);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const getTvShowCredits = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const first3ActorsArray = data.cast.slice(0, 3);
      console.log(data);

      const director = data.crew.filter((director) => {
        if (director.job) {
          if (director.job === "Director") {
            return director;
          }
        }
        if (
          director.known_for_department === "Creator" ||
          director.known_for_department === "Director" ||
          director.known_for_department === "Writing"
        ) {
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

  // const getMovieVideos = async (url) => {
  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();

  //     const trailer = data.results.filter((video) => {
  //       if (
  //         video.official &&
  //         (video.type === "Trailer" || video.type === "Clip")
  //       ) {
  //         if (
  //           video.name === "Official Trailer" ||
  //           video.name === "Digital Trailer" ||
  //           video.name === "Official Final Trailer" ||
  //           video.name === "Official 4K Trailer" ||
  //           video.name === "Main Trailer" ||
  //           video.name === "Final Trailer" ||
  //           video.name === "Release Trailer"
  //         ) {
  //           return video;
  //         }
  //       } else {
  //         return video[0];
  //       }
  //     });

  //     setMovieVideos(trailer[0].key);
  //   } catch (error) {
  //     console.error("ERROR:", error);
  //   }
  // };

  useEffect(() => {
    const url = `${findUrl}${id}?${apiKey}`;
    const tvShowImgUrl = `https://api.themoviedb.org/3/tv/${id}/images?${apiKey}`;
    const movieCreditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=00c1947745acd4bb607e67032972980f`;
    const movieVideosUrl = `https://api.themoviedb.org/3/tv/${id}/videos?${apiKey}`;

    getTvShowInfo(url);
    getTvShowImages(tvShowImgUrl);
    getTvShowCredits(movieCreditsUrl);
    // getMovieVideos(movieVideosUrl);
  }, []);

  const {
    backdrop_path,
    overview,
    first_air_date,
    name,
    original_name,
    vote_average,
  } = movieInfo;

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
                alt={`${original_name} Logo`}
                className="movie__logo"
              />
            ) : (
              <h2 className="tv__title">{name}</h2>
            )}

            <div className="movie__infos">
              {first_air_date && <p>{first_air_date.substring(0, 4)}</p>}
              {vote_average && (
                <p className="vote__average">
                  {vote_average.toFixed(1)} <LiaImdb size={40} />
                </p>
              )}
            </div>
            <div className="movie__data">
              <span>Genres</span>
              <div className="genres">{movieGenre}</div>
              {movieDirector != undefined ? (
                <div>
                  <span>{movieDirector.known_for_department}</span>
                  <div className="director">{movieDirector.name}</div>
                </div>
              ) : null}

              <span>Cast</span>
              <div className="cast">{movieActors}</div>
              <span>Summary</span>
              <div className="overview">
                <p>{overview}</p>
              </div>
            </div>
          </div>
          <section className="movie__trailer__container">
            <iframe
              width="680"
              height="380"
              src={`https://www.youtube.com/embed/${movieVideos}?si=1nRNHSRC1NyrVEwg`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </section>
        </main>
      )}
    </>
  );
}
