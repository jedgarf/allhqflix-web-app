// Packages
import React, { useState } from "react";
import { useQuery } from 'react-query';
import { IconButton, Grid, Stack, Typography, Container } from '@mui/material';

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
import SearchResult from "../../Components/SearchResult/SearchResult";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

import { moveToTop } from "../../Services/Utils";

// Models
import { series_popular } from "../../Services/FlixHQService";

function PopularTVSeries() {

  document.title = 'AllHQFlix - International - Popular TV Series';

  const queryParams = new URLSearchParams(window.location.search);

  const type = 'foreign';
  const subType = 'popular_tv_series';
  const contentType = 'tv';
  
  const defaultPageNumber = queryParams.get("page") === null ? 1 : queryParams.get("page");
  const [page, setPage] = useState(defaultPageNumber);

  // loading
  const [isloadPicture, setIsloadPicture] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  let popularData = useQuery(['series_popular', { page: page }], series_popular, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let popularValue = popularData.data?.data?.results;

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
      <ReactQueryTools/>
       <div className="search_result_content">
        <div className="search__top">
          <SideBar Type={type} subType={subType}/>
        </div>

        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Container maxWidth={'xxl'}>
            <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className="page-title">
                  <Typography variant="h5" style={{ fontWeight: 'bolder' }}>POPULAR TV SERIES</Typography>
                </div>
              </Grid>

              {<>
                {popularData.isLoading ?
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
                      <div className="search_result_pagination_buttons" style={{ display: popularData.data?.data?.currentPage > 1 || popularData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                          <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={popularData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                          {popularValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{popularData.data?.data?.currentPage}</Typography>}
                          <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={popularData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                        </Stack>
                      </div>
                    </div>

                    {/* Results */}
                    {popularValue.length > 0 ? (
                      <div className="movie_result_data">
                        <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2} justifyContent="center">
                          {popularValue.map((data) => (
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
                    {/* End of results */}

                    {/* Lower pagination */}
                    <div className="search_result_pagination">
                      <div className="search_result_pagination_buttons" style={{ display: popularData.data?.data?.currentPage > 1 || popularData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                          <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={popularData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                          {popularValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{popularData.data?.data?.currentPage}</Typography>}
                          <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={popularData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
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

export default PopularTVSeries;