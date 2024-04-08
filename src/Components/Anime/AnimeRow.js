import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { favAdd } from "../../Features/favSlice";
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';

// CSS
import "./css/AnimeRow.css";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PauseIcon from "@mui/icons-material/Pause";

// Utils
import { secondsToHMS, getAllSavedCookiesMedia } from "../../Services/Utils";

// Components
const MovieCard = React.lazy(() => import('../LazyImageComponent/MovieCard'));

function AnimeRow({ isloadImage, cat, img, id, title, type, release_date, rate, episode, season, grid, slug }) {

  const [savedMedia, setSavedMedia] = useState([]);
  
  const year = new Date(release_date);
  const [icon, setIcon] = useState(<FavoriteBorderIcon />);
  const dispatch = useDispatch();

  const contentType = 'anime';

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

  useEffect(() => {
    const savedCookiesMedia = getAllSavedCookiesMedia(id);
    setSavedMedia(savedCookiesMedia);
  }, [id]);
  
  return (
    <div className='movie_card' key={id} title={savedMedia.length === 1 ? 'Continue' : 'Play'}>

      <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
        <MovieCard src={img} title={title} contentType={contentType} />
      </Link>

      {savedMedia.length === 1 && 
        <div className="fav" style={{ color: '#ccced1', fontSize: '14px', borderRadius: '10px 0 10px 0' }}>
          <PauseIcon style={{ fontSize: '16px', marginBottom: '-3px' }}/> {savedMedia[0]?.time && secondsToHMS(savedMedia[0]?.time)}
        </div>
      }

      <div className="fav" onClick={() => FavHanlder()} hidden>
        {icon}
      </div>

      <div className={'movies__info inn'}>
        <div className="movie__name" style={{ marginTop: cat === "suggestions" ? '-10px' : '-3px' }}>
          <Typography variant="h3" className="movie_name" title={title}>{title}</Typography>
        </div>
        <div className="movie__other">
          <p>
            <span>
              {release_date === undefined || release_date === null ? "" : release_date + " · "}
              {episode === "" || episode === undefined ? "" : "EPS " +  episode}
              {/* {rate === "" || rate === undefined || rate === null ? "" : <><StarIcon />{rate}</>} */}
              {/* <span>
                {season}
                <StarIcon />
              </span> */}
            </span>
          </p>
          <p>{type}</p>
        </div>
      </div>
    </div>
  );
}

export default AnimeRow;
