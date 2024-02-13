import axios from 'axios';
import apiConfig from '../Config/api.config';

const url = apiConfig.anime_base_url;
axios.defaults.headers.common = {'Authorization': `Bearer ${apiConfig.api_key}`};

const anime_search = async (search, page = null, perPage = 30) => {

    let pageString = "";
    let perPageString = "";

    if (page != null) {
        pageString = "?page=" + page;
    }

    if (perPage != null) {
        perPageString = "&perPage=" + perPage;
    }

    const results = await axios.get(url + "/search/" + search + pageString + perPageString);
    return results;
};

const anime_advanced_search = async ({ queryKey }) => {

    const [_key, { query, aType, page, perPage, season, format, sort, genres, id, year, status }] = queryKey;

    let paramsSign = "";
    let searchString = "";
    let paramsCount = 0;

    if (query != "") {
        if (paramsCount === 0) {
            searchString += "query=" + query;   
        } else {
            searchString += "&query=" + query;
        }
        paramsCount++;
    }

    if (aType != null) {
        if (paramsCount === 0) {
            searchString += "type=" + aType;   
        } else {
            searchString += "&type=" + aType;
        }
        paramsCount++;
    }

    if (page != null) {
        if (paramsCount === 0) {
            searchString += "page=" + page;   
        } else {
            searchString += "&page=" + page;
        }
        paramsCount++;
    }

    if (perPage != null) {
        if (paramsCount === 0) {
            searchString += "perPage=" + perPage;   
        } else {
            searchString += "&perPage=" + perPage;
        }
        paramsCount++;
    }

    if (season != null) {
        if (paramsCount === 0) {
            searchString += "season=" + season;   
        } else {
            searchString += "&season=" + season;
        }
        paramsCount++;
    }

    if (format != null) {
        if (paramsCount === 0) {
            searchString += "format=" + format;   
        } else {
            searchString += "&format=" + format;
        }
        paramsCount++;
    }

    if (sort != null) {
        if (paramsCount === 0) {
            searchString += "sort=" + sort;   
        } else {
            searchString += "&sort=" + sort;
        }
        paramsCount++;
    }

    if (genres != null) {
        if (paramsCount === 0) {
            searchString += "genres=" + genres;   
        } else {
            searchString += "&genres=" + genres;
        }
        paramsCount++;
    }

    if (id != null) {
        if (paramsCount === 0) {
            searchString += "id=" + id;   
        } else {
            searchString += "&id=" + id;
        }
        paramsCount++;
    }

    if (year != null) {
        if (paramsCount === 0) {
            searchString += "year=" + year;   
        } else {
            searchString += "&year=" + year;
        }
        paramsCount++;
    }
    
    if (status != null) {
        if (paramsCount === 0) {
            searchString += "status=" + status;   
        } else {
            searchString += "&status=" + status;
        }
        paramsCount++;
    }
    
    if (paramsCount > 0) {
        paramsSign = "?";
    }

    // var baseUrl = url + "/advanced-search";
    var baseUrl = "https://consumet-api-one.vercel.app/meta/anilist/advanced-search";

    const results = await axios.get(baseUrl + paramsSign + searchString);
    return results;

};

const anime_info = async ({queryKey}) => {

    const [_key, { mediaId, dub }] = queryKey;

    let dubString = "";

    if (dub != null) {
        dubString = "&dub=" + dub;
    }
    
    const results = await axios.get(url + "/media_info?mediaId=" + mediaId + dubString);
    return results;

};

const anime_carousel = async () => {
    
    const results = await axios.get(url + "/carousel");
    return results;

};

const anime_stream_links = async ({queryKey}) => {

    const [_key, { episodeId }] = queryKey;

    const results = await axios.get(url + "/episode_sources?episodeId=" + episodeId);
    return results;

};

