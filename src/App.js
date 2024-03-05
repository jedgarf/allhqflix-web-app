import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Analytics } from '@vercel/analytics/react';

// CSS
import "./Assets/css/App.css";

// Components
import Favorite from "./Components/Favorite/Favorite";

// Pages
import CountryFilter from './Services/CountryFilter';
import NotAvailable from './Pages/NotAvailable/NotAvailable';
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import AboutDevelopers from "./Pages/AboutDevelopers/AboutDevelopers";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import ContactUs from "./Pages/ContactUs/ContactUs";

import { OffLimit } from "./Pages/OffLimit/OffLimit";
import FloatingButton from './Components/FloatingButton/FloatingButton';

import Home from "./Pages/Home/Home";

import Movies from "./Pages/InternationalFilms/Movies";
import TvShow from "./Pages/InternationalFilms/TvShow";
import PopularMovies from "./Pages/InternationalFilms/PopularMovies";
import PopularTVSeries from "./Pages/InternationalFilms/PopularTVSeries";
import FilterByGenre from "./Pages/InternationalFilms/FilterByGenre";
import FilterByCountry from "./Pages/InternationalFilms/FilterByCountry";
import AdvancedFilter from "./Pages/InternationalFilms/AdvancedFilter";
import ComingSoon from "./Pages/InternationalFilms/ComingSoon";

import Anime from "./Pages/Anime/Anime";
import PopularAnime from "./Pages/Anime/PopularAnime";
import TrendingAnime from "./Pages/Anime/TrendingAnime";
import RecentAnime from "./Pages/Anime/RecentAnime";
import AiringScheduleAnime from "./Pages/Anime/AiringScheduleAnime";
import AnimeFilterByGenre from "./Pages/Anime/AnimeFilterByGenre";
import AnimeAdvancedSearch from "./Pages/Anime/AdvancedSearch";

import AsianDrama from './Pages/AsianDrama/AsianDrama';

import AsianFilms from './Pages/AsianFilms/AsianFilms';
import AsianFilmsFeaturedDrama from './Pages/AsianFilms/AsianFilmsFeaturedDrama';
// import AsianFilmsByGenre from "./Pages/AsianFilms/AsianFilmsByGenre";
import AsianFilmsByCountry from "./Pages/AsianFilms/AsianFilmsByCountry";
import AsianFilmsFilterByGenre from "./Pages/AsianFilms/AsianFilmsFilterByGenre";
import AsianFilmsFilterByCountry from "./Pages/AsianFilms/AsianFilmsFilterByCountry";
import AsianFilmsAdvancedFilter from "./Pages/AsianFilms/AdvancedFilter";

import TVChannels from './Pages/LiveChannels/TVChannels';
import TVChannelsDashboard from "./Pages/LiveChannels/TVChannelsDashboard";

import NativeApps from "./Pages/NativeApps/NativeApps";


// Search
import Search from "./Pages/Search/Search";

// Stream Dashboard
import MovieStreamDashboard from "./Pages/StreamDashboard/MovieStreamDashboard";
import AnimeStreamDashboard from "./Pages/StreamDashboard/AnimeStreamDashboard";
import AsianDramaStreamDashboard from "./Pages/StreamDashboard/AsianDramaStreamDashboard";
import AsianFilmsStreamDashboard from "./Pages/StreamDashboard/AsianFilmsStreamDashboard";

// Stream Screens
import MovieDashboard from "./Pages/InternationalFilms/MovieDashboard";
import AnimeDashboard from "./Pages/Anime/AnimeDashboard";
import AsianDramaDashboard from "./Pages/AsianDrama/AsianDramaDashboard";
import AsianFilmsDashboard from "./Pages/AsianFilms/AsianFilmsDashboard";

// Create a client
const queryClient = new QueryClient();

const GenreFilter = () => {
  
  const params = useParams();

  return (
    <>
      { params.maintype === "foreign" ? <FilterByGenre />
      : params.maintype === "anime" ? <AnimeFilterByGenre/>
      : params.maintype === "asian_drama" ? <PageNotFound/>
      : params.maintype === "asian_films" ? <AsianFilmsFilterByGenre/>
      : "" }
    </>
  );
}

