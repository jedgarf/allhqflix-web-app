import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

// React Slick
import Slider from "react-slick";

// Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Grid, Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

// Icons
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// Components
import RecentMediaCard from "../../Components/LazyImageComponent/RecentMediaCard";

// Settings
import { recent_watch_carousel_settings } from "../../Config/settings.config";

// Utils
import { getAllSavedCookiesMedia, secondsToHMS, convertSecondsToHoursAndMinutes } from "../../Services/Utils";

const TopPlayed = () => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const [prevWatch, setPrevWatch] = useState([]);

    useEffect(() => {
        const savedMedia = getAllSavedCookiesMedia();
        setPrevWatch(savedMedia.length > 0 ? savedMedia : []);
      }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className='notes' style={{ display: prevWatch.length > 0 ? 'block' : 'none' }}>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <center>
                            <Typography variant="h5" className='text-white' sx={{ marginBottom: 1, fontWeight: '550' }}><LiveTvIcon sx={{ fontSize: 28, marginBottom: '-4px' }}/> RECENTLY WATCHED</Typography>
                        </center>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <center>
                            <Box>
                                <Slider {...recent_watch_carousel_settings}>
                                    {prevWatch.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <Box className='movie_card' key={item?.mediaId}>
                                                    <Link to={`/${item?.category}/stream_dashboard?mediaId=${item?.mediaId}`}>
                                                        <RecentMediaCard src={item?.image} title={item?.title}/>
                                                    </Link>

                                                    <div className="fav" style={{ color: '#ccced1', fontSize: '14px', borderRadius: '10px 0 10px 0' }}>
                                                        {secondsToHMS(item?.time)}
                                                    </div>

                                                    <div className="vidq">
                                                        {item?.quality}
                                                    </div>

                                                    <div className={'movies__info inn'}>
                                                        <div className="movie__name" style={{ marginTop: '-3px' }}>
                                                            <Typography variant="h3" className="movie_name" title={item?.title}>{item?.title}</Typography>
                                                        </div>
                                                        <div className="movie__other">
                                                            
                                                            <p>
                                                                {item?.category === 'movie' ? 
                                                                    <span>
                                                                        {item?.duration ? `${convertSecondsToHoursAndMinutes(item?.duration)} ` : ''}
                                                                    </span>
                                                                : 
                                                                    <span>
                                                                        {item?.seasonNumber ? `S${item?.seasonNumber} ` : ''}
                                                                        {item?.episodeNumber ? `EP${item?.episodeNumber} ` : ''}
                                                                    </span>
                                                                }
                                                            </p>
                                                            <p>{item?.category}</p>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </Fragment>
                                        )
                                    })}
                                </Slider>
                            </Box>
                        </center>
                    </Grid>

                </Grid>
            </div>
        </ThemeProvider>
    );
};

export default TopPlayed;