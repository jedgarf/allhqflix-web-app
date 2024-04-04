import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

// React Query
import { useQuery } from 'react-query';

// sanitize DOM
import DOMPurify from 'dompurify';

import { Grid, Skeleton, Box, Typography, Button, CircularProgress } from '@mui/material';

// Package for date and time formatter
import moment from 'moment';

// CSS
import './StreamDashboard.css';

// Icons
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BuildIcon from '@mui/icons-material/Build';

// Components
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import ShareModal from "../../Components/Modal/ShareModal";
import TraillerModal from "../../Components/Modal/TraillerModal";
import SnackBar from "../../Components/SnackBar/SnackBar";
import { MoviePlayModal, SeriesPlayModal } from "../../Components/Modal/PlayModal";
import LanguageListTooltip from '../../Components/Tooltip/LanguageListTooltip';
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";
import CookiesConsentDialog from "../../Components/CookiesConsentDialog/CookiesConsentDialog";

// Config
import { pageLoadMS, defaultInternationalServer } from "../../Config/settings.config";
import { homeBackground } from "../../Config/images.config";

// Utils
import { streamDashboardBackButton, SeparateArrayByComma, separatedSeasons, ObjectLength, convertMinutesToHoursAndMinutes, getNumberSuffix } from "../../Services/Utils";

// Services
import { movie_info, movie_server, movie_stream_links } from "../../Services/FlixHQService";

