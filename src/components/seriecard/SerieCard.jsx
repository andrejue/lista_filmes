import { useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

import "./SerieCard.scss";

export default function SerieieCard({ series }) {
  const shuffleSeries = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  const shuffledSeries = shuffleSeries(series);

  const carousel = useRef(null);

  return (
    <div className="card__carousel__top__movies">
      <h2 className="top__movies__title">Top TV Series</h2>
      <div className="card__container" ref={carousel}>
        {shuffledSeries.map((movie) => {
          const { id, vote_average, poster_path, name, first_air_date } = movie;

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
                  {name} ({first_air_date.substring(0, 4)})
                </h3>
              </div>
              <div className="movie__backdrop__mini"></div>
            </div>
          );
        })}
      </div>

      <button onClick={handleLeftClick} className="left__carousel">
        <FaChevronCircleLeft size={42} />
      </button>
      <button onClick={handleRightClick} className="right__carousel">
        <FaChevronCircleRight size={42} />
      </button>
    </div>
  );
}