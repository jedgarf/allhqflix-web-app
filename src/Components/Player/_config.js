import _ from 'lodash';
import Hls from "hls.js";
import flvjs from "flv.js";

import { getCookie, addCookie, deleteCookie } from "../../Helpers/Cookies";

export const playFlv = (video, url, art) => {
    if (flvjs.isSupported()) {
        const flv = flvjs.createPlayer({ type: 'flv', url });
        flv.attachMediaElement(video);
        flv.load();

        // optional
        art.flv = flv;
        art.once('url', () => flv.destroy());
        art.once('destroy', () => flv.destroy());
    } else {
        art.notice.show = 'Unsupported playback format: flv';
    }
}

// const hlsConfig = {
//     xhrSetup: function (xhr, url) {
//       xhr.referer = 'https://flixhq.to/';
//     },
// };

export const playM3u8 = (video, url, art) => {
    if (Hls.isSupported()) {
        // const hls = new Hls(hlsConfig);
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);

        // optional
        art.hls = hls;
        art.once('url', () => hls.destroy());
        art.once('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
    } else {
        art.notice.show = 'Unsupported playback format: m3u8';
    }
}

export const destroyPlayM3u8 = () => {
    // Hls.destroy();
}

export const destroyPlayFlv = () => {
    flvjs.destroy();
}

export const saveProgress = (mediaId, paramDub, episodeId, episodeNum, currentTime) => {
    _.throttle((currentTime) => {
        // console.log('Saving progress:', currentTime);
        const mediaProgress = {
            dub: paramDub,
            episodeId: episodeId,
            episodeNumber: episodeNum,
            time: currentTime,
        };
        if (getCookie(mediaId)) deleteCookie(mediaId);
        // save for 7 days
        addCookie(mediaId, JSON.stringify(mediaProgress), 7);
    }, 5000);
};