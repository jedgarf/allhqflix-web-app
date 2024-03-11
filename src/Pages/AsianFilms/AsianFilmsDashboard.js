// Packages
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// CSS
import "./css/AsianFilmsDashboard.css";

// Icons
import CircularProgress from '@mui/material/CircularProgress';

// Components
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import { Player } from "../../Components/Player/Player";
import AsianFilmsSuggestions from "../../Components/AsianFilms/AsianFilmsSuggestions";
import AsianEpisodesDrawer from "../../Components/BottomDrawer/AsianEpisodesDrawer";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import apiConfig from '../../Config/api.config';
import { pageLoadMS } from "../../Config/settings.config";

// Images
import { subtitleLogo, videoQuality } from "../../Config/images.config";

// Utilities
import { moveToTop, SeparateArrayByComma } from "../../Services/Utils";

// Models
import { asianfilms_info, asianfilms_stream_links } from "../../Services/ViewAsianService";

const AsianFilmsDashboard = (props) => {
  
  const { id, type } = useParams();
  const indexId = type + "/" + id;
  const contentType = "asian_films";

  const queryParams = new URLSearchParams(window.location.search);
  const paramEpisode = queryParams.get("episode") != null ? queryParams.get("episode") : null;

  const [isLoading, setIsLoading] = useState(true);
  const [videoQualities, setVideoQualities] = useState([]);
  const [videoSubtitles, setVideoSubtitles] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Picture loading
  const [loadingEpisode, setLoadingEpisode] = useState(true);

  // Default data load
  const [defaultLink, setDefaultLink] = useState("");
  const [defaultSubtitle, setDefaultSubtitle] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [defaultQualityToolTip, setDefaultQualityToolTip] = useState("");
  const [defaultSubtitleToolTip, setDefaultSubtitleToolTip] = useState("");
  
  // selected data
  const [selectedEpisode, setSelectedEpisode] = useState(paramEpisode);
  const [selectedEpisodeName, setSelectedEpisodeName] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [episodeNum, setEpisodeNum] = useState(0);

  const episodesPerPage = 50;
  const [episodesCurrentPage, setEpisodesCurrentPage] = useState(1);

  const set_selectedSeasonEpisode = useCallback((infoValue) => {

    if (selectedEpisode) {
      // setSelectedEpisode(selectedEpisode);
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

    setContentTitle(infoValue?.title);
    setRecommendations(infoValue?.suggestions);

  }, [selectedEpisode]);

  const set_selectedLinkSubtitle = useCallback((resourceValue) => {

    // Default Link
    let defLink = resourceValue?.data?.sources?.slice(0, 1);
    defLink = defLink?.length > 0 ? defLink[0]?.url : "";
    setDefaultLink(apiConfig.asian_drama_video_link_enable_override_cors === true ? `${apiConfig.override_cors}${defLink.replace("https://", "")}` : defLink);

     // Default Subtitle
     let defSubtitle = resourceValue?.data?.subtitles;
     defSubtitle = defSubtitle?.length > 0 ? defSubtitle[0]?.url : "";
     setDefaultSubtitle(defSubtitle);

    // video qualities
    let videoQualitiesContent = [];
    let vidRes = resourceValue?.data?.sources;
    if (vidRes !== undefined) {
      for (let videoQualitiesLength = 0; videoQualitiesLength < vidRes?.length; videoQualitiesLength++) {
        if (videoQualitiesLength === 0) {
          setDefaultQualityToolTip("Source " + (videoQualitiesLength + 1));
          videoQualitiesContent.push({"default": true, "html": "Source " + (videoQualitiesLength + 1), "url": apiConfig.asian_drama_video_LINK_enable_override_cors === true ? apiConfig.override_cors + vidRes[videoQualitiesLength]?.url : vidRes[videoQualitiesLength]?.url});
        } else {
          videoQualitiesContent.push({"default": false, "html": "Source " + (videoQualitiesLength + 1), "url": apiConfig.asian_drama_video_link_enable_override_cors === true ? apiConfig.override_cors + vidRes[videoQualitiesLength]?.url : vidRes[videoQualitiesLength]?.url});
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

  }, []);

  // ---------------------------------------------------------------------------------------------------------------------------------------------------

  // info
  let infoData = useQuery(['asianfilms_info', { mediaId: indexId }], asianfilms_info, {
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "tracked",
      enabled: indexId !== null,
  });
  let infoValue = infoData?.data?.data;

  let episodeIdVar = selectedEpisode;

  if (infoData.isSuccess) {
      episodeIdVar = selectedEpisode || (infoValue?.episodes?.length > 0 ? infoValue.episodes[0].id : undefined);
  }

  // movie link
  let resourceData = useQuery(['asianfilms_stream_links', { mediaId: indexId, episodeId: episodeIdVar}], asianfilms_stream_links, {
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "tracked",
      enabled: episodeIdVar !== null,
  });
  
  let resourceValue = undefined;

  if (resourceData.isSuccess) {
      resourceValue = resourceData?.data;
  }

  const previousEpisode = () => {
    const selectedItemIndex = infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item.id == selectedEpisode));
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
    const selectedItemIndex = infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item.id == selectedEpisode));
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
  if (infoValue?.episodes?.length > 1) {

    // Previous Episode
    const selectedItemPrevIndex = infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item.id == selectedEpisode));
    if (selectedItemPrevIndex > 0 && selectedItemPrevIndex < infoValue?.episodes?.length) {
      additionalControls.push({
        position: 'right',
        html: `PREV.`,
        tooltip: 'PREVIOUS EPISODE',
        style: {
            marginRight: '10px',
            color: '#DC4C64'
        },
        click: function (item) {
          previousEpisode();
        },
      });
    }

    // Next Episode
    const selectedItemNextIndex = infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item.id == selectedEpisode));
    if (selectedItemNextIndex >= 0 && (selectedItemNextIndex + 1) < infoValue?.episodes?.length) {
      additionalControls.push({
        position: 'right',
        html: `NEXT`,
        tooltip: 'NEXT EPISODE',
        style: {
            marginRight: '10px',
            color: '#DC4C64'
        },
        click: function (item) {
          nextEpisode();
        },
      });
    }
  }

  useEffect(() => {

    if (infoData.isSuccess) {
      document.title = 'AllHQFlix - ' + contentTitle;
      set_selectedSeasonEpisode(infoValue);
    }

    if (resourceData.isSuccess) {
      set_selectedLinkSubtitle(resourceValue); 
    }

    // determine current episode page
    let howMany = episodeNum / episodesPerPage;
    let currentPage = Math.round(howMany); // round of
    if (howMany > Math.round(howMany)) {
      currentPage++;
    }
    setEpisodesCurrentPage(currentPage);

    setTimeout(() => {
      setIsLoading(false);
    }, pageLoadMS);

  }, [contentTitle, infoData.isSuccess, infoValue, resourceData.isSuccess, resourceValue, episodeNum, set_selectedSeasonEpisode, set_selectedLinkSubtitle]);

  return (
    isLoading ? 
      <LoadingPage/>
    : 
    <div className="movie_dashboard">
      <ReactQueryTools/>
      <SideBar Type={contentType} subType={null} transparentBg={false} isStream={true} />
      <div className="movie_cover" style={{backgroundImage: `linear-gradient(rgba(0, 0, 10, 1),rgba(0, 0, 10, 0.5)) , url("${infoValue?.banner}")`}}>
        <div className="heading cheading movie-stream-title">
          <h6></h6>
        </div>
        {!loadingEpisode ? (
          <>
          <Player
            className="movie_player"
            defaultlink={defaultLink}
            infotitle={totalEpisodes > 1 ? `${contentTitle} - Episode ${episodeNum}` : `${contentTitle}`}
            infocover={infoValue?.banner}
            episodeNum={episodeNum}
            totalEpisodes={totalEpisodes}
            nextEpisode={nextEpisode}
            seekTime={0}
            option={{
              enableAds: true,
              hotkey: true,
              setting: true,
              settings: [
              {
                  html: 'Sources',
                  width: 300,
                  tooltip: defaultQualityToolTip || "No selected",
                  icon: `<img width="22" heigth="22" src="${videoQuality}">`,
                  selector: videoQualities,
                  onSelect: function (item, $dom, event) {
                      console.info(item, $dom, event);
                      this.switchQuality(item.url, item.html);
                      return item.html;
                  },
              },
              {
                width: 300,
                html: 'Subtitles',
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
                    this.subtitle.switch(item.url, {
                        name: item.html,
                    });
                    return item.html;
                },
              },
            ],
            controls: additionalControls,
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

      <div className="asian_tv_info">
        
        {infoValue?.episodes?.length > 1 ?
          <>
            <Box className="episodesBtn" display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
              <AsianEpisodesDrawer
                details={infoValue} 
                subtitles={resourceValue?.data?.subtitles}
                mediaId={indexId}
                episodeId={selectedEpisode}
                setSelectedEpisode={setSelectedEpisode}
                setLoadingEpisode={setLoadingEpisode}
                itemsPerPage={episodesPerPage}
                episodesCurrentPage={episodesCurrentPage}
                moveToTop={moveToTop}
                drawerAlign={'bottom'}
              />
            </Box>
            <Box className="episodesBtn" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
              <AsianEpisodesDrawer
                details={infoValue} 
                subtitles={resourceValue?.data?.subtitles} 
                mediaId={indexId}
                episodeId={selectedEpisode}
                setSelectedEpisode={setSelectedEpisode}
                setLoadingEpisode={setLoadingEpisode}
                itemsPerPage={episodesPerPage}
                episodesCurrentPage={episodesCurrentPage}
                moveToTop={moveToTop}
                drawerAlign={'right'}
              />
            </Box>
          </>
        : 
        ''}
        
        <div className={infoValue?.episodes?.length > 1 ? 'content-details' : 'content-details asian-movie'}>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 5, xl: 5 }} rowSpacing={5}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
            <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'none' }}>
              <br/>
            </Box>
              <div className="heading cheading">
                <h6>Details</h6>
              </div>
            </Grid>
            <Grid item xl={2} lg={2} md={0} sm={0} xs={0} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                <center>
                  <img src={infoValue?.banner} alt={infoValue?.title} style={{ marginTop: '-30px', marginBottom: '30px' }} />
                </center>
            </Grid>
            <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
              <h3 className='media-title' style={{ marginTop: '-30px', marginLeft: '10px' }}><b>{contentTitle}</b></h3>
              <div className="media_props">
              <Grid container spacing={0.4} style={{ marginLeft: '5px' }}>
                <Grid item>
                  <h5 style={{ marginRight: 10 }}>
                    <span className='stream-video-quality-span' style={{ color: 'rgba(129,181,223,255)', backgroundColor: 'transparent', fontWeight: 'bolder', border: '1.5px solid' }}>
                      Original Dub
                    </span>
                  </h5>
                </Grid>
                <Grid item>
                  <h5 style={{ marginRight: 10 }}>
                    <span className='stream-video-quality-span' style={{ color: 'rgba(129,181,223,255)', backgroundColor: 'transparent', fontWeight: 'bolder', border: '1.5px solid' }}>
                      English Subtitle
                    </span>
                  </h5>
                </Grid>
              </Grid>
              </div>
              <p className="movie_description" dangerouslySetInnerHTML={{ __html: infoValue?.description.trim() ? infoValue?.description.trim() : '-' }}/>
              <table>
                <tbody>
                  <tr>
                    <th>Country:</th>
                    <td><Link className='text-link' to={`/asian_films/country_filter?country=${infoValue?.country}`}>{infoValue?.country}</Link></td>
                  </tr>
                  <tr>
                    <th>Other Names:</th>
                    <td><SeparateArrayByComma type={'google_link'} data={infoValue?.otherNames} link={'https://www.google.com/search?q='} /></td>
                  </tr>
                  <tr>
                    <th>Genre:</th>
                    <td><SeparateArrayByComma type={'site_link'} data={infoValue?.genre} link={'/asian_films/genre_filter?genre='} /></td>
                  </tr>
                  <tr>
                    <th>Director:</th>
                    <td>{ infoValue?.director ? (<a className='text-link' href={`https://www.google.com/search?q=${infoValue?.director}`} target="__blank">{infoValue?.director}</a>) : "-" }</td>
                  </tr>
                  <tr>
                    <th>Released:</th>
                    <td>{infoValue?.releaseDate ? infoValue?.releaseDate : '-'}</td>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <td>{infoValue?.status ? infoValue?.status : '-'}</td>
                  </tr>
                </tbody>
              </table>
            </Grid>

          </Grid>
        </div>
      </div>
      <br/><br/>
      <div className="heading bheading">
        <h6>You May Also Like</h6>
      </div>
      <AsianFilmsSuggestions infoValue={infoValue} Type={type} />
      <FloatingButton/>
      <Footer/>
    </div>
  );
}

export default AsianFilmsDashboard;
