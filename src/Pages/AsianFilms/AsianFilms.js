// Packages
import React, { Fragment, Suspense } from "react";
import { Link } from "react-router-dom";

// React Query
import { useQuery } from 'react-query';

// React Slick
import Slider from "react-slick";

// Material UI Components 
import { Box, Container, Button } from '@mui/material';

// Icons
import CircularProgress from '@mui/material/CircularProgress';

// CSS
import "./css/AsianFilms.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import AsianFilmsDiscovers from "../../Components/AsianFilms/AsianFilmsDiscovers";
import AsianFilmsRow from "../../Components/AsianFilms/AsianFilmsRow";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

import Footer from "../../Components/Footer/Footer";

// Config
import { asian_films_genre, carousel_settings, movie_card_carousel_settings, movie_genre_carousel_settings } from "../../Config/settings.config";

// Services
import { asianfilms_bycountry, asianfilms_advancedfilter, asianfilms_carousel } from "../../Services/ViewAsianService";

const AsianDrama = () => {

  document.title = 'AllHQFlix - Asian Drama';

  const urlContentType = "asian_films";
  const urlContentSubType = "asian_films";

  let discoverData = useQuery('asianfilms_carousel', asianfilms_carousel, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let discoverValue = discoverData.data?.data.slice(0, 7) || [];

  let featuredData = useQuery(['asianfilms_advancedfilter', { film_type: 'all', genre: 'all', country: 'all', release_year: 'all', category: 'featured', page: 1 }], asianfilms_advancedfilter, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    // enabled: discoverValue.length > 0,
  });
  let featuredValue = featuredData.data?.data?.results;

  let KoreanData = useQuery(['asianfilms_bycountry', { country: 'korean', page: 1 }], asianfilms_bycountry, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    // enabled: discoverValue.length > 0,
  });
  let koreanValue = KoreanData.data?.data?.results;

  let philippineData = useQuery(['asianfilms_bycountry', { country: 'philippine', page: 1 }], asianfilms_bycountry, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    // enabled: discoverValue.length > 0,
  });
  let philippineValue = philippineData.data?.data?.results;

  return (
      <div className="movies">
        <ReactQueryTools/>
        <SideBar Type={urlContentType} subType={urlContentSubType} />
        {<>
          <Box
            display={{ xs: 'block', md: 'block' }}
          >
            {discoverData.isSuccess ?
              <Suspense fallback={<div className="carousel-skeleton" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ fontSize: 100 }} />
              </div>}>
                <Slider {...carousel_settings}>
                  {discoverValue?.map((item, i) => (
                    <Fragment className="movies__boxx">
                      <AsianFilmsDiscovers
                        id={item?.id}
                        banner={item?.banner}
                        title={item?.title}
                        des={item?.description}
                        year={item?.releaseDate}
                        genres={item?.genre}
                        episode={item?.episodes?.length}
                        slug={item?.type}
                        key={item?.id}
                      />
                    </Fragment>
                  ))}
                </Slider>
              </Suspense>
            : <div className="carousel-skeleton" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ fontSize: 100 }} />
              </div>}
          </Box>

          {/* Genres */}
          {asian_films_genre.length > 0 ?
            (
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <Container maxWidth={'xxl'} display={{ xs: "block", sm: "block", md: "block", lg: "block", xl: "block" }}>
                  <Slider {...movie_genre_carousel_settings} style={{ marginInline: "13px" }}>
                    {asian_films_genre.map((item, index) => {
                      return (
                        <Fragment>
                          <Link className="text-link-without-underline genre-carousel" to={`/asian_films/genre_filter?genre=${item.name}`}>
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

          {featuredData.isLoading && KoreanData.isLoading && philippineData.isLoading ?
            <div className="top_content">
              <div style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ fontSize: 100 }} />
              </div>
            </div>
          : ''}
            
            {featuredData.isSuccess ? 
            <div style={{ margin: 'auto' }}>
              <div className="heading">
                FEATURED
                <Link className="text-link-without-underline" to="/asian_films/featured_drama" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
                    <Button variant="contained" size="small" color="primary">MORE</Button>
                </Link>
              </div><br/>
              <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                {featuredValue.map((data, i) => (
                  <Fragment>
                    <AsianFilmsRow
                      cat={"default"}
                      id={data?.id}
                      img={data?.image}
                      title={data?.title}
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

            {KoreanData.isSuccess ? 
            <div className="top_content">
              <div className="heading">
                KOREAN
                <Link className="text-link-without-underline" to="/asian_films/country/korean" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
                    <Button variant="contained" size="small" color="primary">MORE</Button>
                </Link>
              </div><br/>
              <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                {koreanValue.map((data, i) => (
                  <Fragment>
                    <AsianFilmsRow
                      cat={"default"}
                      id={data?.id}
                      img={data?.image}
                      title={data?.title}
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

            {philippineData.isSuccess ? 
            <div className="top_content">
              <div className="heading">
                PHILIPPINE
                <Link className="text-link-without-underline" to="/asian_films/country/philippine" style={{ float: 'right', fontSize: '20px', marginRight: 10 }}>
                    <Button variant="contained" size="small" color="primary">MORE</Button>
                </Link>
              </div><br/>
              <Slider {...movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                {philippineValue.map((data, i) => (
                  <Fragment>
                    <AsianFilmsRow
                      cat={"default"}
                      id={data?.id}
                      img={data?.image}
                      title={data?.title}
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
            
          <Footer />
        </>}
      </div>
  );
}

export default AsianDrama;