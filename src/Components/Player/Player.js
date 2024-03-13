import React, { useState, useRef, useEffect } from 'react';

// ArtPlayerJS
import Artplayer from 'artplayer';
import artplayerPluginAds from 'artplayer-plugin-ads';
import Hls from "hls.js";
import flvjs from "flv.js";
// import artplayerPluginControl from "artplayer-plugin-control";

// Material UI Components
import CircularProgress from '@mui/material/CircularProgress';

// Icons
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import HighQualityIcon from '@mui/icons-material/HighQuality';

// Settings
import { ads } from "../../Config/settings.config";

// Images
import { mainLogo, customLoadingFileName } from "../../Config/images.config";

// Utilities
import { getFileExtention } from "../../Services/Utils";

// ------------------------------------------------------------------------------------------------------------

var artInstance;

const playFlv = (video, url, art) => {
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

// var hlsConfig = {
//     xhrSetup: function (xhr, url) {
//       xhr.referer = 'https://flixhq.to/';
//     },
// };

const playM3u8 = (video, url, art) => {
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

const destroyPlayM3u8 = () => {
    // Hls.destroy();
}

const destroyPlayFlv = () => {
    flvjs.destroy();
}

const random_ads = (items) => {
    return items[Math.floor(Math.random() * items.length)];
}

// {
//     html: `<p>${infotitle}</p>`,
//     style: {
//         position: 'absolute',
//         width: '100%',
//         top: '15px',
//         left: '20px',
//         fontSize: '1vw',
//         opacity: '.7',
//     },
// }, 

// ----------------------------------------------------------------------------------------------------------

const Player = ({ defaultlink, infotitle, infocover, episodeNum, totalEpisodes, nextEpisode, seekTime, option, ...rest }) => {

    // const cads = random_ads(ads);

    const artRef = useRef();

    useEffect(() => {

        var customIcons = {
            loading: `<img width="100" src="${customLoadingFileName}">`,
        };

        let isAutoPlay = true;

        if (process.env.NODE_ENV == 'production') {
            Artplayer.DEBUG = false;
        } else {
            Artplayer.DEBUG = true;
            isAutoPlay = false;
        }

        Artplayer.ASPECT_RATIO = ['default', '1:1', '2:1', '4:3', '6:5'];
        Artplayer.TOUCH_MOVE_RATIO = 0.5;
        
        var art;

        try {
            art = new Artplayer({
                ...option,
                container: artRef.current,
                autoOrientation: true,
                fastForward: true,
                url: defaultlink,
                type: getFileExtention(defaultlink),
                customType: {
                    m3u8: playM3u8,
                    flv: playFlv
                },
                title: infotitle || "Unknown Title",
                poster: infocover || "",
                volume: 1,
                muted: false,
                autoplay: isAutoPlay,
                pip: false,
                autoSize: false,
                autoMini: true,
                // screenshot: true,
                loop: false,
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                // fullscreenWeb: true,
                subtitleOffset: false,
                miniProgressBar: true,
                lock: true,
                // mutex: true,
                backdrop: true,
                playsInline: true,
                autoPlayback: true,
                airplay: false,
                theme: '#DC4C64',
                lang: navigator.language.toLowerCase(),
                whitelist: ['*'],
                moreVideoAttr: {
                    crossOrigin: 'anonymous',
                    // preload: 'none', // metadata
                    // playsInline: true,
                },
                contextmenu: [{
                    html: 'Custom menu',
                    click: function(contextmenu) {
                        console.info('You clicked on the custom menu');
                        contextmenu.show = false;
                    },
                }, ],
                layers: [
                    {
                        html: `<img src="${mainLogo}">`,
                        click: function() {
                            // window.open('https://jedgarfdev.vercel.app');
                            console.info('You clicked on the custom layer');
                        },
                        style: {
                            position: 'absolute',
                            width: '50px',
                            top: '3px',
                            right: '0px',
                            opacity: '.7',
                        },
                    }
                ],
                icons: customIcons,
            });
        } catch (error) {
            console.error(error);
        }

        // if (option.enableAds === true && process.env.REACT_APP_ENABLE_ADS == true) {
            // art.plugins.add(artplayerPluginAds({
            //     html: `<img src="${mainLogo}">`,
            //     video: '/ads/' + cads.video,
            //     url: cads.link,
            //     playDuration: cads.skipDuration,
            //     totalDuration: cads.totalDuration,
            //     i18n: {
            //         close: 'SKIP ADS',
            //         countdown: '%ss',
            //         detail: cads.name,
            //         canBeClosed: 'ADS CAN BE CLOSED AFTER %s SECONDS',
            //     },
            // }));

            // The ad was clicked
            // art.on('artplayerPluginAds:click', (ads) => {
            //     console.info('Ad was clicked', ads);
            // });

            // Advertisement is skipped
            // art.on('artplayerPluginAds:skip', (ads) => {
            //     console.info('Ad was skipped', ads);
            // });
        // }
        if (art) {
            art.on('waiting', () => {
            
                // Show the loading message after 5 seconds
                setTimeout(() => {
                    art.notice.show = 'Please switch to another server.';
                }, 5000);
    
            });
    
            art.on('ready', () => {
                if (totalEpisodes > 1) {
                    art.notice.show = infotitle;
                }
    
                // Seek time
                if (seekTime > 0) {
                    art.seek = seekTime;   
                }
    
            });
    
            art.on('pause', () => {
                art.notice.show = infotitle;
            });
    
            if (totalEpisodes > 1) {
                // auto next function
                art.on('video:ended', () => {
                    nextEpisode();
                });
            }
    
            art.on('error', (error, reconnectTime) => {
                // console.info(error, reconnectTime);
                art.notice.show = 'Error loading Link, please switch to another server.';
            });   
        }

    }, []);

    return <div ref={artRef} {...rest}></div>;
}

export {
    Player,
    destroyPlayM3u8,
    destroyPlayFlv
}