const recent_anime_episodes = async ({ queryKey }) => {

    const [_key, { page, perPage, provider }] = queryKey;

    let paramsSign = "";
    let searchString = "";
    let paramsCount = 0;

    if (page != null) {
        if (paramsCount === 0) {
            searchString += "page=" + page;   
        } else {
            searchString += "&page=" + page;
        }
        paramsCount++;
    }

    if (perPage != null) {
        if (paramsCount === 0) {
            searchString += "perPage=" + perPage;   
        } else {
            searchString += "&perPage=" + perPage;
        }
        paramsCount++;
    }

    if (provider != null) {
        if (paramsCount === 0) {
            searchString += "provider=" + provider;   
        } else {
            searchString += "&provider=" + provider;
        }
        paramsCount++;
    }

    if (paramsCount > 0) {
        paramsSign = "?";
    }

    const results = await axios.get(url + "/recent" + paramsSign + searchString);
    return results;

};

const trending_anime = async ({ queryKey }) => {

    const [_key, { page, perPage }] = queryKey;

    let paramsSign = "";
    let searchString = "";
    let paramsCount = 0;

    if (page != null) {
        if (paramsCount === 0) {
            searchString += "page=" + page;   
        } else {
            searchString += "&page=" + page;
        }
        paramsCount++;
    }

    if (perPage != null) {
        if (paramsCount === 0) {
            searchString += "perPage=" + perPage;   
        } else {
            searchString += "&perPage=" + perPage;
        }
        paramsCount++;
    }

    if (paramsCount > 0) {
        paramsSign = "?";
    }

    const results = await axios.get(url + "/trending" + paramsSign + searchString);
    return results;

};

const popular_anime = async ({ queryKey }) => {

    const [_key, { page, perPage }] = queryKey;

    let paramsSign = "";
    let searchString = "";
    let paramsCount = 0;

    if (page != null) {
        if (paramsCount === 0) {
            searchString += "page=" + page;   
        } else {
            searchString += "&page=" + page;
        }
        paramsCount++;
    }

    if (perPage != null) {
        if (paramsCount === 0) {
            searchString += "perPage=" + perPage;   
        } else {
            searchString += "&perPage=" + perPage;
        }
        paramsCount++;
    }

    if (paramsCount > 0) {
        paramsSign = "?";
    }

    const results = await axios.get(url + "/popular" + paramsSign + searchString);
    return results;

};

const anime_airing_schedule = async ({ queryKey }) => {

    const [_key, { page, perPage, weekStart, weekEnd, notYetAired }] = queryKey;

    let paramsSign = "";
    let searchString = "";
    let paramsCount = 0;

    if (page != null) {
        if (paramsCount === 0) {
            searchString += "page=" + page;   
        } else {
            searchString += "&page=" + page;
        }
        paramsCount++;
    }

    if (perPage != null) {
        if (paramsCount === 0) {
            searchString += "perPage=" + perPage;   
        } else {
            searchString += "&perPage=" + perPage;
        }
        paramsCount++;
    }

    if (weekStart != null) {
        if (paramsCount === 0) {
            searchString += "weekStart=" + weekStart;   
        } else {
            searchString += "&weekStart=" + weekStart;
        }
        paramsCount++;
    }

    if (weekEnd != null) {
        if (paramsCount === 0) {
            searchString += "weekEnd=" + weekEnd;   
        } else {
            searchString += "&weekEnd=" + weekEnd;
        }
        paramsCount++;
    }

    if (notYetAired != null) {
        if (paramsCount === 0) {
            searchString += "notYetAired=" + notYetAired;   
        } else {
            searchString += "&notYetAired=" + notYetAired;
        }
        paramsCount++;
    }

    if (paramsCount > 0) {
        paramsSign = "?";
    }

    const results = await axios.get(url + "/airing_schedule" + paramsSign + searchString);
    return results;

};

const random_anime = async (episodeId) => {

    const results = await axios.get(url + "/random-anime");
    return results;

};

const anime_bygenre = async ({ queryKey }) => {

    const [_key, { genre, page }] = queryKey;
    var genreValue = `["${genre}"]`;
    const results = await axios.get(`${url}/genres?genres=${genreValue}&page=${page}`);
    return results;

};

export { anime_search, anime_carousel, anime_advanced_search, anime_info, anime_stream_links, recent_anime_episodes, trending_anime, popular_anime, anime_airing_schedule, random_anime, anime_bygenre };