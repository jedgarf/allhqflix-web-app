import React, { Fragment } from 'react';

// Material UI Themes 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Box, Rating } from '@mui/material';

// Material UI Icons
import StarIcon from '@mui/icons-material/Star';

const StarRating = ({ value }) => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const percentValue = (value / 100) * 5; // Convert 0-100 scale to 0-5 scale for Rating component
    return (
        <Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Rating 
                    size='small' 
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} 
                    name="movie-rating" 
                    value={percentValue} 
                    precision={0.1} 
                    readOnly
                />
            </ThemeProvider>
        </Fragment>
    );
};

export default StarRating;