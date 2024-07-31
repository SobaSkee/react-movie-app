import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard.jsx";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=88759a57";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  // add a state for pages to receive more movies per request
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  useEffect(() => {
    searchMovies("Family Guy", 1);
  }, []);

  const searchMovies = async (title, page) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (page === 1) {
      setMovies(data.Search);
    }
    else {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
    }

    setTotalResults(data.totalResults);
    console.log(data.Search);
  };

  const handleSearch = () => {
    setPage(1);
    searchMovies(searchTerm, 1);
  };

  const loadMoreMoves = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchMovies(searchterm, nextPage);
  }
  return (
    <div className="app">
      <h1>SobaCinema</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {movies.length > 0 && movies.length < totalResults && (
        <div className="load-more">
          <button onClick={loadMoreMovies}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default App;