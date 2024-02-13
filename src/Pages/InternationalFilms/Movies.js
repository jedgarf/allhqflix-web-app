// Packages
import React, { useEffect, useState, useRef, Fragment, Suspense } from "react";
import { Link } from "react-router-dom";

// React Slick
import Slider from "react-slick";

// React Query
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Material UI Components
import { Grid, Button, Container, Skeleton, Box } from "@mui/material";

// Icon
import CircularProgress from '@mui/material/CircularProgress';

// CSS
import "./css/Movies.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import Discovers from "../../Components/InternationalFilms/Discovers";
import MoviesRow from "../../Components/InternationalFilms/MoviesRow";
import useAnalyticsEventTracker from '../../App/useAnalyticsEventTracker';

// Models
import { moveToTop } from "../../Services/Utils";
import { foreign_genre, foreign_country, carousel_settings, movie_card_carousel_settings, movie_genre_carousel_settings } from "../../Config/settings.config";
import { content_carousel, movie_trending, movie_recent, movie_popular } from "../../Services/FlixHQService";

const Movies = () => {

  const gaEventTracker = useAnalyticsEventTracker('Movies');

  document.title = 'AllHQFlix - International Movies';

  const contentType = "Movie";
  const urlContentType = "foreign";
  const urlContentSubType = "movie";
  const currentYear = new Date().getFullYear();

  let discoverData = useQuery(['movie_carousel', { type: urlContentSubType }], content_carousel, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  // console.log("Data", discoverData);
  let discoverValue = discoverData?.data?.data?.filter( (result) => { return result.type === contentType; }) || [];

  let trendingData = useQuery('movie_trending', movie_trending, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    // enabled: discoverValue.length > 0,
  });
  let trendingValue = trendingData?.data?.data?.filter( (result) => { return result.type === contentType; });

  let recentData = useQuery('movie_recent', movie_recent, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    // enabled: discoverValue.length > 0,
  });
  let latestValue = recentData?.data?.data?.filter( (result) => { return result.type === contentType; });

  let popularData = useQuery(['movie_popular', { page: 1 }], movie_popular, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    // enabled: discoverValue.length > 0,
  });
  let popularValue = popularData?.data?.data?.results?.filter( (result) => { return result.type === contentType; });

  return (
      <div className="movies">
      {process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? <div className="top"><ReactQueryDevtools initialIsOpen={false} /></div> : <div className="top"></div> }
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
                      <Fragment className="movies__boxx">
                        <Discovers
                          // onClick={()=>gaEventTracker('call')}
                          id={item.id}
                          banner={item.cover}
                          title={item.title}
                          des={item.description}
                          year={item.releaseDate}
                          genres={item.genres}
                          slug={item.slug}
                          video_quality={item.video_quality}
                          urlContentSubType={urlContentSubType}
                          key={i}
                        />
                      </Fragment>
                    ))}
                  </Slider>
              </Suspense>
              : 
              <div className="carousel-skeleton" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ fontSize: 100 }} />
              </div>
            }
          </Box>

            {/* Genres */}
            {foreign_genre.length > 0 ?
            (
              <div style={{ marginTop: '3px', marginBottom: '-5px' }}>
                <Container maxWidth={'xxl'} display={{ xs: "block", sm: "block", md: "block", lg: "block", xl: "block" }}>
                  <Slider {...movie_genre_carousel_settings} style={{ marginInline: "13px" }}>
                    {foreign_genre.map((item, index) => {
                      return (
                        <Fragment>
                          <Link className="text-link-without-underline genre-carousel" to={`/foreign/advanced_filter?type=movie&genre=${item.genre_id}`}>
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
                <div className="heading content__heading">TRENDING MOVIES</div><br/>
                <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                  {trendingValue.map((data, i) => (
                    <Fragment>
                      <MoviesRow
                        isloadImage={true}
                        cat={'default'}
                        id={data?.id}
                        img={data?.image}
                        title={data?.title || data?.name || data?.aka || data?.slug}
                        release_date={data?.releaseDate || data?.Year?.name}
                        // rate={data?.liked}
                        type={data?.type || data?.Type?.name}
                        // slug={data?.slug}
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
                  LATEST MOVIES
                  <Link className="text-link-without-underline" to={`/foreign/advanced_filter?type=movie&year=${currentYear}`} style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
                    <Button variant="contained" size="small" color="primary">MORE</Button>
                  </Link>
                </div><br/>
                  <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                    {latestValue.map((data, i) => (
                      <Fragment>
                        <MoviesRow
                          isloadImage={true}
                          cat={'default'}
                          id={data?.id}
                          img={data?.image}
                          title={data?.title || data?.name || data?.aka || data?.slug}
                          release_date={data?.releaseDate || data?.Year?.name}
                          // rate={data?.liked}
                          type={data?.type || data?.Type?.name}
                          // slug={data?.slug}
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
                  POPULAR MOVIES
                  <Link className="text-link-without-underline" to="/foreign/popular_movies" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
                    <Button variant="contained" size="small" color="primary">MORE</Button>
                  </Link>
                </div><br/>
                  <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                    {popularValue.map((data, i) => (
                      <Fragment>
                        <MoviesRow
                          isloadImage={true}
                          cat={'default'}
                          id={data?.id}
                          img={data?.image}
                          title={data?.title || data?.name || data?.aka || data?.slug}
                          release_date={data?.releaseDate || data?.Year?.name}
                          // rate={data?.liked}
                          type={data?.type || data?.Type?.name}
                          // slug={data?.slug}
                          video_quality={data?.video_quality}
                          key={i}
                        />
                      </Fragment>
                      ))}
                  </Slider>
              </div> : <></> }

          <Footer />
        </>}
      </div>
  );
}

export default Movies;
