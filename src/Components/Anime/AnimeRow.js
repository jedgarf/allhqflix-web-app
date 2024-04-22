import React, { useState, useEffect, Fragment } from "react";
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
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Utils
import { secondsToHMS, getAllSavedCookiesMedia } from "../../Services/Utils";

// Components
const MovieCard = React.lazy(() => import('../LazyImageComponent/MovieCard'));

function AnimeRow({ isloadImage, cat, img, id, title, type, release_date, rate, episode, season, grid, slug }) {

  const arcs = id === "21" ? require('../../Services/Data/onePieceArcs.json').arcs : [];
  const [cardImage, setCardImage] = useState("");
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

    if (id === "21") {
      setCardImage(savedCookiesMedia.length === 1 ? 
        arcs.find(item => item.start_episode <= savedMedia[0]?.episodeNumber && item.end_episode >= savedMedia[0]?.episodeNumber)?.mini_banner
        : 
        arcs.find(item => item.start_episode <= parseInt(episode) && item.end_episode >= parseInt(episode))?.mini_banner
      );
    }
  }, [id, episode, img, savedMedia]);
  
  return (
    <div className='movie_card' key={id} title={savedMedia.length === 1 ? 'Continue' : 'Play'}>

      <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
        <MovieCard src={cardImage || img} title={title} contentType={contentType} />
      </Link>

      {savedMedia.length === 1 && 
        <div className="fav" style={{ color: '#ccced1', fontSize: '14px', borderRadius: '10px 0 10px 0' }}>
          <PauseIcon style={{ fontSize: '16px', marginBottom: '-3px' }}/>{' '}
          {(type === 'TV' || type === 'TV Series') ? (savedMedia[0]?.category === 'tv' ? `S${savedMedia[0]?.seasonNumber} / ` : '') + `EP${savedMedia[0]?.episodeNumber}` : secondsToHMS(savedMedia[0]?.time)}<br/>
          {(savedMedia[0]?.category === 'tv' || savedMedia[0]?.category === 'anime') && 
            <Fragment>
              <AccessTimeIcon style={{ fontSize: '16px', marginBottom: '-3px' }}/> {secondsToHMS(savedMedia[0]?.time)}
            </Fragment>
          }
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
