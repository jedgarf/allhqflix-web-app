// import _ from 'lodash';
import Hls from "hls.js";
import flvjs from "flv.js";

import apiConfig from '../../Config/api.config';
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

export const playM3u8 = (video, url, art) => {

    if (Hls.isSupported()) {
        const hls = new Hls();
        if (art?.category === "movie" || art?.category === "movie") {
            hls.xhrSetup = function(xhr, url) {
                // Add custom Referer header here
                xhr.setRequestHeader('Referer', apiConfig.flixhq_referer);
            };
        }
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
    Hls.destroy();
}

export const destroyPlayFlv = () => {
    flvjs.destroy();
}

export const saveProgress = (details, mediaId, type, paramDub, seasonNumber, episodeId, episodeNumber, currentTime, duration) => {
    
    console.info("save progress: ", currentTime);

    // _.throttle((currentTime) => {
    //     const mediaProgress = {
    //         dub: paramDub,
    //         seasonNumber: seasonNumber,
    //         episodeId: episodeId,
    //         episodeNumber: episodeNumber,
    //         time: currentTime,
    //     };
    //     if (getCookie(encodeURIComponent(mediaId))) deleteCookie(encodeURIComponent(mediaId));
    //     addCookie('test', JSON.stringify(mediaProgress), 7);
    // }, 5000);

    const image = details?.image;
    const title = type === 'anime' ? (details?.title?.english || details?.title?.userPreferred || details?.title?.romaji || details?.title?.native) : details?.title;
    const quality = type === 'movie' || type === 'tv' ? details?.video_quality : '';

    setTimeout(() => {
        const mediaProgress = {
            mediaId: mediaId,
            image: image,
            title: title,
            category: type,
            quality: quality,
            dub: paramDub,
            seasonNumber: seasonNumber,
            episodeId: episodeId,
            episodeNumber: episodeNumber,
            time: currentTime,
            duration: duration,
        };
        if (getCookie(encodeURIComponent(mediaId))) deleteCookie(encodeURIComponent(mediaId));
        addCookie(encodeURIComponent(mediaId), JSON.stringify(mediaProgress), 7);
    }, 5000);
};