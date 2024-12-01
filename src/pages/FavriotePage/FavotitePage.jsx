import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/useThemeContext";
import "./FavoritePage.css";

export default function FavoriteMoviesPage() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTVShows, setFavoriteShows] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(savedFavorites);

    const savedFavoriteShows = JSON.parse(localStorage.getItem("favoriteTVShows")) || [];
    setFavoriteShows(savedFavoriteShows);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== id);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  const removeTvShow = (id) => {
    const updatedTvShows = favoriteTVShows.filter((tvshow) => tvshow.id !== id);
    setFavoriteShows(updatedTvShows);
    localStorage.setItem("favoriteTVShows", JSON.stringify(updatedTvShows));
  };

  const renderFavoriteItems = (items, removeFunction, type) => (
    <div className="favorite-movies-grid">
      {items.map((item) => (
        <div className="favorite-movie-card" key={item.id}>
          <Link to={`/${type}/${item.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
              alt={item.title}
            />
          </Link>
          <div className="movie-details">
            <h3>{item.title}</h3>
            <button
              className="remove-favorite-btn"
              onClick={() => removeFunction(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`favorite-movies-page ${theme}`}>
      <h2>My Favorite Movies</h2>
      {favoriteMovies.length > 0
        ? renderFavoriteItems(favoriteMovies, removeFavorite, "movie")
        : <p className="no-favorites">No favorite movies yet!</p>}

      <h2>My Favorite TV Shows</h2>
      {favoriteTVShows.length > 0
        ? renderFavoriteItems(favoriteTVShows, removeTvShow, "tv")
        : <p className="no-favorites">No favorite TV shows yet!</p>}
    </div>
  );
}
