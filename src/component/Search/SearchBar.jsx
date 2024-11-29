import React, { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import { publicRequest } from "../../AxiosService";
import RowItem from "../RowItem/RowItem";
import Loader from "../Loader/Loader";
import "./SearchBar.css";
import { API_KEY } from "../../Constant/Constant";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const api_key = API_KEY;
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    if (!api_key) {
      console.error("API Key is missing. Please check your configuration.");
      return;
    }

    // Fetch default list of popular movies and TV shows
    const fetchDefaultMovies = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get(
          `trending/all/day?api_key=${api_key}` // This gets trending movies and shows
        );
        setMovies(res.data.results || []);
      } catch (error) {
        console.error("Error fetching default list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultMovies();

    // Handle search functionality with debounce
    const debounceTimeout = setTimeout(() => {
      if (!search.trim()) {
        return;
      }

      const handleSearch = async () => {
        setLoading(true);
        try {
          console.log("Fetching search results for:", search);
          const res = await publicRequest.get(
            `search/multi?api_key=${api_key}&query=${encodeURIComponent(search)}`
          );
          console.log("Search results:", res.data.results);
          setMovies(res.data.results || []);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      handleSearch();
    }, 500); // Debounce time: 500ms

    return () => clearTimeout(debounceTimeout); // Clear timeout on cleanup
  }, [search, api_key]);

  // Handle row item click and navigate to movie or TV show details
  const handleRowItemClick = (id, type) => {
    if (type === "movie") {
      navigate(`/movie/${id}`);
    } else if (type === "tv") {
      navigate(`/tv/${id}`);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          placeholder="Search movies and TV shows..."
        />
        <IconSearch className="search-icon" />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="rows">
          {movies.length ? (
            movies.map((movie, index) => (
              <RowItem
                movieData={movie}
                index={index}
                key={movie.id}
                media_type={movie.media_type}// Handle the click and navigate
              />
            ))
          ) : (
            <h5>No Movies or TV Shows Found</h5>
          )}
        </div>
      )}
    </div>
  );
}
