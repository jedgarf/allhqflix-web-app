import React from 'react';
import { Route } from 'react-router';
 
export default (
    <Route>

	<Route path='/foreign/movies' />
    <Route path='/foreign/tvshow' />
    <Route path='/foreign/popular_movies' />
    <Route path='/foreign/popular_tv_series' />
    <Route path='/foreign/genre_filter' />
    <Route path='/foreign/country_filter' />
    <Route path='/foreign/advanced_filter' />

    <Route path='/asian_films' />
    <Route path='/asian_films/featured_drama' />
    <Route path='/asian_films/country/korean' />
    <Route path='/asian_films/country/philippine' />
    <Route path='/asian_films/genre_filter' />
    <Route path='/asian_films/country_filter' />
    <Route path='/asian_films/advanced_filter' />

    <Route path='/anime' />
    <Route path='/anime/advanced_search' />

    <Route path='/live_channels' />

    <Route path='/home/search' />
    <Route path='/foreign/search' />
    <Route path='/asian_films/search' />
    <Route path='/anime/search' />
    <Route path='/live_channels/search' />

    <Route path='/native_apps' />
    
    <Route path='/movie/stream_dashboard' />
    <Route path='/tv/stream_dashboard' />
    <Route path='drama/stream_dashboard' />
    <Route path='/anime/stream_dashboard' />
    
    </Route>
);