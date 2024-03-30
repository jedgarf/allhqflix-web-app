// Packages
import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';

// Material UI Components
import {  IconButton, 
          Grid, 
          Stack, 
          Typography, 
          Box, 
          InputLabel, 
          FormControl, 
          Container, 
          Select,
          MenuItem } from '@mui/material';

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
import { pageLoadMS, asian_films_country } from "../../Config/settings.config";

// Utils
import { moveToTop } from "../../Services/Utils";

// Models
import { asianfilms_bycountry } from "../../Services/ViewAsianService";

function AsianFilmsFilterByCountry() {

  const queryParams = new URLSearchParams(window.location.search);
  const type = 'asian_films';
  const subType = 'asianfilmsfilterbycountry';
  const defaultCountry = queryParams.get("country") === null ? 'philippine' : asian_films_country.filter( (item, i) => item.name === queryParams.get("country"))[0].code;
  document.title = 'AllHQFlix - Asian Films - By Country';

  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState(defaultCountry);
  const [page, setPage] = useState(1);

  // loading
  const [isloadPicture, setIsloadPicture] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  let countryData = useQuery(['asianfilms_bycountry', { country: country, page: page }], asianfilms_bycountry, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let countryValue = countryData.data?.data?.results;

  const handleRadioChange = (event) => {
    setIsloadPicture(true);
    setCountry(event.target.value);
    setPage(1);
  };

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
    <div className="search_result">
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
                    <Typography variant="h5" style={{ fontWeight: 'bolder' }}>FILTER BY COUNTRY</Typography>
                  </div>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <div className="filter_icon align-right">
                    <Box sx={{ minWidth: '250px' }}>

                      <FormControl sx={{ m: 1, minWidth: '100%' }} size="small">
                        <InputLabel id="demo-simple-select-error-label">Country</InputLabel>
                        <Select
                          labelId="demo-simple-select-error-label"
                          id="demo-simple-select-error"
                          defaultValue={defaultCountry}
                          label="Country"
                          onChange={handleRadioChange}
                          style={{ height: 35, fontSize: 14 }}
                          // renderValue={(value) => `⚠️  - ${value}`}
                        >
                          {asian_films_country.map((item, index) => {
                              return <MenuItem key={index} value={item.code}>{item.name}</MenuItem>
                          })}
                        </Select>
                      </FormControl>

                    </Box>
                  </div>
                </Grid>

                {countryData.isLoading ?
                (
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div className="movie_result_pagination">
                      <div className="movie_result_pagination_count" style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress sx={{ fontSize: 100 }} />
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                    {/* Upper pagination */}
                    <div className="search_result_pagination">
                      <div className="search_result_pagination_buttons" style={{ display: countryData.data?.data?.currentPage > 1 || countryData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                          <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={countryData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                          {countryValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{countryData.data?.data?.currentPage}</Typography>}
                          <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={countryData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                        </Stack>
                      </div>
                    </div>

                    {countryValue?.length > 0 ? (
                    <div className="movie_result_data">
                      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2} justifyContent="center">
                        {countryValue?.map((data, index) => (
                          <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'} key={index}>
                            <SearchResult
                              isloadImage={isloadPicture}
                              contentType={type}
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

                    {/* Lower pagination */}
                    <div className="search_result_pagination">
                      <div className="search_result_pagination_buttons" style={{ display: countryData.data?.data?.currentPage > 1 || countryData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                          <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={countryData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                          {countryValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{countryData.data?.data?.currentPage}</Typography>}
                          <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={countryData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                        </Stack>
                      </div>
                    </div>

                  </Grid>
                )}

              </Grid>
            </Container>
        </ThemeProvider>
      </div>
      <FloatingButton/>
      <Footer/>
    </div>
  );
}

export default AsianFilmsFilterByCountry;