const MovieCountryFilter = () => {
  
  const params = useParams();

  return (
    <>
      { params.maintype === "foreign" ? <FilterByCountry/>
      : params.maintype === "anime" ? <PageNotFound/>
      : params.maintype === "asian_drama" ? <PageNotFound/>
      : params.maintype === "asian_films" ? <AsianFilmsFilterByCountry/>
      : "" }
    </>
  );
}

const GeneralFilter = () => {
  
  const params = useParams();

  return (
    <>
      { params.maintype === "foreign" ? <AdvancedFilter/>
      : params.maintype === "anime" ? <PageNotFound/>
      : params.maintype === "asian_drama" ? <PageNotFound/>
      : params.maintype === "asian_films" ? <AsianFilmsAdvancedFilter/>
      : "" }
    </>
  );
}

const AdvancedSearch = () => {
  
  const params = useParams();

  return (
    <>
      { params.maintype === "foreign" ? <PageNotFound/>
      : params.maintype === "anime" ? <AnimeAdvancedSearch/>
      : params.maintype === "asian_drama" ? <PageNotFound/>
      : params.maintype === "asian_films" ? <PageNotFound/>
      : "" }
    </>
  );
}

const StreamDashboard = () => {
  
  const params = useParams();

  return (
    <>
      { params.type === "movie" || params.type === 'tv' || params.type === "movies" || params.type === 'tvshow' ? <MovieStreamDashboard />
      : params.type === "anime" ? <AnimeStreamDashboard />
      : params.type === "drama-detail" || params.type === "asian_drama" ? <AsianDramaStreamDashboard />
      : params.type === "drama" || params.type === "asian_films" ? <AsianFilmsStreamDashboard />
      : "" }
    </>
  );
}

const Stream = () => {
  
  const params = useParams();

  return (
    <>
      { params.type === "movie" || params.type === 'tv' || params.type === "movies" || params.type === 'tvshow' ? <><MovieDashboard /><FloatingButton /></>
      : params.type === "anime" ? <><AnimeDashboard /><FloatingButton /></>
      : params.type === "drama-detail" || params.type === "asian_drama" ? <><AsianDramaDashboard /><FloatingButton /></>
      : params.type === "drama" || params.type === "asian_films" ? <><AsianFilmsDashboard /><FloatingButton /></>
      : params.type === "live_channels" || params.type === "tv_channels" ? <><TVChannelsDashboard /><FloatingButton /></>
      : "" }
    </>
  );
}

