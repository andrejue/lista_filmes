import { useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

import "./MovieCard.scss";
import { Link } from "react-router-dom";

export default function MovieCard({ movies, title, type }) {
  const sortedMovies = movies
    .slice()
    .sort((a, b) => b.popularity - a.popularity);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  const carousel = useRef(null);

  return (
    <main className="card__carousel__top__movies">
      <h2 className="top__movies__title">{title}</h2>
      <div className="card__container" ref={carousel}>
        {sortedMovies.length === 0 && <div>Loading movies...</div>}
        {sortedMovies.map((movie) => {
          const {
            id,
            mediaType,
            vote_average,
            popularity,
            poster_path,
            title,
            release_date,
          } = movie;

          console.log(movie);
          let link = null;

          if (mediaType == "tv") {
            link = `/tv/${id}/${type}`;
          } else {
            link = `/movie/${id}/${type}`;
          }
          return (
            <Link key={id} to={link}>
              <div className="movie__poster">
                <div className="movie__rating">
                  {vote_average ? vote_average.toFixed(1) : 0}
                  <AiFillStar className="movie__rating__star" size={20} />
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt="Movie Cover"
                  className="movie__cover"
                />
                <div className="movie__title">
                  <h3>
                    {title} ({release_date && release_date.substring(0, 4)})
                  </h3>
                </div>
                <div className="movie__backdrop__mini"></div>
              </div>
            </Link>
          );
        })}
      </div>

      <button onClick={handleLeftClick} className="left__carousel">
        <FaChevronCircleLeft size={42} />
      </button>
      <button onClick={handleRightClick} className="right__carousel">
        <FaChevronCircleRight size={42} />
      </button>
    </main>
  );
}
