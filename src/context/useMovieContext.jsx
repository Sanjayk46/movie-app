import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { publicRequest } from '../AxiosService'; // Assuming publicRequest is your axios instance
import { API_KEY } from '../Constant/Constant'; // Ensure API_KEY is properly imported
import { useLocation } from 'react-router-dom'; // Import useLocation

const api_key = API_KEY;

// Create the MoviesContext
const MoviesContext = createContext(null);

// Utility function to fetch raw movie or tv show data
const getRawData = async (api) => {
  const itemsArray = [];
  try {
    for (let i = 1; itemsArray.length < 100 && i <= 5; i++) {
      const response = await publicRequest.get(`${api}&page=${i}`);
      console.log('API Response:', response); // Log the response
      const results = response.data.results;
      results.forEach((item) => {
        if (item.backdrop_path) {
          itemsArray.push(item);
        }
      });
    }
    return itemsArray;
  } catch (error) {
    console.error('Error fetching raw data', error);
    return [];
  }
};

export const MoviesProvider = ({ children }) => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('en');
  const [pageType, setPageType] = useState();

  // Set the page type based on the URL
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const type = pathSegments.includes('tv') ? 'tv' : 'movie';
    setPageType(type);
  }, [location.pathname]);

  // Fetch genres when pageType, genre, or language changes
  useEffect(() => {
    if (pageType) fetchGenres();
  }, [pageType]);

  // Fetch movies or TV shows based on genre and language
  useEffect(() => {
    if (pageType === 'movie') {
      fetchMovies();
    } else if (pageType === 'tv') {
      fetchTvShows();
    }
  }, [pageType, genre, language]);

  // Fetch genres from the API based on page type (movie or tv)
  const fetchGenres = async () => {
    const endpoint =
      pageType === 'tv'
        ? `/genre/tv/list?api_key=${api_key}`
        : `/genre/movie/list?api_key=${api_key}`;
    try {
      const response = await publicRequest.get(endpoint);
      setGenres(response.data.genres || []);
      console.log('Fetched Genres:', response.data.genres);
    } catch (error) {
      toast.error('Error fetching genres');
      console.error('Fetch Genres Error:', error);
    }
  };

  // Fetch movies based on the selected genre and language
  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const apiEndpoint = `/discover/movie?api_key=${api_key}&with_genres=${genre}&with_original_language=${language}`;
      const data = await getRawData(apiEndpoint);
      setMovies(data);
    } catch (error) {
      toast.error('Error fetching movies');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch TV shows based on the selected genre and language
  const fetchTvShows = async () => {
    setIsLoading(true);
    try {
      const apiEndpoint = `/discover/tv?api_key=${api_key}&with_genres=${genre}&with_original_language=${language}`;
      const data = await getRawData(apiEndpoint);
      setTvShows(data);
    } catch (error) {
      toast.error('Error fetching TV shows');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        tvShows,
        genres,
        genre,
        language,
        isLoading,
        pageType,
        setGenre,
        setLanguage,
        setPageType,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

// Custom hook to use the MoviesContext
export const useMovies = () => useContext(MoviesContext);
