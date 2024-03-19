import React, { useState } from "react";
import { Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// CSS
import "./css/AsianFilmsRow.css";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Pages
import { favAdd } from "../../Features/favSlice";

// Components
const MovieCard = React.lazy(() => import('../LazyImageComponent/MovieCard'));

function AsianFilmsRow({ isloadImage, cat, img, id, title, type, release_date, rate, episode, season, grid, slug }) {
  
  const year = new Date(release_date);
  const [icon, setIcon] = useState(<FavoriteBorderIcon />);
  const dispatch = useDispatch();

  const contentType = 'drama';

  const FavHanlder = () => {
    setIcon(<FavoriteIcon />);
    dispatch(
      favAdd({
        id: id,
        img: img,
        title: title,
        type: type,
        release_date: release_date,
        season: season,
        rate: rate,
        slug: slug,
      })
    );
  };

  return (
    <>
      <div className='movie_card' key={id}>

        <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
          <MovieCard src={img} title={title} />
        </Link>

        <div className="fav" onClick={() => FavHanlder()} hidden>
          {icon}
        </div>

        <div className={'movies__info inn'}>
          <div className="movie__name" style={{ marginTop: cat === "suggestions" ? '-10px' : '-3px' }}>
            <Typography variant="h3" className="movie_name" title={title}>{title}</Typography>
          </div>
          <div className="movie__other">
            <p>
              <span>{parseInt(episode) > 1 ? `EPS ${episode}` : ''}</span>
            </p>
            {type === null || type === undefined ? '' : <p>{type}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default AsianFilmsRow;
