import React, { useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { SpinnerDotted } from 'spinners-react';

// ArtPlayerJS
import Artplayer from 'artplayer';
import artplayerPluginAds from 'artplayer-plugin-ads';
// import artplayerPluginControl from "artplayer-plugin-control";

// Settings
import { ads } from "../../Config/settings.config";

// Images
import { mainLogo, customLoadingFileName, homeBackground } from "../../Config/images.config";

// Utilities
import { getFileExtention, randomizeArray } from "../../Services/Utils";
import { playFlv, destroyPlayFlv, playM3u8, destroyPlayM3u8, saveProgress } from "./_config";

// Helpers
import { deleteCookie } from "../../Helpers/Cookies";

var artPlayerInstance = null;

const PlayerLoading = () => {
    return <SpinnerDotted size={39} thickness={180} speed={121} color="rgba(220, 76, 100, 1)" />;
}

const Player = ({ details, episodes, defaultlink, infotitle, infocover, seasonNumber = null, episodeNum, episodeNumber = null, totalEpisodes, nextEpisode, seekTime, mediaId, episodeId, server = null, option, ...rest }) => {

    const { type } = useParams();
    const queryParams = new URLSearchParams(window.location.search);
    const paramDub = queryParams.get("dub") ? queryParams.get("dub") == 'true' : false;
    const playerAds = randomizeArray(ads);
    const artRef = useRef();

    if(episodeNumber === null) episodeNumber = episodeNum;

    useEffect(() => {

        var art;
        var isAutoPlay = true;
        var customIcons = { loading: `<img width="100" src="${customLoadingFileName}">` };

        if (process.env.NODE_ENV === 'development') isAutoPlay = false;
        if (process.env.NODE_ENV === 'production') Artplayer.DEBUG = false;

        // Custom artplayer values
        Artplayer.ASPECT_RATIO = ['default', '1:1', '2:1', '4:3', '6:5'];
        Artplayer.TOUCH_MOVE_RATIO = 0.5;

        try {
            art = new Artplayer({
                ...option,
                category: type,
                container: artRef.current,
                autoOrientation: true,
                fastForward: true,
                url: defaultlink,
                type: getFileExtention(defaultlink),
                customType: { m3u8: playM3u8, flv: playFlv },
                title: infotitle || "Unknown title",
                poster: infocover || homeBackground,
                volume: 1,
                muted: false,
                autoplay: isAutoPlay,
                pip: false,
                autoSize: false,
                autoMini: true,
                loop: false,
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                fullscreenWeb: true,
                subtitleOffset: false,
                miniProgressBar: true,
                lock: true,
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
                // contextmenu: [{
                //     html: 'Custom menu',
                //     click: function(contextmenu) {
                //         contextmenu.show = false;
                //     },
                // }],
                layers: [
                    {
                        html: `<img src="${mainLogo}">`,
                        click: (props) => {
                            alert("Thanks for support!");
                        },
                        style: {
                            position: 'absolute',
                            minWidth: '36px',
                            maxWidth: '3vw',
                            top: '5px',
                            right: '4px',
                            // opacity: '.9',
                        },
                    }
                ],
                icons: customIcons
            });
        } catch (err) {
            console.error("ArtPlayer", err);
        }

        if (art) {

            art.hotkey.add(70, () => {
                art.fullscreen = !art.fullscreen;
            });

            art.on('ready', () => {
                art.notice.show = infotitle;
                art.subtitle.style({
                    fontSize: 'clamp(14px, 3vw, 30px)',
                    marginBottom: '5vh',
                });
                if (seekTime > 0) art.seek = seekTime;
                const isMobile = navigator.userAgent.match(/(iphone|ipod|ipad|android)/i);
                if (!isMobile) art.fullscreenWeb = true;
            });
    
            art.on('pause', () => {
                art.notice.show = infotitle;
            });

            art.on('video:waiting', () => {
                if (art.currentTime === art.loadedTime) {
                    setTimeout(() => {
                        art.notice.show = 'Your connection is too slow.';
                    }, 3000);   
                }
            });

            art.on('video:ended', () => {
                if (episodeNum === totalEpisodes) {
                    deleteCookie(decodeURIComponent(mediaId));
                    art.fullscreenWeb = false;
                }
                // auto next function
                if (totalEpisodes > 1) nextEpisode();
            });

            // Save progress ------------------------------------------------------------------------------------------------------------
            
            art.on('video:timeupdate', () => {
                if (episodeNum === totalEpisodes) {
                    if (art.currentTime < (art.duration-10)) saveProgress(details, mediaId, type, paramDub, seasonNumber, episodeId, episodeNum, server, art.currentTime, art.duration); 
                } else {
                    saveProgress(details, mediaId, type, paramDub, seasonNumber, episodeId, episodeNum, server, art.currentTime, art.duration);
                    if (episodeNum < totalEpisodes) {
                        if (Math.round(art.currentTime) >= Math.round(art.duration-9)) {
                            const index = episodes.findIndex(item => item.id == episodeId);
                            if (type === "movie" || type === "tv") {
                                art.notice.show = `Season ${episodes[index+1].season} / Episode ${episodes[index+1].number} will be auto play in ${Math.round(art.duration-art.currentTime)+1}`;   
                            } else {
                                art.notice.show = `Episode ${episodes[index+1].number} will be auto play in ${Math.round(art.duration-art.currentTime)+1}`;
                            }
                        }   
                    }
                }
            });

            // End -----------------------------------------------------------------------------------------------------------------------

            // Advertisements ------------------------------------------------------------------------------------------------------------
            
            if (option.enableAds === true && process.env.REACT_APP_ENABLE_ADS == true) {
                art.plugins.add(artplayerPluginAds({
                    html: `<img src="${mainLogo}">`,
                    video: '/ads/' + playerAds.video,
                    url: playerAds.link,
                    playDuration: playerAds.skipDuration,
                    totalDuration: playerAds.totalDuration,
                    i18n: {
                        close: 'SKIP ADS',
                        countdown: '%ss',
                        detail: playerAds.name,
                        canBeClosed: 'ADS CAN BE CLOSED AFTER %s SECONDS',
                    },
                }));
            }

            // The ad was clicked
            art.on('artplayerPluginAds:click', (ads) => {
                console.log('Ad was clicked', ads);
            });

            // Advertisement is skipped
            art.on('artplayerPluginAds:skip', (ads) => {
                console.log('Ad was skipped', ads);
            });

            art.on('error', (error, reconnectTime) => {
                art.notice.show = 'Error loading link.';
            });

            artPlayerInstance = art;

            // End -----------------------------------------------------------------------------------------------------------------------
    
        }
    }, []);

    return <div ref={artRef} {...rest}></div>;
}

export {
    Player,
    destroyPlayM3u8,
    destroyPlayFlv,
    artPlayerInstance
}