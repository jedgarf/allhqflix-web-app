import React, { useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { SpinnerDotted } from 'spinners-react';

// ArtPlayerJS
import Artplayer from 'artplayer';
// import ArtplayerToolThumbnail from 'artplayer-tool-thumbnail';
import artplayerPluginAds from 'artplayer-plugin-ads';
// import artplayerPluginControl from "artplayer-plugin-control";

// Settings
import { ads } from "../../Config/settings.config";

// Images
import { mainLogo, customLoadingFileName, homeBackground } from "../../Config/images.config";

// Utilities
import { getFileExtention, randomizeArray, isMobile } from "../../Services/Utils";
import { playFlv, destroyPlayFlv, playM3u8, destroyPlayM3u8, playMpd, saveProgress, showPrevNextControls } from "./_config";

// Helpers
import { deleteCookie } from "../../Helpers/Cookies";
import { getLocalStorage } from "../../Helpers/LocalStorage";
import { getSession } from "../../Helpers/Sessions";

var artPlayerInstance = null;

const PlayerLoading = () => {
    return <SpinnerDotted size={39} thickness={180} speed={121} color="rgba(220, 76, 100, 1)" />;
}

const Player = ({ details, episodes, defaultlink, infotitle, infocover, seasonNumber = null, episodeNum, episodeNumber = null, totalEpisodes, nextEpisode, seekTime, mediaId, episodeId, server = null, additionalControls, option, ...rest }) => {

    const { type } = useParams();
    const queryParams = new URLSearchParams(window.location.search);
    const paramDub = queryParams.get("dub") ? queryParams.get("dub") == 'true' : false;
    const playerAds = randomizeArray(ads);
    const artRef = useRef();
    const player_auto_play = getLocalStorage('player_auto_play') === 'true' && getSession('user') ? true : false;
    const player_auto_next = getLocalStorage('player_auto_next') === 'true' && getSession('user') ? true : false;
    const player_auto_fullscreen = getLocalStorage('player_auto_fullscreen') === 'true' && getSession('user') ? true : false;

    if(episodeNumber === null) episodeNumber = episodeNum;

    useEffect(() => {

        var art;
        var customIcons = { 
            loading: `<img width="100" src="${customLoadingFileName}">`, 
            // state: `<img width="100" src="${details?.image}">`
        };

        if (process.env.NODE_ENV === 'production') Artplayer.DEBUG = false;

        // Custom artplayer values
        Artplayer.ASPECT_RATIO = ['default', '1:1', '2:1', '4:3', '6:5'];
        Artplayer.TOUCH_MOVE_RATIO = 0;
        Artplayer.USE_RAF = true;

        try {
            art = new Artplayer({
                ...option,
                category: type,
                container: artRef.current,
                autoOrientation: true,
                fastForward: true,
                url: defaultlink,
                type: getFileExtention(defaultlink),
                customType: { m3u8: playM3u8, flv: playFlv, mpd: playMpd },
                title: infotitle || "Unknown title",
                poster: infocover || homeBackground,
                volume: 1,
                muted: false,
                autoplay: player_auto_play,
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
                backdrop: false,
                playsInline: false,
                autoPlayback: false,
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
                    html: 'Download',
                    click: function(contextmenu) {
                        contextmenu.show = true;
                    },
                }],
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
                icons: customIcons,
            });
        } catch (err) {
            console.error("ArtPlayer", err);
        }

        if (art) {

            art.hotkey.add(70, () => art.fullscreen = !art.fullscreen);

            art.on('ready', () => {
                art.notice.show = infotitle;
                art.subtitle.style({
                    fontSize: 'clamp(12px, 2.5vw, 30px)',
                    marginBottom: '5vh',
                });
                if (seekTime > 0) art.seek = seekTime;
                if (player_auto_fullscreen && !isMobile) art.fullscreenWeb = true;
            });
            
            art.on('play', () => {
                if (player_auto_fullscreen && !isMobile) art.fullscreenWeb = true;
                if (totalEpisodes > 1 && episodeNum < totalEpisodes) {
                    if (art.currentTime === art.duration) nextEpisode();
                }
            });

            art.on('pause', () => {
                art.notice.show = infotitle;
            });

            art.on('fullscreenWeb', (state) => {
                showPrevNextControls(art, state, additionalControls);
            });

            art.on('fullscreen', (state) => {
                showPrevNextControls(art, state, additionalControls);
            });

            art.on('video:waiting', () => {
                if (art.currentTime === art.loadedTime) {
                    setTimeout(() => {art.notice.show = 'Your connection is too slow.';}, 3000);   
                }
            });

            art.on('video:ended', () => {
                art.template.$poster.style.display = '';
                if (episodeNum === totalEpisodes) {
                    deleteCookie(decodeURIComponent(mediaId));
                    if (!isMobile) art.fullscreenWeb = false;
                } else {
                    if (player_auto_next && totalEpisodes > 1) nextEpisode();
                }
            });

            // Save progress ------------------------------------------------------------------------------------------------------------
            
            art.on('video:timeupdate', () => {
                if (episodeNum === totalEpisodes) {
                    if (art.currentTime < (art.duration-10)) saveProgress(details, mediaId, type, paramDub, seasonNumber, episodeId, episodeNum, server, art.currentTime, art.duration); 
                } else {
                    saveProgress(details, mediaId, type, paramDub, seasonNumber, episodeId, episodeNum, server, art.currentTime, art.duration);
                    
                    if (player_auto_next && episodeNum < totalEpisodes) {
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
    }, [defaultlink]);

    return <div ref={artRef} {...rest}/>;
}

export {
    Player,
    destroyPlayM3u8,
    destroyPlayFlv,
    artPlayerInstance
}