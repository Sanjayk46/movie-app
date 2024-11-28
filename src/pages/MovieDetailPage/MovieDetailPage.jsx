import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { IconHeart, IconStar, IconHeartFilled, IconPlus, IconCheck } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, PROFILE_SIZE } from "../../Constant/Constant";
import "./MovieDetailPage.css";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // To navigate to favorites or comments page
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        setMovieDetails(data);

        const creditsResponse = await fetch(`${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast);
        setCrew(creditsData.crew);

        const videosResponse = await fetch(`${API_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const videosData = await videosResponse.json();
        const trailerData = videosData.results.find((video) => video.type === "Trailer");
        setTrailer(trailerData ? trailerData.key : null);

        // Check if the movie is already in favorites or watchlist
        const savedFavorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        setIsFavorite(savedFavorites.some((movie) => movie.id === data.id));

        const savedWatchlist = JSON.parse(localStorage.getItem("watchlistMovies")) || [];
        setIsInWatchlist(savedWatchlist.some((movie) => movie.id === data.id));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = savedFavorites.filter((movie) => movie.id !== movieDetails.id);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      toast.error(`${movieDetails.title} removed from Favorites!`);
    } else {
      // Add to favorites
      const updatedFavorites = [...savedFavorites, movieDetails];
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      toast.success(`${movieDetails.title} added to Favorites!`);
    }
    setIsFavorite(!isFavorite);
  };

  const handleWatchlistToggle = () => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlistMovies")) || [];
    if (isInWatchlist) {
      // Remove from watchlist
      const updatedWatchlist = savedWatchlist.filter((movie) => movie.id !== movieDetails.id);
      localStorage.setItem("watchlistMovies", JSON.stringify(updatedWatchlist));
      toast.error(`${movieDetails.title} removed from Watchlist!`);
    } else {
      // Add to watchlist
      const updatedWatchlist = [...savedWatchlist, movieDetails];
      localStorage.setItem("watchlistMovies", JSON.stringify(updatedWatchlist));
      toast.success(`${movieDetails.title} added to Watchlist!`);
    }
    setIsInWatchlist(!isInWatchlist);
  };

  if (loading) return <p>Loading...</p>;
  if (!movieDetails) return <p>No movie details found.</p>;

  const starRating = Math.round(movieDetails.vote_average / 2);
  const director = crew.find((member) => member.job === "Director");

  return (
    <div className="movie-details-page">
      <ToastContainer />
      <div
        className="movie-banner"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${POSTER_SIZE}${movieDetails.backdrop_path})`,
        }}
      >
        <div className="movie-info">
          <div className="movie-header">
            <h1>{movieDetails.title}</h1>
            <div className="action-icons" style={{ display: "flex", flexDirection: "row" }}>
              <div onClick={handleFavoriteToggle}>
                {isFavorite ? <IconHeartFilled size={24} color="#ff0000" /> : <IconHeart size={24} color="#ff6666" />}
              </div>
              <span>{isFavorite ? "Favorite" : "Add to Favorite"}</span>

              <div onClick={handleWatchlistToggle}>
                {isInWatchlist ? <IconCheck size={24} color="#76ff03" /> : <IconPlus size={24} color="#76ff03" />}
              </div>
              <span>{isInWatchlist ? "In Watchlist" : "Add to Watchlist"}</span>
            </div>
          </div>
          <p>{movieDetails.overview}</p>
        </div>
      </div>
      <div className="movie-details">
        <h2>Movie Details</h2>
        <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
        <p><strong>IMDb Rating:</strong> {movieDetails.vote_average}/10</p>
        <div className="star-rating">
          {Array(5)
            .fill()
            .map((_, index) =>
              index < starRating ? (
                <IconStar key={index} color="#ffcc00" size={20} />
              ) : (
                <IconStar key={index} color="#ddd" size={20} />
              )
            )}
        </div>
        <p><strong>Language:</strong> {movieDetails.original_language.toUpperCase()}</p>
        {director && <p><strong>Director:</strong> {director.name}</p>}
        {movieDetails.awards ? (
          <p><strong>Awards:</strong> {movieDetails.awards}</p>
        ) : (
          <p><strong>Awards:</strong> None</p>
        )}
      </div>
      {trailer && (
        <div className="trailer-section">
          <h2>Trailer</h2>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailer}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        </div>
      )}
      <div className="cast-section">
        <h2>Top Cast</h2>
        <div className="cast-container">
          {cast.slice(0, 8).map((actor) => (
            <div key={actor.id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}${PROFILE_SIZE}${actor.profile_path}`
                    : "https://via.placeholder.com/150x200"
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p className="character">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
