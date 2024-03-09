import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

// sanitize DOM
import DOMPurify from 'dompurify';

import { useQuery } from 'react-query';

// Material UI Components
import { Grid, Skeleton, Box, Typography, Button, CircularProgress } from '@mui/material';

// CSS
import './StreamDashboard.css';

// Icons
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Components
import ShareModal from "../../Components/Modal/ShareModal";
import TraillerModal from "../../Components/Modal/TraillerModal";
import SnackBar from "../../Components/SnackBar/SnackBar";
import { AsianDramaPlayModal } from "../../Components/Modal/PlayModal";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Utilities
import { streamDashboardBackButton, SeparateArrayByComma } from "../../Services/Utils";

// Services
import { asianfilms_info, asianfilms_stream_links } from "../../Services/ViewAsianService";

const AsianFilmsStreamDashboard = (props) => {

    const selectedEpisode = null;
    const [isMobile, setIsMobile] = useState(false);
    const [episodeIdVar, setEpisodeIdVar] = useState(selectedEpisode);

    // alert variable
    const [snackBarType, setSnackBarType] = useState("info");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarWithLoading, setSnackBarWithLoading] = useState(false);

    const navigate = useNavigate();
    const media = "asian_films";
    const queryParams = new URLSearchParams(window.location.search);
    const indexId = queryParams.get("mediaId");
    const isShare = queryParams.get("share");

    const handleSnackBarOpen = (event, reason) => {
        setSnackBarType("");
        setSnackBarOpen(false);
        setSnackBarWithLoading(false);
    };

    // info
    let infoData = useQuery(['asianfilms_info', { mediaId: indexId }], asianfilms_info, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        enabled: indexId !== null,
        onSuccess: (response) => {
            setEpisodeIdVar(response?.data?.episodes?.length > 0 ? response?.data?.episodes[0].id : undefined);
        }
    });
    let infoValue = infoData?.data?.data;

    // movie link
    let resourceData = useQuery(['asianfilms_stream_links', { mediaId: indexId, episodeId: episodeIdVar}], asianfilms_stream_links, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        enabled: indexId !== null && episodeIdVar !== null,
        retryOnMount: false,
        onError: (error) => {
            setSnackBarType('error');
            setSnackBarMessage(`Source link not available, please try again later.`);
            setSnackBarOpen(true);
            setSnackBarWithLoading(false);
        }
    });
    
    let resourceValue = undefined;

    if (resourceData.isSuccess) {
        resourceValue = resourceData?.data;
    }

    //choose the screen size 
    const handleResize = useCallback(() => {
        if (window.innerWidth < 720) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    useEffect(() => {
        if (infoData.isSuccess) {
            document.title = `AllHQFlix - ${ infoValue?.title }`;
            handleResize();
        }

        if (infoData.isLoading || resourceData.isLoading) {
            setSnackBarType('info');
            setSnackBarMessage(`Please wait while fetching all resources.`);
            setSnackBarOpen(true);
            setSnackBarWithLoading(true);
        };

    }, [handleResize, infoData.isSuccess, infoValue?.title, infoData.isLoading, resourceData.isLoading]);

    return (
        <>
        <ReactQueryTools/>
            <div style={{ backgroundColor: 'rgba(15, 22, 34, 1)', backgroundImage: isMobile ? `linear-gradient(rgba(15, 22, 34, 0.527),rgba(15, 22, 34, 0.5)) , url("${infoValue?.banner}")` : `linear-gradient(90deg, rgba(15, 22, 34, 1) 10%, rgba(15, 22, 34, 0.5) 90%) , url("${infoValue?.banner}")`, backgroundSize: isMobile ? '100% 100%' : '900px 100%', backgroundPosition: isMobile ? 'center' : 'right', backgroundRepeat: 'no-repeat', width: '99.9%'}}>
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
                {infoData.isLoading || resourceData.isLoading || infoData.isRefetching || resourceData.isRefetching
                ? 
                    <>
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
                    </>
                : 
                <div className='stream-dashboard-content' style={{ backgroundColor: isMobile ? 'rgba(15, 22, 34, 0.5)' : 'transparent' }}>
                    <div className='stream-dashboard-title'><h1>{ infoValue?.title }</h1>

                    <label className='stream-dashboard-servername'>
                        <span className='stream-video-quality-span' style={{ fontSize: '14px', backgroundColor: 'transparent', fontWeight: 'bolder', border: '1.5px solid' }}>
                            English Subtitle
                        </span> | {infoValue?.episodes?.length > 1 ? `Episode 1 to ${infoValue?.episodes?.length} |` : ''}<ShareModal infoValue={infoValue}/></label>

                    </div>
                    <p className='stream-dashboard-description' title={DOMPurify.sanitize(infoValue?.description).trim()} dangerouslySetInnerHTML={{ __html: infoValue?.description.trim() ? DOMPurify.sanitize(infoValue?.description).trim() : '-'}}/>
                    <div className='stream-dashboard-description-details'>
                        <b style={{ color: '#DC4C64', marginRight: '5px' }}>Country:</b> 
                            <Link className='text-link' to={`/asian_films/country_filter?country=${infoValue?.country}`}>{infoValue?.country}</Link>
                        <br/>
                        <b style={{ color: '#DC4C64', marginRight: '5px' }}>Released:</b> 
                            { infoValue?.releaseDate ? infoValue?.releaseDate : '-' }
                        <br/>
                        <b style={{ color: '#DC4C64', marginRight: '5px' }}>Director:</b> 
                            { infoValue?.director ? (<Link className='text-link' to={`https://www.google.com/search?q=${infoValue?.director}`}>{infoValue?.director}</Link>) : "-" }
                        <br/>
                        <b style={{ color: '#DC4C64', marginRight: '5px' }}>Other Names:</b> 
                        {infoValue?.otherNames ? (
                            <SeparateArrayByComma type={'google_link'} data={infoValue?.otherNames} link={'https://www.google.com/search?q='} />
                        ) : (
                            "-"
                        )}
                        <br/>
                        <b style={{ color: '#DC4C64', marginRight: '5px' }}>Genres:</b> 
                        <SeparateArrayByComma type={'site_link'} data={infoValue?.genre} link={'/asian_films/genre_filter?genre='} />
                    </div>
                    {infoData.isSuccess && infoValue?.episodes?.length > 0 ? 
                    <></>
                    : 
                    <>
                        <div className='stream-dashboard-season-episode'>
                                <Typography variant="subtitle1" style={{ verticalAlign: 'middle', display: 'inline-flex', fontWeight: 'bolder' }}>
                                    <WarningAmberTwoToneIcon style={{ marginRight: '8px', color: "#DC4C64", fontSize: 30 }}/> NO EPISODE AVAILABLE
                                </Typography>
                        </div>
                    </>}
                    <div className='stream-dashboard-video-qualities'>
                        {resourceData.isSuccess && resourceValue?.data?.sources?.length > 0 ? 
                        <></>
                        :
                        <>
                            <div className='stream-dashboard-resource-links'>
                                <Typography variant="subtitle1" style={{ verticalAlign: 'middle', display: 'inline-flex', fontWeight: 'bolder' }}>
                                    <AccessTimeIcon style={{ marginRight: '8px', color: "#DC4C64", fontSize: 30 }}/> SOURCE LINK NOT AVAILABLE, PLEASE TRY AGAIN LATER
                                </Typography>
                            </div>
                        </>}
                    </div>
                    <div className='stream-dashboard-playbutton'>
                        {infoData.isSuccess && <TraillerModal category="asian_films" infoValue={infoValue} setSnackBarType={setSnackBarType} setSnackBarMessage={setSnackBarMessage} setSnackBarOpen={setSnackBarOpen}/>}
                        {infoData.isSuccess && resourceData.isSuccess ? 
                        <>
                            {infoValue?.episodes?.length > 0 && resourceValue?.data?.sources?.length > 0 && 
                                <AsianDramaPlayModal infoValue={infoValue} episodes={infoValue?.episodes} episodeIdVar={episodeIdVar} setEpisodeIdVar={setEpisodeIdVar} url={`/watch/${indexId}`} />
                            }
                        </>
                        : <></>}
                    </div>
                </div>}
            </div>
            {/* refetching count */}
            {resourceData?.failureCount > 0 && 
                <div className="retry-display" style={{ display: ((resourceData?.isError && resourceData?.failureCount === 3) || resourceData?.isSuccess ? 'none' : 'block') }}>
                    <CircularProgress 
                        sx={{ color: 'white' }} 
                        size={13}
                        thickness={5}
                    /> Refetching... {resourceData?.failureCount}/3
                </div>
            }
        </>
    );
};

export default AsianFilmsStreamDashboard;