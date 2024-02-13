import React, { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch } from "react-redux";
import { favAdd } from "../../Features/favSlice";
import { Link } from "react-router-dom";

// CSS
import "./css/AsianDramaRow.css";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function AsianDramaRow({ isloadImage, cat, img, id, title, type, release_date, rate, episode, season, grid, slug }) {
  
  const [ loadingPicture, setLoadingPicture ] = useState(isloadImage);
  const year = new Date(release_date);
  const [icon, setIcon] = useState(<FavoriteBorderIcon />);
  const dispatch = useDispatch();

  const contentType = 'drama-detail';

  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };

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
      <div className={cat === "suggestions" ? 'moviesRow' : 'movie_card' } key={id}>
        {cat === "suggestions" ? (
          <Link href={`/${contentType}/stream_dashboard?mediaId=${id}`}>
            <LazyLoadImage src={`${img}`} alt={loadingPicture ? '' : title} width={'100%'} height={'245'} effect="blur" hidden={loadingPicture ? 'hidden' : ''} onLoad={ () => setLoadingPicture(false) } onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = process.env.PUBLIC_URL + "/images/no-image-placeholder.png";
            }} />
            {loadingPicture ? <Skeleton className="img-card-skeleton" sx={{ bgcolor: 'grey.900' }} style={{marginTop: '-19px'}} variant="rectangular" animation="wave" height={245} /> : ''}
          </Link>
        ) : (
          <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
            <LazyLoadImage src={`${img}`} alt={loadingPicture ? '' : title} width={'100%'} height={'245'} effect="blur" hidden={loadingPicture ? 'hidden' : ''} onLoad={ () => setLoadingPicture(false) } />
            {loadingPicture ? <Skeleton className="img-card-skeleton" sx={{ bgcolor: 'grey.900' }} style={{marginTop: '-19px'}} variant="rectangular" animation="wave" height={245} /> : ''}
          </Link>
        )}

        <div className="fav" onClick={() => FavHanlder()} hidden>
          {icon}
        </div>

        <div className={grid ? 'movies__info inn' : 'movies_info'}>
          <div className="movie__name">
            <h3 title={title}>{truncate(title, 26)}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default AsianDramaRow;
