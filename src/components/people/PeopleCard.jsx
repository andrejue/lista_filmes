import React from "react";

import "./People.scss";
import { string } from "prop-types";

export default function People({ people, title }) {
  console.log(people);
  const person = people.filter((person) => {
    if (person.profile_path != null) {
      return person;
    } else {
      return null;
    }
  });

  console.log(person);
  return (
    <section className="people__container">
      <div>
        <h2 className="top__movies__title">{title}</h2>
      </div>
      <div className="person__carousel">
        {person.map((person) => {
          const { name, profile_path } = person;

          return (
            <div className="people__card" key={person.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                alt="Profile picture"
              />
              <div className="people__name">
                <h4>{name}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
