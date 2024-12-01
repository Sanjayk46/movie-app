import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./WatchList.css";
import { useTheme } from "../../context/useThemeContext";

export default function WatchlistPage() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchlistTVShows, setWatchlistTVShows] = useState([]);
  const {theme} = useTheme();
  useEffect(() => {
    // Fetch watchlist from localStorage
    const savedWatchlistMovies = JSON.parse(localStorage.getItem("watchlistMovies")) || [];
    setWatchlistMovies(savedWatchlistMovies);
    const savedWatchlistTVShows = JSON.parse(localStorage.getItem("watchlistTVShows")) || [];
    setWatchlistTVShows(savedWatchlistTVShows);
  }, []);

  const removeMovieFromWatchlist = (id) => {
    const updatedMovies = watchlistMovies.filter((movie) => movie.id !== id);
    setWatchlistMovies(updatedMovies);
    localStorage.setItem("watchlistMovies", JSON.stringify(updatedMovies));
  };

  const removeShowFromWatchlist = (id) => {
    const updatedShows = watchlistTVShows.filter((tvshow) => tvshow.id !== id);
    setWatchlistTVShows(updatedShows);
    localStorage.setItem("watchlistTVShows", JSON.stringify(updatedShows));
  };

  return (
    <>
    
      <div className= {`favorite-movies-page ${theme}`}>
        <h2>My Movie Watchlist</h2>
        <div className="favorite-movies-grid">
          {watchlistMovies.map((movie) => (
            <div className="favorite-movie-card" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="poster"
                />
              </Link>
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <button
                  className="remove-favorite-btn"
                  onClick={() => removeMovieFromWatchlist(movie.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {watchlistMovies.length === 0 && <p>Your movie watchlist is empty!</p>}
      </div>

      <div className={`favorite-movies-page ${theme}`}>
        <h2>My TV Show Watchlist</h2>
        <div className="favorite-movies-grid">
          {watchlistTVShows.map((tvshow) => (
            <div className="favorite-movie-card" key={tvshow.id}>
              <Link to={`/tv/${tvshow.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${tvshow.poster_path}`}
                  alt={tvshow.title}
                  className="poster"
                />
              </Link>
              <div className="movie-details">
                <h3>{tvshow.title}</h3>
                <button
                  className="remove-favorite-btn"
                  onClick={() => removeShowFromWatchlist(tvshow.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {watchlistTVShows.length === 0 && <p>Your TV show watchlist is empty!</p>}
      </div>
    </>
  );
}
