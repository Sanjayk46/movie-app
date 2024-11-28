// import React from "react";
// import "./RowItem.css";

// const RowItem = ({ movieData }) => {
//   const title = movieData.title || movieData.name; // Handle movies and TV shows
//   const poster = movieData.poster_path
//     ? `https://image.tmdb.org/t/p/w200${movieData.poster_path}`
//     : "https://via.placeholder.com/200x300";

//   return (
//     <div className="row-item">
//       <img src={poster} alt={title} className="row-item-image" />
//       <h3 className="row-item-title">{title}</h3>
//     </div>
//   );
// };

// export default RowItem;
import React from "react";
import "./RowItem.css";

const RowItem = ({ movieData }) => {
  const title = movieData.title || movieData.name; // Handle movies and TV shows
  const poster = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w200${movieData.poster_path}`
    : "https://via.placeholder.com/200x300";

  return (
    <div className="row-item">
      <img src={poster} alt={title} className="row-item-image" />
      <h3 className="row-item-title">{title}</h3>
    </div>
  );
};

export default RowItem;
