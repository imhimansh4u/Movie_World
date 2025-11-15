import React from 'react'; 
import { useState } from 'react';
import "../css/Home.css";
import Movie_Card from '../components/Movie_Card.jsx';

function Home() {

    const [searchQuery,setSearchQuery] = useState("");


    const movies = [
      { id: 1, title: "Avengers", release_date: "11-07-2004" },
      { id: 2, title: "Iron Man", release_date: "14-07-2024" },
      { id: 3, title: "Hulk", release_date: "21-09-2010" },
      { id: 4, title: "DoomsDay", release_date: "16-12-3004" },
    ];

const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${searchQuery} Found`)
}

  return (
    <div className='home'>
        <form action="" onSubmit={handleSubmit} className='search-form'>
            <input
                type="text" 
                placeholder='Enter Movie Name....'
                className='search-input'
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value)}}
            
            />
            <button type="submit" className='search-button'>
                SEARCH
            </button>
        </form>
        <div className='movies-grid'>
            {movies.map((m) => (
                <Movie_Card movie={m} key={m.id}/>
            ))} 
        </div>
    </div>
  )
}

export default Home