const App = () => {

  const [orientation, setOrientation] = useState(window.orientation);

  useEffect(() => {

    const handleOrientationChange = () => {
      setOrientation(window.orientation);
    };

    // Listen for orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // if (process.env.REACT_APP_UNDER_MAINTENANCE == "off") {
  //   console.log("REACT_APP_UNDER_MAINTENANCE", process.env.REACT_APP_UNDER_MAINTENANCE);
  //   return <UnderMaintenance/>;
  // }

  // function disableRightClick(e) {
  //   e.preventDefault();
  // }

  return (
      <QueryClientProvider client={queryClient}>
      {/* <div className="App" onContextMenu={disableRightClick}> */}
      <div className="App">
        <Router>
          <Routes>
            
            {/*---------------------------------------------- Home --------------------------------------------------------------------- */}
            <Route path="/" element={
                <>
                  <CountryFilter>
                    <Home />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />
            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- FlixHQ --------------------------------------------------------------------- */}

            <Route path="/foreign/movies" element={
                <>
                  <CountryFilter>
                    <Movies />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/foreign/popular_movies" element={
                <>
                  <CountryFilter>
                    <PopularMovies />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/foreign/tvshow" element={
                <>
                  <CountryFilter>
                    <TvShow />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/foreign/popular_tv_series" element={
                <>
                  <CountryFilter>
                    <PopularTVSeries />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/foreign/coming_soon" element={
                <>
                  <CountryFilter>
                    <ComingSoon />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            {/* ------------------------------------------------------------------------------------------------------------------------ */}
            
            {/*---------------------------------------------- Anime --------------------------------------------------------------------- */}

            <Route path="/anime" element={
                <>
                  <CountryFilter>
                    <Anime />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/anime/popular_anime" element={
                <>
                  <CountryFilter>
                    <PopularAnime />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/anime/trending_anime" element={
                <>
                  <CountryFilter>
                    <TrendingAnime />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/anime/recent_anime" element={
                <>
                  <CountryFilter>
                    <RecentAnime />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/anime/airing_schedule" element={
                <>
                  <CountryFilter>
                    <AiringScheduleAnime />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />


            {/* --------------------------------------------------------------------------------------------------------------------------- */}


            {/*---------------------------------------------- Asian Films --------------------------------------------------------------------- */}

            <Route path="/asian_drama" element={
                <>
                  <CountryFilter>
                    <AsianDrama />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}
            
            {/*---------------------------------------------- Asian Films --------------------------------------------------------------------- */}

            <Route path="/asian_films" element={
                <>
                  <CountryFilter>
                    <AsianFilms />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />
            
            <Route path="/asian_films/featured_drama" element={
                <>
                  <CountryFilter>
                    <AsianFilmsFeaturedDrama />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            {/* <Route path="/asian_films/genre/:genre" element={
                <>
                  <CountryFilter>
                    <AsianFilmsByGenre />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            /> */}

            <Route path="/asian_films/country/:country" element={
                <>
                  <CountryFilter>
                    <AsianFilmsByCountry />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- Live Channels --------------------------------------------------------------------- */}

            <Route path="/tv_channels" element={
                <>
                  <CountryFilter>
                    <TVChannels />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- Native Apps --------------------------------------------------------------------- */}

            <Route path="/native_apps" element={
                <>
                  <CountryFilter>
                    <NativeApps />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- General Routes -------------------------------------------------------------- */}
            
            <Route path="/:maintype/genre_filter" element={<CountryFilter><GenreFilter/><FloatingButton /></CountryFilter>}/>
            <Route path="/:maintype/country_filter" element={<CountryFilter><MovieCountryFilter/><FloatingButton /></CountryFilter>}/>
            <Route path="/:maintype/advanced_filter" element={<CountryFilter><GeneralFilter/><FloatingButton /></CountryFilter>}/>
            <Route path="/:maintype/advanced_search" element={<CountryFilter><AdvancedSearch/><FloatingButton /></CountryFilter>}/>

            <Route path="/:type/stream_dashboard" element={<StreamDashboard/>}/>
            <Route path="/watch/:type/:id" element={<Stream/>}/>

            <Route path="/:type/search" element={
                <>
                  <CountryFilter>
                    <Search />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

          <Route path="/not-available" element={
              <>
                <NotAvailable />
              </>
            } />

            <Route path="*" element={
              <>
                <PageNotFound/>
              </>
            } />

            <Route path="/off_limit" element={<OffLimit/>}/>

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- Site Management ---------------------------------------------------------- */}

            <Route path="/about_developers" element={
                <>
                  <CountryFilter>
                    <AboutDevelopers />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/terms_and_conditions" element={
                <>
                  <CountryFilter>
                    <TermsAndConditions />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/privacy_policy" element={
                <>
                  <CountryFilter>
                    <PrivacyPolicy />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            <Route path="/contact_us" element={
                <>
                  <CountryFilter>
                    <ContactUs />
                    <FloatingButton />
                  </CountryFilter>
                </>}
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- Account Management ---------------------------------------------------------- */}

            <Route path="/favorite" element={
                <>
                  <Favorite />
                  <FloatingButton />
                </>}
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

          </Routes>
        </Router>
      </div>
      <Analytics />
      </QueryClientProvider>
  );
}

export default App;
