import React, { useState, useRef, useEffect, useCallback, Fragment } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useQuery } from 'react-query';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// React Slick
import Slider from "react-slick";

import { Box, Button, Menu, MenuItem, Divider, Typography, Paper, InputBase, Grid, InputAdornment, CircularProgress, DialogActions, DialogContent, FormControl, InputLabel, Select } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { Link } from 'react-router-dom';

// Config
import { server_status, manual_selection_carousel_settings } from "../../Config/settings.config";

// Components
import ReusableModal from "./ReusableModal";
import Latency from "../../Components/Latency/Latency";

// Utilties
import { allowOnlyNumbers, seriesSearchLike, animeSearchLike, animeSearchNumberBetween, asianFilmsSearchLike, secondsToHMS, getAllSavedCookiesMedia, isMobile } from "../../Services/Utils";

// Helpers
import { getCookie, deleteCookie } from "../../Helpers/Cookies";
import { encryptParams } from "../../Helpers/Crypto";

// Services
import { movie_server } from "../../Services/FlixHQService";

// =============================================================================================================================================================

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


// -------------------------------------------------------------------------------------------------------------

const MoviePlayModal = ({ mediaInfo, serverInfo, resourceData, resourceInfo, serverVar, setServerVar, url }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [savedMedia, setSavedMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [server, setServer] = useState(serverVar);

  const queryParams = new URLSearchParams(window.location.search);
  const mediaId = queryParams.get("mediaId");

  const handleModal = (status) => {
      setIsModalOpen(status);
      handleClose();
  }

  const onSelectServer = (name) => {
    setServer(name);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    // selecting server
    setServerVar(server);
    setIsModalOpen(false);
    deleteCookie(encodeURIComponent(mediaId));
  }

  const loadSavedMedia = () => {
    const cookiesSavedMedia = getAllSavedCookiesMedia();
    setSavedMedia(cookiesSavedMedia);
  }

  useEffect(() => {
    loadSavedMedia();
  }, [])
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {resourceData.isSuccess && resourceInfo?.data?.sources?.length > 0 ? 
        (<Button
          id="demo-customized-button"
          size='small'
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          startIcon={<PlayCircleOutlineIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          style={{ marginRight: '10px' }}
        >
          {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 ? 'CONTINUE' : 'PLAY'}
        </Button>)
      : 
        !resourceData.isLoading && 
        <Button aria-label='SERVER SELECTION' variant='contained' size='small' style={{ marginRight: '10px' }} onClick={() => handleModal(true)} startIcon={<ChecklistIcon/>}>
          SERVER SELECTION
        </Button>
      }
      {/* <Latency/> */}

      <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
        {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 && 
          <Link className='text-link-without-underline' to={`${url}?server=${serverVar === 'upcloud' ? '1' : '2'}`}>
            <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
              <PlayCircleOutlineIcon />
              CONTINUE ({secondsToHMS(JSON.parse(getCookie(encodeURIComponent(mediaId))).time)})
            </MenuItem>
          </Link>
        }
        <Link className='text-link-without-underline' to={`${url}?server=${serverVar === 'upcloud' ? '1' : '2'}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
          <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
            <PlayCircleOutlineIcon />
            {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 ? `FROM THE BEGINNING` : `QUICK PLAY`}
          </MenuItem>
        </Link>
        <MenuItem onClick={() => handleModal(true)} style={{ fontSize: '15px' }} disableRipple>
          <ChecklistIcon/>
          SERVER SELECTION
        </MenuItem>
      </StyledMenu>

        {/* Modal */}
        <ReusableModal isModalOpen={isModalOpen} handleModal={handleModal} OptionIcon={<ChecklistIcon sx={{ marginBottom: '-4px' }} />} title={`SELECTION`}>
            {/* Servers */}
            <DialogContent className='modal-container'>
              <Typography variant='h6' sx={{ marginBottom: 1 }}>Servers</Typography>
              <Slider {...manual_selection_carousel_settings} infinite={false} style={{ marginInline: (isMobile ? 0 : 10) }}>
                  {serverInfo.data.map((item, index) => {
                      return (
                          <Fragment key={index}>
                              {server_status.filter((serverValue) => serverValue.code === item.name).length > 0 ? (
                                  <Fragment>
                                  {server_status.filter((serverValue) => serverValue.code === item.name).map((subItem, subNo) => {
                                      return (
                                          <Fragment>
                                              {subItem.status === 'stable' ?
                                              (<Button size='small' variant={server === item.name ? 'contained' : 'outlined'} startIcon={<OndemandVideoIcon/>} style={{ marginRight: 3 }} onClick={() => onSelectServer(item.name)}>
                                                  {`Server ${index+1}`}
                                              </Button>)
                                              : 
                                              (
                                                <Button size='small' variant={server === item.name ? 'contained' : 'outlined'} startIcon={<OndemandVideoIcon/>} style={{ marginRight: 3, cursor: 'not-allowed' }} color='error'>
                                                  {`Server ${index+1}`}
                                                </Button>
                                              )}
                                          </Fragment>
                                      )
                                  })}
                                  </Fragment>
                              ) : ("")}        
                          </Fragment>
                      )
                  })}
              </Slider>
            </DialogContent>
            <Divider/>
            <DialogActions className='modal-container'>
              <Button size='small' variant='outlined' color='error' startIcon={<CloseIcon/>} onClick={() => handleModal(false)}>Close</Button>
              {resourceData.isSuccess && resourceInfo?.data?.sources?.length > 0 ?
              (<Link to={`${url}?server=${server === 'upcloud' ? '1' : '2'}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}><Button size='small' variant='contained' color='primary' startIcon={<PlayCircleOutlineIcon/>}>Play</Button></Link>)
               : 
              (<Button size='small' variant='contained' color='primary' onClick={(e) => onSubmit(e)} startIcon={<SaveIcon/>}>Save</Button>)}
            </DialogActions>

        </ReusableModal>
    </ThemeProvider>
  );
}

