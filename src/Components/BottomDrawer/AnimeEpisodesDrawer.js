import React, { useState, useEffect } from 'react';

// Components
import AnimeDownloadBtn from '../DownloadMedia/AnimeDownloadBtn';

// Material UI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Toolbar, Box, Button, IconButton, Typography, Grid, Drawer } from '@mui/material';

// Icons
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ListIcon from '@mui/icons-material/List';

export default function AnimeEpisodesDrawer({ details, downloadUrl, mediaId, episodeId, setSelectedEpisode, setLoadingEpisode, itemsPerPage, episodesCurrentPage, moveToTop, drawerAlign }) {

  const [state, setState] = React.useState({
    bottom: false,
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  var norm_episodes = details?.episodes;
  const [drawerCurrentPage, setDrawerCurrentPage] = useState(episodesCurrentPage);
  const totalPages = Math.ceil(norm_episodes?.length / itemsPerPage);
  const startIndex = (drawerCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = norm_episodes?.slice(startIndex, endIndex);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    if (open === false) {
      moveToTop();
      setDrawerCurrentPage(episodesCurrentPage);
    }
  };

  const handlePageChange = (newPage) => {
    setDrawerCurrentPage(newPage);
  };

  const handleChangeEpisode = (e, epId, anchor) => {
    e.preventDefault();
    setLoadingEpisode(true);
    setSelectedEpisode(epId);
    setState({ ...state, [anchor]: false });
    moveToTop();
  };

  useEffect(() => {
    setDrawerCurrentPage(episodesCurrentPage);
  }, [episodesCurrentPage]);
  

  const list = (anchor) => (
    <Box
      className='channel_drawer_box'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500, height: '100%', overflow: 'auto', paddingBottom: '30px' }}
      role="presentation"
    >
        <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>
          {currentData?.length > 0 ? (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <div>
                <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2} justifyContent="center">
                  {currentData?.map((item, i) => {
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
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ display: 'flex', alignItems: 'center', height: '3.3vh' }}>
              {details?.episodes?.length > 1 && 
                <Typography variant='big' className='selectedEpisodeContent'>EPISODE {norm_episodes?.filter(item => item.id === episodeId)[0]?.number}</Typography>
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
            <div className='tv_episodes_appbar' position="fixed" color='success'>
              <Toolbar>
                    <Grid container direction="row" columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0}>
                      {/* <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{ display: 'flex', alignItems: 'center', height: '6.5vh' }}>
                        <IconButton title='Close' onClick={toggleDrawer(anchor, false)}><CloseIcon/></IconButton>
                      </Grid> */}
                      <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ display: 'flex', alignItems: 'center', height: '6.5vh' }}>
                        <Typography variant='p' sx={{ fontWeight: '550' }}>EPISODES ({norm_episodes?.length})</Typography>
                      </Grid>
                      <Grid item xl={6} lg={6} md={6} sm={6} xs={6} style={{ display: 'flex', alignItems: 'center', height: '6.5vh', justifyContent: 'right' }}>
                        {currentData?.length > 0 && (
                          <>
                            <IconButton 
                              title='Previous Page'
                              onClick={() => handlePageChange(drawerCurrentPage - 1)}
                              disabled={drawerCurrentPage === 1}>
                                <ArrowBackIosNewIcon/>
                            </IconButton>
                            <span>{drawerCurrentPage} of {totalPages}</span>
                            <IconButton 
                              title='Next Page'
                              onClick={() => handlePageChange(drawerCurrentPage + 1)}
                              disabled={drawerCurrentPage === totalPages}>
                                <ArrowForwardIosIcon/>
                            </IconButton>
                          </>
                        )}
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