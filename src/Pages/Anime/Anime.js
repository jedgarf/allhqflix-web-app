// Packages
import React, { useState, useEffect, Fragment, Suspense } from "react";
import { Link } from "react-router-dom";

// React Query
import { useQuery } from 'react-query';

// Material UI Components
import { Box, Button, Container } from '@mui/material';

// Auto Slider
import Slider from "react-slick";

// Icons
import CircularProgress from '@mui/material/CircularProgress';

// CSS
import "./css/Anime.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Components
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import AnimeDiscovers from "../../Components/Anime/AnimeDiscovers";
import AnimeRow from "../../Components/Anime/AnimeRow";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { pageLoadMS, carousel_settings, movie_card_carousel_settings, movie_genre_carousel_settings, anime_genres } from "../../Config/settings.config";

// Utils
import { isMobile } from "../../Services/Utils";

// Services
import { trending_anime, popular_anime, recent_anime_episodes, anime_airing_schedule } from "../../Services/AnimeService";

const Anime = () => {

  document.title = 'AllHQFlix - Anime';
  const urlContentType = "anime";
  const urlContentSubType = "anime";
  const defaultPageNumber = 1;
  const defaultPerPage = 20;

  const [isLoading, setIsLoading] = useState(true);

  let discoverData = useQuery(['popular_anime', {page: defaultPageNumber, perPage: defaultPerPage}], popular_anime, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
  });
  let popularValue = discoverData.data?.data?.results;

  let trendingData = useQuery(['trending_anime', {page: defaultPageNumber, perPage: defaultPerPage}], trending_anime, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
  });
  let trendingValue = trendingData.data?.data?.results; 

  let recentData = useQuery(['recent_anime_episodes', {page: defaultPageNumber, perPage: defaultPerPage, provider: null}], recent_anime_episodes, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
  });
  let recentValue = recentData.data?.data?.results;

  let airingData = useQuery(['anime_airing_schedule', {page: defaultPageNumber, perPage: defaultPerPage, weekStart: null, weekEnd: null, notYetAired: null}], anime_airing_schedule, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
  });
  let airingValue = airingData.data?.data?.results;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, pageLoadMS);
  }, []);

  return (
    trendingData.isLoading ? 
      <LoadingPage/>
    : 
    <div className="movies">
      <ReactQueryTools/>
      <SideBar Type={urlContentType} subType={urlContentSubType} />
        <Box
          display={{ xs: 'block', md: 'block' }}
        >
          {trendingData.isSuccess ?
            <Suspense fallback={<div className="carousel-skeleton" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress sx={{ fontSize: 100 }} />
            </div>}>
              <Slider {...carousel_settings}>
                {trendingValue?.map((item, i) => (
                  <Fragment key={i}>
                    <div className="movies__boxx">
                      <AnimeDiscovers
                        id={item?.id}
                        banner={item?.id == '21' ? 'https://artworks.thetvdb.com/banners/series/81797/backgrounds/5fc04e62ebaba.jpg' : item?.cover}
                        title={item?.title.english || item?.title.userPreferred || item?.title.romaji}
                        des={item?.description}
                        year={item?.releaseDate}
                        genres={item?.genres}
                        episode={item?.totalEpisodes}
                        slug={item?.type}
                        key={item?.id}
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
        {anime_genres.length > 0 ?
        (
          <div style={{ marginTop: '10px', marginBottom: '15px', visibility: trendingData.isLoading ? 'hidden' : 'visible' }}>
            <Slider {...movie_genre_carousel_settings} style={{ marginInline: isMobile ? '15px' : '30px' }}>
              {anime_genres.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <Link className="text-link-without-underline genre-carousel" to={`/anime/genre_filter?genre=${item}`}>
                      <Button variant="contained" size="small" color="error" style={{ margin: '5px 5px 5px 0px', backgroundColor: 'rgba(105, 105, 105, 0.4)', color: 'whitesmoke', fontSize: 15, fontWeight: 550 }}>{item}</Button>
                    </Link>
                  </Fragment>
                )
              })} 
            </Slider>
          </div>
        )
        : <></>}

        {discoverData.isLoading && trendingData.isLoading && recentData.isLoading ?
        <div className="top_content">
          <div style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ fontSize: 100 }} />
          </div>
        </div>
        : ''}
        
        {discoverData.isSuccess ? 
          <div style={{ margin: 'auto' }}>
            <div className="heading">
              POPULAR ANIME
              <Link className="text-link-without-underline" to="/anime/popular_anime" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
                <Button variant="contained" size="small" color="primary">MORE</Button>
              </Link>
            </div><br/>
            <Slider {...movie_card_carousel_settings} style={{ marginInline: isMobile ? '15px' : '30px' }}>
              {popularValue?.map((data, i) => (
                <Fragment key={i}>
                  <AnimeRow
                    isloadImage={true}
                    cat={"default"}
                    id={data?.id}
                    img={data?.image}
                    title={data?.title.english || data?.title.userPreferred || data?.title.romaji}
                    release_date={data?.releaseDate}
                    type={data?.type}
                    rate={data?.rating}
                    episode={data?.totalEpisodes}
                    key={i}
                  />
                </Fragment>
              ))}
            </Slider>
          </div> : <></> }
        
        {trendingData.isSuccess ? 
          <div className="top_content">
            <div className="heading">
              TRENDING ANIME
              <Link className="text-link-without-underline" to="/anime/trending_anime" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
                <Button variant="contained" size="small" color="primary">MORE</Button>
              </Link>
            </div><br/>
            <Slider {...movie_card_carousel_settings} style={{ marginInline: isMobile ? '15px' : '30px' }}>
                {trendingValue?.map((data, i) => (
                  <Fragment key={i}>
                    <AnimeRow
                      isloadImage={true}
                      cat={'default'}
                      id={data?.id}
                      img={data?.image}
                      title={data?.title.english || data?.title.userPreferred || data?.title.romaji}
                      release_date={data?.releaseDate}
                      type={data?.type}
                      rate={data?.rating}
                      episode={data?.totalEpisodes}
                      key={i}
                    />
                  </Fragment>
                ))}
            </Slider>
          </div> : <></> }
        
        {recentData.isSuccess && recentValue?.length > 0 ? 
          <div className="top_content">
            <div className="heading">
              RECENT RELEASED
              <Link className="text-link-without-underline" to="/anime/recent_anime" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
                <Button variant="contained" size="small" color="primary">MORE</Button>
              </Link>
            </div><br/>
            <Slider {...movie_card_carousel_settings} style={{ marginInline: isMobile ? '15px' : '30px' }}>
              {recentValue?.map((data, i) => (
                <Fragment key={i}>
                  <AnimeRow
                    isloadImage={true}
                    cat={'default'}
                    id={data?.id}
                    img={data?.image}
                    title={data?.title.english || data?.title.userPreferred || data?.title.romaji}
                    release_date={data?.releaseDate}
                    type={data?.type}
                    rate={data?.rating}
                    episode={data?.totalEpisodes}
                    key={i}
                  />
                </Fragment>
              ))}
            </Slider>
          </div> : "" }
        
        {airingData.isSuccess && airingValue?.length > 0 ? (
        <div className="top_content">
          <div className="heading">
            AIRING SCHEDULE
            <Link className="text-link-without-underline" to="/anime/airing_schedule" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
              <Button variant="contained" size="small" color="primary">MORE</Button>
            </Link>
          </div><br/>
          <Slider {...movie_card_carousel_settings} style={{ marginInline: isMobile ? '15px' : '30px' }}>
              {airingValue?.map((data, i) => (
                <Fragment key={i}>
                  <AnimeRow
                    isloadImage={true}
                    cat={'default'}
                    id={data?.id}
                    img={data?.image}
                    title={data?.title.english || data?.title.userPreferred || data?.title.romaji}
                    release_date={data?.releaseDate}
                    type={data?.type}
                    rate={data?.rating}
                    episode={data?.episode}
                    key={i}
                  />
                </Fragment>
              ))}
          </Slider>
        </div>
        ) : ("")}
        
      <FloatingButton/>
      <Footer />
    </div>
  );
}

export default Anime;