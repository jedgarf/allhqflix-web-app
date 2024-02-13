import axios from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.fixhq_base_url;

const movie_search = async (search, page = null) => {

    let pageString = "";

    if (page != null) {
        pageString = "?page=" + page;
    }

    const results = await axios.get(url + "/" + search + pageString);
    return results;

};

const movie_recent = async () => {

    const results = await axios.get(url + "/recent-movies");
    return results;

};

const series_recent = async () => {

    const results = await axios.get(url + "/recent-shows");
    return results;

};

const movie_info = async (id) => {

    const results = await axios.get(url + "/info?id=" + id);
    return results;

};

const movie_server = async (episodeId, mediaId) => {

    const results = await axios.get(url + "/servers?episodeId=" + episodeId + "&mediaId=" + mediaId);
    return results;

};

const movie_stream_links = async (episodeId, mediaId, server = null) => {

    let serverString = "";

    if (server != null) {
        serverString = "&server=" + server;
    }

    const results = await axios.get(url + "/watch?episodeId=" + episodeId + "&mediaId=" + mediaId + serverString);
    return results;

};

export {movie_search, movie_recent, series_recent, movie_info, movie_server, movie_stream_links};