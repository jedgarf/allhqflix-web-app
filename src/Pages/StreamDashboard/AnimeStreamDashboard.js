import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

// sanitize DOM
import DOMPurify from 'dompurify';

// React Query
import { useQuery } from 'react-query';

// Sweet Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Material UI Components
import { Grid, Skeleton, Box, Typography, Button, FormControlLabel, Switch, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// CSS
import './StreamDashboard.css';

// Icons
import StarIcon from '@mui/icons-material/Star';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SettingsIcon from '@mui/icons-material/Settings';

// Components
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import ShareModal from "../../Components/Modal/ShareModal";
import TraillerModal from "../../Components/Modal/TraillerModal";
import SaveListModal from "../../Components/Modal/SaveListModal";
import SnackBar from "../../Components/SnackBar/SnackBar";
import { AnimePlayModal } from "../../Components/Modal/PlayModal";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";
import CookiesConsentDialog from "../../Components/CookiesConsentDialog/CookiesConsentDialog";
import SettingsModal from "../../Components/Modal/SettingsModal";
import StarRating from "../../Components/UI/StarRating";

// Utilities
import { streamDashboardBackButton, SeparateArrayByComma, convertMinutesToHoursAndMinutes, getNumberSuffix, capitalizeString, getAllSavedCookiesMedia } from "../../Services/Utils";

// Config
import { pageLoadMS, foreign_country, maxMediaSaved, maxMediaSavedMessage } from "../../Config/settings.config";
import { homeBackground } from "../../Config/images.config";

// Services
import { anime_info, anime_stream_links } from "../../Services/AnimeService";

const AnimeStreamDashboard = (props) => {

    const selectedEpisode = null;
    const [settingModal, setSettingModal] = useState(false);
    const [savedMedia, setSavedMedia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Picture loading
    const [loadingPicture, setLoadingPicture] = useState(true);
    const [BGImage, setBGImage] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [episodeIdVar, setEpisodeIdVar] = useState(selectedEpisode);

    // alert variable
    const [snackBarType, setSnackBarType] = useState("info");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarWithLoading, setSnackBarWithLoading] = useState(false);
    const [hideDuration, setHideDuration] = useState(6000);

    // dub checkbox
    const [dubCheckbox, setDubCheckbox] = useState(false);

    // episode count
    // const [dubEpisodeCount, setDubEpisodeCount] = useState(1);
    // const [subEpisodeCount, setSubEpisodeCount] = useState(1);

    const navigate = useNavigate();

    const { type } = useParams();

    const queryParams = new URLSearchParams(window.location.search);
    const indexId = queryParams.get("mediaId");
    const isShare = queryParams.get("share");
    var arcs = indexId == 21 ? require('../../Services/Data/onePieceArcs.json').arcs : [];

    const Android12Switch = styled(Switch)(({ theme }) => ({
        marginLeft: 8,
        padding: 8,
        '& .MuiSwitch-track': {
          borderRadius: 22 / 2,
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
          },
          '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.error.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
          },
          '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.error.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: 'none',
          width: 16,
          height: 16,
          margin: 2,
        },
    }));

    const handleSettingModal = () => {
        setSettingModal(!settingModal);
    }

    const handleDubSwitch = (e) => setDubCheckbox(e.target.checked);

    const handleSnackBarOpen = (event, reason) => {
        setSnackBarType("");
        setSnackBarOpen(false);
        setSnackBarWithLoading(false);
        setHideDuration(6000);
    };

    // info
    let infoData = useQuery(['anime_info', { mediaId: indexId, dub: dubCheckbox }], anime_info, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        enabled: indexId !== null,
        onSuccess: (response) => {
            if (response.data.episodes.length === 0) {
                setSnackBarType('error');
                setSnackBarMessage(`No available episodes in ${dubCheckbox ? 'english dub' : 'english subtitle'}.`);
                setSnackBarOpen(true);
                setSnackBarWithLoading(false);
                setHideDuration(6000);

                // if (dubCheckbox) {
                //     setDubEpisodeCount(0);
                // } else {
                //     setSubEpisodeCount(0);
                // }
                // if (dubEpisodeCount === 1 || subEpisodeCount === 1) {
                //     setDubCheckbox(!dubCheckbox);   
                // }
            }
            setEpisodeIdVar(response.data.episodes.length > 0 ? response.data.episodes[0].id : undefined);
        },
        onError: (error, _query, _retries, _status) => {
            if (_retries >= 3) {
              console.log('All retry attempts failed for query:', _query);
              streamDashboardBackButton(navigate, type, isShare);
            }
        }
    });
    let infoValue = infoData?.data?.data;

    // movie link
    let resourceData = useQuery(['anime_stream_links', {episodeId: episodeIdVar}], anime_stream_links, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        retry: 2, // Number of retries
        enabled: episodeIdVar !== null,
        onError: (error) => {
            setSnackBarType('error');
            setSnackBarMessage(`Source link not available, please try again later.`);
            setSnackBarOpen(true);
            setSnackBarWithLoading(false);
            setHideDuration(6000);
        },
        onSuccess: (response) => {
            setSnackBarOpen(false);
        }
    });
    
    let resourceValue = undefined;
    if (resourceData.isSuccess) resourceValue = resourceData?.data;

    const loadSavedMedia = () => {
        const cookiesMediaData = getAllSavedCookiesMedia();
        setSavedMedia(cookiesMediaData);
    }

    //choose the screen size 
    const handleResize = useCallback(() => {
        if (window.innerWidth < 720) {
            setBGImage(infoValue?.image);
            if(indexId == 21) {
                if (savedMedia?.filter(item => item?.mediaId == indexId).length > 0) {
                    const savedCurrentData = savedMedia?.filter(item => item?.mediaId == indexId);
                    setBGImage(arcs.find(item => item.start_episode <= savedCurrentData[0]?.episodeNumber && item.end_episode >= savedCurrentData[0]?.episodeNumber)?.mini_banner || infoValue?.image);
                } else {
                    setBGImage(arcs.find(item => item.start_episode <= infoValue?.episodes?.length && item.end_episode >= infoValue?.episodes?.length)?.mini_banner || infoValue?.image);
                }
            } else {
                setBGImage(infoValue?.image);
            }
            setIsMobile(true);
        } else {
            if(indexId == 21) {
                if (savedMedia?.filter(item => item?.mediaId == indexId).length > 0) {
                    const savedCurrentData = savedMedia?.filter(item => item?.mediaId == indexId)[0];
                    setBGImage(arcs.find(item => item.start_episode <= savedCurrentData?.episodeNumber && item.end_episode >= savedCurrentData?.episodeNumber)?.big_banner || infoValue?.artwork[6].img);
                } else {
                    setBGImage(arcs.find(item => item.start_episode <= infoValue?.episodes?.length && item.end_episode >= infoValue?.episodes?.length)?.big_banner || infoValue?.artwork[6].img);
                }
            } else {
                setBGImage(infoValue?.cover);
            }
            setIsMobile(false);
        }
    }, [indexId, infoValue?.image, infoValue?.artwork, infoValue?.cover, arcs, infoValue?.episodes?.length, BGImage]);

    const handleBackgroundImageError = () => setBGImage(homeBackground);

    useEffect(() => {

        loadSavedMedia();
        if (infoData.isSuccess) {
            document.title = `AllHQFlix - ${ infoValue?.title?.english || infoValue?.title?.userPreferred || infoValue?.title?.romaji || infoValue?.title?.native }`;
            handleResize();
            setLoadingPicture(false);
        }
        if (infoData.isLoading) setBGImage(homeBackground);
        // if (infoData.isLoading || resourceData.isLoading) {
        //     setSnackBarType('info');
        //     setSnackBarMessage(`Please wait while fetching all resources.`);
        //     setSnackBarOpen(true);
        //     setSnackBarWithLoading(true);
        //     setHideDuration(null);
        // };

        // if (resourceData.isRefetching) {
        //     setSnackBarType('info');
        //     setSnackBarMessage(`Please wait while re-fetching all resources.`);
        //     setSnackBarOpen(true);
        //     setSnackBarWithLoading(true);
        //     setHideDuration(null);
        // }
        setTimeout(() => {
            setIsLoading(false);
        }, pageLoadMS);

    }, [handleResize, infoData.isSuccess, infoData.isLoading, resourceData.isLoading, infoData.isRefetching, resourceData.isRefetching, infoValue?.title?.english, infoValue?.title?.userPreferred, infoValue?.title?.romaji, infoValue?.title?.native]);

    return (
        isLoading ? 
            <LoadingPage/>
        : 
        <Fragment>
            <ReactQueryTools/>
            <div className='stream-dashboard' style={{backgroundImage: isMobile ? `linear-gradient(rgba(10, 10, 10, 0.527),rgba(10, 10, 10, 0.5)), url("${BGImage}"), url("${homeBackground}")` : `linear-gradient(to right, rgba(10, 10, 10, 0.85) 30%, rgba(10, 10, 10, 0.5) 70%), url("${BGImage}"), url("${homeBackground}")`, objectFit: 'cover', backgroundSize: ' 100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%'}} 
                onError={handleBackgroundImageError}>
                <SnackBar severity={snackBarType} handleSnackBarOpen={handleSnackBarOpen} status={snackBarOpen} snackBarMessage={snackBarMessage} withLoading={snackBarWithLoading} hideDuration={hideDuration} />
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={1} justifyContent="center">
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button onClick={() => streamDashboardBackButton(navigate, type, isShare)}>
                            <ArrowBackTwoToneIcon sx={{ fontSize: { xs: '35px', sm: '40px' }, margin: '10px', color: '#DC4C64' }}/>
                        </Button>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ marginTop: 8, marginRight: 0, textAlign: 'right' }}>
                        <Link to={`/`}>
                            <img alt='logo' src={process.env.PUBLIC_URL + "/images/multimedia_hub_logo.png"} style={{ width: '90px' }} />
                        </Link>
                    </Grid>
                </Grid>
                {infoData.isLoading ? 
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
                    <div className='stream-dashboard-content' style={{ backgroundColor: isMobile ? 'rgba(10, 10, 10, 0.5)' : 'transparent' }}>
                        <div className='stream-dashboard-title'><h1>{ infoValue?.title?.english || infoValue?.title?.userPreferred || infoValue?.title?.romaji || infoValue?.title?.native }</h1>
                        {infoValue?.episodes?.length > 1 ?
                        (<label className='stream-dashboard-servername'>
                            <span style={{ marginRight: 2 }}>Episode 1 to {infoValue?.episodes?.length}</span>
                            {/* &nbsp;&bull;&nbsp;<span style={{ marginRight: 5 }}><StarIcon style={{ marginBottom: '-3px', fontSize: 18, color: "#E4A11B" }}/> {infoValue?.rating}</span> */}
                            &nbsp;&bull;&nbsp;<span style={{ paddingBottom: '-4px !important' }}><StarRating value={infoValue?.rating} /></span>
                            &nbsp;&bull;&nbsp;<ShareModal infoValue={infoValue} size={'15px'}/>
                        </label>)
                        : 
                        (<label className='stream-dashboard-servername'>
                            {infoValue?.duration ? <span style={{ marginRight: 2 }}>{convertMinutesToHoursAndMinutes(infoValue?.duration)}</span> : ''}
                            {/* &nbsp;&bull;&nbsp;<span style={{ marginRight: 5 }}><StarIcon style={{ marginBottom: '-3px', fontSize: 18, color: "#E4A11B" }}/> {infoValue?.rating}</span> */}
                            &nbsp;&bull;&nbsp;<span style={{ marginRight: 5 }}><StarRating value={infoValue?.rating} /></span>
                            &nbsp;&bull;&nbsp;<ShareModal infoValue={infoValue} size={'15px'}/>
                        </label>)}
                        </div>
                        <p className='stream-dashboard-description' title={DOMPurify.sanitize(infoValue?.description).trim()} dangerouslySetInnerHTML={{ __html: infoValue?.description.trim() ? DOMPurify.sanitize(infoValue?.description).replace('<br>', '').replace('</br>', '').trim() : '-'}}/>
                        <div className='stream-dashboard-description-details'>
                            <b style={{ color: '#DC4C64', marginRight: '5px' }}>Released:</b> 
                                { infoValue?.releaseDate ? infoValue?.releaseDate : '-' }
                            <br/>
                            <b style={{ color: '#DC4C64', marginRight: '5px' }}>Country:</b> 
                            {foreign_country.filter((item) => item.code === infoValue?.countryOfOrigin).length > 0 ? (
                                <span>
                                    {foreign_country.filter((item) => item.code === infoValue?.countryOfOrigin)[0].name}
                                </span>
                            ) : ('-')}
                            <br/>
                            <b style={{ color: '#DC4C64', marginRight: '5px' }}>Season:</b>
                                { infoValue?.season ? capitalizeString(infoValue?.season) : '-' }
                            <br/>
                            {/* <b style={{ color: '#DC4C64', marginRight: '5px' }}>Synonym/s:</b>
                            <SeparateArrayByComma type={'google_link'} data={infoValue?.synonyms} link={'https://www.google.com/search?q='} />
                            <br/> */}
                            <b style={{ color: '#DC4C64', marginRight: '5px' }}>Genre/s:</b> 
                            <SeparateArrayByComma type={'site_link'} data={infoValue?.genres} link={'/anime/genre_filter?genre='} />
                            <br/>
                            <b><SubtitlesIcon style={{ marginBottom: '-6px' }}/></b>{' '}
                            1 subtitle available.
                        </div>
                        {resourceData.isError && 
                            <div className='stream-dashboard-season-episode'>
                                <Typography variant="span">
                                    Not Available
                                </Typography>
                            </div>
                        }
                        {(resourceData.isSuccess && savedMedia?.length >= maxMediaSaved && savedMedia?.filter(item => item?.mediaId == indexId).length === 0) && 
                            <div className='stream-dashboard-season-episode'>
                                <Typography variant="span">
                                    {maxMediaSavedMessage}
                                </Typography>
                            </div>
                        }
                        <div className='stream-dashboard-playbutton'>
                            {infoData.isSuccess && resourceData.isSuccess && 
                                infoValue?.episodes?.length > 0 && resourceValue?.data?.sources?.length > 0 && 
                                    <IconButton color="primary" size='small' onClick={() => handleSettingModal()}><SettingsIcon/></IconButton>
                            }
                            {(resourceData.isSuccess && savedMedia?.length >= maxMediaSaved && savedMedia?.filter(item => item?.mediaId == indexId).length === 0) && 
                                <SaveListModal loadSavedMedia={loadSavedMedia}/>
                            }
                            {(infoData.isSuccess && resourceData.isError) && <TraillerModal category="anime" infoValue={infoValue} setSnackBarType={setSnackBarType} setSnackBarMessage={setSnackBarMessage} setSnackBarOpen={setSnackBarOpen}/>}
                            {infoData.isSuccess && resourceData.isSuccess ?
                                infoValue?.episodes?.length > 0 && resourceValue?.data?.sources?.length > 0 && 
                                    <AnimePlayModal infoValue={infoValue} episodes={infoValue?.episodes} episodeIdVar={episodeIdVar} setEpisodeIdVar={setEpisodeIdVar} isDub={dubCheckbox} url={`/watch/${type}/${indexId}`} isDisabled={false} />
                            : 
                                !resourceData.isError ? 
                                    <CircularProgress
                                        sx={{ color: 'white' }} 
                                        size={18}
                                        thickness={5}
                                    />
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
            {/* English dub switch */}
            {1===0 && (infoData.isSuccess && !resourceData.isLoading) && 
                <div className="anime-english-dub text-white">
                    <FormControlLabel
                        control={<Android12Switch defaultChecked={dubCheckbox} onChange={handleDubSwitch} disabled={infoData.isLoading}/>}
                        label={`Switch to english dub`}
                    />
                </div>
            }
            <CookiesConsentDialog/>
            {/* -------------------------------- Modals --------------------------------------- */}
            <SettingsModal settingModal={settingModal} setSettingModal={setSettingModal}/>
            {/* ------------------------------------------------------------------------------- */}
        </Fragment>
    );
};

export default AnimeStreamDashboard;