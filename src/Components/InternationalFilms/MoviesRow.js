import React, { useState, useEffect, Suspense, Fragment } from "react";
import Skeleton from '@mui/material/Skeleton';
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

// CSS
import "./css/MoviesRow.css";

import { Container, Box, Typography } from "@mui/material";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PauseIcon from "@mui/icons-material/Pause";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Pages
import { favAdd } from "../../Features/favSlice";

// Utils
import { secondsToHMS, getAllSavedCookiesMedia } from "../../Services/Utils";

// Components
const MovieCard = React.lazy(() => import('../LazyImageComponent/MovieCard'));

const MoviesRow = ({isloadImage, cat, img, id, title, type, release_date, rate, season, grid, slug, duration, video_quality }) => {

  var contentType = "movie";

  if (type === "TV Series") {
    contentType = 'tv';
  }

  const [isImageReady, setIsImageReady] = useState(false);
  const [savedMedia, setSavedMedia] = useState([]);
  const year = new Date(release_date);
  const [icon, setIcon] = React.useState(<FavoriteBorderIcon />);
  const dispatch = useDispatch();

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
    <Box className='movie_card' key={id} title={savedMedia.length === 1 ? 'Continue' : 'Play'}>

      {isImageReady ? 
        <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
          <MovieCard src={img} title={title} contentType={contentType} setIsImageReady={setIsImageReady} />
        </Link>
      : 
        <MovieCard src={img} title={title} contentType={contentType} setIsImageReady={setIsImageReady} />
      }

      {savedMedia.length === 1 && 
        <div className="fav" style={{ color: '#ccced1', fontSize: '12px', borderRadius: '10px 0 10px 0' }}>
          <PauseIcon style={{ fontSize: '16px', marginBottom: '-3px' }}/>{' '}
          {(type === 'TV' || type === 'TV Series') ? (savedMedia[0]?.category === 'tv' ? `S ${savedMedia[0]?.seasonNumber} / ` : '') + `EP ${savedMedia[0]?.episodeNumber}` : secondsToHMS(savedMedia[0]?.time)}<br/>
          {savedMedia.length === 1 && 
            <div className="fav" style={{ color: '#ccced1', fontSize: '12px', borderRadius: '10px 0 10px 0' }}>
              <PauseIcon style={{ fontSize: '16px', marginBottom: '-3px' }}/>{' '}
              {(type === 'TV' || type === 'TV Series') ? (savedMedia[0]?.category === 'tv' ? `S ${savedMedia[0]?.seasonNumber} / ` : '') + `EP ${savedMedia[0]?.episodeNumber}` : secondsToHMS(savedMedia[0]?.time)}<br/>
              {(savedMedia[0]?.category === 'tv' || savedMedia[0]?.category === 'anime') && 
                <Fragment>
                  <AccessTimeIcon style={{ fontSize: '16px', marginBottom: '-3px' }}/> {secondsToHMS(savedMedia[0]?.time)}
                </Fragment>
              }
            </div>
          }
        </div>
      }

      <div className="fav" onClick={() => FavHanlder()} hidden>
        {icon}
      </div>

      {(video_quality && isImageReady) && 
        <div className="vidq">
          {video_quality}
        </div>
      }

      <div className={'movies__info inn'}>
        <div className="movie__name" style={{ marginTop: '-8px' }}>
          <Typography variant="h3" className="movie_name" title={title}>{title}</Typography>
        </div>
        <div className="movie__other">
          <p>
            <span>
              {release_date ? year.getFullYear() : ''}
              {release_date && season ? ' · ' : ''}
              {season}
              {/* <StarIcon /> */}
            </span>
          </p>
          <p>{type}</p>
        </div>
      </div>
    </Box>
  );
}

export default MoviesRow;
