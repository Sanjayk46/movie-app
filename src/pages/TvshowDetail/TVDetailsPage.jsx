import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IconHeart,
  IconStar,
  IconHeartFilled,
  IconPlus,
  IconCheck,
} from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  PROFILE_SIZE,
} from "../../Constant/Constant";
import "./TVDetailsPage.css";
import LoadingSpinner from "../../component/Loader/Loader";
import { useTheme } from "../../context/useThemeContext";

export default function TVDetailsPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [tvDetails, setTVDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchTVDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}tv/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setTVDetails(data);

        const creditsResponse = await fetch(
          `${API_URL}tv/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast);
        setCrew(creditsData.crew);

        const videosResponse = await fetch(
          `${API_URL}tv/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const videosData = await videosResponse.json();
        const trailerData = videosData.results.find(
          (video) => video.type === "Trailer"
        );
        setTrailer(trailerData ? trailerData.key : null);

        // Check if the show is already in favorites or watchlist
        const savedFavorites =
          JSON.parse(localStorage.getItem("favoriteTVShows")) || [];
        setIsFavorite(savedFavorites.some((show) => show.id === data.id));

        const savedWatchlist =
          JSON.parse(localStorage.getItem("watchlistTVShows")) || [];
        setIsInWatchlist(savedWatchlist.some((show) => show.id === data.id));
      } catch (error) {
        console.error("Error fetching TV details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteTVShows")) || [];
    if (isFavorite) {
      const updatedFavorites = savedFavorites.filter(
        (show) => show.id !== tvDetails.id
      );
      localStorage.setItem("favoriteTVShows", JSON.stringify(updatedFavorites));
      toast.error(`${tvDetails.name} removed from Favorites!`);
    } else {
      const updatedFavorites = [...savedFavorites, tvDetails];
      localStorage.setItem("favoriteTVShows", JSON.stringify(updatedFavorites));
      toast.success(`${tvDetails.name} added to Favorites!`);
    }
    setIsFavorite(!isFavorite);
  };

  const handleWatchlistToggle = () => {
    const savedWatchlist =
      JSON.parse(localStorage.getItem("watchlistTVShows")) || [];
    if (isInWatchlist) {
      const updatedWatchlist = savedWatchlist.filter(
        (show) => show.id !== tvDetails.id
      );
      localStorage.setItem(
        "watchlistTVShows",
        JSON.stringify(updatedWatchlist)
      );
      toast.error(`${tvDetails.name} removed from Watchlist!`);
    } else {
      const updatedWatchlist = [...savedWatchlist, tvDetails];
      localStorage.setItem(
        "watchlistTVShows",
        JSON.stringify(updatedWatchlist)
      );
      toast.success(`${tvDetails.name} added to Watchlist!`);
    }
    setIsInWatchlist(!isInWatchlist);
  };

  if (loading) return <LoadingSpinner />;
  if (!tvDetails) return <p>No TV details found.</p>;

  const starRating = Math.round(tvDetails.vote_average / 2);
  const director = crew.find((member) => member.job === "Director");

  return (
    <div className={`tv-details-page ${theme}`}>
      <ToastContainer />
      <div
        className={`tv-banner ${theme}`}
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${POSTER_SIZE}${tvDetails.backdrop_path})`,
        }}
      >
        <div className="tv-info">
          <div className="tv-header">
            <h1>{tvDetails.name}</h1>
            <div
              className="action-icons"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div onClick={handleFavoriteToggle}>
                {isFavorite ? (
                  <IconHeartFilled size={24} color="#ff0000" />
                ) : (
                  <IconHeart size={24} color="#ff6666" />
                )}
              </div>
              <span>{isFavorite ? "Favorite" : "Add to Favorite"}</span>

              <div onClick={handleWatchlistToggle}>
                {isInWatchlist ? (
                  <IconCheck size={24} color="#76ff03" />
                ) : (
                  <IconPlus size={24} color="#76ff03" />
                )}
              </div>
              <span>{isInWatchlist ? "In Watchlist" : "Add to Watchlist"}</span>
            </div>
          </div>
          <p>{tvDetails.overview}</p>
        </div>
      </div>
      <div className="tv-details">
        <h2>TV Details</h2>
        <p>
          <strong>First Air Date:</strong> {tvDetails.first_air_date}
        </p>
        <p>
          <strong>IMDb Rating:</strong> {tvDetails.vote_average}/10
        </p>
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
        <p>
          <strong>Language:</strong> {tvDetails.original_language.toUpperCase()}
        </p>
        {director && (
          <p>
            <strong>Director:</strong> {director.name}
          </p>
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
            title="TV Show Trailer"
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
