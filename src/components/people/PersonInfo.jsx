import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./People.scss";

const findPersonUrl = "https://api.themoviedb.org/3/person/";
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG;

export default function PersonInfo() {
  const { id } = useParams();

  const [person, setPerson] = useState({});

  const getPersonInfo = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      setPerson(data);
    } catch (error) {
      console.error("ERROR getPersonInfo:", error);
    }
  };

  useEffect(() => {
    const url = `${findPersonUrl}${id}?${apiKey}&append_to_response=combined_credits`;

    console.log(url);
    getPersonInfo(url);
  }, []);

  const {
    biography,
    birthday,
    homepage,
    imdb_id,
    name,
    place_of_birth,
    profile_path,
  } = person;

  console.log(biography);
  return (
    <main className="person__info__container">
      <div className="person__img__container">
        <img src={`${imgUrl}${profile_path}`} alt="" />
      </div>

      <div className="person__info">
        <h1>{name}</h1>
        <p>Place of birth: {place_of_birth}</p>
        <p>Birthday: {birthday}</p>
        <p className="person__bio">Bio: {biography}</p>
      </div>
    </main>
  );
}
