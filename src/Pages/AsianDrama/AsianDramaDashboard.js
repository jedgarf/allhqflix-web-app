// Packages
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

// CSS
import "./css/AsianDramaDashboard.css";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from '@mui/icons-material/Star';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import StorageIcon from '@mui/icons-material/Storage';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CircularProgress from '@mui/material/CircularProgress';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";

import { Player } from "../../Components/Player/Player";
import AsianDramaSeasons from "../../Components/AsianDrama/AsianDramaSeasons";

// Models
import apiConfig from '../../Config/api.config';
import { moveToTop } from "../../Services/Utils";
import { asiandrama_info, asiandrama_stream_links } from "../../Services/DramaCoolService";

const AsianDramaDashboard = (props) => {
  
  const { id, type } = useParams();
  const indexId = type + "/" + id;
  const contentType = "asian_drama";

  const queryParams = new URLSearchParams(window.location.search);
  const paramEpisodeId = queryParams.get("episodeId");

  const [videoQualities, setVideoQualities] = useState([]);
  const [videoSubtitles, setVideoSubtitles] = useState([]);

  // loading
  const [loadingEpisode, setLoadingEpisode] = useState(true);

  // Default data load
  const [defaultLink, setDefaultLink] = useState("");
  const [defaultSubtitle, setDefaultSubtitle] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [defaultQualityToolTip, setDefaultQualityToolTip] = useState("");
  const [defaultSubtitleToolTip, setDefaultSubtitleToolTip] = useState("");
  
  // selected data
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [selectedEpisodeName, setSelectedEpisodeName] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [episodeNum, setEpisodeNum] = useState(0);

  const OtherNames = () => {
    return (
      <div>
      {infoValue?.otherNames?.map((item, i) => {
        return (
          <span key={i}>
          { (i === 0 ? " " : ", ") + item}
          </span>
        );
      })}
      </div>
    );
  };

  const playVideo = () => {
    setLoadingEpisode(false);
  }

  const getFileExtention = (filename) => {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }

  const set_selectedSeasonEpisode = useCallback((infoValue) => {

    if (selectedEpisode !== null) {
      setSelectedEpisode(selectedEpisode);
      setTotalEpisodes(infoValue?.episodes.length);
      for (let getSelEpisodeLength = 0; getSelEpisodeLength < infoValue?.episodes?.length; getSelEpisodeLength++) {
        if (infoValue?.episodes[getSelEpisodeLength]?.id === selectedEpisode) {
          setEpisodeNum(getSelEpisodeLength + 1);
          setSelectedEpisodeName("EP " + (getSelEpisodeLength + 1) + ": " + infoValue?.episodes[getSelEpisodeLength]?.title);
          break;
        }
      }
    } else {
      setSelectedEpisode(infoValue?.episodes[0]?.id);
      setSelectedEpisodeName("EP 1: " + infoValue?.episodes[0]?.title);
    }

    // console.log("title", Object.keys(results?.episodes[0].title));
    setContentTitle(infoValue?.title);

  }, [selectedEpisode]);

  const set_selectedLinkSubtitle = useCallback((resourceValue) => {

    // Default Link
    let defLink = resourceValue?.data?.sources?.slice(0, 1);
    defLink = defLink?.length > 0 ? defLink[0]?.url : "";
    setDefaultLink(apiConfig.asian_drama_video_link_enable_override_cors === true ? apiConfig.override_cors + defLink : defLink);
    console.log("resourceValue", resourceValue);

     // Default Subtitle
     let defSubtitle = resourceValue?.data?.subtitles;
     defSubtitle = defSubtitle?.length > 0 ? defSubtitle[0]?.url : "";
     setDefaultSubtitle(defSubtitle);
     console.log("defSubtitle", defaultSubtitle);

    // video qualities
    let videoQualitiesContent = [];
    let vidRes = resourceValue?.data?.sources;
    if (vidRes !== undefined) {
      for (let videoQualitiesLength = 0; videoQualitiesLength < vidRes?.length; videoQualitiesLength++) {
        if (videoQualitiesLength === 0) {
          setDefaultQualityToolTip("video_quality_" + (videoQualitiesLength + 1));
          videoQualitiesContent.push({"default": true, "html": "video_quality_" + (videoQualitiesLength + 1), "url": apiConfig.asian_drama_video_link_enable_override_cors === true ? apiConfig.override_cors + vidRes[videoQualitiesLength]?.url : vidRes[videoQualitiesLength]?.url});
        } else {
          videoQualitiesContent.push({"default": false, "html": "video_quality_" + (videoQualitiesLength + 1), "url": apiConfig.asian_drama_video_link_enable_override_cors === true ? apiConfig.override_cors + vidRes[videoQualitiesLength]?.url : vidRes[videoQualitiesLength]?.url});
        }
      } 
    }
    setVideoQualities(videoQualitiesContent);

    // video subtitles
    let videoSubtitlesContent = [];
    let vidSub = resourceValue?.data?.subtitles;
    if (vidSub !== undefined) {
      for (let videoSubtitlesLength = 0; videoSubtitlesLength < vidSub?.length; videoSubtitlesLength++) {
        if (videoSubtitlesLength === 0) {
          setDefaultSubtitleToolTip(vidSub[videoSubtitlesLength]?.lang);
          videoSubtitlesContent.push({"default": true, "html": vidSub[videoSubtitlesLength]?.lang, "url": vidSub[videoSubtitlesLength]?.url});
        } else {
          videoSubtitlesContent.push({"default": false, "html": vidSub[videoSubtitlesLength]?.lang, "url": vidSub[videoSubtitlesLength]?.url});
        }
      }
    }
    setVideoSubtitles(videoSubtitlesContent);
    setLoadingEpisode(false);

  }, [defaultSubtitle]);

  // ---------------------------------------------------------------------------------------------------------------------------------------------------

  // info
  let isInfoData = indexId !== undefined || indexId !== null;
  let infoData = useQuery(['asiandrama_info', { mediaId: indexId }], asiandrama_info, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    enabled: isInfoData
  });
  let infoValue = infoData?.data?.data;

  let episodeIdVar = selectedEpisode;

  if (infoData.isSuccess) {
      episodeIdVar = selectedEpisode || (infoValue?.episodes?.length > 0 ? infoValue.episodes[0].id : undefined);
  }

  // movie link
  let isResourceData = (episodeIdVar !== undefined || episodeIdVar !== null);
  let resourceData = useQuery(['asiandrama_stream_links', {episodeId: episodeIdVar}], asiandrama_stream_links, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    enabled: isResourceData,
    retryOnMount: false,
  });
  
  let resourceValue = undefined;

  if (resourceData.isSuccess) {
    resourceValue = resourceData?.data;
  }

  useEffect(() => {

    if (infoData.isSuccess) {
      document.title = 'AllHQFlix - ' + contentTitle;
      set_selectedSeasonEpisode(infoValue);
    }

    if (resourceData.isSuccess) {
      set_selectedLinkSubtitle(resourceValue); 
    }

  }, [contentTitle, infoData.isSuccess, infoValue, resourceData.isSuccess, resourceValue, set_selectedSeasonEpisode, set_selectedLinkSubtitle]);

  // console.log("selectedEpisode", selectedEpisode);
  // console.log("contentTitle", contentTitle);

  return (
    <>
      <div className="movie_dashboard">
      {process.env.REACT_APP_NODE_ENV === 'Development' ? <div className="top"><ReactQueryDevtools initialIsOpen={false} /></div> : <div className="top"></div> }
        <SideBar Type={contentType} subType={null}/>
        {<>
          <Grid container columnSpacing={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }} rowSpacing={3}>
            
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <div className="tv_cover" style={{backgroundImage: `linear-gradient(rgba(15, 22, 34, 1),rgba(15, 22, 34, 0.5)) , url("${infoValue?.image}")`}}>
            <div className="heading cheading movie-stream-title">
              <h6></h6>
            </div>
            {!loadingEpisode ? (
              <>
              <Player
                className="movie_player"
                defaultlink={defaultLink}
                infotitle={contentTitle}
                infocover={infoValue?.image}
                episodeNum={episodeNum}
                totalEpisodes={totalEpisodes}
                option={{
                  enableAds: true,
                  hotkey: true,
                  setting: true,
                  settings: [
                  {
                      html: 'Quality',
                      width: 150,
                      tooltip: defaultQualityToolTip,
                      icon: '<img width="22" heigth="22" src="/images/video_quality.png">',
                      selector: videoQualities,
                      onSelect: function (item, $dom, event) {
                          console.info(item, $dom, event);
                          this.switchQuality(item.url, item.html);
                          return item.html;
                      },
                  },
                  {
                    width: 200,
                    html: 'Subtitle',
                    tooltip: defaultSubtitleToolTip,
                    icon: '<img width="22" heigth="22" src="/images/subtitle.png">',
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
                        this.subtitle.switch(item.url, {
                            name: item.html,
                        });
                        return item.html;
                    },
                  },
                ],
                }}
                getInstance={(art) => console.log("getInstance", art)}
              />
            </>
            ) : (
              <div>
                <Box className="playButton" display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress sx={{ fontSize: 100 }} />
                </Box>
              </div>
            )}
            </div>
            </Grid>
            
            <Grid item xl={4} lg={4} md={4} sm={0} xs={0}>
              <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }} style={{ marginLeft: '-5%' }}>
                <br/><br/><br/><br/>
                <AsianDramaSeasons 
                details={infoValue} 
                mediaId={indexId}
                episodeId={selectedEpisode}
                setSelectedEpisode={setSelectedEpisode}
                setLoadingEpisode={setLoadingEpisode}
                moveToTop={moveToTop}
                />
              </Box>
            </Grid>

          </Grid>


          {/* {selectedEpisodeName !== "" ? (
            <div className="current_playing">
              <Typography variant="subtitle1" style={{ verticalAlign: 'middle', display: 'inline-flex' }}>
                <PlaylistPlayIcon style={{ marginRight: '8px', color: "#54B4D3", fontSize: 30 }}/> {selectedEpisodeName}
              </Typography>
            </div>
          ) : (
            ""
          )} */}

          <div className="tv_info">

            {infoValue?.episodes?.length > 1 ?
              <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
                <AsianDramaSeasons 
                  details={infoValue} 
                  mediaId={indexId}
                  episodeId={selectedEpisode}
                  setSelectedEpisode={setSelectedEpisode}
                  setLoadingEpisode={setLoadingEpisode}
                  moveToTop={moveToTop}
                />
              </Box>
            : 
            ""}
            <div className="content-details">
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 5, xl: 5 }} rowSpacing={5}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                  <div className="heading cheading">
                    <h6>Details</h6>
                  </div>
                </Grid>
                <Grid item xl={2} lg={2} md={0} sm={0} xs={0} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                    <center>
                      <img src={infoValue?.image} alt={infoValue?.title} style={{ marginTop: '-30px', marginBottom: '30px' }} />
                    </center>
                </Grid>
                <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                  <h3 className='media-title' style={{ marginTop: '-30px', marginLeft: '10px' }}><b>{contentTitle}</b></h3><br/>
                  <p className="movie_description">{infoValue?.description}</p><br/>
                  <table>
                    <tbody>
                      {/* <tr>
                        <th>Country:</th>
                        <td>{infoValue?.country}</td>
                      </tr> */}
                      <tr>
                        <th>Other Names:</th>
                        <td><OtherNames /></td>
                      </tr>
                      {/* <tr>
                        <th>Genre:</th>
                        <td><Genre /></td>
                      </tr>
                      <tr>
                        <th>Director:</th>
                        <td>{infoValue?.director}</td>
                      </tr> */}
                      <tr>
                        <th>Released:</th>
                        <td>{infoValue?.releaseDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            </div>
          </div>
          <Footer/>
        </>}
      </div>
    </>
  );
}

export default AsianDramaDashboard;