const SeriesPlayModal = ({ mediaInfo, serverInfo, resourceData, resourceInfo, episodes, serverVar, seasonIdVar, episodeIdVar, setServerVar, setSeasonIdVar, setEpisodeIdVar, url }) => {
  
  var indexId = mediaInfo?.id;
  const [savedMedia, setSavedMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const [episodeList, setEpisodeLists] = useState(episodes[seasonIdVar]);
  const [serverList, setServerList] = useState(serverInfo?.data);
  const [isServerData, setIsServerData] = useState(false);
  const [seasonNumber, setSeasonNumber] = useState(seasonIdVar);
  const [episodeNumber, setEpisodeNumber] = useState(episodeIdVar || episodes[seasonIdVar][0].id);
  const [server, setServer] = useState(serverVar || (serverInfo?.data?.length > 0 ? serverInfo?.data[0].name : ''));
  const [findEpisodeValue, setFindEpisodeValue] = useState("");
  const searchEpisodeValue = useRef(null);
  const [isDisableSave, setIsDisableSave] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const mediaId = queryParams.get("mediaId");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleModal = (status) => {
      setIsModalOpen(status);
      handleClose();
      setFindEpisodeValue("");
  }

  const onChangeFindEpisode = (e) => {
    e.preventDefault();

    var newEpisodeList = episodes[seasonNumber];
    if (e.target.value != "") {
      newEpisodeList = seriesSearchLike(newEpisodeList, e.target.value);
    }
    setEpisodeLists(newEpisodeList);
    setEpisodeNumber(episodes[seasonNumber][0].id);
  }

  const checkServerAvailability = (e) => {
    e.stopPropagation();
    // alert('test');
    setIsServerData(true);
  }

  const onSelectSeason = (season, prevSeason) => {
    if (prevSeason === season) {
      return false;
    } else {
      setEpisodeLists(episodes[season]);
      setSeasonNumber(season);
      setFindEpisodeValue("");
      if (searchEpisodeValue.current) {
        searchEpisodeValue.current.value = ""; 
      }
      setEpisodeNumber(episodes[season][0].id);
      setIsDisableSave(true);
      setServerList([]); 
    }
  }

  const onSelectEpisode = (episodeId, prevEpisode) => {
    if (prevEpisode === episodeId) {
      return false;
    } else {
      setEpisodeNumber(episodeId);
      setIsDisableSave(true);
      setServerList([]);
    }
  }

  const onSelectServer = (name) => {
    setServer(name);
    setIsDisableSave(false);
  }

  const loadSavedMedia = () => {
    const cookiesSavedMedia = getAllSavedCookiesMedia();
    setSavedMedia(cookiesSavedMedia);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // selecting season, episode and server
    setSeasonIdVar(seasonNumber);
    setEpisodeIdVar(episodeNumber);
    setServerVar(server);
    setIsModalOpen(false);
    deleteCookie(encodeURIComponent(mediaId));
  }

  // React Query
  useQuery(['movie_server', { episodeIdVar, indexId }], movie_server, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    enabled: isServerData,
    retryOnMount: false,
    onSuccess: (response) => {
      setServerList(response.data);
      setIsServerData(false);
      setServer('');
    }
  });

  const generateSeasons = useCallback((episodes) => {
    let seasonList = [];
    for (let seasonLength = 0; seasonLength < Object.keys(episodes).length; seasonLength++) {
      let episodeCount = episodes[seasonLength + 1].length;
      seasonList.push({"id": (seasonLength + 1), "count": (seasonLength + 1), "season": "Season " + (seasonLength + 1) + " (" + (episodeCount > 0 ? episodeCount + ' Episodes' : episodeCount + ' Episode') + ")"});
    }
    return seasonList;
  }, []);

  useEffect(() => {
    loadSavedMedia();
    setSeasons(generateSeasons(episodes));
  }, [generateSeasons, episodes]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {resourceData.isSuccess && resourceInfo?.data?.sources?.length > 0 ?
        <Button
          id="demo-customized-button"
          size='small'
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          startIcon={<PlayCircleOutlineIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          style={{ marginRight: '10px' }}
        >
          {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 ? 'CONTINUE' : 'PLAY'}
        </Button>
      : 
        !resourceData.isLoading && 
        <Button aria-label='SERVER SELECTION' variant='contained' size='small' style={{ marginRight: '10px' }} onClick={() => handleModal(true)} startIcon={<ChecklistIcon/>}>
          SERVER SELECTION
        </Button>
      }
        {/* <Latency/> */}

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 && 
          <Link className='text-link-without-underline' to={`${url}?season=${seasonIdVar}&episode=${JSON.parse(getCookie(encodeURIComponent(mediaId))).episodeId}&server=${serverVar === 'upcloud' ? '1' : '2'}`}>
            <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
              <PlayCircleOutlineIcon />
              CONTINUE ({`S ${JSON.parse(getCookie(encodeURIComponent(mediaId))).seasonNumber}/EP ${JSON.parse(getCookie(encodeURIComponent(mediaId))).episodeNumber}`} - {secondsToHMS(JSON.parse(getCookie(encodeURIComponent(mediaId))).time)})
            </MenuItem>
          </Link>
        }
        <Link className='text-link-without-underline' to={`${url}?season=${seasonIdVar}&episode=${episodeIdVar}&server=${serverVar === 'upcloud' ? '1' : '2'}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
          <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
            <PlayCircleOutlineIcon />
            FROM THE BEGINNING
          </MenuItem>
        </Link>
        <Link className='text-link-without-underline' to={`${url}?season=${generateSeasons(episodes).length}&episode=${episodes[generateSeasons(episodes).length][episodes[generateSeasons(episodes).length].length-1].id}&server=${serverVar === 'upcloud' ? '1' : '2'}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
          <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
            <PlayCircleOutlineIcon />
            LATEST EPISODE
          </MenuItem>
        </Link>
        <MenuItem onClick={() => handleModal(true)} style={{ fontSize: '15px' }} disableRipple>
          <ChecklistIcon/>
          EPISODE SELECTION
        </MenuItem>
      </StyledMenu>

      {/* Modal */}
      <ReusableModal isModalOpen={isModalOpen} handleModal={handleModal} OptionIcon={<ChecklistIcon sx={{ marginBottom: '-4px' }} />} title={resourceData.isSuccess && resourceInfo?.data?.sources?.length > 0 ? `EPISODE SELECTION` : `SERVER SELECTION`}>

      <DialogContent className='modal-container'>
        <Grid container columnSpacing={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }} rowSpacing={0}>
          {resourceData.isSuccess && resourceInfo?.data?.sources?.length > 0 && 
          <>
          {/* Seasons */}
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{  display: seasons?.length > 1 ? 'block' : 'none', paddingTop: 10, paddingBottom: 10 }}>
            <Typography variant='h6' sx={{ marginBottom: 1 }}>Seasons ({seasons?.length})</Typography>
            <Slider {...manual_selection_carousel_settings} infinite={false} style={{ marginInline: (isMobile ? 0 : 10), marginBottom: 25 }}>
                {seasons?.map((item, index) => {
                  return (<Fragment key={index}>
                            <Button size='small' variant={item.id === seasonNumber ? 'contained' : 'outlined'} style={{ marginRight: 3 }} onClick={() => onSelectSeason(item.id, seasonNumber)}>
                                {item.count}
                            </Button>
                          </Fragment>)
                })}
            </Slider>
          </Grid>
          {/* Episodes */}
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <Typography variant='h6' sx={{ marginBottom: 1 }}>Episodes ({episodes[seasonNumber].length})</Typography>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <Paper
              sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 100 }}
              style={{ float: 'right', height: 35, marginTop: -3 }}
            >
              <InputBase
                startAdornment={
                  <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
                }
                inputRef={searchEpisodeValue}
                sx={{ ml: 1, flex: 1, color: 'white !important' }}
                inputProps={{ 'aria-label': 'input number here' }}
                placeholder=''
                onKeyDown={(e) => allowOnlyNumbers(e)}
                onChange={(e) => onChangeFindEpisode(e)}
                defaultValue={findEpisodeValue}
              />
            </Paper>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ paddingBottom: 10 }}>
            {episodeList.length > 0 ? (
              <Slider {...manual_selection_carousel_settings} infinite={false} style={{ marginInline: (isMobile ? 0 : 10) }}>
                  {episodeList.map((item, index) => {
                    return (<Fragment key={index}>
                              <Button size='small' variant={item.id === episodeNumber ? 'contained' : 'outlined'} title={item.title} style={{ marginRight: 3 }} onClick={() => onSelectEpisode(item.id, episodeNumber)}>
                                {item.number}
                              </Button>
                            </Fragment>)
                  })}
              </Slider>
            ) : (<Typography sx={{ textAlign: 'center' }}>Select season first</Typography>)}
          </Grid>
          </>}

          {/* Servers */}
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ paddingTop: 10, paddingBottom: 10 }}>
            {isServerData ? 
              <center><CircularProgress sx={{ fontSize: 10 }} /></center>
            : 
              <Fragment>
                {serverList.length > 0 ? (
                  <Fragment>
                    <Typography variant='h6' sx={{ marginBottom: 1 }}>Servers</Typography>
                    <Slider {...manual_selection_carousel_settings} infinite={false} style={{ marginInline: (isMobile ? 0 : 10) }}>
                        {serverList.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                  {server_status.filter((serverValue) => serverValue.code === item.name).length > 0 ? (
                                      <>
                                      {server_status.filter((serverValue) => serverValue.code === item.name).map((subItem, subNo) => {
                                          return (
                                              <>
                                                  {subItem.status === 'stable' ?
                                                  (
                                                  <Button size='small' variant={server === item.name ? 'contained' : 'outlined'} startIcon={<OndemandVideoIcon/>} style={{ marginRight: 3 }} onClick={() => onSelectServer(item.name)}>
                                                      {`Server ${index+1}`}
                                                  </Button>
                                                  )
                                                  : 
                                                  (
                                                    <Button size='small' variant={server === item.name ? 'contained' : 'outlined'} startIcon={<OndemandVideoIcon/>} style={{ marginRight: 3, cursor: 'not-allowed' }} color='error'>
                                                      {`Server ${index+1}`}
                                                    </Button>
                                                  )}
                                              </>
                                          )
                                      })}
                                      </>
                                  ) : ("")}        
                                </Fragment>
                            )
                        })}
                    </Slider>
                  </Fragment>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    {isServerData ? (
                      <LoadingButton
                        color="primary"
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        size='small'
                      >
                        <span>Check available server</span>
                      </LoadingButton>
                    ) : (
                      <Button variant='contained' size='small' color='primary' onClick={(e) => checkServerAvailability(e)} startIcon={<SearchIcon />}>Check available server</Button>
                    )}
                  </div>
                )}
              </Fragment>
            }
          </Grid>
        </Grid>
      </DialogContent>
      <Divider/>
      <DialogActions className='modal-container'>
        <Button size='small' variant='outlined' color='error' startIcon={<CloseIcon/>} onClick={() => handleModal(false)}>Close</Button>
        {resourceData.isSuccess && resourceInfo?.data?.sources?.length > 0 ?
          isDisableSave ?
            <Button size='small' variant='contained' color='primary' startIcon={<PlayCircleOutlineIcon/>} disabled>Play</Button>
          : 
            <Link to={`${url}?season=${seasonNumber}&episode=${episodeNumber}&server=${server === 'upcloud' ? '1' : '2'}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
              <Button size='small' variant='contained' color='primary' startIcon={<PlayCircleOutlineIcon/>}>Play</Button>
            </Link>
        : 
          isDisableSave ?
            <Button size='small' variant='contained' color='primary' startIcon={<SaveIcon/>} disabled>Save</Button>
          : 
            <Button size='small' variant='contained' color='primary' onClick={(e) => onSubmit(e)} startIcon={<SaveIcon/>}>Save</Button>
        }
      </DialogActions>

      </ReusableModal>
    </ThemeProvider>
  );
}

const AnimePlayModal = ({ mediaInfo, episodes, episodeIdVar, setEpisodeIdVar, url, isDub, isDisabled }) => {

  var arcs = require('../../Services/Data/onePieceArcs.json').arcs;
  const [arcId, setArcId] = useState(1);
  const [savedMedia, setSavedMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState(episodeIdVar || episodes[0]?.id);
  const [episodeNum, setEpisodeNum] = useState(episodes?.filter(item => item.id === episodeIdVar)[0]?.number || episodes[0]?.number);
  const [findEpisodeValue, setFindEpisodeValue] = useState("");
  const [isLoadPlayButton, setIsLoadPlayButton] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);
  const mediaId = queryParams.get("mediaId");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModal = (status) => {
      setIsModalOpen(status);
      handleClose();
      setFindEpisodeValue("");
      setEpisodeList(episodes);
      if (mediaId == 21) {
        let selectedArc = arcs.filter(item => item.id === arcId)[0];
        setArcId(selectedArc.id);
        setEpisodeList(animeSearchNumberBetween(episodes, selectedArc.start_episode, selectedArc.end_episode)); 
      }
  }

  const onSelectEpisode = (episodeId, episodeNum) => {
    setEpisodeNumber(episodeId);
    setEpisodeNum(episodeNum);
  }

  const onChangeFindEpisode = (e) => {
    e.preventDefault();

    var newEpisodeList = episodes; 

    if (mediaId == 21) {
      let selectedArc = arcs.filter(item => item.id === arcId)[0];
      newEpisodeList = animeSearchNumberBetween(episodes, selectedArc.start_episode, selectedArc.end_episode); 
    }

    if (e.target.value != "") {
      newEpisodeList = animeSearchLike(newEpisodeList, e.target.value);
    }
    setEpisodeList(newEpisodeList);

  }

  const handleArcChange = (e) => {
    e.preventDefault();

    var newEpisodeList = episodes;
    if (e.target.value != "") {
      let selectedArc = arcs?.filter(item => item.id === e.target.value)[0];
      newEpisodeList = animeSearchNumberBetween(newEpisodeList, selectedArc.start_episode, selectedArc.end_episode);
    }
    setArcId(e.target.value);
    setEpisodeList(newEpisodeList);
  }

  const loadSavedMedia = () => {
    const cookiesSavedMedia = getAllSavedCookiesMedia();
    setSavedMedia(cookiesSavedMedia);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // selecting episode
    setEpisodeIdVar(episodeNumber);
    setIsModalOpen(false);
    deleteCookie(encodeURIComponent(mediaId));
  }

  useEffect(() => {
    loadSavedMedia();
    if (isDub === true && !episodeIdVar.includes('-dub')) {
      setIsLoadPlayButton(true);
    } else if (isDub === false && episodeIdVar.includes('-dub')) {
      setIsLoadPlayButton(true);
    } else {
      setIsLoadPlayButton(false);
    }
  }, [isDub, episodeIdVar])
  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        {isLoadPlayButton ?
        (
          <LoadingButton
              color="primary"
              loading
              loadingPosition="start"
              startIcon={<PlayCircleOutlineIcon />}
              endIcon={episodes.length > 1 ? <KeyboardArrowDownIcon /> : ''}
              variant="contained"
              size='small'
              style={{ marginRight: '10px' }}
            >
              PLAY
            </LoadingButton>
        ) : (
          <>
            {episodes.length > 1 || savedMedia?.filter(item => item.mediaId == mediaId).length > 0 ? (
              <Button
                id="demo-customized-button"
                size='small'
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                startIcon={<PlayCircleOutlineIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                style={{ marginRight: '10px' }}
                disabled={isLoadPlayButton}
              >
                {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 ? 'CONTINUE' : 'PLAY'}
              </Button>
            ) : (
              <Link title='Play' to={`${url}?dub=${isDub}&episode=${episodeIdVar}`} disabled={isLoadPlayButton}>
                  <Button aria-label='Play' variant='contained' size='small' style={{ marginRight: '10px' }} startIcon={<PlayCircleOutlineIcon/>}>
                      PLAY
                  </Button>
              </Link>
            )}
          </>
        )}
        {/* <Latency/> */}

        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
          {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 && 
            <Link className='text-link-without-underline' to={`${url}?dub=${isDub}&episode=${JSON.parse(getCookie(encodeURIComponent(mediaId))).episodeId}`}>
              <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
                <PlayCircleOutlineIcon />
                CONTINUE ({episodes.length > 1 ? `EP ${JSON.parse(getCookie(encodeURIComponent(mediaId))).episodeNumber} - ${secondsToHMS(JSON.parse(getCookie(encodeURIComponent(mediaId))).time)}` : `${secondsToHMS(JSON.parse(getCookie(encodeURIComponent(mediaId))).time)}`})
              </MenuItem>
            </Link>
          }
          <Link className='text-link-without-underline' to={`${url}?dub=${isDub}&episode=${episodeIdVar}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
            <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
              <PlayCircleOutlineIcon />
              FROM THE BEGINNING
            </MenuItem>
          </Link>
          {episodes.length > 1 &&
            <Link className='text-link-without-underline' to={`${url}?dub=${isDub}&episode=${episodes[episodes.length-1].id}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
              <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
                <PlayCircleOutlineIcon />
                LATEST EPISODE
              </MenuItem>
            </Link>
          }
          {episodes.length > 1 &&
            <MenuItem onClick={() => handleModal(true)} style={{ fontSize: '15px' }} disableRipple>
              <ChecklistIcon/>
              EPISODE SELECTION
            </MenuItem>
          }
        </StyledMenu>

        {/* Modal */}
        <ReusableModal isModalOpen={isModalOpen} handleModal={handleModal} OptionIcon={<ChecklistIcon sx={{ marginBottom: '-4px' }} />} title={`EPISODE SELECTION`}>
          
          <DialogContent className='modal-container'>

              {/* ARC */}
              {mediaId == 21 && 
                <Grid container columnSpacing={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }} rowSpacing={0} style={{ marginBottom: '10px' }}>
                  {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography variant='h6' sx={{ marginBottom: 1 }}>ARC</Typography>
                  </Grid> */}
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box sx={{ minWidth: '250px' }}>
                      <FormControl sx={{ m: 0 }} fullWidth size="small">
                        <InputLabel id="demo-simple-select-error-label">ARC ({arcs.length})</InputLabel>
                        <Select
                          labelId="demo-simple-select-error-label"
                          id="demo-simple-select-error"
                          defaultValue={arcId}
                          label={`ARC (${arcs.length})`}
                          onChange={handleArcChange}
                          // renderValue={(value) => `⚠️  - ${value}`}
                        >
                          {arcs.map((item, no) => {
                              return <MenuItem value={item.id}>{item.name} Arc ({item.start_episode} - {item.end_episode === 99999 ? 'Ongoing' : item.end_episode})</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              }
              {/* Episodes */}
              <Grid container columnSpacing={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }} rowSpacing={0} style={{ marginBottom: '10px' }}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <Typography variant='h6' sx={{ marginBottom: 1 }}>Episodes ({mediaId == 21 ? episodeList.length : episodes.length})</Typography>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <Paper
                    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 100 }}
                    style={{ float: 'right', height: 35 }}
                  >
                    <InputBase
                      startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                      }
                      sx={{ ml: 1, flex: 1, color: 'white !important' }}
                      inputProps={{ 'aria-label': 'input number here' }}
                      placeholder=''
                      onKeyDown={(e) => allowOnlyNumbers(e)}
                      onChange={(e) => onChangeFindEpisode(e)}
                      defaultValue={findEpisodeValue}
                    />
                  </Paper>
                </Grid>
              </Grid>

              {episodeList.length > 0 ? (
                <Slider {...manual_selection_carousel_settings} infinite={false} style={{ marginInline: (isMobile ? 0 : 10), marginBottom: 25 }}>
                    {episodeList.map((item, index) => {
                      return (<>
                              <Button size='small' variant={item.id === episodeNumber ? 'contained' : 'outlined'} title={item.title} style={{ marginRight: 3 }} onClick={() => onSelectEpisode(item.id, item.number)}>
                                  {item.number}
                              </Button>
                              </>)
                    })}
                </Slider>
              ) : (<Typography sx={{ textAlign: 'center', marginBottom: 2 }}>No result found.</Typography>)}
          </DialogContent>
          <Divider/>
          <DialogActions className='modal-container'>
            <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0}>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ paddingTop: '2.8px' }}>
                <span style={{ fontWeight: '550' }}>SELECTED: {episodeNum}</span>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ textAlign: 'right' }}>
                <Button size='small' variant='outlined' color='error' style={{ marginRight: '5px' }} startIcon={<CloseIcon/>} onClick={() => handleModal(false)}>Close</Button>
                <Link to={`${url}?dub=${isDub}&episode=${episodeNumber}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
                  <Button size='small' variant='contained' color='primary' startIcon={<PlayCircleOutlineIcon/>}>Play</Button>
                </Link>
              </Grid>
            </Grid>
          </DialogActions>

        </ReusableModal>
    </ThemeProvider>
  );
}

const AsianDramaPlayModal = ({ mediaInfo, episodes, episodeIdVar, setEpisodeIdVar, url }) => {

  const [savedMedia, setSavedMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState(episodeIdVar || episodes[0].id);
  const [findEpisodeValue, setFindEpisodeValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const mediaId = queryParams.get("mediaId");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModal = (status) => {
      setIsModalOpen(status);
      setFindEpisodeValue("");
      setEpisodeList(episodes);
  }

  const onSelectEpisode = (episodeId) => {
    setEpisodeNumber(episodeId);
  }

  const onChangeFindEpisode = (e) => {
    e.preventDefault();
    var newEpisodeList = episodes;
    if (e.target.value != "") {
      newEpisodeList = asianFilmsSearchLike(newEpisodeList, e.target.value);
    }
    setEpisodeList(newEpisodeList);
  }

  const loadSavedMedia = () => {
    const cookiesSavedMedia = getAllSavedCookiesMedia();
    setSavedMedia(cookiesSavedMedia);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // selecting episode
    setEpisodeIdVar(episodeNumber);
    setIsModalOpen(false);
  }

  useEffect(() => {
    loadSavedMedia();
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

        {(episodes.length > 1 || savedMedia?.filter(item => item.mediaId == mediaId).length > 0) ? (
          <Button
            id="demo-customized-button"
            size='small'
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            startIcon={<PlayCircleOutlineIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            style={{ marginRight: '10px' }}
          >
            {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 ? 'CONTINUE' : 'PLAY'}
          </Button>
        ) : (
          <Link className='text-link-without-underline' to={`${url}?episode=${episodeIdVar}`}>
            <Button aria-label='PLAY' variant='contained' size='small' style={{ marginRight: '10px' }} startIcon={<PlayCircleOutlineIcon/>}>
              PLAY
            </Button>
          </Link>
        )}
        {/* <Latency/> */}

        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
          {savedMedia?.filter(item => item.mediaId == mediaId).length > 0 && 
            <Link className='text-link-without-underline' to={`${url}?episode=${JSON.parse(getCookie(encodeURIComponent(mediaId))).episodeId}`}>
              <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
                <PlayCircleOutlineIcon />
                CONTINUE ({episodes.length > 1 ? `EP ${JSON.parse(getCookie(encodeURIComponent(mediaId))).episodeNumber} - ${secondsToHMS(JSON.parse(getCookie(encodeURIComponent(mediaId))).time)}` : `${secondsToHMS(JSON.parse(getCookie(encodeURIComponent(mediaId))).time)}`})
              </MenuItem>
            </Link>
          }
          <Link className='text-link-without-underline' to={`${url}?episode=${episodeIdVar}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
            <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
              <PlayCircleOutlineIcon />
              FROM THE BEGINNING
            </MenuItem>
          </Link>
          {episodes.length > 1 &&
            <Link className='text-link-without-underline' to={`${url}?episode=${episodes[episodes.length-1].id}`} onClick={() => deleteCookie(encodeURIComponent(mediaId))}>
              <MenuItem onClick={handleClose} style={{ fontSize: '15px' }} disableRipple>
                <PlayCircleOutlineIcon />
                LATEST EPISODE
              </MenuItem>
            </Link>
          }
          {episodes.length > 1 &&
            <MenuItem onClick={() => handleModal(true)} style={{ fontSize: '15px' }} disableRipple>
              <ChecklistIcon/>
              EPISODE SELECTION
            </MenuItem>
          }
        </StyledMenu>

        {/* Modal */}
        <ReusableModal isModalOpen={isModalOpen} handleModal={handleModal} OptionIcon={<ChecklistIcon sx={{ marginBottom: '-4px' }} />} title={`EPISODE SELECTION`}>
            
            <DialogContent className='modal-container'>
              {/* Episodes */}
              <Grid container columnSpacing={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }} rowSpacing={0}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography variant='h6' sx={{ marginBottom: 1 }}>Episodes ({episodes.length})</Typography>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Paper
                    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 100 }}
                    style={{ float: 'right', height: 35, marginTop: -3 }}
                  >
                    <InputBase
                      startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                      }
                      sx={{ ml: 1, flex: 1, color: 'white !important' }}
                      inputProps={{ 'aria-label': 'input number here' }}
                      placeholder=''
                      onKeyDown={(e) => allowOnlyNumbers(e)}
                      onChange={(e) => onChangeFindEpisode(e)}
                      defaultValue={findEpisodeValue}
                    />
                  </Paper>
                </Grid>
              </Grid>

              {episodeList.length > 0 ? (
                <Slider {...manual_selection_carousel_settings} infinite={false} style={{ marginInline: (isMobile ? 0 : 10), marginBottom: 25 }}>
                    {episodeList.map((item, index) => {
                      return (<><Button size='small' variant={item.id === episodeNumber ? 'contained' : 'outlined'} title={item.title} style={{ marginRight: 3 }} onClick={() => onSelectEpisode(item.id)}>
                                  {item.episode}
                              </Button></>)
                    })}
                </Slider>
              ) : (<Typography sx={{ textAlign: 'center', marginBottom: 2 }}>No result found.</Typography>)}
            </DialogContent>
            <Divider/>
            <DialogActions className='modal-container'>
              <Button size='small' variant='outlined' color='error' startIcon={<CloseIcon/>} onClick={() => handleModal(false)}>Close</Button>
              <Link className='text-link-without-underline' to={`${url}?episode=${episodeNumber}`} onClick={() => deleteCookie(mediaId)}>
                <Button size='small' variant='contained' color='primary' startIcon={<PlayCircleOutlineIcon/>}>Play</Button>
              </Link>
            </DialogActions>

        </ReusableModal>
    </ThemeProvider>
  );
}

export { MoviePlayModal, SeriesPlayModal, AnimePlayModal, AsianDramaPlayModal };