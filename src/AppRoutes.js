import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

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

import Home from "./Pages/Home/Home";
import MyList from "./Pages/Account/MyList";

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

  return params.maintype === "foreign" ? <FilterByGenre />
          : params.maintype === "anime" ? <AnimeFilterByGenre/>
          : params.maintype === "asian_drama" ? <PageNotFound/>
          : params.maintype === "asian_films" ? <AsianFilmsFilterByGenre/>
          : "";
}

const MovieCountryFilter = () => {
  
  const params = useParams();

  return params.maintype === "foreign" ? <FilterByCountry/>
          : params.maintype === "anime" ? <PageNotFound/>
          : params.maintype === "asian_drama" ? <PageNotFound/>
          : params.maintype === "asian_films" ? <AsianFilmsFilterByCountry/>
          : "";
}

const GeneralFilter = () => {
  
  const params = useParams();

  return params.maintype === "foreign" ? <AdvancedFilter/>
          : params.maintype === "anime" ? <PageNotFound/>
          : params.maintype === "asian_drama" ? <PageNotFound/>
          : params.maintype === "asian_films" ? <AsianFilmsAdvancedFilter/>
          : "";
}

const AdvancedSearch = () => {
  
  const params = useParams();

  return params.maintype === "foreign" ? <PageNotFound/>
          : params.maintype === "anime" ? <AnimeAdvancedSearch/>
          : params.maintype === "asian_drama" ? <PageNotFound/>
          : params.maintype === "asian_films" ? <PageNotFound/>
          : "";
}

const StreamDashboard = () => {
  
  const params = useParams();

  return params.type === "movie" || params.type === 'tv' || params.type === "movies" || params.type === 'tvshow' ? <MovieStreamDashboard />
          : params.type === "anime" ? <AnimeStreamDashboard />
          : params.type === "drama-detail" || params.type === "asian_drama" ? <AsianDramaStreamDashboard />
          : params.type === "drama" || params.type === "asian_films" ? <AsianFilmsStreamDashboard />
          : "";
}

const Stream = () => {
  
  const params = useParams();

  return params.type === "movie" || params.type === 'tv' || params.type === "movies" || params.type === 'tvshow' ? <MovieDashboard />
          : params.type === "anime" ? <AnimeDashboard />
          : params.type === "drama-detail" || params.type === "asian_drama" ? <AsianDramaDashboard />
          : params.type === "drama" || params.type === "asian_films" ? <AsianFilmsDashboard />
          : params.type === "live_channels" || params.type === "tv_channels" ? <TVChannelsDashboard />
          : "";
}

