import React, { useState, useEffect, useCallback, Fragment } from 'react';

// Material UI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AppBar, Toolbar, Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemText, Grid, Typography, InputLabel, FormControl, NativeSelect, Select, MenuItem } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Icons
import ListItemIcon from '@mui/material/ListItemIcon';
import CircularProgress from '@mui/material/CircularProgress';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import MovieIcon from '@mui/icons-material/Movie';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ListIcon from '@mui/icons-material/List';

// CSS
import './css/TVEpisodesDrawer.css';

// Utilities
import { separatedSeasons, ObjectLength, moveToTop } from "../../Services/Utils";

export default function TVEpisodesDrawer({ movieInfo, mediaId, seasonId, episodeId, server, setSelectedSeason, setSelectedEpisode, setSelectedServer, setSelectedEpisodeName, setLoadingEpisode, moveToTop, lowerEpisodeList, drawerAlign }) {

  const [state, setState] = React.useState({
    bottom: false,
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const [inselectedSeason, setInSelectedSeason] = useState(seasonId);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setInSelectedSeason(seasonId);
  };

  const handleChangeSeason = (event) => {
    setInSelectedSeason(event.target.value);
  };

  const handleChangeEpisode = (epId, epNum, title, season, anchor) => {
    // load the player
    setLoadingEpisode(true);
    // set the selected episode in player
    setSelectedEpisode(epId);
    setState({ ...state, [anchor]: false });
    moveToTop();
  };

  const generateSeasons = useCallback((sepSeason) => {
    let seasonList = [];
    for (let seasonLength = 0; seasonLength < Object.keys(sepSeason).length; seasonLength++) {
      let episodeCount = movieInfo?.episodes?.filter( (result) => { return result.season === (seasonLength + 1); }).length;
      seasonList.push({"id": (seasonLength + 1), "season": "Season " + (seasonLength + 1) + " (" + (episodeCount > 0 ? episodeCount + ' Episodes' : episodeCount + ' Episode') + ")"});
    }
    return seasonList;
  }, [movieInfo?.episodes]);

  useEffect(() => {
    if (movieInfo?.episodes) {
      let sepSeason = separatedSeasons(movieInfo?.episodes, 'season');
      setSeasons(generateSeasons(sepSeason));
      setEpisodes(sepSeason); 
      // console.log("seasonId", seasonId);
      // console.log("inselectedSeason", inselectedSeason);
      if (seasonId == inselectedSeason) {
        setInSelectedSeason(seasonId); 
      }
    }
  }, [generateSeasons, movieInfo?.episodes, episodeId, inselectedSeason, seasonId]);

  const list = (anchor) => (
    <Box
      className='channel_drawer_box'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500, height: '100%', overflow: 'auto', paddingBottom: '30px' }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >

      <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>
        {episodes[inselectedSeason]?.length > 0 ? (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2} justifyContent="center">
                {episodes[inselectedSeason]?.map((item, i) => {
                    return (
                        <Fragment key={i}>
                          <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'}>
                            {item.number === 0 ?
                            <>
                              {item.id == episodeId ?
                                <Button variant='contained' color='primary' size='small' title={item.title} startIcon={<PlayCircleIcon/>} style={{ fontSize: '12px', fontWeight: '650', minWidth: '80px' }}>Intro</Button>
                              : 
                                <Button variant='outlined' color='primary' size='small' title={item.title} onClick={() => handleChangeEpisode(item.id, item.number, item.title, item.season, anchor)} style={{ fontSize: '12px', fontWeight: '650', minWidth: '80px' }}>Intro</Button>
                              }
                            </>
                            : 
                            <>
                              {item.id == episodeId ?
                                <Button variant='contained' color='primary' size='small' title={item.title} startIcon={<PlayCircleIcon/>} style={{ fontSize: '12px', fontWeight: '650', minWidth: '80px' }}>EP {item.number}</Button>
                              : 
                                <Button variant='outlined' color='primary' size='small' title={item.title} onClick={() => handleChangeEpisode(item.id, item.number, item.title, item.season, anchor)} style={{ fontSize: '12px', fontWeight: '650', minWidth: '80px' }}>EP {item.number}</Button>
                              }
                            </>}
                          </Grid>
                        </Fragment>
                    );
                })}
              </Grid>
          </Grid>
        ) : (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <center><CircularProgress sx={{ fontSize: 100 }} /></center>
            </Grid>
        )}
      </Grid>

    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        {[drawerAlign].map((anchor) => (
          <React.Fragment key={anchor}>
            <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0}>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ display: 'flex', alignItems: 'center', height: '3.3vh' }}>
                {episodes[seasonId] && 
                  <Typography variant='big' className='selectedEpisodeContent'>SEASON {seasonId} / {episodes[seasonId]?.filter(item => item.id == episodeId)[0]?.number === 0 ? 'Intro.' : `EPISODE ${episodes[seasonId]?.filter(item => item.id == episodeId)[0]?.number}`}</Typography>
                }
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <div style={{ textAlign: 'right' }}>
                  <Button className="channel_list_btn" variant="outlined" color='primary' size='small' onClick={toggleDrawer(anchor, true)} startIcon={<ListIcon/>}>EPISODES</Button>
                </div>
              </Grid>
            </Grid>
            <Drawer
              className='channel_drawer'
              PaperProps={{
                  sx: {
                      height: anchor === 'top' || anchor === 'bottom' ? '60%' : '100%',
                  },
              }}
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              sx={{
                overflow: 'hidden',
                '& .MuiDrawer-paper': {
                  overflow: 'hidden'
                }
              }}
            >
              <div className='tv_episodes_appbar' position="fixed" color='success'>
                <Toolbar>
                  <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0}>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ display: 'flex', alignItems: 'center', height: '6.5vh' }}>
                      <Box sx={{ minWidth: '100%' }}>

                        <FormControl sx={{ minWidth: '250px' }} size="small">
                          <InputLabel id="demo-simple-select-error-label">Season</InputLabel>
                          <Select
                            labelId="demo-simple-select-error-label"
                            id="demo-simple-select-error"
                            defaultValue={seasonId}
                            label="Season"
                            onChange={handleChangeSeason}
                            style={{ height: 35, fontSize: 14 }}
                            // renderValue={(value) => `⚠️  - ${value}`}
                          >
                            {seasons.map((item, no) => {
                                return <MenuItem key={no} value={item.id}>{item.season}</MenuItem>
                            })}
                          </Select>
                        </FormControl>

                      </Box>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ display: 'flex', alignItems: 'center', height: '6.5vh', justifyContent: 'right' }}>
                          {/* {episodes[inselectedSeason]?.length} Episodes */}
                    </Grid>
                  </Grid>
                </Toolbar>
              </div>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </ThemeProvider>
  );
}