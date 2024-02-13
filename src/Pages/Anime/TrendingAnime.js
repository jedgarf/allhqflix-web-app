// Packages
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useParams, useNavigate } from "react-router-dom";

// Material UI Components
import {  TextField, 
          IconButton, 
          Grid, 
          Stack, 
          Radio, 
          Typography, 
          Button, 
          Box, 
          InputLabel, 
          FormControl, 
          NativeSelect, 
          Container, 
          Divider, 
          Checkbox,
          RadioGroup,
          FormControlLabel,
          FormLabel } from '@mui/material';
import { pink, blue } from '@mui/material/colors';
import { useSelector , useDispatch } from "react-redux";

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Icons
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import SearchResult from "../../Components/SearchResult/SearchResult";

import { moveToTop } from "../../Services/Utils";

// Models
import { trending_anime } from "../../Services/AnimeService";

function TrendingAnime() {

  const type = 'anime';
  const subType = 'trending_anime';
  const contentType = 'anime';
  document.title = 'AllHQFlix - Anime - Trending Anime';
  
  const [page, setPage] = useState(1);

  // loading
  const [isloadPicture, setIsloadPicture] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


  let trendingData = useQuery(['trending_anime', { page: page }], trending_anime, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let trendingValue = trendingData.data?.data?.results;

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

  return (
    <>
      <div className="search_result">
      {process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? <div className="top"><ReactQueryDevtools initialIsOpen={false} /></div> : <div className="top"></div> }
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
                  <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>TRENDING ANIMES</Typography>
                </div>
              </Grid>
            
              {<>
                {trendingData.isLoading ?
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
                      <div className="search_result_pagination_buttons" style={{ display: trendingData.data?.data?.currentPage > 1 || trendingData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                            <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={trendingData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                            {trendingValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{trendingData.data?.data?.currentPage}</Typography>}
                            <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={trendingData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                        </Stack>
                      </div>
                    </div>

                    {trendingValue.length > 0 ? (
                    <div className="movie_result_data">
                      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2} justifyContent="center">
                        {trendingValue.map((data) => (
                          <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'}>
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
                        <div className="movie_result_pagination_count">
                          No Result Found.
                        </div>
                      </div>
                    )}
                    
                    {/* Lower pagination */}
                    <div className="search_result_pagination">
                      <div className="search_result_pagination_buttons" style={{ display: trendingData.data?.data?.currentPage > 1 || trendingData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                            <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={trendingData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                            {trendingValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{trendingData.data?.data?.currentPage}</Typography>}
                            <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={trendingData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                        </Stack>
                      </div>
                    </div>

                  </Grid>
                )}
                </>}

            </Grid>
            </Container>
        </ThemeProvider>
        
       </div>
      <Footer/>
      </div>
    </>
  );
}

export default TrendingAnime;
