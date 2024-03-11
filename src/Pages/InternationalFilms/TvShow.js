// Packages
import React, { useEffect, useState, Fragment, Suspense } from "react";
import { Link } from "react-router-dom";

// React Slick
import Slider from "react-slick";

// React Query
import { useQuery } from 'react-query';

// Material UI Components
import { Grid, Box, Container, Button } from '@mui/material';

// Icons
import CircularProgress from '@mui/material/CircularProgress';

// CSS
import "./css/TVSeries.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import Discovers from "../../Components/InternationalFilms/Discovers";
import MoviesRow from "../../Components/InternationalFilms/MoviesRow";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { pageLoadMS } from "../../Config/settings.config";
import { foreign_genre, carousel_settings, movie_card_carousel_settings, movie_genre_carousel_settings } from "../../Config/settings.config";

// Services
import { content_carousel, series_trending, series_recent, series_popular } from "../../Services/FlixHQService";

const TvShow = () => {

  document.title = 'AllHQFlix - International TV Series';
  const contentType = "TV Series";
  const urlContentType = "foreign";
  const urlContentSubType = "tv";
  const currentYear = new Date().getFullYear();

  const [isLoading, setIsLoading] = useState(true);

  let discoverData = useQuery(['series_carousel', { type: urlContentSubType }], content_carousel, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let discoverValue = discoverData?.data?.data?.filter( (result) => { return result.type === contentType; }) || [];

  let trendingData = useQuery('series_trending', series_trending, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let trendingValue = trendingData.data?.data?.filter( (result) => { return result.type === contentType; });

  let recentData = useQuery('series_recent', series_recent, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let latestValue = recentData.data?.data?.filter( (result) => { return result.type === contentType; });

  let popularData = useQuery(['series_popular', { page: 1 }], series_popular, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let popularValue = popularData.data?.data?.results?.filter( (result) => { return result.type === contentType; });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, pageLoadMS);
  }, []);

  return (
    isLoading ? 
      <LoadingPage/>
     : 
    <div className="movies">
    <ReactQueryTools/>
      <SideBar Type={urlContentType} subType={urlContentSubType}/>
      {<>
        <Box
          display={{ xs: 'block', md: 'block' }}
        >
          {discoverData.isSuccess ?
            <Suspense fallback={<div className="carousel-skeleton" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress sx={{ fontSize: 100 }} />
            </div>}>
              <Slider {...carousel_settings}>
                {discoverValue.map((item, i) => (
                  <Fragment key={i}>
                    <div className="movies__boxx">
                      <Discovers
                        id={item.id}
                        banner={item.cover}
                        title={item.title}
                        des={item.description}
                        year={item.releaseDate}
                        season={item.season}
                        genres={item.genres}
                        slug={item.slug}
                        video_quality={item.video_quality}
                        urlContentSubType={urlContentSubType}
                        key={i}
                      />
                    </div>
                  </Fragment>
                ))}
              </Slider>
            </Suspense>
          : <div className="carousel-skeleton" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress sx={{ fontSize: 100 }} />
            </div>}
        </Box>

        {/* Genres */}
        {foreign_genre.length > 0 ?
          (
          <div style={{ marginTop: '3px', marginBottom: '5px' }}>
            <Container maxWidth={'xxl'} display={{ xs: "block", sm: "block", md: "block", lg: "block", xl: "block" }}>
              <Slider {...movie_genre_carousel_settings} style={{ marginInline: "13px" }}>
                {foreign_genre.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Link className="text-link-without-underline genre-carousel" to={`/foreign/advanced_filter?type=tv&genre=${item.genre_id}`}>
                        <Button variant="" size="small" color="error" style={{ margin: '5px', color: 'whitesmoke', fontSize: 15, fontWeight: 550 }}>{item.name}</Button>
                      </Link>
                    </Fragment>
                  )
                })} 
              </Slider>
            </Container>
          </div>
          )
          : <></>}

        {recentData.isLoading && trendingData.isLoading && popularData.isLoading ?
          <div className="top_content">
            <div style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress sx={{ fontSize: 100 }} />
            </div>
          </div>
        : ''}

      {/* Trending */}
      {trendingData.isSuccess ? 
        <div style={{ margin: 'auto' }}>
          <div className="heading content__heading">TRENDING TV SERIES</div><br/>
          <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
            {trendingValue.map((data, i) => (
              <Fragment key={i}>
                <MoviesRow
                  isloadImage={true}
                  cat={'default'}
                  id={data?.id}
                  img={data?.image}
                  title={data?.title || data?.name || data?.aka || data?.slug}
                  release_date={data?.releaseDate || data?.Year?.name}
                  season={data?.season}
                  type={data?.type || data?.Type?.name}
                  video_quality={data?.video_quality}
                  key={i}
                />
              </Fragment>
            ))}
          </Slider>
        </div> : <></> }
      
      {/* Latest */}
      {recentData.isSuccess ? 
        <div className="top_content">
          <div className="heading content__heading">
            LATEST TV SERIES
            <Link className="text-link-without-underline" to={`/foreign/advanced_filter?type=tv&year=${currentYear}`} style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
              <Button variant="contained" size="small" color="primary">MORE</Button>
            </Link>
          </div><br/>
          <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
            {latestValue.map((data, i) => (
              <Fragment key={i}>
                <MoviesRow
                  isloadImage={true}
                  cat={'default'}
                  id={data?.id}
                  img={data?.image}
                  title={data?.title || data?.name || data?.aka || data?.slug}
                  release_date={data?.releaseDate || data?.Year?.name}
                  season={data?.season}
                  type={data?.type || data?.Type?.name}
                  video_quality={data?.video_quality}
                  key={i}
                />
              </Fragment>
            ))}
          </Slider>
        </div> : <></> }
      
      {/* Popular */}
      {popularData.isSuccess ? 
        <div className="top_content">
          <div className="heading content__heading">
            POPULAR TV SERIES
            <Link className="text-link-without-underline" to="/foreign/popular_tv_series" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
              <Button variant="contained" size="small" color="primary">MORE</Button>
            </Link>
          </div><br/>
          <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
            {popularValue.map((data, i) => (
              <Fragment key={i}>
                <MoviesRow
                  isloadImage={true}
                  cat={'default'}
                  id={data?.id}
                  img={data?.image}
                  title={data?.title || data?.name || data?.aka || data?.slug}
                  release_date={data?.releaseDate || data?.Year?.name}
                  season={`SS ${data?.seasons}`}
                  type={data?.type || data?.Type?.name}
                  video_quality={data?.video_quality}
                  key={i}
                />
              </Fragment>
            ))}
          </Slider>
        </div> : <></> }
        
      <FloatingButton/>
      <Footer />
      </>}
    </div>
  );
}

export default TvShow;
