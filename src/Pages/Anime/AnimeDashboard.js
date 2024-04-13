// Packages
import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from "react-router-dom";

// Material UI Components
import { Grid, Box, Container, Button } from '@mui/material';

// React Slick
import Slider from "react-slick";

// CSS
import "./css/AnimeDashboard.css";
// import "../InternationalFilms/css/MovieDashboard.css";

// Icons
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ReplayIcon from '@mui/icons-material/Replay';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StarIcon from '@mui/icons-material/Star';

// Components
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import InitPlayerLoading from "../../Components/InitPlayerLoading/InitPlayerLoading";
import { Player, artPlayerInstance } from "../../Components/Player/Player";
import AnimeSuggestions from "../../Components/Anime/AnimeSuggestions";
import AnimeEpisodesDrawer from "../../Components/BottomDrawer/AnimeEpisodesDrawer";
import OnePieceEpisodesDrawer from "../../Components/BottomDrawer/OnePieceEpisodesDrawer";
import AnimeCharacterCard from "../../Components/Anime/AnimeCharacterCard";
import MediaDescription from "../../Components/MediaDescription/MediaDescription";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";
import { AnimeDetailsSkeleton } from "../../Components/MediaDetailsSkeleton/MediaDetailsSkeleton";
import SnackBar from "../../Components/SnackBar/SnackBar";

// Config
import apiConfig from '../../Config/api.config';
import { pageLoadMS, foreign_country, anime_character_carousel_settings } from "../../Config/settings.config";

import { isMobile } from '../../Services/Utils';

// Helpers
import { getCookie } from "../../Helpers/Cookies";


// Images
import { subtitleLogo, videoQuality, homeBackground } from "../../Config/images.config";

// Services
import { moveToTop, SeparateArrayByComma, SeparateArrayByCircularSpan, convertMinutesToHoursAndMinutes, getFileExtention, capitalizeString } from "../../Services/Utils";
import { anime_info, anime_stream_links } from "../../Services/AnimeService";
import CallableReactQuery from "../../Services/CallableReactQuery";

