import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FavoritePage.css";

export default function FavoriteMoviesPage() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTVShows,setFavoriteShows] = useState([])
  useEffect(() => {
    // Fetch favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(savedFavorites);
    const savedFavorite = JSON.parse(localStorage.getItem("favoriteTVShows")) || [];
    setFavoriteShows(savedFavorite);
  
  }, []);
  const removeFavorite = (id) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== id);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };
  const removeTvShow =(id)=>{
    const updatedTvshows = favoriteTVShows.filter((tvshow) => tvshow.id !== id);
    setFavoriteShows(updatedTvshows);
    localStorage.setItem("favoriteTvshows", JSON.stringify(updatedTvshows));
  }

  return (
    <>
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

    <div className="favorite-movies-page">
      <h2>My Favorite TvShows</h2>
      <div className="favorite-movies-grid">
        {favoriteTVShows.map((tvshow) => (
          <div className="favorite-movie-card" key={tvshow.id}>
            <Link to={`/tv/${tvshow.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${tvshow.poster_path}`}
                alt={tvshow.title}
              />
            </Link>
            <div className="movie-details">
              <h3>{tvshow.title}</h3>
              <button className="remove-favorite-btn" onClick={() => removeTvShow(tvshow.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {favoriteTVShows.length === 0 && <p>No favorite movies yet!</p>}
    </div>

    </>
  );
}
