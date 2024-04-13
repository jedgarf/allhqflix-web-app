import React, { useState, useEffect } from 'react';

// Components
import AnimeDownloadBtn from '../DownloadMedia/AnimeDownloadBtn';

// Material UI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Toolbar, Box, Button, IconButton, Typography, Grid, Drawer, FormControl, InputLabel, Select, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

// Icons
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ListIcon from '@mui/icons-material/List';

// Utils
import { animeSearchNumberBetween } from "../../Services/Utils";

export default function OnePieceEpisodesDrawer({ details, downloadUrl, mediaId, episodeId, setSelectedEpisode, setLoadingEpisode, itemsPerPage, episodesCurrentPage, moveToTop, drawerAlign }) {

  const [state, setState] = React.useState({ bottom: false });
  const norm_episodes = details?.episodes;
  const currentEpisodeNum = norm_episodes?.filter(item => item.id === episodeId)[0]?.number;

  const arcs = require('../../Services/Data/onePieceArcs.json').arcs;
  const currentArcId = arcs.find(item => item.start_episode <= currentEpisodeNum && item.end_episode >= currentEpisodeNum)?.id;
  const selectedArc = arcs.find(item => item.id === currentArcId);
  const [arcId, setArcId] = useState(currentArcId);
  const [episodeList, setEpisodeList] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });

    if (open === true) {
      setArcId(currentArcId);
      setEpisodeList(animeSearchNumberBetween(norm_episodes, selectedArc?.start_episode, selectedArc?.end_episode)); 
    }

    if (open === false) moveToTop();
  };

  const handleArcChange = (e) => {
    e.preventDefault();

    var newEpisodeList = details?.episodes;
    if (e.target.value != "") {
      let selectedArc = arcs?.filter(item => item.id === e.target.value)[0];
      newEpisodeList = animeSearchNumberBetween(newEpisodeList, selectedArc?.start_episode, selectedArc?.end_episode);
    }
    setArcId(e.target.value);
    setEpisodeList(newEpisodeList);
  }

  const handleChangeEpisode = (e, epId, anchor) => {
    e.preventDefault();
    setLoadingEpisode(true);
    setSelectedEpisode(epId);
    setState({ ...state, [anchor]: false });
    moveToTop();
  };

  useEffect(() => {
  }, []);
  

  const list = (anchor) => (
    <Box
      className='channel_drawer_box'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500, height: '100%', overflow: 'auto', paddingBottom: '30px' }}
      role="presentation"
    >
        <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>
          {episodeList?.length > 0 ? (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <div>
                <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2} justifyContent="center">
                  {episodeList?.map((item, i) => {
                        return (
                            <React.Fragment key={i}>
                              <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'}>
                                {item.id === episodeId ?
                                  <Button variant='contained' color='primary' size='small' title={item.title} startIcon={<PlayCircleIcon/>} style={{ fontSize: '12px', fontWeight: '650', minWidth: '80px' }}>EP {item.number}</Button>
                                : 
                                  <Button variant='outlined' color='primary' size='small' title={item.title} onClick={(e) => handleChangeEpisode(e, item.id, anchor)} style={{ fontSize: '12px', fontWeight: '650', minWidth: '80px' }}>EP {item.number}</Button>
                                }
                              </Grid>
                            </React.Fragment>
                        );
                    })}
                </Grid>
              </div>
            </Grid>
          ) : (
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <center>No result found.</center>
              </Grid>
          )}
        </Grid>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {[drawerAlign].map((anchor) => (
        <React.Fragment key={anchor}>
          <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0}>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              {details?.episodes?.length > 1 && 
                <Typography variant='big' className='selectedEpisodeContent' style={{ verticalAlign: 'middle' }}>EPISODE {norm_episodes?.find(item => item.id === episodeId)?.number}</Typography>
              }
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <div style={{ textAlign: 'right' }}>
                {downloadUrl && <AnimeDownloadBtn url={downloadUrl} hasManyEpisode={details?.episodes?.length > 1}/>}
                {details?.episodes?.length > 1 && 
                  <Button className="channel_list_btn" variant="outlined" color='primary' size='small' onClick={toggleDrawer(anchor, true)} startIcon={<ListIcon/>}>EPISODES</Button>
                }
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
            <div className='tv_episodes_appbar' position="fixed" color='success' style={{ paddingBottom: '25px' }}>
              <Toolbar>
                    <Grid container direction="row" columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0}>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center', height: '6.5vh', justifyContent: 'left' }}>
                        <Box sx={{ width: '100%', marginTop: '20px' }}>
                          <FormControl fullWidth sx={{ m: 0 }} size="small">
                            <InputLabel id="demo-simple-select-error-label">ARC ({arcs?.length})</InputLabel>
                            <Select
                              labelId="demo-simple-select-error-label"
                              id="demo-simple-select-error"
                              defaultValue={arcId}
                              label={`ARC (${arcs?.length})`}
                              size='small'
                              onChange={handleArcChange}
                              renderValue={(value) => `${value === selectedArc?.id ? `▶ ${arcs.find(item => item.id === value).name}` : arcs.find(item => item.id === value).name}`}
                            >
                              {arcs?.map((item, index) => {
                                  return <MenuItem key={index} value={item.id}>
                                            {item.id === arcs.find(item => item.start_episode <= currentEpisodeNum && item.end_episode >= currentEpisodeNum)?.id && 
                                              <ListItemIcon>
                                                <PlayCircleIcon sx={{ color: '#DC4C64' }} />
                                              </ListItemIcon>
                                            } 
                                            <ListItemText primary={`${item.name} (${item.start_episode} - ${item.end_episode === 99999 ? 'Ongoing' : item.end_episode})`} />
                                          </MenuItem>
                                }
                              )}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
              </Toolbar>
            </div>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </ThemeProvider>
  );
}