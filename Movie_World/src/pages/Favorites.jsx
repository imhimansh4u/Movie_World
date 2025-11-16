import React from 'react';
import "../css/Favorites.css"
import { useMovieContext } from '../contexts/MovieContexts';
import Movie_Card from '../components/Movie_Card';

function Favorites() {
  const {favorites} = useMovieContext();
  if(favorites){
    return (
      <div className='favorites'>
        <h1>Your Favorites</h1>
        <div className="movies-grid">
          {favorites.map((m) => (
            <Movie_Card movie={m} key={m.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites