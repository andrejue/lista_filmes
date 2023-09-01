import { AiFillStar } from "react-icons/ai";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

import "./MovieCard.scss";

export default function MovieCard({ movies }) {
  const shuffleMovies = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledMovies = shuffleMovies(movies);

  return (
    <div className="card__carousel__top__movies">
      <h2 className="top__movies__title">Top Movies</h2>
      <div className="card__container">
        {shuffledMovies.map((movie) => {
          const { id, vote_average, poster_path, title, release_date } = movie;

          return (
            <div className="movie__poster" key={id}>
              <div className="movie__rating">
                {vote_average}
                <AiFillStar className="movie__rating__star" size={20} />
              </div>

              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt="Movie Cover"
                className="movie__cover"
              />
              <div className="movie__title">
                <h3>
                  {title} ({release_date.substring(0, 4)})
                </h3>
              </div>
              <div className="movie__backdrop__mini"></div>
            </div>
          );
        })}
      </div>

      <button className="left__carousel">
        <FaChevronCircleLeft size={42} />
      </button>
      <button className="right__carousel">
        <FaChevronCircleRight size={42} />
      </button>
    </div>
  );
}
