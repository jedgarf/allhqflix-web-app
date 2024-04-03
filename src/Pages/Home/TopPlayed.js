import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// React Slick
import Slider from "react-slick";

// Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Grid, Typography } from "@mui/material";

// Icons
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// Images
import { strangerThingsBanner, allOfUsAreDeadBanner, onePieceBanner, onePieceNetflixBanner, yuYuHakushoBanner } from "../../Config/images.config";

// Settings
import { top_played_carousel_settings } from "../../Config/settings.config";

const TopPlayed = () => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className='notes'>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <center>
                            <Typography variant="h5" className='text-white' sx={{ marginBottom: 1, fontWeight: '550' }}><LiveTvIcon sx={{ fontSize: 28, marginBottom: '-4px' }}/> MOST WATCHED</Typography>
                        </center>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <center>
                            <Slider {...top_played_carousel_settings} style={{ maxWidth: '800px' }}>
                                <Fragment>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2} style={{ marginInline: '1px' }}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='text-white'>
                                            <span style={{ fontSize: 'clamp(13px, 2vw, 20px)' }}>Watch Stranger Things Season 1 to 4.</span>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Link className='text-link-without-underline' to={`tv/stream_dashboard?mediaId=tv/watch-stranger-things-39444`}>
                                                <div className="image-container">
                                                    <img src={`${strangerThingsBanner}`} alt={''} width={'auto'} effect="blur" style={{ borderRadius: 10 }} />
                                                    <div className="overlay" title='Play'>
                                                        <PlayCircleIcon sx={{ fontSize: '60px' }}/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                                <Fragment>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2} style={{ marginInline: '1px' }}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='text-white'>
                                            <span style={{ fontSize: 'clamp(13px, 2vw, 20px)' }}>Watch All of Us Are Dead Season 1.</span>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Link className='text-link-without-underline' to={`tv/stream_dashboard?mediaId=tv/watch-all-of-us-are-dead-76681`}>
                                                <div className="image-container">
                                                    <img src={`${allOfUsAreDeadBanner}`} alt={''} width={'auto'} effect="blur" style={{ borderRadius: 10 }} />
                                                    <div className="overlay" title='Play'>
                                                        <PlayCircleIcon sx={{ fontSize: '60px' }}/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                                <Fragment>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2} style={{ marginInline: '1px' }}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='text-white'>
                                            <span style={{ fontSize: 'clamp(13px, 2vw, 20px)' }}>Watch the latest One Piece: Egghead Island Arc.</span>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Link className='text-link-without-underline' to={`anime/stream_dashboard?mediaId=21`}>
                                                <div className="image-container">
                                                    <img src={`${onePieceBanner}`} alt={''} width={'auto'} effect="blur" style={{ borderRadius: 10 }} />
                                                    <div className="overlay" title='Play'>
                                                        <PlayCircleIcon sx={{ fontSize: '60px' }}/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                                <Fragment>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2} style={{ marginInline: '1px' }}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='text-white'>
                                            <span style={{ fontSize: 'clamp(13px, 2vw, 20px)' }}>Watch the first season of One Piece live action.</span>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Link className='text-link-without-underline' to={`tv/stream_dashboard?mediaId=tv/watch-one-piece-99826`}>
                                                <div className="image-container">
                                                    <img src={`${onePieceNetflixBanner}`} alt={''} width={'auto'} effect="blur" style={{ borderRadius: 10 }} />
                                                    <div className="overlay" title='Play'>
                                                        <PlayCircleIcon sx={{ fontSize: '60px' }}/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                                <Fragment>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2} style={{ marginInline: '1px' }}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='text-white'>
                                            <span style={{ fontSize: 'clamp(13px, 2vw, 20px)' }}>Watch the first season of Yu Yu Hakusho live action.</span>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Link className='text-link-without-underline' to={`tv/stream_dashboard?mediaId=tv/watch-yu-yu-hakusho-103906`}>
                                                <div className="image-container">
                                                    <img src={`${yuYuHakushoBanner}`} alt={''} width={'auto'} effect="blur" style={{ borderRadius: 10 }} />
                                                    <div className="overlay" title='Play'>
                                                        <PlayCircleIcon sx={{ fontSize: '60px' }}/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                            </Slider>
                        </center>
                    </Grid>
                    <Grid item xl={6} lg={6} md={12} sm={12} xs={12} hidden>
                        <center>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/xPyJ2XhSKOI?si=nMJ_g1G-s8cNMw7m" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </center>
                    </Grid>

                </Grid>
            </div>
        </ThemeProvider>
    );
};

export default TopPlayed;