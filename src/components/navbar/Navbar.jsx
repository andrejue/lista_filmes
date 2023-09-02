import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

import "./Navbar.css";
import "./Navbar.scss";
import InputSearch from "../search/InputSearch";

export default function Navbar() {
  return (
    <header className="header">
      <h2>
        <Link to="/" className="link">
          <BiCameraMovie size={40} className="movie__logo" />
          <span className="text">MovieS</span>
        </Link>
      </h2>
      <InputSearch />
      <div className="third__visibility__hidden">
        <a href="https://github.com/andrejue" target="_blank" rel="noreferrer">
          Github Code
        </a>
      </div>
    </header>
  );
}
