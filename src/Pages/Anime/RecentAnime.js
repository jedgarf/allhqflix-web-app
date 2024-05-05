// Packages
import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';

// Material UI Components
import {  IconButton, 
          Grid, 
          Stack, 
          Typography, 
          Container } from '@mui/material';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Icons
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import SearchResult from "../../Components/SearchResult/SearchResult";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { pageLoadMS } from "../../Config/settings.config";

// Utils
import { moveToTop } from "../../Services/Utils";

// Models
import { recent_anime_episodes } from "../../Services/AnimeService";

function RecentAnime() {

  const type = 'anime';
  const subType = 'recent_anime';
  const contentType = 'anime';
  document.title = 'AllHQFlix - Anime - Recent Anime';
  
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Picture loading
  const [isloadPicture, setIsloadPicture] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  let recentData = useQuery(['recent_anime_episodes', { page: page }], recent_anime_episodes, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let recentValue = recentData.data?.data?.results;

  const pagePrev = () => {
    setIsloadPicture(true);
    setPage((page) => page - 1);
    moveToTop();
  }

  const pageNext = () => {
    setIsloadPicture(true);
    setPage((page) => page + 1);
    moveToTop();
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, pageLoadMS);
  }, []);

  return (
    recentData.isLoading ? 
      <LoadingPage/>
    : 
    <div className="movies" style={{ height: '100vh' }}>
      <ReactQueryTools/>
      <div className="search_result_content">
        <div className="search__top">
          <SideBar Type={type} subType={subType}/>
        </div>

        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Container maxWidth={'xxl'}>
            <Grid container direction="row" columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className="page-title">
                  <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>RECENT RELEASED</Typography>
                </div>
              </Grid>

                {recentData.isLoading ?
                (
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div className="search_result_pagination">
                      <div className="movie_result_pagination_count" style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress sx={{ fontSize: 100 }} />
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                    {/* Upper pagination */}
                    <div className="search_result_pagination">
                      <div className="search_result_pagination_buttons" style={{ display: recentData.data?.data?.currentPage > 1 || recentData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                            <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={recentData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                            {recentValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{recentData.data?.data?.currentPage}</Typography>}
                            <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={recentData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                        </Stack>
                      </div>
                    </div>

                    {/* Results */}
                    {recentValue.length > 0 ? (
                    <div className="movie_result_data">
                      <Grid container columnSpacing={{ xs: 3, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={3} justifyContent="center">
                        {recentValue.map((data, index) => (
                          <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'} key={index}>
                            <SearchResult
                              isloadImage={isloadPicture}
                              contentType={contentType}
                              id={data?.id}
                              img={data?.image}
                              title={ data?.title?.english || data?.title?.userPreferred || data?.title?.romaji || data?.title?.native || data?.title || data?.name }
                              release_date={data?.releaseDate || data?.Year?.name}
                              rate={data?.rating}
                              season={data?.seasons}
                              episode={data?.totalEpisodes}
                              type={data?.type || data?.Type?.name}
                              // slug={data?.slug}
                              video_quality={data?.video_quality}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                    ) : (
                      <div className="search_result_pagination">
                        <div className="movie_result_pagination_count" style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          No Result Found.
                        </div>
                      </div>
                    )}
                    
                    {/* Lower pagination */}
                    <div className="search_result_pagination">
                      <div className="search_result_pagination_buttons" style={{ display: recentData.data?.data?.currentPage > 1 || recentData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                            <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={recentData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                            {recentValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{recentData.data?.data?.currentPage}</Typography>}
                            <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={recentData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                        </Stack>
                      </div>
                    </div>

                  </Grid>
                )}

            </Grid>
          </Container>
        </ThemeProvider>
      </div>
      <Footer/>
    </div>
  );
}

export default RecentAnime;
