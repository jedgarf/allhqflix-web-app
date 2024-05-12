import Hls from "hls.js";
import flvjs from "flv.js";
import dashjs from 'dashjs';

// Config
import apiConfig from '../../Config/api.config';
import { maxMediaSaved } from '../../Config/settings.config';

// Utils
import { getAllSavedCookiesMedia } from "../../Services/Utils";

// Helpers
import { getCookie, addCookie, deleteCookie } from "../../Helpers/Cookies";
import { getSession } from "../../Helpers/Sessions";

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
        hls.loadSource(url);
        hls.attachMedia(video);
        // hls.on(Hls.Events.MANIFEST_PARSED, function() {
        //     console.log(url);
        // });

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

export const playMpd = (video, url, art) => {
    if (dashjs.supportsMediaSource()) {
        if (art.dash) art.dash.destroy();
        const dash = dashjs.MediaPlayer().create();
        dash.initialize(video, url, art.option.autoplay);
        art.dash = dash; 
        art.on('destroy', () => dash.destroy());
    } else {
        art.notice.show = 'Unsupported playback format: mpd';
    }
}

export const destroyPlayM3u8 = () => {
    Hls.destroy();
}

export const destroyPlayFlv = () => {
    flvjs.destroy();
}

export const saveProgress = (details, mediaId, type, paramDub, seasonNumber, episodeId, episodeNumber, server, currentTime, duration) => {

    const savedMedia = getAllSavedCookiesMedia();
    var image = details?.image;

    if(mediaId == 21) {
        const arcs = require('../../Services/Data/onePieceArcs.json').arcs;
        image = arcs.find(item => item.start_episode <= parseInt(episodeNumber) && item.end_episode >= parseInt(episodeNumber))?.mini_banner || details?.image;
    }

    const title = type === 'anime' ? (details?.title?.english || details?.title?.userPreferred || details?.title?.romaji || details?.title?.native) : details?.title;
    const quality = type === 'movie' || type === 'tv' ? details?.video_quality : '';
    if (savedMedia?.length < maxMediaSaved) {
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
                server: server,
                time: currentTime,
                duration: duration,
                expires: '',
                userAuth: getSession('user') || ''
            };
            if (getCookie(encodeURIComponent(mediaId))) deleteCookie(encodeURIComponent(mediaId));
            addCookie(encodeURIComponent(mediaId), JSON.stringify(mediaProgress), 7);
        }, 5000);   
    }
};

export const showPrevNextControls = (art, state, additionalControls) => {
    if (state) { 
        if (additionalControls.filter(item => item.name === 'prevEpisode').length > 0) {
            if (!art.controls['prevEpisode']) art.controls.add(additionalControls.find(item => item.name === 'prevEpisode'));
        }
        if (additionalControls.filter(item => item.name === 'nextEpisode').length > 0) {
            if (!art.controls['nextEpisode']) art.controls.add(additionalControls.find(item => item.name === 'nextEpisode'));
        }
    } else { 
        if (art.controls['prevEpisode']) art.controls.remove('prevEpisode');
        if (art.controls['nextEpisode']) art.controls.remove('nextEpisode');
    }
}