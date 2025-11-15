import React from "react";
import { useState, useEffect } from "react";
import "../css/Home.css";
import Movie_Card from "../components/Movie_Card.jsx";
import { searchMovies, getPopularMovies } from "../services/api.js";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("failed To Load");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // it is a function to hadnle when search Button is clicked
  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()){
        return;
    }
    if(loading){   // if it is already searching something , then simply return for any diff search request
        return;
    }
    setLoading(true);
    try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setError(null);
    } catch (err) {
        console.log(err)
        setError("Failed to search Movie...")
    }
    finally{
        setLoading(false);
    }

    setSearchQuery("");

  };

  return (
    <div className="home">
      <form action="" onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter Movie Name...."
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button type="submit" className="search-button">
          SEARCH
        </button>
      </form>

      {error && <div className="error-message ">{error}</div>}

      {loading ? (      
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((m) => (
            <Movie_Card movie={m} key={m.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
