import axios from 'axios';
import apiConfig from '../Config/api.config';
import { searchLike, channelSearchLike } from "./Utils";

let countries = require('../Services/Data/countries.json');

const url = apiConfig.live_channel_base_url;

const tv_channels = async ({ queryKey }) => {
    const [_key, { page }] = queryKey;
    var perPage = 10;
    var resultsArray = [];
    var resultsChunk = [];

    const channels = await axios.get(url + "/api/channels.json");
    const streams = await axios.get(url + "/api/streams.json");
    var channelResults = channels.data.filter((item) => item.is_nsfw === false && item.country === "PH");
    var streamResults = streams.data;

    for (let channelLength = 0; channelLength < channelResults.length; channelLength++) {
        if (streamResults.filter((item) => item.channel === channelResults[channelLength].id ).length > 0) {
            resultsArray.push(channelResults[channelLength]);   
        }
    }

    for (let i = 0; i < resultsArray.length; i += perPage) {
        const chunk = resultsArray.slice(i, i + perPage);
        resultsChunk.push(chunk);
      }

    // have next
    var haveNext = false;
    if (page < resultsChunk.length) {
        haveNext = true;
    }
      
     // filter all channels have stream
     var results = { 
        "count": channelResults.length,
        "page": page,
        "haveNext": haveNext,
        "perPage": perPage,
        "results": resultsChunk[page-1] }

    return results;
};

const getTVChannel = async ({ queryKey }) => {
    const [_key, { channelId }] = queryKey;

    const channels = await axios.get(url + "/api/channels.json");
    var channelResults = channels.data.filter(item => item.id === channelId).length > 0 ? channels.data.filter(item => item.id === channelId)[0] : [];

    return channelResults;
};

const getTVStream = async ({ queryKey }) => {
    const [_key, { channelId }] = queryKey;

    const streams = await axios.get(url + "/api/streams.json");
    var streamResults = streams.data.filter(item => item.channel === channelId).length > 0 ? streams.data.filter(item => item.channel === channelId)[0] : [];

    return streamResults;
};

const live_channel_names = async ({ queryKey }) => {
    const [_key, { country, is_nsfw, channel_id }] = queryKey;
    const channelAPI = await axios.get(url + "/api/channels.json");
    const streamAPI = await axios.get(url + "/api/streams.json");
    var channelResults = channelAPI.data.filter((item) => item.country === country && item.is_nsfw === is_nsfw );
    var streamResults = streamAPI.data;
    var results = [];

    for (let channelLength = 0; channelLength < channelResults.length; channelLength++) {
        if (streamResults.filter((item) => item.channel === channelResults[channelLength].id ).length > 0) {
            results.push(channelResults[channelLength]);   
        }
    }

    if (channel_id != null) {
        results = results.filter((item) => item.id === channel_id )[0];
    }
    return results;

};

const live_channel_streams = async ({ queryKey }) => {
    const [_key, { channel_id, status }] = queryKey;
    const streamAPI = await axios.get(url + "/api/streams.json");
    var results = streamAPI.data;
    if (channel_id != null) {
        results = results.filter((item) => item.channel === channel_id )[0];
    }
    return results;

};

const live_channel_guides = async () => {

    const results = await axios.get(url + "/api/guides.json");
    return results;

};

const live_channel_categories = async () => {

    const results = await axios.get(url + "/api/categories.json");
    return results;

};

const live_channel_languages = async () => {

    const results = await axios.get(url + "/api/languages.json");
    return results;

};

const tv_channel_countries = async ({ queryKey }) => {
    const [_key, { keyword }] = queryKey;

    // const countries = await axios.get(url + "/api/countries.json");
    // let channelResults = countries.data;
    let channelResults = countries;

    if (keyword !== "") {
        channelResults = channelSearchLike(channelResults, keyword);
    }
      
    // filter all countries
    var results = { 
        "count": channelResults.length,
        "results": channelResults }

    return results;
};

const tv_channel_playlist = async ({ queryKey }) => {
    const [_key, { countryCode }] = queryKey;

    const playList = await axios.get(`${url}/iptv/countries/${countryCode}.m3u`);
    let channelResults = playList.data;
    return channelResults;
};

const live_channel_subdivisions = async () => {

    const results = await axios.get(url + "/api/subdivisions.json");
    return results;

};

const live_channel_regions = async () => {

    const results = await axios.get(url + "/api/regions.json");
    return results;

};

const live_channel_blocklist = async () => {

    const results = await axios.get(url + "/api/blocklist.json");
    return results;

};

export { tv_channels,
         getTVChannel,
         getTVStream,
         live_channel_names, 
         live_channel_streams, 
         live_channel_guides, 
         live_channel_categories, 
         live_channel_languages, 
         tv_channel_countries, 
         tv_channel_playlist, 
         live_channel_subdivisions,
         live_channel_regions,
         live_channel_blocklist };