const AnimeDashboard = (props) => {
  
  const queryClient = useQueryClient();
  const { id, type } = useParams();
  const indexId = id;
  // Static Data
  const arcs = require('../../Services/Data/onePieceArcs.json').arcs;
  const animeSubtitles = [{"default": true, "html": "US English", "url": "add.vtt"}];

  const callableReactQuery = CallableReactQuery();

  const queryParams = new URLSearchParams(window.location.search);
  const paramEpisode = queryParams.get("episode") != null ? queryParams.get("episode") : null;
  const paramDub = queryParams.get("dub") != null ? queryParams.get("dub") == 'true' : false;

  const [selectedArc, setSelectedArc] = useState("");
  const [videoQualities, setVideoQualities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [downloadLinks, setDownloadLinks] = useState([]);

  // alert variable
  const [snackBarType, setSnackBarType] = useState("info");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  // Picture loading
  const [loadingEpisode, setLoadingEpisode] = useState(true);

  // Default data load
  const [defaultLink, setDefaultLink] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [defaultQualityToolTip, setDefaultQualityToolTip] = useState("");
  
  // selected data
  const [selectedEpisode, setSelectedEpisode] = useState(paramEpisode);
  const [selectedEpisodeName, setSelectedEpisodeName] = useState(null);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [episodeNum, setEpisodeNum] = useState(0);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);

  const episodesPerPage = 50;
  const [episodesCurrentPage, setEpisodesCurrentPage] = useState(1);

  // -------------------------------------------------------------------------------------------------------------------------------

  const handleSnackBarOpen = (event, reason) => {
    setSnackBarType("");
    setSnackBarOpen(false);
  };
  const set_selectedSeasonEpisode = useCallback((infoValue) => {

    if (selectedEpisode) {
      // setSelectedEpisode(selectedEpisode);
      setTotalEpisodes(infoValue?.episodes?.length);
      for (let getSelEpisodeLength = 0; getSelEpisodeLength < infoValue?.episodes.length; getSelEpisodeLength++) {
        if (infoValue?.episodes[getSelEpisodeLength]?.id === selectedEpisode) {
          setEpisodeNum(getSelEpisodeLength + 1);
          setSelectedEpisodeName("EP " + (getSelEpisodeLength + 1) + ": " + infoValue?.episodes[getSelEpisodeLength].title)

          // Define Arc Name
          if (indexId == 21) {
            let currentEpisodeNumber = infoValue?.episodes[getSelEpisodeLength].number;
            let currentArc = arcs.filter(item => item.start_episode <= currentEpisodeNumber && item.end_episode >= currentEpisodeNumber)[0];
            setSelectedArc(`${currentArc?.name ? currentArc?.name.toUpperCase() : currentArc?.name}`);
          }

          break;
        }
      }
    } else {
      setSelectedEpisode(infoValue?.episodes[0]?.id);
      setSelectedEpisodeName("EP 1: " + infoValue?.episodes[0].title);

      // Define Arc Name
      if (indexId == 21) {
        let currentArc = arcs[0];
        setSelectedArc(`${currentArc?.name ? currentArc.name.toUpperCase() : currentArc?.name}`);
      }

    }

    setContentTitle(infoValue?.title?.english || infoValue?.title?.userPreferred || infoValue?.title?.romaji || infoValue?.title?.native);
    setRecommendations(infoValue?.relations?.length > 0 ? infoValue?.relations : infoValue?.recommendations);

  }, [selectedEpisode, indexId, arcs]);

  const set_selectedLinkSubtitle = useCallback((resourceValue) => {

    // Default Link
    var defLink = resourceValue?.data?.sources?.filter( (result) => { return result.quality === "default"; });
    defLink = defLink?.length > 0 ? defLink[0]?.url : "";
    setDefaultLink(apiConfig.anime_video_link_enable_override_cors ? `${apiConfig.override_cors}/${defLink.replace("https://", "")}` : defLink);

    // video qualities
    let videoQualitiesContent = [];
    let vidRes = resourceValue?.data?.sources;
    if (vidRes !== undefined) {
      for (let videoQualitiesLength = 0; videoQualitiesLength < vidRes?.length; videoQualitiesLength++) {
        if (vidRes[videoQualitiesLength].quality === "default") {
          setDefaultQualityToolTip("Auto");
          videoQualitiesContent.push({"default": true, "html": "Auto", "url": apiConfig.anime_video_link_enable_override_cors === true ? apiConfig.override_cors + vidRes[videoQualitiesLength]?.url : vidRes[videoQualitiesLength]?.url});
        } else if (vidRes[videoQualitiesLength].quality === "backup") {
          // nothing happened
        } else {
          videoQualitiesContent.push({"default": false, "html": vidRes[videoQualitiesLength]?.quality.toLowerCase(), "url": apiConfig.anime_video_link_enable_override_cors === true ? apiConfig.override_cors + vidRes[videoQualitiesLength]?.url : vidRes[videoQualitiesLength]?.url});
        }
      } 
    }

    setVideoQualities(videoQualitiesContent);

    setLoadingEpisode(false);

  }, []);

// ----------------------------------------------------------------------------------------------------------------------------

  // info
  let infoData = useQuery(['anime_info', { mediaId: indexId, dub: paramDub }], anime_info, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    enabled: indexId !== null,
  });
  let infoValue = infoData?.data?.data;

  let episodeIdVar = selectedEpisode;

  if (infoData.isSuccess) {
      episodeIdVar = selectedEpisode || (infoValue?.episodes?.length > 0 ? infoValue.episodes[0]?.id : undefined);
  }

  // movie link
  let resourceData = useQuery(['anime_stream_links', {episodeId: episodeIdVar}], anime_stream_links, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    retry: 2, // Number of retries
    enabled: episodeIdVar !== null,
    onSuccess: (res) => {
      // callableReactQuery.getAnimeDownloads(res?.data?.download);
      // setDownloadLinks(callableReactQuery.data);
    }
  });
  
  let resourceValue = undefined;

  if (resourceData.isSuccess) {
    resourceValue = resourceData?.data;
  }

  const refreshSourceLink = () => {
    queryClient.resetQueries(['anime_stream_links', {episodeId: episodeIdVar}]);
    queryClient.fetchQuery(['anime_stream_links', {episodeId: episodeIdVar}]);
  }

  const previousEpisode = () => {
    if (selectedEpisodeIndex > 0 && selectedEpisodeIndex < infoValue?.episodes?.length) {
      const getTargetEpisode = infoValue?.episodes[selectedEpisodeIndex-1];
      setLoadingEpisode(true);
      setSelectedEpisode(getTargetEpisode?.id); 
      moveToTop();
      return true;
    } else {
      return false;
    }
  }

  const nextEpisode = () => {
    if (selectedEpisodeIndex >= 0 && (selectedEpisodeIndex + 1) < infoValue?.episodes?.length) {
      const getTargetEpisode = infoValue?.episodes[selectedEpisodeIndex+1];
      setLoadingEpisode(true);
      setSelectedEpisode(getTargetEpisode?.id); 
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
    if (selectedEpisodeIndex > 0 && selectedEpisodeIndex < infoValue?.episodes?.length) {
      additionalControls.push({
        position: 'right',
        html: isMobile ? `PREV.` : `&#8678;`,
        tooltip: 'Previous Episode',
        style: {
          fontSize: isMobile ? '15px' : '43px',
          marginTop: isMobile ? 0 : '-8px',
          marginRight: isMobile ? '8px' : 0
        },
        click: function (item) {
          previousEpisode();
        },
      });
    }

    // Next Episode
    if (selectedEpisodeIndex >= 0 && (selectedEpisodeIndex + 1) < infoValue?.episodes?.length) {
      additionalControls.push({
        position: 'right',
        html: isMobile ? `NEXT` : `&#8680;`,
        tooltip: 'Next Episode',
        style: {
          fontSize: isMobile ? '15px' : '43px',
          marginTop: isMobile ? 0 : '-8px',
          marginRight: isMobile ? '8px' : 0
        },
        click: function (item) {
          nextEpisode();
        },
      });
    }
  }

  useEffect(() => {

    if (infoData.isSuccess) {
      document.title = 'AllHQFlix - ' + contentTitle +  `${infoValue?.subOrDub === 'dub' ? ' (English Dub)' : ''}`;
      setSelectedEpisodeIndex(infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item?.id == selectedEpisode)));
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

    // if (callableReactQuery.isSuccess) {
    //   console.log('downloadLinks', downloadLinks);
    // }
    // , callableReactQuery.isSuccess, downloadLinks

    // ------------------------------------------------------------------------------------

    const handleBeforeUnload = (event) => {
      // Cancel the event to prevent the browser from unloading the page immediately
      event.preventDefault();
      // Standard-compliant browsers use `returnValue`
      event.returnValue = '';
      // Chrome requires `returnValue` to be set
      return '';
    };

    const handleUnload = (event) => {
      // Optionally perform cleanup actions here before leaving the page
      // For example, stopping video/audio playback
      try {
        artPlayerInstance.destroy();
      } catch (err) {
        console.error(err);
      }
    };

    // Add event listeners when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };

  }, [contentTitle, infoData.isSuccess, resourceData.isSuccess, infoValue, resourceValue, episodeNum, set_selectedSeasonEpisode, set_selectedLinkSubtitle, selectedEpisode]);

  return (
    <div className="movie_dashboard">
      <ReactQueryTools/>
      <SideBar Type={type} subType={null} transparentBg={false} isStream={true} />
      <SnackBar severity={snackBarType} handleSnackBarOpen={handleSnackBarOpen} status={snackBarOpen} snackBarMessage={snackBarMessage} />
      <div className="movie_cover" style={{backgroundImage: `linear-gradient(rgba(10, 10, 10, 1),rgba(10, 10, 10, 0.5), rgba(10, 10, 10, 0.2)), url("${infoValue?.cover}"), url("${homeBackground}")`}}>
        <div className="heading cheading movie-stream-title">
          <h6> </h6>
        </div>
        {infoData.isSuccess && resourceData.isSuccess && defaultLink !== "" && videoQualities.length > 0 && !loadingEpisode ? 
          <Player
            className="movie_player"
            details={infoValue}
            episodes={infoValue?.episodes}
            defaultlink={defaultLink}
            infotitle={totalEpisodes > 1 ? `${contentTitle} - Episode ${episodeNum} ${infoValue?.subOrDub === 'dub' ? '(English Dub)' : ''}` : `${contentTitle} ${infoValue?.subOrDub === 'dub' ? '(English Dub)' : ''}`}
            infocover={infoValue?.cover}
            episodeNum={episodeNum}
            totalEpisodes={totalEpisodes}
            nextEpisode={nextEpisode}
            seekTime={getCookie(encodeURIComponent(indexId)) && JSON.parse(getCookie(encodeURIComponent(indexId))).dub == paramDub && JSON.parse(getCookie(encodeURIComponent(indexId))).episodeId === selectedEpisode ? JSON.parse(getCookie(encodeURIComponent(indexId))).time : 0}
            mediaId={indexId}
            episodeId={selectedEpisode}
            server={null}
            option={{
              enableAds: true,
              hotkey: true,
              setting: true,
              settings: [
                {
                    html: 'Video Resolutions',
                    width: 300,
                    tooltip: defaultQualityToolTip,
                    icon: `<img width="22" heigth="22" src="${videoQuality}">`,
                    selector: videoQualities,
                    onSelect: function (item, dom, event) {
                      // console.log('event', event);
                      // console.log('current subtitle', this.quality);
                      if (videoQualities?.length > 1) this.switchQuality(item.url, item.html);
                      return item.html;
                    },
                },
                {
                  html: 'Subtitles',
                  width: 300,
                  tooltip: animeSubtitles?.find(item => item.default === true)?.html,
                  icon: `<img width="22" height="22" src="${subtitleLogo}">`,
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
                  ...animeSubtitles,
                  ],
                  onSelect: function (item) {
                    if (item.html === 'Add Subtitle') alert('Under Development.');
                    if (animeSubtitles?.length > 1) this.subtitle.switch(item.url, { name: item.html }); 
                    return item.html;
                  },
                },
              ],
              // subtitle: {
              //   url: animeSubtitles?.find(item => item.default === true)?.html,
              //   type: getFileExtention(animeSubtitles?.find(item => item.default === true)?.url),
              //   encoding: 'utf-8',
              // },
              controls: additionalControls,
              // quality: videoQualities,
            }}
          />
        : 
          resourceData.isError ? 
            <Box style={{ textAlign: 'center', paddingTop: '70px' }}>
              <h3>Loading episode error, please try again later.</h3>
              <div className="video-error-btn" style={{ marginTop: '10px' }}>
                <Button variant="contained" size="small" style={{ marginInline: '3px', marginBottom: '5px' }} onClick={() => refreshSourceLink()} startIcon={<ReplayIcon/>}>Reload</Button>
                <br/>
                {(selectedEpisodeIndex > 0 && selectedEpisodeIndex < infoValue?.episodes?.length) && 
                  <Button variant="contained" size="small" style={{ marginInline: '3px' }} onClick={() => previousEpisode()} startIcon={<SkipPreviousIcon/>}>Previous Episode</Button>
                }
                {(selectedEpisodeIndex >= 0 && (selectedEpisodeIndex + 1) < infoValue?.episodes?.length) && 
                  <Button variant="contained" size="small" style={{ marginInline: '3px' }} onClick={() => nextEpisode()} startIcon={<SkipNextIcon/>}>Next Episode</Button>
                }
              </div>
            </Box>
          :
            <InitPlayerLoading />
        }
      </div>

      <div className="anime_info">

        <Container maxWidth={'xxl'}>
          <Box className="episodesBtn" display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
            {indexId == '21' ?
              <OnePieceEpisodesDrawer
                details={infoValue}
                downloadUrl={resourceValue?.data?.download}
                mediaId={indexId}
                episodeId={selectedEpisode}
                setSelectedEpisode={setSelectedEpisode}
                setLoadingEpisode={setLoadingEpisode}
                itemsPerPage={episodesPerPage}
                episodesCurrentPage={episodesCurrentPage}
                moveToTop={moveToTop}
                drawerAlign={'bottom'}
              />
            : 
            <AnimeEpisodesDrawer
                details={infoValue}
                downloadUrl={resourceValue?.data?.download}
                mediaId={indexId}
                episodeId={selectedEpisode}
                setSelectedEpisode={setSelectedEpisode}
                setLoadingEpisode={setLoadingEpisode}
                itemsPerPage={episodesPerPage}
                episodesCurrentPage={episodesCurrentPage}
                moveToTop={moveToTop}
                drawerAlign={'bottom'}
              />}
          </Box>
          <Box className="episodesBtn" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
            {indexId == '21' ?
              <OnePieceEpisodesDrawer
                details={infoValue}
                downloadUrl={resourceValue?.data?.download}
                mediaId={indexId}
                episodeId={selectedEpisode}
                setSelectedEpisode={setSelectedEpisode}
                setLoadingEpisode={setLoadingEpisode}
                itemsPerPage={episodesPerPage}
                episodesCurrentPage={episodesCurrentPage}
                moveToTop={moveToTop}
                drawerAlign={'right'}
              />
            : 
              <AnimeEpisodesDrawer
                details={infoValue}
                downloadUrl={resourceValue?.data?.download}
                mediaId={indexId}
                episodeId={selectedEpisode}
                setSelectedEpisode={setSelectedEpisode}
                setLoadingEpisode={setLoadingEpisode}
                itemsPerPage={episodesPerPage}
                episodesCurrentPage={episodesCurrentPage}
                moveToTop={moveToTop}
                drawerAlign={'right'}
              />}
          </Box>
        </Container>

        <Container maxWidth={'xxl'} className={infoValue?.episodes?.length > 1 ? 'content-details' : 'content-details asian-movie'}>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 5, xl: 5 }} rowSpacing={5}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
              {infoValue?.episodes?.length > 1 ? 
                ''
              :
              <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'none' }}>
                <br/>
              </Box>}
              <div className="heading cheading">
                <h6>Anime Details</h6>
              </div>
            </Grid>
            {/* infoData.isError */}
            { infoData.isSuccess ? 
              <Fragment>
                <Grid item xl={2} lg={2} md={0} sm={0} xs={0} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                  <center>
                    <img src={infoValue?.image} alt={contentTitle} style={{ marginTop: '-60px', marginBottom: '30px' }} />
                  </center>
                </Grid>
                <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                  <h3 className='media-title' style={{ marginTop: '-80px', marginLeft: '10px' }}><b>{contentTitle}{indexId == 21 && `: ${selectedArc}`}</b></h3>
                  <div className="media_props" style={{ marginBlock: '-20px' }}>
                    <Grid container spacing={0.1} style={{ marginLeft: '5px' }}>
                      <Grid item>
                        <h5 style={{ marginRight: 10 }}>
                          <span className='stream-video-quality-span' style={{ color: 'rgba(129,181,223,255)', backgroundColor: 'transparent', fontWeight: 'bolder', border: '1.5px solid' }}>
                            {infoValue?.subOrDub === 'dub' ? 'English Dub' : 'English Subtitle'}
                          </span>
                        </h5>
                      </Grid>
                      {/* <Grid item>
                        <AccessTimeFilledIcon style={{ fontSize: 16, marginBottom: -1, color: "#54B4D3" }}/>
                      </Grid> */}
                      <Grid item>
                        <h5>{convertMinutesToHoursAndMinutes(infoValue?.duration)}</h5>
                      </Grid>
                      {/* <Grid item>
                        <span style={{ marginLeft: 5 }}><StarIcon style={{ marginBottom: '-3px', fontSize: 20, color: "#E4A11B" }}/> {infoValue?.rating}</span>
                      </Grid> */}
                      {/* <Grid item>
                        <ShareModal infoValue={infoValue}/>
                      </Grid> */}
                    </Grid>
                    {/* <TraillerModal category="anime" infoValue={infoValue}/> */}
                  </div>
                  <MediaDescription text={infoValue?.description}/>
                  <table>
                    <tbody>
                      <tr>
                        <th>Country:</th>
                        <td>{foreign_country.filter((item) => item.code === infoValue?.countryOfOrigin).length > 0 ? foreign_country.filter((item) => item.code === infoValue?.countryOfOrigin)[0].name : '-'}</td>
                      </tr>
                      <tr>
                        <th>Season:</th>
                        <td>{infoValue?.season ? capitalizeString(infoValue?.season) : '-'}</td>
                      </tr>
                      <tr>
                        <th>Genre:</th>
                        <td><SeparateArrayByCircularSpan type={'site_link'} data={infoValue?.genres} link={'/anime/genre_filter?genre='} /></td>
                      </tr>
                      <tr>
                        <th>Released:</th>
                        <td>{infoValue?.releaseDate}</td>
                      </tr>
                      <tr>
                        <th>Status:</th>
                        <td>{infoValue?.status}</td>
                      </tr>
                      <tr>
                        <th>Synonyms:</th>
                        <td><SeparateArrayByCircularSpan type={'google_link'} data={infoValue?.synonyms} link={'https://www.google.com/search?q='} /></td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              </Fragment>
            : 
              <AnimeDetailsSkeleton/>
            }

            {infoValue?.characters?.length > 0 && 
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div>
                  <div className="heading bheading">
                    <h6>CHARACTERS</h6>
                  </div>
                    <Slider {...anime_character_carousel_settings} style={{ marginTop: '20px', marginInline: isMobile ? '10px' : '20px' }}>
                      {infoValue?.characters?.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            <AnimeCharacterCard characterInfo={item}/>
                          </Fragment>
                        )
                      })}
                    </Slider>
                </div>
              </Grid>
            }
          </Grid>
        </Container>
      </div>
      <br/>
      {recommendations?.length > 0 ?
        <Container maxWidth={'xxl'}>
          <div className="heading bheading">
            <h6>You May Also Like</h6>
          </div>
          <AnimeSuggestions Suggest={recommendations} />
        </Container>
      : ""}
      
      <FloatingButton/>
      <Footer/>
    </div>
  );
}

export default AnimeDashboard;
