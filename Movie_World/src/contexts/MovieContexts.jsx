import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setfavorites] = useState(() => {
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      if (storedFavs) {
        setfavorites(JSON.parse(storedFavs));
      } else {
        setfavorites([]); // fallback if nothing is stored yet
      }
    } catch (error) {
      console.error("Error parsing favorites:", error);
      setfavorites([]); // fallback if JSON data is corrupted
    }
  }, []);

  useEffect(() => {
    const favMovies = JSON.stringify(favorites);
    localStorage.setItem("favorites", favMovies);
  }, [favorites]);

  const addToFavorites = (movie) => {          //The Whole Movie Object was passed in the function
    setfavorites((prev) => [...prev, movie]); // It firstly fetches the already Favorited Movies , and Then add the new One into it.
  };

  const removeFromFavorites = (movieId) => {     
    // console.log(favorites)
    setfavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
