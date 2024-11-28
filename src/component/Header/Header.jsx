import React from "react";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../Constant/Constant";
import "./Header.css"; // Ensure you style the header appropriately

export default function Header({ mainMovie, goToNextMovie, goToPreviousMovie, theme }) {
  return (
    <header
      className="hero-section"
      style={{
        backgroundImage: mainMovie?.backdrop_path
          ? `url(${IMAGE_BASE_URL}${POSTER_SIZE}${mainMovie.backdrop_path})`
          : "url(https://via.placeholder.com/1500x500)",
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          {mainMovie && (
            <>
              <h1 style={{ color: theme === "light" ? "red" : "white" }}>
                {mainMovie.original_title || mainMovie.name}
              </h1>
              <p className="movie-overview">{mainMovie.overview}</p>
              <button className="cta-button">Watch Now</button>
            </>
          )}
        </div>

        {/* Pagination Icons */}
        <div className="pagination-icons">
          <button className="icon-button" onClick={goToPreviousMovie}>
            &lt; 
          </button>
          <button className="icon-button" onClick={goToNextMovie}>
            &gt;
          </button>
        </div>
      </div>
    </header>
  );
}
