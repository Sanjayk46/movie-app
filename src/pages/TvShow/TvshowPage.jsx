import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RowItem from '../../component/RowItem/RowItem';
import { useMovies } from '../../context/useMovieContext';
import { useTheme } from '../../context/useThemeContext';
import LoadingSpinner from '../../component/Loader/Loader';
import './TvShowPage.css';

export default function TvShowPage() {
  const location = useLocation();
  const { theme } = useTheme();
  const {
    tvShows,
    genres,
    genre,
    language,
    isLoading,
    setGenre,
    setLanguage,
    setPageType, // Get setPageType from context
  } = useMovies();

  useEffect(() => {
    const type = location?.pathname.split('/')[1];
    setPageType(type === 'tv' ? 'tv' : 'movie');
  }, [location, setPageType]);

  // Filter out duplicate TV shows based on TV show id
  const uniqueTvShows = tvShows.filter((tv, index, self) =>
    index === self.findIndex((t) => t.id === tv.id)
  );

  return (
    <div className={`movies-container ${theme}`}>
      {isLoading && <LoadingSpinner />}
      <div className="filters">
        <h2 className="filters-title">Filter TV Shows</h2>
        <div className="filters-group">
          <div className="filter-item">
            <label htmlFor="genre" className="filter-label">
              Genre:
            </label>
            <select
              id="genre"
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              className="filter-select"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="language" className="filter-label">
              Language:
            </label>
            <select
              id="language"
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              className="filter-select"
            >
              <option value="en">English</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="ml">Malayalam</option>
              <option value="kn">Kannada</option>
            </select>
          </div>
        </div>
      </div>

      <div className="movies-grid">
        {uniqueTvShows?.map((tv) => (
          <RowItem
            key={tv.id}
            movieData={tv}
            media_type="tv" // Use 'tv' as type for TV show page
          />
        ))}
      </div>
    </div>
  );
}
