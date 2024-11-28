import React, { useEffect, useRef, useState } from "react";
import { IconArrowRight,IconArrowLeft } from "@tabler/icons-react";
import { publicRequest } from "../../AxiosService";
import RowItem from "../RowItem/RowItem";
import "./Rows.css"; // Import the new CSS file
import { API_KEY } from "../../Constant/Constant";
const api_key = import.meta.env.VITE_API_KEY;

const Row = ({ title, media_type = "movie", genre: genre }) => {
  const [movies, setmovies] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();

  const handleClick = (direction) => {
    const distance = 144.5 + 5;

    function goToPage(slideNumber) {
      let position = -1 * slideNumber * distance;
      listRef.current.style.transform = "translateX(" + position + "px)";
    }

    if (direction === "left" && slideNumber > 0) {
      goToPage(slideNumber - 1);
      setSlideNumber(slideNumber - 1);
    }

    if (direction === "right" && slideNumber < 12) {
      goToPage(slideNumber + 1);
      setSlideNumber(slideNumber + 1);
    } else if (slideNumber === 12) {
      goToPage(0);
      setSlideNumber(0);
    }
  };

  useEffect(() => {}, [slideNumber]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        title === "Latest and Trending" ||
        title === "Popular Movies" ||
        title === "Popular Shows"
      ) {
        const data = await publicRequest.get(
          `/trending/${media_type}/week?API_KEY=${API_KEY}`
        );
        if (media_type === "all") {
          data.data.results.media_type = media_type;
        }
        setmovies(data.data.results);
      } else {
        const data = await publicRequest.get(
          `/discover/movie?API_KEY=${API_KEY}&with_genres=${genre}`
        );
        const reqData = data.data.results;
        reqData.media_type = "movie";
        setmovies(reqData);
      }
    };
    fetchData();

    return () => {};
  }, []);

  return (
    <div className="row-container">
      <div className="carousel">
        <span className="RowTitle">{title}</span>
        <div className="wrapper">
          <IconArrowRight
            className={`slider-arrow left ${slideNumber === 0 && "not-show"}`}
            onClick={() => handleClick("left")}
          />
          <div className="row" ref={listRef}>
            {movies.map((movie, index) => (
              <RowItem
                movieData={movie}
                media_type={media_type}
                index={index}
                key={movie.id}
              />
            ))}
          </div>
          <IconArrowLeft
            className={`slider-arrow right`}
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default Row;
