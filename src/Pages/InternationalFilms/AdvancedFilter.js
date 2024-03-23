// Packages
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useQuery } from 'react-query';

// Material UI Components
import {  IconButton, 
          Grid, 
          Stack, 
          Radio, 
          Typography, 
          Button, 
          FormControl, 
          Container, 
          Checkbox,
          RadioGroup,
          FormControlLabel,
          FormLabel } from '@mui/material';

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
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import SearchResult from "../../Components/SearchResult/SearchResult";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { pageLoadMS, foreign_genre, foreign_country } from "../../Config/settings.config";

// Utils
import { moveToTop } from "../../Services/Utils";

// Models
import { movie_advanced_filter } from "../../Services/FlixHQService";

function AdvancedFilter() {

  document.title = 'AllHQFlix - International - Advanced Filter';
  const type = 'foreign';
  const subType = 'foreignadvancedfliter';
  const queryParams = new URLSearchParams(window.location.search);
  const defaultMovieType = queryParams.get("type") || 'all';
  const defaultQuality = queryParams.get("quality") || 'all';
  const defaultReleaseYear = queryParams.get("year") || 'all';
  const defaultGenre = parseInt(queryParams.get("genre")) || 'all';
  const defaultCountry = parseInt(queryParams.get("country")) || 'all';

  // Initialize a count variable
  let paramCount = 0;

  // Iterate through the parameters
  for (const param of queryParams) {
    paramCount++;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [releasedDates, setReleasedDates] = useState([]);
  const [smovieType, setsMovieType] = useState(defaultMovieType);
  const [squality, setsQuality] = useState(defaultQuality);
  const [sreleaseYear, setsReleaseYear] = useState(defaultReleaseYear);
  const [sgenre, setsGenre] = useState(defaultGenre);
  const [scountry, setsCountry] = useState(defaultCountry);
  const [page, setPage] = useState(1);

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const movieType = useRef(smovieType);
  const quality = useRef(squality);
  const releaseYear = useRef(sreleaseYear);
  const genre = useRef([]);
  const country = useRef([]);

  genre.current = genre.current.filter(item => item !== defaultGenre );
  country.current = country.current.filter(item => item !== defaultCountry );

  // Picture loading
  const [isloadPicture, setIsloadPicture] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const currentYear = new Date().getFullYear();
  const yearCount = 10;

  let generalData = useQuery(['movie_advanced_filter', { type: smovieType, quality: squality, release_year: sreleaseYear, genre: sgenre, country: scountry, page: page }], movie_advanced_filter, {
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

  const handleQualityChange = (event) => {
    quality.current = event.target.value;
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
    setsQuality(quality.current);
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

    setTimeout(() => {
      setIsLoading(false);
    }, pageLoadMS);

  }, [currentYear]);

  return (
    generalData.isLoading ? 
      <LoadingPage/>
    : 
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
                    {paramCount > 0 ? (
                      <Typography variant="h5" style={{ fontWeight: 'bolder' }}>FILTER RESULTS</Typography>
                    ) : (
                      <Typography variant="h5" style={{ fontWeight: 'bolder' }}>ADVANCED FILTER</Typography>
                    )}
                  </div>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <div className="filter_icon align-right">
                      {paramCount === 0 && 
                      <Button variant="contained" color="error" startIcon={<FilterAltIcon/>} size="small" onClick={() => handleFilterPanelOpen()}><b>Filter</b></Button>}
                  </div>
                </Grid>

                {/* Filters */}
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
                                      defaultValue={defaultMovieType}
                                  >
                                      <FormControlLabel value="all" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleMovieTypeChange} />} label="All" />
                                      <FormControlLabel value="movie" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleMovieTypeChange} />} label="Movies" />
                                      <FormControlLabel value="tv" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleMovieTypeChange} />} label="TV Series" />
                                  </RadioGroup>
                              </FormControl>
                          </Grid>
                          {/* quality */}
                          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                              <FormControl>
                                  <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Quality</FormLabel>
                                  <RadioGroup
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                      sx={{ color: '#ccced1' }}
                                      defaultValue={defaultQuality}
                                  >
                                      <FormControlLabel value="all" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleQualityChange} />} label="All" />
                                      <FormControlLabel value="HD" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleQualityChange} />} label="HD" />
                                      <FormControlLabel value="SD" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleQualityChange} />} label="SD" />
                                      <FormControlLabel value="TS" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleQualityChange} />} label="TS" />
                                      <FormControlLabel value="CAM" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleQualityChange} />} label="CAM" />
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
                                      defaultValue={defaultReleaseYear}
                                  >
                                  <FormControlLabel value="all" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleReleaseYearChange} />} label="All" />
                                  {releasedDates.map((item, index) => {
                                      return(
                                          <FormControlLabel key={index} value={item} control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleReleaseYearChange} />} label={item} />
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
                                  {foreign_genre.map((item, index) => {
                                      return(
                                          <Fragment key={index}>
                                            {item.genre_id === defaultGenre ? 
                                            (<FormControlLabel value={item.genre_id} control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleGenreChange} checked/>} label={item.name} />)
                                            : 
                                            (<FormControlLabel value={item.genre_id} control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleGenreChange}/>} label={item.name} />)}
                                          </Fragment>
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
                                  {foreign_country.map((item, index) => {
                                      return(
                                          <Fragment key={index}>
                                            {item.country_id === defaultCountry ? 
                                            (<FormControlLabel value={item.country_id} control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleCountryChange} checked/>} label={item.name} />)
                                            : 
                                            (<FormControlLabel value={item.country_id} control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleCountryChange} />} label={item.name} />)}
                                          </Fragment>
                                      )
                                  })}
                                  </RadioGroup>
                              </FormControl>
                          </Grid>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                              <div className="align-right">
                                  <Stack direction="row" spacing={1}>
                                      <Button variant="contained" color="error" size="small" onClick={handleFilterClose} startIcon={<CloseIcon/>}>Close</Button>
                                      <Button variant="contained" size="small" onClick={handleFilterSubmit} startIcon={<SearchIcon/>}>Filter</Button>
                                  </Stack>
                              </div>
                          </Grid>
                      </Grid>
                      <br/>
                  </div>
                </Grid>

                {<>
                  {generalData.isLoading ?
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
                          <Grid container columnSpacing={{ xs: 3, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={3} justifyContent="center">
                            {generalValue.map((data, index) => (
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
                                  hasLink={true}
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
                  </>}
              </Grid>
            </Container>
        </ThemeProvider>
      </div>
    <FloatingButton/>
    <Footer/>
    </div>
  );
}

export default AdvancedFilter;