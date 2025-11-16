import { useState } from "react";
import Home from "./pages/Home.jsx";
import { Routes , Route} from "react-router-dom";
import "./css/App.css"
import Favorites from "./pages/Favorites.jsx";
import NavBar from "./components/NavBar.jsx";
import { MovieProvider } from "./contexts/MovieContexts.jsx";
import SearchPage from "./pages/SearchPage.jsx";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
