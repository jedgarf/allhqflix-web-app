// Packages
import React, { useState, useEffect, useCallback, useRef, Fragment } from "react";
import { useQuery } from 'react-query';
import { Link, useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import moment from 'moment';

// CSS
import "./css/MovieDashboard.css";

// Icons
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CircularProgress from '@mui/material/CircularProgress';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import InitPlayerLoading from "../../Components/InitPlayerLoading/InitPlayerLoading";
import { Player } from "../../Components/Player/Player";
import Suggestions from "../../Components/InternationalFilms/Suggestions";
import TVEpisodesDrawer from "../../Components/BottomDrawer/TVEpisodesDrawer";
import MediaDescription from "../../Components/MediaDescription/MediaDescription";
import SnackBar from "../../Components/SnackBar/SnackBar";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import apiConfig from '../../Config/api.config';
import { defaultInternationalServer, defaultInternationalVideoRes, server_status } from "../../Config/settings.config";

// Images
import { subtitleLogo, videoQuality, homeBackground } from "../../Config/images.config";

// Utilities
import { moveToTop, getFileExtention, SeparateArrayByComma, SeparateArrayByCircularSpan, capitalizeString, convertMinutesToHoursAndMinutes, getLanguageName } from "../../Services/Utils";

// Helpers
import { getCookie } from "../../Helpers/Cookies";
import { decryptParams } from "../../Helpers/Crypto";

// Services
import { movie_info, movie_server, movie_stream_links } from "../../Services/FlixHQService";

const MovieDashboard = (props) => {
  
  const { id, type } = useParams();
  const indexId = type + "/" + id;
  const contentType = type === 'movie' ? 'Movie' : 'TV Series';
  const queryParams = new URLSearchParams(window.location.search);
  const paramSeasonId = queryParams.get("season") ? parseInt(queryParams.get("season")) : null;
  const paramEpisodeId = queryParams.get("episode") ? parseInt(queryParams.get("episode")) : null;
  const paramServer = queryParams.get("server") ? (queryParams.get("server") === '1' ? 'upcloud' : 'vidcloud') : null;

  const [movieServer, setMovieServer] = useState([]);
  const [videoQualities, setVideoQualities] = useState([]);
  const [videoSubtitles, setVideoSubtitles] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // alert variable
  const [snackBarType, setSnackBarType] = useState("info");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  // Picture loading
  const [loadingEpisode, setLoadingEpisode] = useState(true);

  // Default data load
  const [defaultLink, setDefaultLink] = useState("");
  const [defaultSubtitle, setDefaultSubtitle] = useState("");
  const [defaultQualityToolTip, setDefaultQualityToolTip] = useState("");
  const [defaultSubtitleToolTip, setDefaultSubtitleToolTip] = useState("");
  
  // selected data
  const [selectedSeason, setSelectedSeason] = useState(paramSeasonId);
  const [selectedEpisode, setSelectedEpisode] = useState(paramEpisodeId);
  const [selectedServer, setSelectedServer] = useState(paramServer);
  const [selectedRabbitstreamId, setSelectedRabbitstreamId] = useState(null);
  const [selectedEpisodeName, setSelectedEpisodeName] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [episodeNum, setEpisodeNum] = useState(0);

  // ----------------------------------------------------------------------------------------------------------

  const handleSnackBarOpen = (event, reason) => {
      setSnackBarType("");
      setSnackBarOpen(false);
  };

  const chooseServer = (server, rabbitstreamId) => {
    if (server === selectedServer) {
      moveToTop();
    } else {
      setLoadingEpisode(true);
      set_selectedServer(server, rabbitstreamId);
      moveToTop();
    }
  }

  const set_selectedSeasonEpisode = useCallback((infoValue) => {

    setTotalEpisodes(infoValue?.episodes?.length);
    if (selectedSeason || selectedEpisode) {
      for (let getSelEpisodeLength = 0; getSelEpisodeLength < infoValue?.episodes.length; getSelEpisodeLength++) {
        if (infoValue?.episodes[getSelEpisodeLength].id == selectedEpisode) {
          setSelectedSeason(infoValue?.episodes[getSelEpisodeLength].season);
          setEpisodeNum(getSelEpisodeLength + 1);
          setSelectedEpisodeName(infoValue?.episodes[getSelEpisodeLength].title);
          break;
        }
      }
    } else {
      setSelectedSeason(1);
      setSelectedEpisode(infoValue?.episodes[0].id);
      setEpisodeNum(1);
      setSelectedEpisodeName(infoValue?.episodes[0].title);
    }
    setRecommendations(infoValue?.recommendations);

  }, [selectedSeason, selectedEpisode]);

  const set_selectedServer = useCallback((server, rabbitstreamId) => {

    if (server !== undefined) {
      if (server.length > 0) {
        if (paramServer != null) {
          if (server === paramServer) {
            setSelectedServer(paramServer);
            setSelectedRabbitstreamId(rabbitstreamId);
          } else {
            setSelectedServer(server);
            setSelectedRabbitstreamId(rabbitstreamId);
          }
        } else {
          if (Array.isArray(server)) {
            setSelectedServer(server.data[0].name);
            setSelectedRabbitstreamId(server.data[0].rabbitstream_id);
          } else {
            setSelectedServer(server);
            setSelectedRabbitstreamId(rabbitstreamId);
          }
        }
      } else {
        setSnackBarType('error');
        setSnackBarMessage(`No Server Found.`);
        setSnackBarOpen(true);
      }
    }

  }, [paramServer]);

  const set_selectedLinkSubtitle = useCallback((resourceValue) => {

    // Default Link
    let defLink = resourceValue.data?.sources?.filter( (result) => { return result.quality === "auto"; });
    defLink = defLink?.length > 0 ? defLink[0]?.url : "";
    if (apiConfig.hqflix_video_link_enable_override_cors === true) {
      defLink = `${selectedServer === "vidcloud" ? apiConfig.override_cors2 + defLink : apiConfig.override_cors + defLink.replace("https://", "")}`;
    }
    setDefaultLink(defLink);

    // video qualities
    let videoQualitiesContent = [];
    let vidRes = resourceValue.data?.sources;
    if (vidRes !== undefined) {
      for (let videoQualitiesLength = 0; videoQualitiesLength < vidRes?.length; videoQualitiesLength++) {
        if (vidRes[videoQualitiesLength].quality === defaultInternationalVideoRes) {
          setDefaultQualityToolTip(vidRes[videoQualitiesLength]?.quality === "auto" ? capitalizeString(vidRes[videoQualitiesLength]?.quality) : vidRes[videoQualitiesLength]?.quality + "p");
          videoQualitiesContent.push({"default": true, "html": (vidRes[videoQualitiesLength]?.quality === "auto" ? capitalizeString(vidRes[videoQualitiesLength]?.quality) : vidRes[videoQualitiesLength]?.quality + "p"), "url": apiConfig.hqflix_video_link_enable_override_cors === true ? apiConfig.override_cors + vidRes[videoQualitiesLength]?.url : vidRes[videoQualitiesLength]?.url});
        } else {
          videoQualitiesContent.push({"default": false, "html": (vidRes[videoQualitiesLength]?.quality === "auto" ? capitalizeString(vidRes[videoQualitiesLength]?.quality) : vidRes[videoQualitiesLength]?.quality + "p"), "url": apiConfig.hqflix_video_link_enable_override_cors === true ? apiConfig.override_cors + vidRes[videoQualitiesLength]?.url : vidRes[videoQualitiesLength]?.url});
        }
      } 
    }
    setVideoQualities(videoQualitiesContent);

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    let videoSubtitlesContent = [];
    let vidSub = resourceValue.data?.subtitles;
    let processParam = "eng";
    let engVidSub = vidSub?.filter((condition) => condition.lang.indexOf(processParam.toLowerCase()) > -1 || condition.lang.indexOf(processParam.toUpperCase()) > -1 || condition.lang.indexOf(processParam.charAt(0).toUpperCase() + processParam.slice(1)) > -1);

    // Default Subtitle
    let defSubtitle = vidSub?.length > 0 ? vidSub[0]?.url : "";

    if (engVidSub?.length > 0) {
      defSubtitle = engVidSub[0]?.url;
    }
    setDefaultSubtitle(defSubtitle);

    // video subtitles
    if (vidSub !== undefined) {
      for (let videoSubtitlesLength = 0; videoSubtitlesLength < vidSub?.length; videoSubtitlesLength++) {
        if (engVidSub?.length > 0) {
          if (vidSub[videoSubtitlesLength]?.lang === engVidSub[0]?.lang) {
            setDefaultSubtitleToolTip(getLanguageName(vidSub[videoSubtitlesLength]?.lang, videoSubtitlesLength));
            videoSubtitlesContent.push({"default": true, "html": getLanguageName(vidSub[videoSubtitlesLength]?.lang, videoSubtitlesLength), "url": vidSub[videoSubtitlesLength]?.url});
          } else {
            videoSubtitlesContent.push({"default": false, "html": getLanguageName(vidSub[videoSubtitlesLength]?.lang, videoSubtitlesLength), "url": vidSub[videoSubtitlesLength]?.url});
          }
        } else {
          if (videoSubtitlesLength === 0) {
            setDefaultSubtitleToolTip(getLanguageName(vidSub[videoSubtitlesLength]?.lang, videoSubtitlesLength));
            videoSubtitlesContent.push({"default": true, "html": getLanguageName(vidSub[videoSubtitlesLength]?.lang, videoSubtitlesLength), "url": vidSub[videoSubtitlesLength]?.url});
          } else {
            videoSubtitlesContent.push({"default": false, "html": getLanguageName(vidSub[videoSubtitlesLength]?.lang, videoSubtitlesLength), "url": vidSub[videoSubtitlesLength]?.url});
          }
        }
      }
    }
    setVideoSubtitles(videoSubtitlesContent);
    setLoadingEpisode(false);
  }, [selectedServer]);

  // ----------------------------------------------------------------------------------------------

  // info
  let infoData = useQuery(['movie_info', { indexId }], movie_info, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    enabled: indexId !== null,
  });
  let infoValue = infoData?.data?.data;

  let episodeIdVar = selectedEpisode;

  if (infoData.isSuccess) {
    episodeIdVar = selectedEpisode || infoValue.episodes[0].id;
  }

  // servers
  let serverData = useQuery(['movie_server', { episodeIdVar, indexId }], movie_server, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    enabled: indexId !== null && episodeIdVar !== null,
    onSuccess: (res) => {
      if (paramServer) {
        setSelectedServer(res.data?.filter(item=>item.name===paramServer)?.name);
        setSelectedRabbitstreamId(res.data?.filter(item=>item.name===paramServer)?.rabbitstream_id);
      } else {
        setSelectedServer(res.data[0]?.name);
        setSelectedRabbitstreamId(res.data[0]?.rabbitstream_id);
      }
    }
  });
  let serverValue = serverData?.data;
  
  let serverVar = selectedServer;
  let rabbitStreamId = selectedRabbitstreamId;

  if (serverData.isSuccess) {
    const defaultServer = serverValue.data.filter(item => item.name === defaultInternationalServer).length > 0 ? serverValue.data.filter(item => item.name === defaultInternationalServer)[0].name : serverValue.data[0]?.name;
    serverVar = selectedServer || paramServer || defaultServer;
    const rabbitstream_id = serverValue.data.filter(item => item.name === defaultInternationalServer).length > 0 ? serverValue.data.filter(item => item.name === defaultInternationalServer)[0].rabbitstream_id : serverValue.data[0]?.rabbitstream_id;
    rabbitStreamId = selectedRabbitstreamId || rabbitstream_id;
  }

  // movie link
  let resourceData = useQuery(['movie_stream_links', {episodeIdVar, indexId, serverVar, rabbitStreamId}], movie_stream_links, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    retry: 2, // Number of retries
    enabled: indexId !== null && episodeIdVar !== null && serverVar !== null && rabbitStreamId !== null,
    onError: (error) => {
          setSnackBarType('error');
          setSnackBarMessage(`Source link not available in ${serverVar}, please switch to another server.`);
          setSnackBarOpen(true);
      }
  });
  
  let resourceValue = undefined;

  if (resourceData.isSuccess) {
    resourceValue = resourceData?.data;
  }

  const previousEpisode = () => {
    const selectedItemIndex = infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item.season == selectedSeason && item.id == selectedEpisode));
    if (selectedItemIndex > 0 && selectedItemIndex < infoValue?.episodes?.length) {
      const getTargetEpisode = infoValue?.episodes[selectedItemIndex-1];
      setLoadingEpisode(true);
      setSelectedEpisode(getTargetEpisode.id); 
      moveToTop();
      return true;
    } else {
      return false;
    }
  }

  const nextEpisode = () => {
    const selectedItemIndex = infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item.season == selectedSeason && item.id == selectedEpisode));
    if (selectedItemIndex >= 0 && (selectedItemIndex + 1) < infoValue?.episodes?.length) {
      const getTargetEpisode = infoValue?.episodes[selectedItemIndex+1];
      setLoadingEpisode(true);
      setSelectedEpisode(getTargetEpisode.id);
      moveToTop();
      return true;
    } else {
      return false;
    }
  }
  
  // previous | next
  var additionalControls = [];
  if (type === 'tv') {
    const selectedItemIndex = infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item.season == selectedSeason && item.id == selectedEpisode));
    // Previous Episode
    if (selectedItemIndex > 0 && selectedItemIndex < infoValue?.episodes?.length) {
      additionalControls.push({
        position: 'right',
        html: `&#8678;`,
        tooltip: 'Previous Episode',
        style: {
          fontSize: '43px',
          marginTop: '-8px'
        },
        click: (item) => {
          previousEpisode();
        },
      });
    }
    // Next Episode
    if (selectedItemIndex >= 0 && (selectedItemIndex + 1) < infoValue?.episodes?.length) {
      additionalControls.push({
        position: 'right',
        html: `&#8680;`,
        tooltip: 'Next Episode',
        style: {
          fontSize: '43px',
          marginTop: '-8px'
        },
        click: (item) => {
          nextEpisode();
        },
      });
    }
  }

  useEffect(() => {
    if (infoData.isSuccess) {
      document.title = 'AllHQFlix - ' + infoValue?.title;
      set_selectedSeasonEpisode(infoValue);
    }

    if (serverData.isSuccess) {
      set_selectedServer(serverVar, rabbitStreamId);
    }

    if (resourceData.isSuccess) {
      set_selectedLinkSubtitle(resourceValue); 
    }

    if (serverData.isSuccess) {
      setMovieServer(serverValue);
    }
  }, [infoData.isSuccess, 
      serverData.isSuccess, 
      serverVar, 
      resourceData.isSuccess, 
      infoData.isLoading, 
      resourceData.isLoading,
      serverData.isLoading,
      infoValue, resourceValue,
      serverValue, 
      set_selectedSeasonEpisode, 
      set_selectedServer, 
      set_selectedLinkSubtitle,
      rabbitStreamId]);

  return (
    <div className="movie_dashboard">
      <ReactQueryTools/>
      <SideBar Type={'foreign'} subType={null} transparentBg={false} isStream={true}/>
      <SnackBar severity={snackBarType} handleSnackBarOpen={handleSnackBarOpen} status={snackBarOpen} snackBarMessage={snackBarMessage} />

      <div className="movie_cover" style={{backgroundImage: `linear-gradient(rgba(0, 0, 10, 1),rgba(0, 0, 10, 0.5),rgba(0, 0, 10, 0.2)), url("${infoValue?.cover}"), url("${homeBackground}")`}}>
        <div className="heading cheading movie-stream-title">
          <h6> </h6>
        </div>
        {loadingEpisode ? (
          <InitPlayerLoading/>
        ) : (
          <Player
            className="movie_player"
            details={infoValue}
            episodes={infoValue?.episodes}
            defaultlink={defaultLink}
            infotitle={type === 'tv' ? `${infoValue?.title} - Season ${selectedSeason} / ${selectedEpisodeName}` : `${infoValue?.title}`}
            infocover={infoValue?.cover}
            seasonNumber={selectedSeason}
            episodeNum={episodeNum}
            episodeNumber={type === 'tv' ? infoValue?.episodes?.find((item) => item.season == selectedSeason && item.id == selectedEpisode).number : null}
            totalEpisodes={totalEpisodes}
            nextEpisode={nextEpisode}
            seekTime={getCookie(encodeURIComponent(indexId)) && JSON.parse(getCookie(encodeURIComponent(indexId))).episodeId === selectedEpisode ? JSON.parse(getCookie(encodeURIComponent(indexId))).time : 0}
            mediaId={indexId}
            episodeId={selectedEpisode}
            server={selectedServer}
            option={{
              enableAds: true,
              setting: true,
              hotkey: true,
              settings: [
              {
                html: 'Video Resolutions',
                width: 300,
                tooltip: defaultQualityToolTip || "No selected",
                icon: `<img width="22" heigth="22" src="${videoQuality}">`,
                selector: videoQualities,
                onSelect: function (item, $dom, event) {
                  // switching video resolution
                  if (videoQualities.length > 1) this.switchQuality(item.url, item.html);
                  return item.html;
                },
              },
              {
                html: 'Subtitles',
                width: 300,
                tooltip: defaultSubtitleToolTip || "No selected",
                icon: `<img width="22" heigth="22" src="${subtitleLogo}">`,
                selector: [
                  {
                    html: 'Display',
                    tooltip: 'Show',
                    switch: true,
                    onSwitch: function (item) {
                        item.tooltip = item.switch ? 'Hide' : 'Show';
                        this.subtitle.show = !item.switch;
                        return !item.switch;
                    },
                  },
                  ...videoSubtitles
                  ],
                  onSelect: function (item) {
                    // switching subtitle
                    if (videoSubtitles?.length > 1) this.subtitle.switch(item.url, { name: item.html });
                    return item.html;
                  },
                },
              ],
              // quality: videoQualities,
              subtitle: {
                  url: defaultSubtitle,
                  type: getFileExtention(defaultSubtitle),
                  encoding: 'utf-8',
              },
              controls: additionalControls,
            }}
          />
        )}
      </div>

      {selectedServer !== null && movieServer?.data?.length > 0 ? 
        <div className={type === 'tv' ? 'movie_server_tv' : 'movie_server'} hidden={server_status.filter(item => item.status === 'stable').length > 1 || movieServer?.data[0].name === 'vidcloud' ? false : true }>
          {/* <div className="movie_server_content_note">
            <p>If current server doesn't work please try other servers below.</p>
          </div> */}
          <div className="movie_server_content">
            <center>
              {movieServer?.data?.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {server_status.filter((serverValue) => serverValue.code === item.name).length > 0 && 
                      server_status.filter((serverValue) => serverValue.code === item.name)
                      .map((subItem, subIndex) => {
                        return (
                            <Fragment key={subIndex}>
                                {subItem.status === 'stable' ?
                                  <Button variant={selectedServer === item.name ? 'contained' : 'outlined'} startIcon={<OndemandVideoIcon/>} size="small" style={{ marginInline: 5 }} onClick={() => chooseServer(item.name, item.rabbitstream_id)} disabled={resourceData.isLoading}>
                                    {`Server ${index+1}`}
                                  </Button>
                                : 
                                  <Button variant={selectedServer === item.name ? 'contained' : 'outlined'} startIcon={<OndemandVideoIcon/>} size="small" style={{ marginInline: 5, cursor: 'not-allowed' }} color='error' disabled={resourceData.isLoading}>
                                    {`Server ${index+1}`}
                                  </Button>
                                }
                            </Fragment>
                        )
                      })
                    }        
                  </Fragment>
                )
              })}
            </center>
          </div>
        </div>
      : <div className={type === 'tv' ? 'movie_server_tv' : 'movie_server'}></div>}

      <div className={type === 'tv' ? 'tv_info' : 'movie_info'}>
      
        {type === 'tv' ?
          <Fragment>
            <Box className="episodesBtn" display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
              <TVEpisodesDrawer
                movieInfo={infoValue} 
                mediaId={indexId} 
                seasonId={selectedSeason}
                episodeId={selectedEpisode} 
                server={selectedServer}
                setSelectedSeason={setSelectedSeason}
                setSelectedEpisode={setSelectedEpisode}
                setSelectedServer={setSelectedServer}
                setSelectedEpisodeName={setSelectedEpisodeName}
                setLoadingEpisode={setLoadingEpisode}
                moveToTop={moveToTop}
                lowerEpisodeList={true}
                drawerAlign={'bottom'}
              />
            </Box>
            <Box className="episodesBtn" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
              <TVEpisodesDrawer
                movieInfo={infoValue} 
                mediaId={indexId} 
                seasonId={selectedSeason}
                episodeId={selectedEpisode} 
                server={selectedServer}
                setSelectedSeason={setSelectedSeason}
                setSelectedEpisode={setSelectedEpisode}
                setSelectedServer={setSelectedServer}
                setSelectedEpisodeName={setSelectedEpisodeName}
                setLoadingEpisode={setLoadingEpisode}
                moveToTop={moveToTop}
                lowerEpisodeList={true}
                drawerAlign={'right'}
              />
            </Box>
          </Fragment>
        :  
          <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}>
            <br/><br/><br/>
          </Box>
        }

        <div className="content-details">
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 5, xl: 5 }} rowSpacing={5}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
              <div className="heading cheading">
                <h6>{type === "tv" ? 'TV Show' : 'Movie'} Details</h6>
              </div>
            </Grid>
            <Grid item xl={2} lg={2} md={0} sm={0} xs={0} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                <center>
                  <img src={infoValue?.image} alt={infoValue?.title} style={{ marginTop: '-30px', marginBottom: '30px' }} />
                </center>
            </Grid>
            <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
              <h3 className='media-title' style={{ marginTop: '-30px', marginLeft: '10px' }}><b>{infoValue?.title}</b></h3>
              <div className='media_props'>
                {type === 'tv' ? 
                  <Grid container alignItems="center" spacing={0.4} style={{ marginLeft: '8px' }}>
                    <Grid item>
                      <h5 style={{ marginRight: 10 }}>
                        <span className='stream-video-quality-span' style={{ backgroundColor: 'transparent', fontWeight: 'bolder', border: '1.5px solid white' }}>{infoValue?.video_quality}</span>
                      </h5>
                    </Grid>
                    <Grid item>
                      <h4>{infoValue?.episodes?.length > 0 ? `${infoValue?.episodes?.length} EPISODES` : `${infoValue?.episodes?.length} EPISODE`}</h4>
                    </Grid>
                  </Grid>
                  : 
                  <Grid container alignItems="center" spacing={0.4} style={{ marginLeft: '8px' }}>
                    <Grid item>
                      <h5 style={{ marginRight: 10 }}>
                        <span className='stream-video-quality-span' style={{ backgroundColor: 'transparent', fontWeight: 'bolder', border: '1.5px solid white' }}>{infoValue?.video_quality}</span>
                      </h5>
                    </Grid>
                    <Grid item>
                      <AccessTimeFilledIcon style={{ fontSize: 16, marginBottom: -2, color: "#54B4D3" }}/>
                    </Grid>
                    <Grid item>
                      <h5>{convertMinutesToHoursAndMinutes(infoValue?.duration.replace('min', ''))}</h5>
                    </Grid>
                  </Grid>}
              </div>
              <MediaDescription text={infoValue?.description}/>
              <table>
                <tbody>
                  <tr>
                    <th>Country:</th>
                    <td><Link className='text-link' style={{ cursor: 'pointer' }} title={`${infoValue?.country}`} to={`/foreign/country_filter?country=${infoValue?.country}`}>{infoValue?.country}</Link></td>
                  </tr>
                  <tr>
                    <th>Genre:</th>
                    <td><SeparateArrayByCircularSpan type={'site_link'} data={infoValue?.genres} link={'/foreign/genre_filter?genre='} /></td>
                  </tr>
                  <tr>
                    <th>Released:</th>
                    <td>{infoValue?.releaseDate == null ? infoValue?.releaseDate : moment(infoValue?.releaseDate).format('MMMM D, YYYY') }</td>
                  </tr>
                  <tr>
                    <th>Production:</th>
                    <td>
                      <a className='text-link' href={`https://www.google.com/search?q=${infoValue?.production}`} alt={infoValue?.production} title={infoValue?.production} rel='noreferrer' target='_blank' style={{ color: '#ccced1', cursor: 'pointer' }}>
                        {infoValue?.production}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>Casts:</th>
                    <td><SeparateArrayByCircularSpan type={'google_link'} data={infoValue?.casts} link={'https://www.google.com/search?q='} /></td>
                  </tr>
                </tbody>
              </table>

            </Grid>

          </Grid>
        </div>
      </div>
      <br/><br/>
      {recommendations.filter((item) => item.type == contentType).length > 0 && 
        <Fragment>
          <div className="heading bheading">
            <h6>You May Also Like</h6>
          </div>
          <Suggestions Suggest={recommendations} Type={type} />
        </Fragment>
      }
      <FloatingButton/>
      <Footer/>
    </div>
  );
}

export default MovieDashboard;
