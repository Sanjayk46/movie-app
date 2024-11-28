import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { publicRequest } from '../AxiosService'; // Assuming publicRequest is your axios instance
import { API_KEY } from '../Constant/Constant'; // Ensure API_KEY is properly imported
import { useLocation } from 'react-router-dom'; // Import useLocation

const api_key = API_KEY;

// Create the MoviesContext
const MoviesContext = createContext(null);

// Utility function to fetch raw movie or tv show data
const getRawData = async (api, paging = false) => {
  const itemsArray = [];
  try {
    for (let i = 1; itemsArray.length < 100 && i <= 5; i++) {
      const response = await publicRequest.get(`${api}${paging ? `&page=${i}` : ''}`);
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
  const location = useLocation(); // Use useLocation to get the current path
  const [movies, setMovies] = useState([]); // For movies
  const [tvShows, setTvShows] = useState([]); // For TV shows
  const [genres, setGenres] = useState([]); // Genres list
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [genre, setGenre] = useState('28'); // Default genre
  const [language, setLanguage] = useState('en'); // Default language
  const [pageType, setPageType] = useState(); // Default to movie, could be tv

  // Dynamically set pageType based on the URL path
  useEffect(() => {
    
    const pathSegments = location.pathname.split('/');
    const type = pathSegments[0] === 'tv' || pathSegments[1] === 'tv' ? 'tv' : 'movie'; // Check both parts of the path
    console.log(type) // Get the first part of the path
    setPageType(type === 'tv' ? 'tv' : 'movie'); // Set pageType to 'tv' or 'movie'
  }, [location.pathname]); // Trigger on path change
  // Fetch movies or tv shows based on pageType
  useEffect(() => {
    if (pageType === 'movie') {
      fetchMovies();
    } else{
      fetchTvShows();
    }
    if (genres.length === 0) {
      fetchGenres();
    }
  }, [pageType, genre, language]); // Trigger when pageType, genre, or language changes
  // Fetch Movies and TV Shows
  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const apiEndpoint = `/discover/movie?api_key=${api_key}&with_genres=${genre}&with_original_language=${language}`;
      const data = await getRawData(apiEndpoint);
      setMovies(data);
    } catch (error) {
      toast.error('Error fetching movies');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchTvShows = async () => {
    setIsLoading(true);
    try {
      const apiEndpoint = `/discover/tv?api_key=${api_key}&with_genres=${genre}&with_original_language=${language}`;
      const data = await getRawData(apiEndpoint);
      console.log('Fetching TV shows with URL:', apiEndpoint); // Log the API URL for debugging
      const response = await publicRequest.get(apiEndpoint);
      console.log('TV Shows API Response:', response);
      setTvShows(data);
    } catch (error) {
      toast.error('Error fetching TV shows');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch genres
  const fetchGenres = async () => {
    try {
      const { data: { genres } } = await publicRequest.get(`/genre/movie/list?api_key=${api_key}`);
      setGenres(genres);
    } catch (error) {
      toast.error('Error fetching genres');
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
        setPageType, // Allow components to set pageType
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

// Custom hook to use the MoviesContext
export const useMovies = () => useContext(MoviesContext);
