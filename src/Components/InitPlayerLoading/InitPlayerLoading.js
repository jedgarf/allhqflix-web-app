import React from 'react';
import './css/InitPlayerLoading.css';

import { Typography, LinearProgress } from "@mui/material";

// Images
import { mainLogo } from "../../Config/images.config";

const LoadingPage = ({ text }) => {
  return (
    <div className="movie_player">
      <div className="player-page-image-container">
        <center>
          <div className='player-page-loading-logo'>
            <img
              src={mainLogo}
              alt="Placeholder"
              className="player-page-zoom-in-out"
            />
          </div>
          <div className='player-page-loading-linear-progress'>
            <LinearProgress />
          </div>
          <div className='player-page-loading-text-div'>
            <Typography className='player-page-loading-text' variant="p">{text || 'Initializing Player...'}</Typography>
          </div>
        </center>
      </div>
    </div>
  );
};

export default LoadingPage;
