import React, { useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { favAdd } from "../../Features/favSlice";
import { Link } from "react-router-dom";
import { Skeleton, Typography } from '@mui/material';

// CSS
import "./css/AnimeRow.css";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Components
const MovieCard = React.lazy(() => import('../LazyImageComponent/MovieCard'));

function AnimeRow({ isloadImage, cat, img, id, title, type, release_date, rate, episode, season, grid, slug }) {

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

  return (
    <>
      <div className='movie_card' key={id}>

        <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
          <Suspense fallback={<Skeleton className="img-card-skeleton" sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" />}>
            <MovieCard src={img} title={title} />
          </Suspense>
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
    </>
  );
}

export default AnimeRow;
