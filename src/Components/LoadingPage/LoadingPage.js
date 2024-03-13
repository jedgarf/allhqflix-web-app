import React from 'react';
import './css/styles.css';

import { Typography, LinearProgress } from "@mui/material";

// Images
import { mainLogo, homeBackground } from "../../Config/images.config";

const LoadingPage = () => {
  return (
    <div className="loading-page"style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url("${homeBackground}")`, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-image-container">
        <center>
          <div className='page-loading-logo'>
            <img
              src={mainLogo}
              alt="Placeholder"
              className="page-zoom-in-out"
            />
          </div>
          <div className='page-loading-linear-progress'>
            <LinearProgress />
          </div>
          <div className='page-loading-text-div'>
            <Typography className='page-loading-text' variant="p">Please wait...</Typography>
          </div>
        </center>
      </div>
    </div>
  );
};

export default LoadingPage;
