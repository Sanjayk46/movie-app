import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./RowItem.css";

const RowItem = ({ movieData, media_type }) => {
  const navigate = useNavigate();
  const [isHovered, setisHovered] = useState(false);

  const handleClick = () => {
    navigate(`/${media_type}/${movieData.id}`);
  };

  return (
    <>
      {movieData?.poster_path && (
        <motion.div
          className="row-item-container"
          onClick={handleClick}
          layout
          whileHover={{ scale: 1.2 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt=""
          />
          {isHovered && <></>}
        </motion.div>
      )}
    </>
  );
};

export default RowItem;
