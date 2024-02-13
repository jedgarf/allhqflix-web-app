import axios from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.asian_drama_base_url;
axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};

const asiandrama_search = async (search, page = null) => {

    let pageString = "";

    if (page != null) {
        pageString = "?page=" + page;
    }

    const results = await axios.get(url + "/search/" + search + pageString);
    return results;
};

const asiandrama_info = async ({queryKey}) => {
    const [_key, { mediaId }] = queryKey;

    const results = await axios.get(url + "/media_info?mediaId=" + mediaId);
    return results;

};

const asiandrama_carousel = async () => {

    const results = await axios.get(url + "/carousel");
    return results;
};

const asiandrama_recent = async ({ queryKey }) => {

    const [_key, { search, page }] = queryKey;

    let pageString = "";

    if (page != null) {
        pageString = "?page=" + page;
    }

    const results = await axios.get(url + "/search/" + search + pageString);
    return results;
};

const asiandrama_popular = async ({ queryKey }) => {

    const [_key, { page }] = queryKey;

    let pageString = "";

    if (page != null) {
        pageString = "?page=" + page;
    }

    const results = await axios.get(url + "/popular_drama" + pageString);
    return results;
};

const asiandrama_stream_links = async ({ queryKey }) => {

    const [_key, { episodeId }] = queryKey;

    const results = await axios.get(url + "/episode_sources?episodeId=" + episodeId);
    return results;

};

export {asiandrama_search, asiandrama_info, asiandrama_carousel, asiandrama_recent, asiandrama_popular, asiandrama_stream_links};