import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FavoritePage.css";

export default function FavoriteMoviesPage() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== id);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorite-movies-page">
      <h2>My Favorite Movies</h2>
      <div className="favorite-movies-grid">
        {favoriteMovies.map((movie) => (
          <div className="favorite-movie-card" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <button className="remove-favorite-btn" onClick={() => removeFavorite(movie.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {favoriteMovies.length === 0 && <p>No favorite movies yet!</p>}
    </div>
  );
}
