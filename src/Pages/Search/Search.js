// Packages
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";

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

// CSS
import "./Search.css";

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

// Services
import { menus } from "../../Services/SettingService";
import { movie_search } from "../../Services/FlixHQService";
import { anime_search } from "../../Services/AnimeService";
import { asiandrama_search } from "../../Services/DramaCoolService";
import { asianfilms_search } from "../../Services/ViewAsianService";

function Search() {

  const queryParams = new URLSearchParams(window.location.search);
  const searchKeyword = queryParams.get("keyword") === null ? "" : queryParams.get("keyword");
  const { type } = useParams();
  var defaultType = "";

  switch (type) {
    case "movie":
    case "movies":
    case "tv":
    case "tvshow":
    case "foreign":
      defaultType = "foreign";
      break;
    
    case "anime":
      defaultType = "anime";
      break;

    case "asian_drama":
    case "drama-detail":
      defaultType = "drama-detail";
      break;

    case "asian_films":
    case "drama":
      defaultType = "drama";
    break;
  
    default:
      defaultType = 'foreign';
      break;
  }

  // loading
  const [isLoading, setIsLoading] = useState(true);
  const [isloadPicture, setIsloadPicture] = useState(true);

  const [contentType, setContentType] = useState(defaultType);
  const [content, setContent] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleRadioChange = (event) => {
    setIsLoading(true);
    setIsloadPicture(true);
    setContentType(event.target.value);
  };

  let getMenu = useQuery(['menus', { type: "FEATURE", is_active: 1, id: null }], menus, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });

  let menu = getMenu?.data?.data?.data;

  const getInfo = useCallback((page = 1) => {
    setIsLoading(true);
    setIsloadPicture(true);
    if (contentType === "foreign") {
      movie_search(searchKeyword, page).then((response) => {
        setContent(response);
        setIsLoading(false);
      });
    } else if (contentType === "anime") {
      anime_search(searchKeyword, page).then((response) => {
        setContent(response);
        setIsLoading(false);
      });
    } else if (contentType === "drama-detail" || contentType === "asian_drama") {
      asiandrama_search(searchKeyword, page).then((response) => {
        setContent(response);
        setIsLoading(false);
      });
    } else if (contentType === "drama" || contentType === "asian_films") {
      asianfilms_search(searchKeyword, page).then((response) => {
        setContent(response);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      alert("Not Available");
    }
    moveToTop();
  }, [searchKeyword, contentType]);

  useEffect(() => {

    document.title = 'AllHQFlix - Search';
    getInfo();

    setTimeout(() => {
      setIsLoading(false);
    }, pageLoadMS);

  }, [getInfo]);

  return (
    isLoading ? 
      <LoadingPage/>
    : 
    <div className="search_result">
      <ReactQueryTools/>
      <div className="search_result_content">
        <div className="search__top">
          <SideBar Type={type} subType={null}/>
        </div>

        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Container maxWidth={'xxl'}>
            <Grid container direction="row" columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className="page-title">
                  <Typography variant="h5" style={{ fontWeight: 'bolder' }}>SEARCH RESULTS</Typography>
                </div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className="filter_icon align-right">
                  <Box sx={{ minWidth: '250px' }}>
                    <FormControl sx={{ m: 1, minWidth: '100%' }} size="small">
                      <InputLabel id="demo-simple-select-error-label">Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        defaultValue={contentType}
                        label="Category"
                        onChange={handleRadioChange}
                        // renderValue={(value) => `⚠️  - ${value}`}
                      >
                        {menu?.sort((a, b) => { return a.sequence - b.sequence }).filter((item) => { return item.search_code !== '' && item.is_active === true }).map((item, index) => {
                            return <MenuItem key={index} value={item.search_code}>{item.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>

              {isLoading ?
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
                  <div className="search_result_pagination_buttons" style={{ display: content.data?.currentPage > 1 || content.data?.hasNextPage === true ? 'flex' : 'none' }}>
                    <Stack spacing={2} direction="row" mt={2}>
                      <IconButton size="small" title="PREVIOUS" onClick={() => getInfo(parseInt(content.data?.currentPage) - 1)} disabled={content.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                      {content.data?.results?.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{content.data?.currentPage}</Typography>}
                      <IconButton size="small" title="NEXT" onClick={() => getInfo(parseInt(content.data?.currentPage) + 1)} disabled={content.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
                    </Stack>
                  </div>
                </div>

                {content.data?.results?.length > 0 ? (
                  <div className="movie_result_data">
                    <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2} justifyContent="center">
                      {content.data.results.map((data, index) => (
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
                            video_quality={data?.video_quality}
                            hasLink={true}
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
                  <div className="search_result_pagination_buttons" style={{ display: content.data?.currentPage > 1 || content.data?.hasNextPage === true ? 'flex' : 'none' }}>
                    <Stack spacing={2} direction="row" mt={2}>
                      <IconButton size="small" title="PREVIOUS" onClick={() => getInfo(parseInt(content.data?.currentPage) - 1)} disabled={content.data?.currentPage < 2}><ArrowBackIosNewIcon/></IconButton>
                      {content.data?.results?.length > 0 && <Typography variant="h5" style={{ fontWeight: 550 }}>{content.data?.currentPage}</Typography>}
                      <IconButton size="small" title="NEXT" onClick={() => getInfo(parseInt(content.data?.currentPage) + 1)} disabled={content.data?.hasNextPage === false}><ArrowForwardIosIcon/></IconButton>
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

export default Search;
