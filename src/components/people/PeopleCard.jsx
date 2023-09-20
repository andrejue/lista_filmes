import React from "react";
import { Link } from "react-router-dom";

import "./People.scss";

export default function People({ people, title }) {
  const person = people.filter((person) => {
    if (person.profile_path != null) {
      return person;
    } else {
      return null;
    }
  });

  return (
    <section className="people__container">
      <div>
        <h2 className="top__movies__title">{title}</h2>
      </div>
      <div className="person__carousel">
        {person.map((person) => {
          const { id, name, profile_path } = person;

          return (
            <Link to={`/person/${id}`} key={person.id}>
              <div className="people__card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                  alt="Profile picture"
                />
                <div className="people__name">
                  <h4>{name}</h4>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
