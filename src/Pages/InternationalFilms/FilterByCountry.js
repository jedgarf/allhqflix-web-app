// Packages
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

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
          FormLabel,
          MenuItem, 
          FormHelperText,
          Select,
          Autocomplete } from '@mui/material';
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

import { foreign_country } from "../../Config/settings.config";

import { moveToTop } from "../../Services/Utils";

// Models
import { movie_filter_by_country } from "../../Services/FlixHQService";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function FilterByGenre() {

  document.title = 'AllHQFlix - International - By Country';
  const queryParams = new URLSearchParams(window.location.search);

  const type = 'foreign';
  const subType = 'foreignfilterbycountry';

  const defaultCountry = queryParams.get("country") === null ? 'PH' : foreign_country.filter( (item, i) => item.name === queryParams.get("country"))[0].code;
  const defaultPageNumber = queryParams.get("page") === null ? 1 : queryParams.get("page");

  const [country, setCountry] = useState(defaultCountry);
  const [page, setPage] = useState(defaultPageNumber);

  // loading
  const [isloadPicture, setIsloadPicture] = useState(true);

  let countryData = useQuery(['movie_filter_by_country', { country: country, page: page }], movie_filter_by_country, {
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
                        <MenuItem value={'PH'}>{'Philippines'}</MenuItem>
                        {foreign_country.map((item, no) => {
                            return <MenuItem value={item.code}>{item.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>
            
              {<>
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
                      <Grid container columnSpacing={{ xs: 3, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={3} justifyContent="center">
                        {countryValue.map((data) => (
                          <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'}>
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
                              // slug={data?.slug}
                              video_quality={data?.video_quality}
                              hasLink={true}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                    ) : (
                      <div className="movie_result_pagination">
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

export default FilterByGenre;
