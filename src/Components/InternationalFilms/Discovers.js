//import { YoutubeSearchedFor } from "@mui/icons-material";
import React, { Suspense } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Typography, Box, Skeleton } from "@mui/material";

// CSS
import "./css/Discovers.css";

// Icons
import Button from '@mui/material/Button';

// Utilities
import { SeparateArrayButtons } from "../../Services/Utils";

// Components
import MovieCarousel from "../LazyImageComponent/MovieCarousel";

function Discovers({ banner, title, des, id, year, season, genres, slug, video_quality, urlContentSubType}) {

  let displaySeason = "";

  if (urlContentSubType === "tv") {
    displaySeason = season === "SS 1" ? 'Season ' + season.replace("SS ", "") : 'Season 1 to ' + season.replace("SS ", ""); 
  }

  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };
  
  return (
      <div className="discovers" key={id}>
      
        <div className="discover__img">
          <Suspense fallback={<Skeleton className="img-carousel-skeleton" sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" />}>
            <MovieCarousel src={banner} title={title} category="movie" />
          </Suspense>
        </div>
        
        <div className="discover__content">
          <div className="discover__left">
            <Typography variant="p" className="carousel_movie_name">
              {title} <span>{urlContentSubType === "movie" && '(' + year.split("-")[0] + ')'}</span>
            </Typography>
            <Typography variant="p" sx={{ display: { xs: 'none', lg: 'flex' }, marginTop: '10px' }}>
              <span style={{ padding: '8px 5px', borderRadius: 5 }}>
                <SeparateArrayButtons type={'site_link'} color={''} data={genres} link={'/foreign/genre_filter?genre='} />
              </span>
            </Typography>
            <Typography display={{ xs: 'none', md: 'flex' }} style={{marginTop: '5px'}}>{des ? truncate(des, 250) : '-'}</Typography>
            <div className="button__box">
              <Link to={`/${urlContentSubType}/stream_dashboard?mediaId=${id}`}>
                <Button style={{fontWeight: '550'}} variant="contained" size="small">Watch {urlContentSubType === "tv" && displaySeason}{urlContentSubType === "movie" && ' in' }<span style={urlContentSubType === "movie" ? { marginLeft: '5px', backgroundColor: 'rgba(0, 0, 0, 0.80)', padding: '0 5px 0 5px', borderRadius: '5px' } : {}}>{urlContentSubType === "movie" && video_quality}</span></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Discovers;
