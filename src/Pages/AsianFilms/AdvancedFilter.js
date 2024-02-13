// Packages
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useParams } from "react-router-dom";

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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import SearchResult from "../../Components/SearchResult/SearchResult";

import { asian_films_genre, asian_films_country } from "../../Config/settings.config";

import { moveToTop } from "../../Services/Utils";

// Models
import { asianfilms_advancedfilter } from "../../Services/ViewAsianService";

function AdvancedFilter() {

  const type = 'asian_films';
  const subType = 'asianfilmsadvancedfilter';
  document.title = 'AllHQFlix - Asian Films - Advanced Filter';

  const [releasedDates, setReleasedDates] = useState([]);
  const [smovieType, setsMovieType] = useState('all');
  const [sreleaseYear, setsReleaseYear] = useState('all');
  const [scategory, setsCategory] = useState('all');
  const [sgenre, setsGenre] = useState('all');
  const [scountry, setsCountry] = useState('all');
  const [page, setPage] = useState(1);

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const movieType = useRef(smovieType);
  const releaseYear = useRef(sreleaseYear);
  const category = useRef(scategory);
  const genre = useRef([]);
  const country = useRef([]);

  // loading
  const [isloadPicture, setIsloadPicture] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const currentYear = new Date().getFullYear();
  const yearCount = 10;

  let generalData = useQuery(['asianfilms_advancedfilter', { film_type: smovieType, genre: sgenre, country: scountry, release_year: sreleaseYear, category: scategory, page: page }], asianfilms_advancedfilter, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let generalValue = generalData.data?.data?.results;

  const handleFilterPanelOpen = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  }

  const handleMovieTypeChange = (event) => {
    movieType.current = event.target.value;
  };

  const handleCategoryChange = (event) => {
    category.current = event.target.value;
  };

  const handleReleaseYearChange = (event) => {
    releaseYear.current = event.target.value;;
  };

  const handleGenreChange = (event) => {
    if (event.target.checked) {
        genre.current.push(event.target.value);
    } else {
        genre.current = genre.current.filter(item => item !== event.target.value );
    }
  };

  const handleCountryChange = (event) => {
    if (event.target.checked) {
        country.current.push(event.target.value);
    } else {
        country.current = country.current.filter(item => item !== event.target.value );
    }
  };

  const handleFilterClose = () => {
    handleFilterPanelOpen();
  }

  const handleFilterSubmit = () => {
    setIsloadPicture(true);
    setsMovieType(movieType.current);
    setsCategory(category.current);
    setsReleaseYear(releaseYear.current);
    
    var formatedGenres = '';
    var formatedCountries = '';

    if (genre.current.length > 0) {
        let genreString = '';
        for (let genreLength = 0; genreLength < genre.current.length; genreLength++) {
            if (genreLength === 0) {
                genreString += genre.current[genreLength];
            } else {
                genreString += `-${genre.current[genreLength]}`;
            }
        }
        formatedGenres += genreString;
    } else {
        formatedGenres += 'all';
    }
    setsGenre(formatedGenres);

    if (country.current.length > 0) {
        let countryString = '';
        for (let countryLength = 0; countryLength < country.current.length; countryLength++) {
            if (countryLength === 0) {
                countryString += country.current[countryLength];
            } else {
                countryString += `-${country.current[countryLength]}`;
            }
        }
        formatedCountries += countryString;
    } else {
        formatedCountries += 'all';
    }
    setsCountry(formatedCountries);

    setPage(1);
    handleFilterPanelOpen();
  }

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
    for (let yearLength = 0; yearLength < yearCount; yearLength++) {
        setReleasedDates(releasedDates => [...releasedDates, currentYear - yearLength]);
    }
  }, [currentYear]);

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
                    <Typography variant="h5" style={{ fontWeight: 'bolder' }}>ADVANCED FILTER</Typography>
                </div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className="filter_icon align-right">
                    <Button variant="contained" color="error" startIcon={<FilterAltIcon/>} size="small" onClick={() => handleFilterPanelOpen()}><b>Filter</b></Button>
                </div>
              </Grid>

              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: isFilterPanelOpen ? 'block' : 'none' }}>
                <div className="filter_container" style={{ borderBottom: '1px solid #353b45' }}>
                    <Grid container direction="row" columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} rowSpacing={1}>
                        {/* type */}
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Type</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    sx={{ color: '#ccced1' }}
                                >
                                    <FormControlLabel value="all" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleMovieTypeChange} />} label="All" />
                                    <FormControlLabel value="movie" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleMovieTypeChange} />} label="Movies" />
                                    <FormControlLabel value="series" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleMovieTypeChange} />} label="TV Series" />
                                    <FormControlLabel value="kshow" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleMovieTypeChange} />} label="Korean Shows" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {/* sort by */}
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Sort By</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    sx={{ color: '#ccced1' }}
                                >
                                    <FormControlLabel value="all" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleCategoryChange} />} label="All" />
                                    <FormControlLabel value="latest" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleCategoryChange} />} label="Latest" />
                                    <FormControlLabel value="most" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleCategoryChange} />} label="Most Viewed" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {/* released */}
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Released</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    sx={{ color: '#ccced1' }}
                                >
                                <FormControlLabel value="all" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleReleaseYearChange} />} label="All" />
                                {releasedDates.map((item, i) => {
                                    return(
                                        <FormControlLabel value={item} control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleReleaseYearChange} />} label={item} />
                                    )
                                })}
                                <FormControlLabel value={`older-${releasedDates[releasedDates.length - 1]}`} control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleReleaseYearChange} />} label="Older" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {/* genre */}
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: 'block' }}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Genre (Multiple Selection)</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    sx={{ color: '#ccced1' }}
                                >
                                {/* <FormControlLabel value="all" control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleGenreChange} />} label="All" /> */}
                                {asian_films_genre.map((item, i) => {
                                    return(
                                        <FormControlLabel value={item.genre_id} control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleGenreChange} />} label={item.name} />
                                    )
                                })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {/* country */}
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: 'block' }}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Country (Multiple Selection)</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    sx={{ color: '#ccced1' }}
                                >
                                {/* <FormControlLabel value="all" control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleCountryChange} />} label="All" /> */}
                                {asian_films_country.map((item, i) => {
                                    return(
                                        <FormControlLabel value={item.country_id} control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleCountryChange} />} label={item.name} />
                                    )
                                })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="align-right">
                                <Stack direction="row" spacing={1}>
                                    <Button variant="contained" color="error" size="small" onClick={handleFilterClose} startIcon={<CloseIcon/>}>Close</Button>
                                    <Button variant="contained" color="primary" size="small" onClick={handleFilterSubmit} startIcon={<SearchIcon/>}>Filter</Button>
                                </Stack>
                            </div>
                        </Grid>
                    </Grid>
                    <br/>
                </div>
              </Grid>

                {generalData.isLoading ?
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
                      <div className="search_result_pagination_buttons" style={{ display: generalData.data?.data?.currentPage > 1 || generalData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                          <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={generalData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                          {generalValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{generalData.data?.data?.currentPage}</Typography>}
                          <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={generalData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                        </Stack>
                      </div>
                    </div>

                    {generalValue?.length > 0 ? (
                    <div className="movie_result_data">
                      <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2} justifyContent="center">
                        {generalValue.map((data) => (
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
                      <div className="search_result_pagination_buttons" style={{ display: generalData.data?.data?.currentPage > 1 || generalData.data?.data?.hasNextPage === true ? 'flex' : 'none' }}>
                        <Stack spacing={2} direction="row" mt={2}>
                          <IconButton size="small" title="PREVIOUS" onClick={() => pagePrev()} disabled={generalData.data?.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                          {generalValue.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{generalData.data?.data?.currentPage}</Typography>}
                          <IconButton size="small" title="NEXT" onClick={() => pageNext()} disabled={generalData.data?.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
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
    </>
  );
}

export default AdvancedFilter;