const AppRoutes = () => {

  // Redirect to undermaintenance page
  if (process.env.REACT_APP_UNDER_MAINTENANCE === "on") {
    
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-routes">
        <Router>
          <Routes>
            
            {/*---------------------------------------------- Home --------------------------------------------------------------------- */}
            <Route path="/" element={
                <CountryFilter>
                  <Home />
                </CountryFilter>
              }
            />
            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- FlixHQ --------------------------------------------------------------------- */}

            <Route path="/foreign/movies" element={
                <CountryFilter>
                  <Movies />
                </CountryFilter>
              }
            />

            <Route path="/foreign/popular_movies" element={
                <CountryFilter>
                  <PopularMovies />
                </CountryFilter>
              }
            />

            <Route path="/foreign/tvshow" element={
                <CountryFilter>
                  <TvShow />
                </CountryFilter>
              }
            />

            <Route path="/foreign/popular_tv_series" element={
                <CountryFilter>
                  <PopularTVSeries />
                </CountryFilter>
              }
            />

            <Route path="/foreign/coming_soon" element={
                <CountryFilter>
                  <ComingSoon />
                </CountryFilter>
              }
            />

            {/* ------------------------------------------------------------------------------------------------------------------------ */}
            
            {/*---------------------------------------------- Anime --------------------------------------------------------------------- */}

            <Route path="/anime" element={
                <CountryFilter>
                  <Anime />
                </CountryFilter>
              }
            />

            <Route path="/anime/popular_anime" element={
                <CountryFilter>
                  <PopularAnime />
                </CountryFilter>
              }
            />

            <Route path="/anime/trending_anime" element={
                <CountryFilter>
                  <TrendingAnime />
                </CountryFilter>
              }
            />

            <Route path="/anime/recent_anime" element={
                <CountryFilter>
                  <RecentAnime />
                </CountryFilter>
              }
            />

            <Route path="/anime/airing_schedule" element={
                <CountryFilter>
                  <AiringScheduleAnime />
                </CountryFilter>
              }
            />


            {/* --------------------------------------------------------------------------------------------------------------------------- */}


            {/*---------------------------------------------- Asian Films --------------------------------------------------------------------- */}

            <Route path="/asian_drama" element={
                <CountryFilter>
                  <AsianDrama />
                </CountryFilter>
              }
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}
            
            {/*---------------------------------------------- Asian Films --------------------------------------------------------------------- */}

            <Route path="/asian_films" element={
                <CountryFilter>
                  <AsianFilms />
                </CountryFilter>
              }
            />
            
            <Route path="/asian_films/featured_drama" element={
                <CountryFilter>
                  <AsianFilmsFeaturedDrama />
                </CountryFilter>
              }
            />

            {/* <Route path="/asian_films/genre/:genre" element={
                <CountryFilter>
                  <AsianFilmsByGenre />
                </CountryFilter>
              }
            /> */}

            <Route path="/asian_films/country/:country" element={
                <CountryFilter>
                  <AsianFilmsByCountry />
                </CountryFilter>
              }
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- Live Channels --------------------------------------------------------------------- */}

            <Route path="/tv_channels" element={
                <CountryFilter>
                  <TVChannels />
                </CountryFilter>
              }
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- Native Apps --------------------------------------------------------------------- */}

            <Route path="/native_apps" element={
                <CountryFilter>
                  <NativeApps />
                </CountryFilter>
              }
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- General Routes -------------------------------------------------------------- */}
            
            <Route path="/:type/search" element={
                <CountryFilter>
                  <Search />
                </CountryFilter>
              }
            />

            <Route path="/:maintype/genre_filter" element={<CountryFilter><GenreFilter/></CountryFilter>}/>
            <Route path="/:maintype/country_filter" element={<CountryFilter><MovieCountryFilter/></CountryFilter>}/>
            <Route path="/:maintype/advanced_filter" element={<CountryFilter><GeneralFilter/></CountryFilter>}/>
            <Route path="/:maintype/advanced_search" element={<CountryFilter><AdvancedSearch/></CountryFilter>}/>
            <Route path="/:type/stream_dashboard" element={<StreamDashboard/>}/>
            <Route path="/watch/:type/:id" element={<Stream/>}/>
            
            <Route path="*" element={<PageNotFound/>} />
            <Route path="/not-available" element={<NotAvailable />} />
            <Route path="/off_limit" element={<OffLimit/>}/>

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- Site Management ---------------------------------------------------------- */}

            <Route path="/about_developers" element={
                <CountryFilter>
                  <AboutDevelopers />
                </CountryFilter>
              }
            />

            <Route path="/terms_and_conditions" element={
                <CountryFilter>
                  <TermsAndConditions />
                </CountryFilter>
              }
            />

            <Route path="/privacy_policy" element={
                <CountryFilter>
                  <PrivacyPolicy />
                </CountryFilter>
              }
            />

            <Route path="/contact_us" element={
                <CountryFilter>
                  <ContactUs />
                </CountryFilter>
              }
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            {/*---------------------------------------------- Account Management ---------------------------------------------------------- */}
            
            <Route path="/my_list" element={
                <CountryFilter>
                  <MyList />
                </CountryFilter>
              }
            />
            <Route path="/favorite" element={
                <CountryFilter>
                  <Favorite />
                </CountryFilter>
              }
            />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default AppRoutes;
