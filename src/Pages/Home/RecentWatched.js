import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

// React Slick
import Slider from "react-slick";

// Sweet Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Container, Grid, Box, Typography, IconButton, Badge } from '@mui/material';

// Icons
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@material-ui/icons/Pause';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Components
import RecentMediaCard from "../../Components/LazyImageComponent/RecentMediaCard";

// Settings
import { recent_watch_carousel_settings, maxMediaSaved } from "../../Config/settings.config";

// Helpers
import { deleteCookie } from "../../Helpers/Cookies";
import { encryptParams } from "../../Helpers/Crypto";

// Utils
import { getAllSavedCookiesMedia, secondsToHMS, convertSecondsToHoursAndMinutes } from "../../Services/Utils";

const RecentWatched = ({ title = true, loadSavedMedia }) => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const [prevWatch, setPrevWatch] = useState([]);

    const loadRecentMediaData = () => {
        const savedMedia = getAllSavedCookiesMedia();
        setPrevWatch(savedMedia);
    }

    const deleteRecentMedia = (mediaId, title) => {
        withReactContent(Swal).fire({
            background: 'rgba(0, 10, 20, 255)',
            title: `<p style='color: #ccced1; font-size: 18px;'>Are you sure you want to remove?<br/>${title}</p>`,
            icon: "warning",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonColor: '#3B71CA',
            cancelButtonColor: '#DC4C64',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCookie(encodeURIComponent(mediaId));
                loadRecentMediaData();
                if (typeof loadSavedMedia === 'function') loadSavedMedia();
              // withReactContent(Swal).fire("Saved!", "", "success");
            } else if (result.isDismissed) {
              // withReactContent(Swal).fire("Changes are not saved", "", "info");
              return false;
            }
        });
    }

    useEffect(() => {
        loadRecentMediaData();
      }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container className='recent-watched' maxWidth={'xl'}>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>

                    {title && 
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="h5" className='text-white' sx={{ marginBottom: 1, fontWeight: '550' }}><LiveTvIcon style={{ fontSize: 28, marginBottom: '-2px' }}/> CONTINUE ({prevWatch.length}/{maxMediaSaved})</Typography>
                        </Grid>
                    }

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        {prevWatch.length > 0 ? 
                            <Slider {...recent_watch_carousel_settings}>
                                {prevWatch.map((item, index) => {

                                    var mediaLink;
                                    switch (item?.category) {
                                        case 'movie':
                                            // mediaLink = `/watch/${item?.mediaId}?server=${item?.server === 'upcloud' ? '1' : '2'}`;
                                            mediaLink = `/${item?.category}/stream_dashboard?mediaId=${item?.mediaId}`;
                                            break;

                                        case 'tv':
                                            // mediaLink = `/watch/${item?.mediaId}?season=${item?.seasonNumber}&episode=${item?.episodeId}&server=${item?.server === 'upcloud' ? '1' : '2'}`;
                                            mediaLink = `/${item?.category}/stream_dashboard?mediaId=${item?.mediaId}`;
                                            break;
                                        
                                        case 'anime':
                                            // mediaLink = `/watch/${item?.category}/${item?.mediaId}?dub=false&episode=${item?.episodeId}`;
                                            mediaLink = `/${item?.category}/stream_dashboard?mediaId=${item?.mediaId}`;
                                            break;
                                    
                                        default:
                                            // mediaLink = `/watch/${item?.category}/${item?.mediaId}?episode=${item?.episodeId}`;
                                            mediaLink = `/${item?.category}/stream_dashboard?mediaId=${item?.mediaId}`;
                                            break;
                                    }

                                    return (
                                        <Fragment key={index}>
                                            <Box className='movie_card_with_close' key={item?.mediaId}>
                                                <Badge badgeContent={<CloseIcon onClick={() => deleteRecentMedia(item?.mediaId, item?.title)} style={{ fontSize: '14px', cursor: 'pointer' }} title='Remove'/>} color="error">
                                                    <Link to={mediaLink}>
                                                        <RecentMediaCard src={item?.image} title={item?.title}/>
                                                    </Link>
                                                </Badge>

                                                <div className="fav" style={{ color: '#ccced1', fontSize: '14px', borderRadius: '10px 0 10px 0' }}>
                                                    <PauseIcon style={{ fontSize: '16px', marginBottom: '-3px' }}/>{' '}
                                                    {(item?.category === 'tv' || item?.category === 'anime') ? (item?.category === 'tv' ? `S${item?.seasonNumber} / ` : '') + `EP${item?.episodeNumber}` : secondsToHMS(item?.time)}<br/>
                                                    {(item?.category === 'tv' || item?.category === 'anime') && 
                                                        <Fragment>
                                                            <AccessTimeIcon style={{ fontSize: '16px', marginBottom: '-3px' }}/> {secondsToHMS(item?.time)}
                                                        </Fragment>
                                                    }
                                                </div>

                                                {item?.quality && 
                                                    <div className="vidq">
                                                        {item?.quality}
                                                    </div>
                                                }

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
                        :
                            <Typography variant="span" className='text-white'>No result found.</Typography>
                        }
                    </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default RecentWatched;