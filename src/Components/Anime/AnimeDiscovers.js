//import { YoutubeSearchedFor } from "@mui/icons-material";
import React, { Suspense } from "react";
import { Typography, Skeleton } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

// CSS
import "./css/AnimeDiscovers.css";

// Icons
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LiveTvTwoToneIcon from '@mui/icons-material/LiveTvTwoTone';

// Utilities
import { SeparateArrayButtons } from "../../Services/Utils";

// Components
import MovieCarousel from "../LazyImageComponent/MovieCarousel";

function AnimeDiscovers({ banner, title, des, id, year, season, genres, episode, slug}) {

  const contentType = "anime";

  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };
  
  return (
      <div className="discovers" key={id}>
      
        <div className="discover__img">
          <Suspense fallback={<Skeleton className="img-carousel-skeleton" sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" />}>
            <MovieCarousel src={banner} title={title} category="anime" />
          </Suspense>
        </div>
        
        <div className="discover__content">
          <div className="discover__left">
            <Typography variant="p" className="carousel_movie_name">
              {truncate(title, 100)}
            </Typography>
            <Typography variant="p" sx={{ display: { xs: 'none', lg: 'flex' }, marginTop: '10px' }}>
              <span style={{ backgroundColor: 'rgba(0, 0, 0, 0.50)', padding: '8px 5px', borderRadius: 5 }}>
                <SeparateArrayButtons type={'site_link'} color={'primary'} data={genres} link={'/anime/genre_filter?genre='} />
              </span>
            </Typography>
            <Typography display={{ xs: 'none', sm: 'flex' }} style={{marginTop: '5px'}}>{truncate(des, 250)}</Typography>
            <div className="button__box">
              <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}>
                <Button style={{fontWeight: '550'}} variant="contained" size="small">Watch {parseInt(episode) > 1 ? `${episode} EPISODES` : ''}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AnimeDiscovers;
