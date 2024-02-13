import React from "react";
import "./GenreRow.css";


function GenreRow({ obj }) {
  return (
    <span className="genre_row__text">
        {obj}
    </span>
  );
}

export default GenreRow;
