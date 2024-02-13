import React, { useState, Suspense } from "react";
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

// Pages
import { favAdd } from "../../Features/favSlice";

// Components
const MovieCard = React.lazy(() => import('../LazyImageComponent/MovieCard'));

function MoviesRow({isloadImage, cat, img, id, title, type, release_date, rate, season, grid, slug, duration, video_quality }) {

  var contentType = "movie";

  if (type === "TV Series") {
    contentType = 'tv';
  }

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

  return (
    <>
      <Box className='movie_card' key={id}>
        <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
          <Suspense fallback={<Skeleton className="img-card-skeleton" sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" />}>
            <MovieCard src={img} title={title} />
          </Suspense>
        </Link>

        <div className="fav" onClick={() => FavHanlder()} hidden>
          {icon}
        </div>

        <div className="vidq">
          {video_quality}
        </div>

        <div className={'movies__info inn'}>
          <div className="movie__name" style={{ marginTop: cat === "suggestions" ? '-3px' : '-3px' }}>
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
    </>
  );
}

export default MoviesRow;
