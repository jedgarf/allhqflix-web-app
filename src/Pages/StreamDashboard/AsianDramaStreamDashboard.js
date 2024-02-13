import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Skeleton from '@mui/material/Skeleton';
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { color, margin, maxHeight } from "@mui/system";
import ShareIcon from '@mui/icons-material/Share';
import ShowMoreText from "react-show-more-text";

// CSS
import './StreamDashboard.css';

// Icons
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import LiveTvTwoToneIcon from '@mui/icons-material/LiveTvTwoTone';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import Loader from "../../Components/Loader/Loader";

import { asiandrama_info, asiandrama_stream_links } from "../../Services/DramaCoolService";

const MovieStreamDashboard = (props) => {

    const [loadingPicture, setLoadingPicture] = useState(true);

    const navigate = useNavigate();

    const { type } = useParams();

    const queryParams = new URLSearchParams(window.location.search);
    const indexId = queryParams.get("mediaId");

    const selectedEpisode = null;

    const goBack = () => {
        navigate(-1);
    }

    // info
    let infoData = useQuery(['asiandrama_info', { mediaId: indexId }], asiandrama_info, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        enabled: indexId !== null,
    });
    let infoValue = infoData?.data?.data;

    let episodeIdVar = selectedEpisode;

    if (infoData.isSuccess) {
        episodeIdVar = selectedEpisode || (infoValue?.episodes?.length > 0 ? infoValue.episodes[0].id : undefined);
    }

    // movie link
    let resourceData = useQuery(['asiandrama_stream_links', {episodeId: episodeIdVar}], asiandrama_stream_links, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        enabled: episodeIdVar !== null,
        retry: 2,
        retryOnMount: false,
    });
    
    let resourceValue = undefined;

    if (resourceData.isSuccess) {
        resourceValue = resourceData?.data;
    }

    useEffect(() => {
        if (infoData.isSuccess) {
            document.title = `AllHQFlix - ${ infoValue?.title }`;
            setLoadingPicture(false);
        }
    }, [infoData.isSuccess]);

    return (
        <>
        {process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? <ReactQueryDevtools initialIsOpen={false} /> : '' }
            <div style={{backgroundImage: `linear-gradient(rgba(15, 22, 34, 0.527),rgba(15, 22, 34, 0.5)) , url("${infoValue?.image}")`, backgroundSize: 'auto 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%'}}>
                <Button onClick={() => goBack()}>
                    <ArrowBackTwoToneIcon sx={{ fontSize: { xs: '35px', sm: '40px' }, margin: '10px', color: '#DC4C64' }}/>
                </Button>
                {infoData.isLoading || resourceData.isLoading
                ? 
                    <>
                    <Box sx={{ ml: 3, mt: 4, width: {xs: '87%', sm: '87%', md: '60%'} }}>
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="60px" width="60%" /><br/>
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="100%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="100%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="100%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="100%" />

                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" />
                        <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" /><br/>
                        <Skeleton animation="pulse" variant="rectangular" sx={{ bgcolor: '#54B4D3' }} height="40px" width="15%" />
                    </Box>
                    </>
                : 
                <div className='stream-dashboard-content'>
                    <div className='stream-dashboard-title'><h1>{ infoValue?.title }</h1></div>
                    <div className='stream-dashboard-description'>{infoValue?.description}</div>
                    <div className='stream-dashboard-description'>
                        <b>Genres:</b> {infoValue?.genres?.map((item, i) => {
                            return (
                            <span key={i}>
                            { (i === 0 ? " " : ", ") + item}
                            </span>
                            );
                        })}
                    </div>
                    {infoData.isSuccess && infoValue?.episodes?.length > 0 ? 
                    <>
                        <div className='stream-dashboard-season-episode'>
                            <label>{infoValue?.episodes?.length > 1 ? infoValue?.episodes?.length + ' Episodes' : ''}</label>
                        </div>
                    </>
                    : 
                    <>
                        <div className='stream-dashboard-season-episode'>
                            <Typography variant="subtitle1" style={{ verticalAlign: 'middle', display: 'inline-flex', fontWeight: 'bolder' }}>
                                <WarningAmberTwoToneIcon style={{ marginRight: '8px', color: "#DC4C64", fontSize: 30 }}/> No Episode Available
                            </Typography>
                        </div>
                    </>}
                    <div className='stream-dashboard-video-qualities'>
                        {resourceData.isSuccess && resourceValue?.data?.sources?.length > 0 ? 
                        <>
                            {/* <h4 style={{marginBottom: '10px'}}>Video Resolutions</h4> */}
                            {/* {resourceValue?.data?.sources?.map((item, i) => {
                                return (
                                    <>
                                    | <label className='stream-dashboard-servername' key={i}>video_quality_{i+1}</label>
                                    </>
                                )
                            })} */}
                        </>
                        :
                        <>
                            <div className='stream-dashboard-resource-links'>
                                <Typography variant="subtitle1" style={{ verticalAlign: 'middle', display: 'inline-flex', fontWeight: 'bolder' }}>
                                    <WarningAmberTwoToneIcon style={{ marginRight: '8px', color: "#DC4C64", fontSize: 30 }}/> Media not Available
                                </Typography>
                            </div>
                        </>}
                    </div>
                    {infoData.isSuccess && resourceData.isSuccess ? 
                    <>
                    {infoValue?.episodes?.length > 0 && resourceValue?.data?.sources?.length > 0 ?
                        <>
                        <div className='stream-dashboard-playbutton'>
                            <Link to={`/watch/${indexId}`}><Button variant='contained' color='primary' size='medium' startIcon={<PlayCircleOutlineIcon/>}>Play</Button></Link>
                        </div>
                        </>
                     : <></>}
                        
                    </>
                    : <></>}
                </div>}
            </div>
        </>
    );
};

export default MovieStreamDashboard;