import React from 'react';
import { Fab, useScrollTrigger, Zoom } from "@mui/material";

import './css/FloatingButton.css';

// icons
import NorthIcon from '@mui/icons-material/North';

// Utilities
import { moveToTop } from "../../Services/Utils";

const FloatingButton = () => {

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100, // Show button when user scrolls down 100 pixels
  });

  const scrollToTop = () => {
    moveToTop();
  };

  return (
    <Zoom in={!trigger}>
      <div onClick={scrollToTop} role="presentation">
        <Fab 
          color="primary"
          size="small"
          aria-label="scroll back to top"
          style={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <NorthIcon sx={{ fontSize: 20 }}/>
        </Fab>
      </div>
    </Zoom>
  );
};

export default FloatingButton;