const MovieStreamDashboard = (props) => {
    
    const media = type === "tv" ? "tvshow" : "movies";
    const { type } = useParams();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);
    const indexId = queryParams.get("mediaId").replace("ttps://flixhq.pe/", "");
    const isShare = queryParams.get("share");

    const [isLoading, setIsLoading] = useState(true);
    const [BGImage, setBGImage] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    const selectedServer = queryParams.get("server") ? queryParams.get("server") : null;

    const [seasonIdVar, setSeasonIdVar] = useState(1);
    const [episodeIdVar, setEpisodeIdVar] = useState(null);
    const [serverVar, setServerVar] = useState(selectedServer);
    const [rabbitStreamId, setRabbitStreamId] = useState(null);
    const [hasPlayButton, setHasPlayButton] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    // alert variable
    const [snackBarType, setSnackBarType] = useState("info");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarWithLoading, setSnackBarWithLoading] = useState(false);

    var subtitleCount = 0;

    const handleSnackBarOpen = (event, reason) => {
        setSnackBarType("");
        setSnackBarOpen(false);
        setSnackBarWithLoading(false);
    };

    // info
    let infoData = useQuery(['movie_info', { indexId }], movie_info, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        enabled: indexId !== null,
        onSuccess: (response) => {
            setSeasonIdVar(response.data.episodes.length > 0 ? response.data.episodes[0].season : undefined);
            setEpisodeIdVar(response.data.episodes.length > 0 ? response.data.episodes[0].id : undefined);
        },
        onError: (error) => {
            setSnackBarType('error');
            setSnackBarMessage(`${error.response.data.message}.`);
            setSnackBarOpen(true);
            setSnackBarWithLoading(false);
        }
    });

    let infoValue = infoData?.data?.data;
    let seasons = [];
    
    if (infoData.isSuccess) {
        if (type === 'tv' || type === 'tvshow') seasons = separatedSeasons(infoValue?.episodes, 'season');
    }

    // servers
    let serverData = useQuery(['movie_server', { episodeIdVar, indexId }], movie_server, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        enabled: indexId !== null && episodeIdVar !== null,
        onSuccess: (response) => {
            const defaultServer = response.data.filter(item => item.name === defaultInternationalServer).length > 0 ? response.data.filter(item => item.name === defaultInternationalServer)[0]?.name : response.data[0]?.name;
            const rabbitstreamId = response.data.filter(item => item.name === defaultInternationalServer).length > 0 ? response.data.filter(item => item.name === defaultInternationalServer)[0]?.rabbitstream_id : response.data[0]?.rabbitstream_id;
            setServerVar(serverVar || defaultServer);  
            setRabbitStreamId(rabbitStreamId || rabbitstreamId);
            setHasPlayButton(true);
        },
        onError: (error) => {
            let message = `No Server Available.`;
            setSnackBarType('error');
            setSnackBarMessage(message);
            setSnackBarOpen(true);
            setSnackBarWithLoading(false);
            setErrorMessage(message.toUpperCase());
        }
    });

    let serverValue = serverData?.data;

    // movie link
    let resourceData = useQuery(['movie_stream_links', {episodeIdVar, indexId, serverVar, rabbitStreamId}], movie_stream_links, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        retry: 2, // Number of retries
        enabled: indexId !== null && episodeIdVar !== null && serverVar !== null && rabbitStreamId !== null,
        onError: (error) => {
            // error.response.status = http code
            // error.response.data.message = api message
            let message = "";
            if (error?.response?.status == 500) {
                setSnackBarType('error');
                setSnackBarMessage(`Server problem occurred, please try again later`);
                setSnackBarOpen(true);
                setSnackBarWithLoading(false);
            } else if (error?.response?.status == 504){
                message = `Under Maintenance`;
                setSnackBarType('error');
                setSnackBarMessage(message);
                setSnackBarOpen(true);
                setSnackBarWithLoading(false);
            } else {
                setSnackBarType('error');
                setSnackBarMessage(`Source link not available in current server, please switch to another server`);
                setSnackBarOpen(true);
                setSnackBarWithLoading(false);
            }

            setErrorMessage(message.toUpperCase());
        }
    });
    
    let resourceValue = undefined;
    if (resourceData.isSuccess) resourceValue = resourceData?.data;

    //choose the screen size 
    const handleResize = useCallback(() => {
        if (window.innerWidth < 720) {
            setBGImage(infoValue?.image);
            setIsMobile(true);
        } else {
            setBGImage(infoValue?.cover);
            setIsMobile(false);
        }
    }, [infoValue?.image, infoValue?.cover]);

    const handleBackgroundImageError = () => setBGImage(homeBackground);

    useEffect(() => {

        if (infoData.isSuccess) {
            document.title = type === 'tv' ? `AllHQFlix - ${ infoValue?.title }` : `AllHQFlix - ${ infoValue?.title }`;
            handleResize();
        }

        if (infoData.isLoading) setBGImage(homeBackground);

        // if (infoData.isLoading || serverData.isLoading || resourceData.isLoading) {
        //     setSnackBarType('info');
        //     setSnackBarMessage(`Please wait while fetching all resources.`);
        //     setSnackBarOpen(true);
        //     setSnackBarWithLoading(true);
        // };

        setTimeout(() => {
            setIsLoading(false);
        }, pageLoadMS);

    }, [type, handleResize, infoData.isSuccess, infoValue?.title, resourceData.isLoading, infoData.isLoading, serverData.isLoading]);

    return (
        isLoading ? <LoadingPage/>
        : 
        <Fragment>
            <ReactQueryTools/>
            <div style={{backgroundImage: isMobile ? `linear-gradient(rgba(15, 22, 34, 0.527),rgba(15, 22, 34, 0.5)), url("${BGImage}"), url("${homeBackground}")` : `linear-gradient(to right, rgba(15, 22, 34, 0.85) 30%, rgba(15, 22, 34, 0.5) 70%), url("${BGImage}"), url("${homeBackground}")`, objectFit: 'cover', backgroundSize: ' 100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%'}} 
                onError={handleBackgroundImageError}>
                <SnackBar severity={snackBarType} handleSnackBarOpen={handleSnackBarOpen} status={snackBarOpen} snackBarMessage={snackBarMessage} withLoading={snackBarWithLoading} />
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={1} justifyContent="center">
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button onClick={() => streamDashboardBackButton(navigate, media, isShare)}>
                            <ArrowBackTwoToneIcon sx={{ fontSize: { xs: '35px', sm: '40px' }, margin: '10px', color: '#DC4C64' }}/>
                        </Button>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ marginTop: 8, marginRight: 0, textAlign: 'right' }}>
                        <Link to={`/`}>
                            <img alt='logo' src={process.env.PUBLIC_URL + "/images/multimedia_hub_logo.png"} style={{ width: '90px' }} />
                        </Link>
                    </Grid>
                </Grid>
                {infoData.isLoading || serverData.isLoading
                ? 
                <Box className='stream-dashboard-content' sx={{ pl: 3, pr: 3, pt: 3, width: {xs: '100%', sm: '100%', md: '60%'} }} style={{ backgroundColor: isMobile ? 'rgba(15, 22, 34, 0.5)' : 'transparent' }}>
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="60px" width="60%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="40px" width="30%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="40px" width="100%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="40px" width="100%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="40px" width="100%" />

                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" />
                    <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" /><br/>
                    <Skeleton animation="pulse" variant="rectangular" sx={{ bgcolor: '#54B4D3', width: {xs: '30%', sm: '30%', md: '40%'} }} height="40px" />
                </Box>
                : 
                <div className='stream-dashboard-content' style={{ backgroundColor: isMobile ? 'rgba(15, 22, 34, 0.5)' : 'transparent' }}>
                    <div className='stream-dashboard-title'>
                    <h1 style={{ marginBottom: '7px' }}>{infoValue?.title}</h1>
                    {type === 'tv' ?
                    <label className='stream-dashboard-servername'>
                        <span className='videoq-span' style={{ backgroundColor: 'transparent', fontWeight: 'bolder', border: '1px solid white', padding: '1px', marginRight: '9px' }}>{infoValue?.video_quality}</span>
                            | {ObjectLength(seasons) > 1 ? 'Season 1 to ' + ObjectLength(seasons) : 'Season 1'} | <ShareModal infoValue={infoValue}/>
                    </label>
                        : 
                    <label className='stream-dashboard-servername'>
                        <span className='videoq-span' style={{ backgroundColor: 'transparent', fontWeight: 'bolder', border: '1px solid white', padding: '1px', marginRight: '9px' }}>{infoValue?.video_quality}</span> 
                        | {convertMinutesToHoursAndMinutes(infoValue?.duration.replace('min', ''))} |<ShareModal infoValue={infoValue}/>
                        </label> }
                    </div>
                    {infoValue?.description.replace(/\s+/g,'') !== "" ?
                    <div className='stream-dashboard-description' title={DOMPurify.sanitize(infoValue?.description).trim()}>{DOMPurify.sanitize(infoValue?.description).trim()}</div>
                        : <div className='stream-dashboard-description'>{`-`}</div>}

                    <div className='stream-dashboard-description-details'>
                        <b style={{ color: '#DC4C64', marginRight: '5px' }}>Released Date:</b> 
                        {infoValue?.releaseDate !== undefined ? moment(infoValue?.releaseDate).format('MMMM D, YYYY') : ''}
                        <br/>
                        <b style={{ color: '#DC4C64', marginRight: '5px' }}>Country:</b> 
                        <Link className='text-link' style={{ cursor: 'pointer' }} title={ infoValue?.country } to={`/foreign/country_filter?country=${infoValue?.country}`}>{ infoValue?.country }</Link>
                        <br/>
                        {infoValue?.casts?.length > 0 ?
                            <div>
                                <b style={{ color: '#DC4C64', marginRight: '5px' }}>Main Casts:</b>
                                <SeparateArrayByComma type={'google_link'} data={infoValue?.casts} link={'https://www.google.com/search?q='} />
                                <br/>
                            </div>
                        : ""}
                            
                        {infoValue?.genres?.length > 0 ?
                            <div>
                                <b style={{ color: '#DC4C64', marginRight: '5px' }}>Genres:</b>
                                <SeparateArrayByComma type={'site_link'} data={infoValue?.genres} link={'/foreign/genre_filter?genre='} />
                                <br/>
                            </div>
                        : ""}
                        {type === 'movie' && resourceData.isSuccess && resourceValue?.data?.sources?.filter((item) => item.quality !== "auto").length > 0 ?
                            <div>
                                <b style={{ color: '#DC4C64', marginRight: '5px' }}>Video Resolutions:</b> 
                                {resourceValue.data.sources.filter((item) => item.quality !== "auto").reverse().map((item, i) => {
                                    return (
                                    <span key={i}>
                                    { (i === 0 ? "" : ", ") + item.quality }p
                                    </span>
                                    );
                                })}
                                <br/>
                            </div>
                            : ""}
                            {type === 'movie' && resourceData.isSuccess ?
                            <div style={{ fontStyle: 'italic' }}>
                                {resourceValue?.data?.subtitles?.map((item, i) => {
                                    subtitleCount++;
                                })}
                                { subtitleCount > 0 ? `${subtitleCount} ${subtitleCount > 1 ? "subtitles available." : "subtitle available."}` : "No available subtitle." }
                                <br/>
                            </div>
                            : ""}
                    </div>
                    {infoData.isSuccess && infoValue?.episodes?.length > 0 ? ""
                    : 
                        <div className='stream-dashboard-season-episode'>
                            <Typography variant="subtitle1" style={{ verticalAlign: 'middle', display: 'inline-flex', fontWeight: 'bolder', backgroundColor: 'rgba(105, 105, 105, 0.4)', color: '#ccced1', paddingInline: 10, paddingBlock: 5, borderRadius: 20 }}>
                                <WarningAmberTwoToneIcon style={{ marginRight: '8px', color: "#DC4C64", fontSize: 30 }}/> No episode available
                            </Typography>
                        </div>
                    }
                    {errorMessage && 
                        <div className='stream-dashboard-season-episode'>
                            <Typography variant="subtitle1" style={{ verticalAlign: 'middle', display: 'inline-flex', fontWeight: 'bolder', backgroundColor: 'rgba(105, 105, 105, 0.4)', color: '#ccced1', paddingInline: 10, paddingBlock: 5, borderRadius: 20 }}>
                                {/* <BuildIcon style={{ marginRight: '8px', paddingBottom: '-4px !important', color: "#DC4C64", fontSize: 18 }}/>  */}
                                {errorMessage}
                            </Typography>
                        </div>
                    }

                    <div className='stream-dashboard-playbutton'>
                        {infoData.isSuccess && <TraillerModal category="foreign" infoValue={infoValue} setSnackBarType={setSnackBarType} setSnackBarMessage={setSnackBarMessage} setSnackBarOpen={setSnackBarOpen}/>}
                        
                        {(resourceData.isLoading || !resourceValue?.data?.sources) && !resourceData.isError && 
                            <CircularProgress
                                sx={{ color: 'white', marginBottom: '-5px !important' }} 
                                size={20} 
                                thickness={5} 
                            />
                        }

                        {infoData.isSuccess && serverData.isSuccess ? 
                            infoValue?.episodes?.length > 0 && serverValue?.data?.length > 0 ? 
                                type === 'movie' ? (
                                    hasPlayButton && infoData.isSuccess && serverData.isSuccess &&
                                        <MoviePlayModal mediaInfo={infoValue} serverInfo={serverValue} resourceData={resourceData} resourceInfo={resourceValue} serverVar={serverVar} setServerVar={setServerVar} url={`/watch/${indexId}`} />
                                ) : (
                                    hasPlayButton && infoData.isSuccess && serverData.isSuccess &&
                                        <SeriesPlayModal mediaInfo={infoValue} serverInfo={serverValue} resourceData={resourceData} resourceInfo={resourceValue} serverVar={serverVar} seasonIdVar={seasonIdVar} episodeIdVar={episodeIdVar} episodes={seasons} setServerVar={setServerVar} setSeasonIdVar={setSeasonIdVar} setEpisodeIdVar={setEpisodeIdVar} url={`/watch/${indexId}`} />
                                )
                            : 
                                <Button 
                                    id="demo-customized-button"
                                    size='small'
                                    aria-controls={undefined}
                                    aria-haspopup="true"
                                    aria-expanded={undefined}
                                    variant="contained"
                                    disableElevation
                                    startIcon={<PlayCircleOutlineIcon />}
                                    style={{ marginRight: '10px' }}
                                    disabled={true}
                                >
                                PLAY
                                </Button>
                        : 
                            <Button 
                                id="demo-customized-button"
                                size='small'
                                aria-controls={undefined}
                                aria-haspopup="true"
                                aria-expanded={undefined}
                                variant="contained"
                                disableElevation
                                startIcon={<PlayCircleOutlineIcon />}
                                style={{ marginRight: '10px' }}
                                disabled={true}
                            >
                            PLAY
                            </Button>
                        }
                    </div>
                </div>
                }
            </div>
            {/* refetching count */}
            {(resourceData?.failureCount > 0 && resourceData?.failureCount <= 3) && 
                <div className="retry-display" style={{ display: ((resourceData?.isError && resourceData?.failureCount === 3) || resourceData?.isSuccess ? 'none' : 'block') }}>
                    <CircularProgress 
                        sx={{ color: 'white' }} 
                        size={13}
                        thickness={5}
                    /> {getNumberSuffix(resourceData?.failureCount+1)} retry... {resourceData?.failureCount}/3
                </div>
            }
            <CookiesConsentDialog/>
        </Fragment>
    );
};

export default MovieStreamDashboard;