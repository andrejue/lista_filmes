import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

import "./InputSearch.scss";

export default function InputSearch() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a movie, TV show, etc..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <FaSearch size={20} />
        </button>
      </form>
    </div>
  );
}
