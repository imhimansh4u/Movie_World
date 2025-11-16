import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Movie_Card from "../components/Movie_Card";
import { searchMovies } from "../services/api";

function SearchPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

 useEffect(() => {
   const fetchSearchResults = async () => {
     if (loading) return;
     setLoading(true);
     try {
       const searchResults = await searchMovies(query);
       setMovies(searchResults);
       setError(null);
     } catch (err) {
       console.error(err);
       setError("Failed to search movie...");
     } finally {
       setLoading(false);
     }
   };

   if (query) fetchSearchResults();
 }, [query]);


  return (
    <>
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
    </>
  );
}

export default SearchPage;
