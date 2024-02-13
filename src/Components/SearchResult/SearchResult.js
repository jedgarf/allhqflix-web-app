// Packages
import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Skeleton, Typography } from '@mui/material';

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// CSS
import "./SearchResult.css";

// Pages
import { favAdd } from "../../Features/favSlice";
const MovieCard = React.lazy(() => import('../LazyImageComponent/MovieCard'));

const SearchResult = ({ isloadImage, contentType, img, id, title, type, release_date, rate, season, episode, slug, video_quality, hasLink }) => {

  const [ loadingPicture, setLoadingPicture ] = useState(isloadImage);
  const year = new Date(release_date);
  const [icon, setIcon] = React.useState(<FavoriteBorderIcon />);
  const dispatch = useDispatch();

  const foreignType = type === 'TV Series' ? 'tv' : 'movie';

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
    <div className='result_movie_card' key={id}>
      {contentType === "foreign" ? (
        <>
        {hasLink ?
          <Link to={`/${foreignType}/stream_dashboard?mediaId=${id}`}>
            <Suspense fallback={<Skeleton className="img-card-result-skeleton" sx={{ bgcolor: 'grey.900' }} style={{marginTop: '-19px'}} variant="rectangular" />}>
              <MovieCard src={img} title={title} />
            </Suspense>
          </Link>
          : 
          <Suspense fallback={<Skeleton className="img-card-result-skeleton" sx={{ bgcolor: 'grey.900' }} style={{marginTop: '-19px'}} variant="rectangular" />}>
            <MovieCard src={img} title={title} />
          </Suspense>
        }
        </>
      ) : (
        <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
          <Suspense fallback={<Skeleton className="img-card-result-skeleton" sx={{ bgcolor: 'grey.900' }} style={{marginTop: '-19px'}} variant="rectangular" />}>
            <MovieCard src={img} title={title} />
          </Suspense>
        </Link>
      )}

      <div className="movie_card_fav" onClick={() => FavHanlder()} hidden>
        {icon}
      </div>

      {video_quality === "" || video_quality === null || video_quality === undefined ?
        ''
        : <div className="vidq">
          {video_quality}
        </div>}

      <div className='movies__info inn' style={{ marginTop: '-8px' }}>
        <div className="movie__name">
          <Typography variant="h3" className="movie_result_name" title={title}>{title}</Typography>
        </div>
        <div className="movie__other">
          <p>
            <span>
              {contentType === "anime" ? 
              <>
                { release_date || "" }
              </> : <>
                { year?.getFullYear() || "" }
              </>}
              {(release_date && season) || (release_date && episode) ? ' · ' : ''}
              <>{season === undefined || season === null ? '' : "SS " + season}</>
              {(season && episode) ? ' · ' : ''}
              {parseInt(episode) > 1 && (
                <>{episode === undefined ? "" : "EPS " + episode}</>
              )}
              {/* <StarIcon /> */}
            </span>
          </p>
          {type === null || type === undefined ? '' : <p>{type}</p>}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
