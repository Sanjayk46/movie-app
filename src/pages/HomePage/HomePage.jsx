import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/Footer";
import Header from "../../component/Header/Header";
import { API_URL, API_KEY } from "../../Constant/Constant";
import { useTheme } from "../../context/useThemeContext";
import MovieContainer from "../../component/container/MovieContainer";
import "./HomePage.css";

export default function HomePage() {
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [mainMovie, setMainMovie] = useState(null); // State for main movie
  const [movies, setMovies] = useState([]); // State for all movies
  const [movieIndex, setMovieIndex] = useState(0); // Index for movie navigation
  const { theme } = useTheme();

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      const endpoint = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setGenres(data.genres); // Save genres in state
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies for each genre
  useEffect(() => {
    if (genres.length === 0) return;

    const fetchMoviesByGenre = async (genreId) => {
      const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error(`Error fetching movies for genre ${genreId}:`, error);
        return [];
      }
    };

    const fetchAllGenresMovies = async () => {
      const moviesByGenre = {};
      for (const genre of genres) {
        const movies = await fetchMoviesByGenre(genre.id);
        moviesByGenre[genre.id] = movies;
      }
      setGenreMovies(moviesByGenre);
    };

    fetchAllGenresMovies();
  }, [genres]);

  // Fetch popular movies for the header
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMovies(data.results);
        setMainMovie(data.results[0]); // Set the first movie as the main movie
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  // Function to go to the next movie
  const goToNextMovie = () => {
    setMovieIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % movies.length;
      setMainMovie(movies[nextIndex]);
      return nextIndex;
    });
  };

  // Function to go to the previous movie
  const goToPreviousMovie = () => {
    setMovieIndex((prevIndex) => {
      const prevIndexValue = prevIndex === 0 ? movies.length - 1 : prevIndex - 1;
      setMainMovie(movies[prevIndexValue]);
      return prevIndexValue;
    });
  };

  // Filter out duplicate movies based on movie id
  const uniqueMovies = movies.filter((movie, index, self) =>
    index === self.findIndex((m) => m.id === movie.id)
  );

  // Filter out duplicate movies for each genre
  const uniqueGenreMovies = Object.keys(genreMovies).reduce((acc, genreId) => {
    const uniqueMoviesForGenre = genreMovies[genreId].filter((movie, index, self) =>
      index === self.findIndex((m) => m.id === movie.id)
    );
    acc[genreId] = uniqueMoviesForGenre;
    return acc;
  }, {});

  return (
    <div className="home-page">
      <Header
        mainMovie={mainMovie}
        goToNextMovie={goToNextMovie}
        goToPreviousMovie={goToPreviousMovie}
        theme={theme}
      />

      {/* Render movies by genre */}
      {genres.map((genre) => (
        <MovieContainer
          key={genre.id}
          title={genre.name}
          items={uniqueGenreMovies[genre.id] || []}
          type="movie"
          theme={theme}
        />
      ))}
    </div>
  );
}
