import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./MovieContainer.css";

const MovieContainer = ({ title, items, type, theme }) => {
  // Create a ref for the container
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: "smooth", // Smooth scrolling for better UX
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: "smooth", // Smooth scrolling for better UX
      });
    }
  };

  return (
    <section className="movie-showcase">
      <h2 style={{ color: theme === "light" ? "red" : "white" }}>{title}</h2>
      <div className="movie-carousel">
        <button className="scroll-button left" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="movie-container" ref={containerRef}>
          {items.length > 0 ? (
            items.map((item) => (
              <Link to={`/${type}/${item.id}`} key={item.id}>
                <div className="movie-card">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "https://via.placeholder.com/200x300"
                    }
                    alt={`${item.title || item.name} Poster`}
                  />
                  <h3>{item.title || item.name}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p>No {type === "movie" ? "movies" : "TV shows"} found.</p>
          )}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </section>
  );
};

export default MovieContainer;
