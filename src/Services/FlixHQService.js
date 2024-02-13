import axios from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.fixhq_base_url;

axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};
// axios.defaults.withCredentials = true;

const movie_search = async (search, page = null) => {

    let pageString = "";

    if (page != null) {
        pageString = "?page=" + page;
    }

    const results = await axios.get(url + "/search/" + search + pageString);
    return results;

};

const movie_info = async ({ queryKey }) => {
    const [_key, { indexId }] = queryKey;
    const results = await axios.get(url + "/media_info?mediaId=" + indexId);
    return results;

};

const media_short_info = async (indexId) => {
    const results = await axios.get(url + "/media_short_info?mediaId=" + indexId);
    return results;

};

const movie_popular = async ({ queryKey }) => {
    const [_key, { page }] = queryKey;
    const results = await axios.get(url + "/popular_movies?page=" + page);
    return results;

};

const series_popular = async ({ queryKey }) => {

    const [_key, { page }] = queryKey;

    const results = await axios.get(url + "/popular_tv_shows?page=" + page);
    return results;

};

const movie_trending = async () => {

    const results = await axios.get(url + "/trending_movies");
    return results;

};

const series_trending = async () => {

    const results = await axios.get(url + "/trending_tv_shows");
    return results;

};

const carousel_info = async (indexId) => {
    const results = await axios.get(url + "/media_info?mediaId=" + indexId);
    return results;
};

const content_carousel = async ({ queryKey }) => {
    const [_key, { type }] = queryKey;

    const results = await axios.get(url + "/carousel?type=" + type);
    return results;

};

const movie_recent = async () => {

    const results = await axios.get(url + "/recent_movies");
    return results;

};

const series_recent = async () => {

    const results = await axios.get(url + "/recent_tv_shows");
    return results;

};

const movie_server = async ({ queryKey }) => {
    const [_key, { episodeIdVar, indexId }] = queryKey;

    const results = await axios.get(url + "/episode_servers?episodeId=" + episodeIdVar + "&mediaId=" + indexId);   
    return results;

};

const movie_stream_links = async ({ queryKey }) => {

    const [_key, { episodeIdVar, indexId, serverVar }] = queryKey;

    const results = await axios.get(url + "/episode_sources?episodeId=" + episodeIdVar + "&mediaId=" + indexId + "&server=" + serverVar);
    return results;

};

const movie_filter_by_genre = async ({ queryKey }) => {
    const [_key, { genre, page }] = queryKey;
    const results = await axios.get(url + "/genre/" + genre + "?page=" + page);
    return results;

};

const movie_filter_by_country = async ({ queryKey }) => {
    const [_key, { country, page }] = queryKey;
    const results = await axios.get(url + "/country/" + country + "?page=" + page);
    return results;

};

const movie_advanced_filter = async ({ queryKey }) => {
    const [_key, { type, quality, release_year, genre, country, page }] = queryKey;
    const results = await axios.get(url + "/advanced_filter?type=" + type + "&quality=" + quality + "&release_year=" + release_year + "&genre=" + genre + "&country=" + country + "&page=" + page);
    return results;

};

const movie_comming_soon = async ({ queryKey }) => {
    const [_key, { page }] = queryKey;
    const results = await axios.get(url + "/comming_soon?page=" + page);
    return results;

};

export { movie_search, 
         content_carousel, 
         movie_popular, 
         series_popular, 
         movie_trending, 
         series_trending, 
         movie_recent, 
         series_recent, 
         movie_info, 
         media_short_info, 
         movie_server, 
         movie_stream_links, 
         movie_filter_by_genre, 
         movie_filter_by_country,
         movie_advanced_filter,
         movie_comming_soon };