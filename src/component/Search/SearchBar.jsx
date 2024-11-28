// import React, { useState, useEffect } from "react";
// import { SearchRounded } from "@mui/icons-material";
// import AxiosService from "../../AxiosService";
// import RowItem from "./RowItem";
// import Loader from "../Loader/Loader";
// import "./Search.css";

// const api_key = import.meta.env.VITE_API_KEY;

// export default  function Search(){
//   const [movies, setMovies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (!search.trim()) {
//         setMovies([]);
//         return;
//       }

//       const handleSearch = async () => {
//         setLoading(true);
//         try {
//           const res = await AxiosService.get(
//             `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${search}`
//           );
//           setMovies(res.data.results || []);
//         } catch (error) {
//           console.error("Error fetching search results:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       handleSearch();
//     }, 500); // Debounce time: 500ms

//     return () => clearTimeout(debounceTimeout); // Clear timeout on cleanup
//   }, [search]);

//   return (
//     <div className="search-container">
//       <div className="search-bar">
//         <input
//           type="search"
//           name="search"
//           onChange={(e) => setSearch(e.target.value)}
//           className="search-input"
//           placeholder="Search movies and TV shows..."
//         />
//         <SearchRounded className="search-icon" />
//       </div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="rows">
//           {movies.length ? (
//             movies.map((movie, index) => (
//               <RowItem movieData={movie} index={index} key={movie.id} />
//             ))
//           ) : (
//             <h5>No Movies or TV Shows Found</h5>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import RowItem from "./RowItem";
import Loader from "./Loader";
import "./SearchBar.css";

// Mock data to simulate API response
const mockMoviesData = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/3Pz9WqCT0zv5ojdZ98t8SZJl0Fi.jpg",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 3,
    title: "Inception",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  // Add more mock movies here...
];

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (!search.trim()) {
        setMovies([]);
        return;
      }

      const handleSearch = () => {
        setLoading(true);

        // Simulate filtering of mock data based on search query
        const filteredMovies = mockMoviesData.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );
        setMovies(filteredMovies);
        setLoading(false);
      };

      handleSearch();
    }, 500); // Debounce time: 500ms

    return () => clearTimeout(debounceTimeout); // Clear timeout on cleanup
  }, [search]);

  return (
    <>
      <div className="search-bar">
        <input
          type="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          placeholder="Search movies and TV shows..."
        />
        <IconSearch style={{"className":"search-icon"}} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="rows">
          {movies.length ? (
            movies.map((movie, index) => (
              <RowItem movieData={movie} index={index} key={movie.id} />
            ))
          ) : (
            <h5>No Movies or TV Shows Found</h5>
          )}
        </div>
      )}
   </>
  );
};

export default Search;

