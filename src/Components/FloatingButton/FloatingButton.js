import React, { useEffect, useState } from 'react';
import { Slide, Box } from "@mui/material";
import useScrollTrigger from '@mui/material/useScrollTrigger';

import './css/FloatingButton.css';

// icons
import NorthIcon from '@mui/icons-material/North';

// Utilities
import { moveToTop } from "../../Services/Utils";

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Box>{children}</Box>
    </Slide>
  );
};

const FloatingButton = () => {

  const scrollToTop = () => {
    moveToTop();
  };

  return (
    <HideOnScroll>
      <button className="floating-button" onClick={scrollToTop}>
        <NorthIcon sx={{ fontSize: 20 }}/>
      </button>
    </HideOnScroll>
  );
};

export default FloatingButton;
