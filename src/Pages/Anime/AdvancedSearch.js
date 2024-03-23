// Packages
import React, { useState, useEffect, useRef, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// React Query
import { useQuery } from 'react-query';

// Material UI Components
import { TextField, Grid, Stack, Typography, Button, Container, IconButton, Checkbox, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputAdornment } from '@mui/material';

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

import { pageLoadMS, 
         anime_genres, 
         anime_types, 
         anime_formats, 
         anime_sorts, 
         anime_statuses, 
         anime_seasons } from "../../Config/settings.config";

// Utilities
import { moveToTop, capitalizeString, replaceUnderscoreToSpace } from "../../Services/Utils";

// Services
import { anime_advanced_search } from "../../Services/AnimeService";

function AdvancedSearch() {

  document.title = 'AllHQFlix - Animes - Advanced Search';
  const type = 'anime';
  const subType = 'animeadvancedsearch';
  const yearCount = 10;
  const perPage = 32;
  const currentYear = new Date().getFullYear();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [releasedDates, setReleasedDates] = useState([]);

   // Picture loading
   const [isloadPicture, setIsloadPicture] = useState(true);

  const [squery, setsQuery] = useState("");
  const [stype, setsType] = useState(null);
  const [sformat, setsFormat] = useState(null);
  const [ssorts, setsSorts] = useState(null);
  const [sgenres, setsGenres] = useState(null);
  const [sid, setsId] = useState(null);
  const [syear, setsYear] = useState(null);
  const [sstatus, setsStatus] = useState(null);
  const [sseason, setsSeason] = useState(null);

  const [page, setPage] = useState(1);

  var query = useRef(squery);
  var animeType = useRef(stype);
  var format = useRef(sformat);
  var sorts = useRef([]);
  var genres = useRef([]);
  var id = useRef(sid);
  var year = useRef(syear);
  var status = useRef(sstatus);
  var season = useRef(sseason);

  let generalData = useQuery(['anime_advanced_search', { query: squery, aType: stype, page: page, perPage: perPage, format: sformat, sort: ssorts, genres: sgenres, id: sid, year: syear, status: sstatus, season: sseason }], anime_advanced_search, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let generalValue = generalData.data?.data?.results;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleFilterPanelOpen = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  }

  const handleQueryChange = (event) => {
    query.current = event.target.value;
  };

  const handleAnimeTypeChange = (event) => {
    if (event.target.value === "null") {
        animeType.current = null;
    } else {
        animeType.current = event.target.value;
    }
  };

  const handleFormatChange = (event) => {
    if (event.target.value === "null") {
        format.current = null;
    } else {
        format.current = event.target.value;
    }
  };

  const handleSortsChange = (event) => {
    if (event.target.checked) {
        sorts.current.push(event.target.value);
    } else {
        // remove from array
        sorts.current = sorts.current.filter(item => item !== event.target.value );
    }
  };

  const handleGenresChange = (event) => {
    if (event.target.checked) {
        genres.current.push(event.target.value);
    } else {
        // remove from array
        genres.current = genres.current.filter(item => item !== event.target.value );
    }
  };

  const handleIdChange = (event) => {
    if (event.target.value === "null") {
        id.current = null;
    } else {
        id.current = event.target.value;
    }
  };

  const handleYearChange = (event) => {
    if (event.target.value === "null") {
        year.current = null;
    } else {
        year.current = event.target.value;
    }
  };

  const handleStatusChange = (event) => {
    if (event.target.value === "null") {
        status.current = null;
    } else {
        status.current = event.target.value;
    }
  };

  const handleSeasonChange = (event) => {
    if (event.target.value === "null") {
        season.current = null;
    } else {
        season.current = event.target.value;
    }
  };

  const handleFilterClose = () => {
    handleFilterPanelOpen();
  }

  const handleFilterSubmit = () => {
    setIsloadPicture(true);

    setsQuery(query.current);
    setsType(animeType.current);
    setsFormat(format.current);

    var formatedSorts = '';
    if (sorts.current.length > 0) {
        let sortsString = '[';
        for (let countryLength = 0; countryLength < sorts.current.length; countryLength++) {
            if (countryLength === 0) {
                sortsString += `"${sorts.current[countryLength]}"`;
            } else {
                sortsString += `,"${sorts.current[countryLength]}"`;
            }
        }
        sortsString += ']';
        formatedSorts += sortsString;
    } else {
        formatedSorts = null;
    }
    setsSorts(formatedSorts);
    
    var formatedGenres = '';
    if (genres.current.length > 0) {
        let genreString = '[';
        for (let genreLength = 0; genreLength < genres.current.length; genreLength++) {
            if (genreLength === 0) {
                genreString += `"${genres.current[genreLength]}"`;
            } else {
                genreString += `,"${genres.current[genreLength]}"`;
            }
        }
        genreString += ']';
        formatedGenres += genreString;
    } else {
        formatedGenres = null;
    }
    setsGenres(formatedGenres);

    setsId(id.current);
    setsYear(year.current);
    setsStatus(status.current);
    setsSeason(season.current);

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
                                <Typography variant="h5" style={{ fontWeight: 'bolder' }}>ADVANCED SEARCH</Typography>
                            </div>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="filter_icon align-right">
                                <Button variant="contained" color="error" startIcon={<FilterAltIcon/>} size="small" onClick={() => handleFilterPanelOpen()}><b>Filter</b></Button>
                            </div>
                        </Grid>
                        
                        {/* Filter */}
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
                                                defaultValue={'null'}
                                            >
                                                <FormControlLabel value="null" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleAnimeTypeChange} />} label="All" />
                                                {anime_types.map((item, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <FormControlLabel value={item} control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleAnimeTypeChange} />} label={capitalizeString(item)} />
                                                        </Fragment>
                                                    )
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* season */}
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Season</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                sx={{ color: '#ccced1' }}
                                                defaultValue={'null'}
                                            >
                                                <FormControlLabel value="null" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleSeasonChange} />} label="All" />
                                                {anime_seasons.map((item, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <FormControlLabel value={item} control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleSeasonChange} />} label={capitalizeString(item)} />
                                                        </Fragment>
                                                    )
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* sorts */}
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: 'block' }}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Sort (Multiple Selection)</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                sx={{ color: '#ccced1' }}
                                            >
                                            {anime_sorts.map((item, index) => {
                                                let sortString = capitalizeString(replaceUnderscoreToSpace(item)).replace('Desc', '(Descending)');
                                                return(
                                                    <Fragment key={index}>
                                                        <FormControlLabel value={sortString} control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleSortsChange} />} label={sortString} />
                                                    </Fragment>
                                                )
                                            })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* genres */}
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: 'block' }}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Genre (Multiple Selection)</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                sx={{ color: '#ccced1' }}
                                            >
                                            {anime_genres.map((item, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <FormControlLabel value={item} control={<Checkbox size="small" sx={{ color: '#353b45' }} onChange={handleGenresChange} />} label={item} />
                                                    </Fragment>
                                                )
                                            })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* year */}
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Year</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                sx={{ color: '#ccced1' }}
                                                defaultValue={'null'}
                                            >
                                            <FormControlLabel value="null" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleYearChange} />} label="All" />
                                            {releasedDates.map((item, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <FormControlLabel value={item} control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleYearChange} />} label={item} />
                                                    </Fragment>
                                                )
                                            })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* status */}
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Status</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                sx={{ color: '#ccced1' }}
                                                defaultValue={'null'}
                                            >
                                                <FormControlLabel value="null" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleStatusChange} />} label="All" />
                                                {anime_statuses.map((item, index) => {
                                                    let statusString = capitalizeString(replaceUnderscoreToSpace(item));
                                                    return (
                                                        <Fragment key={index}>
                                                            <FormControlLabel value={statusString} control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleStatusChange} />} label={statusString} />
                                                        </Fragment>
                                                    )
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* formats */}
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#ccced1', fontWeight: '550' }}>Format</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                sx={{ color: '#ccced1' }}
                                                defaultValue={'null'}
                                            >
                                                <FormControlLabel value="null" control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleFormatChange} />} label="All" />
                                                {anime_formats.map((item, index) => {
                                                    let formatString = capitalizeString(replaceUnderscoreToSpace(item)).replace('Tv', 'TV').replace('Ova', 'OVA').replace('Ona', 'ONA');
                                                    return (
                                                        <Fragment key={index}>
                                                            <FormControlLabel value={formatString} control={<Radio size="small" sx={{ color: '#353b45' }} onChange={handleFormatChange} />} label={formatString} />
                                                        </Fragment>
                                                    )
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* query */}
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
                                        <TextField 
                                            fullWidth 
                                            size="small" 
                                            id="outlined-basic" 
                                            label="Search" 
                                            variant="outlined" 
                                            onChange={handleQueryChange} 
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
                                            }}
                                        />
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
        <FloatingButton/>
        <Footer/>
    </div>
  );
}

export default AdvancedSearch;