const localIPAddress = '192.168.1.127';
const localPort = '3000';
const localBaseUrl = `http://${localIPAddress}:${localPort}`;
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === localIPAddress;

let base_url = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL;

// if (isLocalhost) {
//     base_url = localBaseUrl;
// }

var apiConfig = {
    "api_key": process.env.REACT_APP_API_KEY,
    "override_cors": process.env.REACT_APP_OVERRIDE_CORS + "/",
    "override_cors2": process.env.REACT_APP_OVERRIDE_CORS2,
    "hqflix_video_link_enable_override_cors": true,
    "anime_video_link_enable_override_cors": true,
    "asian_drama_video_link_enable_override_cors": true,
    "base_url_v1": base_url + "/v1",
    "fixhq_base_url": base_url + "/v1/flixhq",
    "tmdb_base_url": base_url + "/v1/tmdb",
    "anime_base_url": base_url + "/v1/anime",
    "asian_drama_base_url": base_url + "/v1/dramacool",
    "asian_drama2_base_url": base_url + "/v1/viewasian",
    "live_channel_base_url": process.env.REACT_APP_OVERRIDE_CORS + "/" + process.env.REACT_APP_LIVE_BASE_URL,
}

export default apiConfig;