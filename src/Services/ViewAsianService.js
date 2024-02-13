import axios from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.asian_drama2_base_url;
axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};

const asianfilms_search = async (search, page = 1) => {

    const results = await axios.get(url + "/search/" + search + "?page=" + page);
    return results;
};

const asianfilms_bygenre = async ({queryKey}) => {

    const [_key, { genre, page }] = queryKey;

    const results = await axios.get(url + "/genre/" + genre + "?page=" + page);
    return results;
};

const asianfilms_bycountry = async ({queryKey}) => {

    const [_key, { country, page }] = queryKey;

    const results = await axios.get(url + "/country/" + country + "?page=" + page);
    return results;
};

const asianfilms_advancedfilter = async ({queryKey}) => {

    const [_key, { film_type, genre, country, release_year, category, page }] = queryKey;

    const results = await axios.get(url + "/advanced_filter?film_type=" + film_type + "&genre=" + genre + "&country=" + country + "&release_year=" + release_year + "&category=" + category + "&page=" + page);
    return results;
};

const asianfilms_info = async ({queryKey}) => {

    const [_key, { mediaId }] = queryKey;

    const results = await axios.get(url + "/media_info?mediaId=" + mediaId);
    return results;

};

const asianfilms_carousel = async () => {

    const results = await axios.get(url + "/carousel");
    return results;
};

const asianfilms_stream_links = async ({queryKey}) => {

    const [_key, { mediaId, episodeId }] = queryKey;

    const results = await axios.get(url + "/episode_sources?mediaId=" + mediaId + "&episodeId=" + episodeId);
    return results;

};

export {asianfilms_search, asianfilms_bygenre, asianfilms_bycountry, asianfilms_advancedfilter, asianfilms_info, asianfilms_carousel, asianfilms_stream_links};