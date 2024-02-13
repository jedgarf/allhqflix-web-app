//import { YoutubeSearchedFor } from "@mui/icons-material";
import React from "react";
import { Typography } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LiveTvTwoToneIcon from '@mui/icons-material/LiveTvTwoTone';

import "./css/AsianDramaDiscovers.css";
import {Link} from 'react-router-dom';
import GenreRow from "../GenreRow/GenreRow";

function AsianDramaDiscovers({ banner, title, des, id, year, season, genres, episode, slug}) {
  
  const contentType = "drama-detail";
  
  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };
  
  return (
      <div className="discovers" key={id}>
      
        <div className="discover__img">
          <img src={`${banner}`} alt={title} />
        </div>
        
        <div className="discover__content">
          <div className="discover__left">
            <Typography variant="p">
              {truncate(title, 100)} 
              {/* <span>({year || season})</span> */}
            </Typography>
            {episode !== undefined ?
              <p>{parseInt(episode) > 0 ? "EPS " + episode : "No Episode Available"}</p>
             : ''}
            {/* <div className="discover__genres">
              {genres?.slice(0, 5).map(function(object, i){
                  return <GenreRow obj={object} key={i} />;
              })}
            </div> */}
            <Typography display={{ xs: 'none', sm: 'flex' }} style={{marginTop: '10px'}}>{truncate(des, 250)}</Typography>
            <div className="button__boxs" style={{marginTop: '15px', marginBottom: '30px'}}>
              <Link to={`/${contentType}/stream_dashboard?mediaId=${id}`}><Button className="btn1s" style={{fontWeight: '550'}} variant="contained" size="small" startIcon={<LiveTvTwoToneIcon />}>Watch</Button></Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AsianDramaDiscovers;
