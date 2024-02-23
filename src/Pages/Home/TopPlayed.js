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
import { onePieceBanner, onePieceNetflixBanner, yuYuHakushoBanner } from "../../Config/images.config";

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
                            <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: '550' }}><LiveTvIcon sx={{ fontSize: 28, marginBottom: '-4px' }}/> MOST WATCHED</Typography>
                        </center>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <center>
                            <Slider {...top_played_carousel_settings} style={{ maxWidth: '800px' }}>
                                <Fragment>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            Watch the latest One Piece: Egghead Arc.
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Link className='text-link-without-underline' to={`anime/stream_dashboard?mediaId=21`}>
                                                <div class="image-container">
                                                    <img src={`${onePieceBanner}`} alt={''} width={'auto'} effect="blur" style={{ borderRadius: 10 }} />
                                                    <div class="overlay" title='Play'>
                                                        <PlayCircleIcon sx={{ fontSize: '60px' }}/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                                <Fragment>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            Watch the first season of One Piece live action.
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Link className='text-link-without-underline' to={`drama/stream_dashboard?mediaId=drama/one-piece`}>
                                                <div class="image-container">
                                                    <img src={`${onePieceNetflixBanner}`} alt={''} width={'auto'} effect="blur" style={{ borderRadius: 10 }} />
                                                    <div class="overlay" title='Play'>
                                                        <PlayCircleIcon sx={{ fontSize: '60px' }}/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                                <Fragment>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            Watch the first season of Yu Yu Hakusho live action.
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Link className='text-link-without-underline' to={`drama/stream_dashboard?mediaId=drama/yu-yu-hakusho`}>
                                                <div class="image-container">
                                                    <img src={`${yuYuHakushoBanner}`} alt={''} width={'auto'} effect="blur" style={{ borderRadius: 10 }} />
                                                    <div class="overlay" title='Play'>
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
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/xPyJ2XhSKOI?si=nMJ_g1G-s8cNMw7m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </center>
                    </Grid>

                </Grid>
            </div>
        </ThemeProvider>
    );
};

export default TopPlayed;