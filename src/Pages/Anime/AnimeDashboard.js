// Packages
import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";

// Material UI Components
import { Grid, Box, Container, Button } from '@mui/material';

// React Slick
import Slider from "react-slick";

// CSS
import "./css/AnimeDashboard.css";

// Icons
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

// Components
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import InitPlayerLoading from "../../Components/InitPlayerLoading/InitPlayerLoading";
import { Player } from "../../Components/Player/Player";
import AnimeSuggestions from "../../Components/Anime/AnimeSuggestions";
import AnimeEpisodesDrawer from "../../Components/BottomDrawer/AnimeEpisodesDrawer";
import OnePieceEpisodesDrawer from "../../Components/BottomDrawer/OnePieceEpisodesDrawer";
import AnimeCharacterCard from "../../Components/Anime/AnimeCharacterCard";
import MediaDescription from "../../Components/MediaDescription/MediaDescription";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import apiConfig from '../../Config/api.config';
import { pageLoadMS, foreign_country, anime_character_carousel_settings } from "../../Config/settings.config";

// Helpers
import { getCookie } from "../../Helpers/Cookies";


// Images
import { subtitleLogo, videoQuality, homeBackground } from "../../Config/images.config";

// Services
import { moveToTop, SeparateArrayByComma, SeparateArrayByCircularSpan, convertMinutesToHoursAndMinutes } from "../../Services/Utils";
import { anime_info, anime_stream_links } from "../../Services/AnimeService";

// Static Data
var arcs = require('../../Services/Data/onePieceArcs.json').arcs;

const AnimeDashboard = (props) => {
  
  const { id, type } = useParams();
  const indexId = id;

  const queryParams = new URLSearchParams(window.location.search);
  const paramEpisode = queryParams.get("episode") != null ? queryParams.get("episode") : null;
  const paramDub = queryParams.get("dub") != null ? queryParams.get("dub") == 'true' : false;

  const [selectedArc, setSelectedArc] = useState("");
  const [videoQualities, setVideoQualities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

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

  const set_selectedSeasonEpisode = useCallback((infoValue) => {

    if (selectedEpisode) {
      // setSelectedEpisode(selectedEpisode);
      setTotalEpisodes(infoValue?.episodes?.length);
      for (let getSelEpisodeLength = 0; getSelEpisodeLength < infoValue?.episodes.length; getSelEpisodeLength++) {
        if (infoValue?.episodes[getSelEpisodeLength].id === selectedEpisode) {
          setEpisodeNum(getSelEpisodeLength + 1);
          setSelectedEpisodeName("EP " + (getSelEpisodeLength + 1) + ": " + infoValue?.episodes[getSelEpisodeLength].title)

          // Define Arc Name
          if (indexId == 21) {
            let currentEpisodeNumber = infoValue?.episodes[getSelEpisodeLength].number;
            let currentArc = arcs.filter(item => item.start_episode <= currentEpisodeNumber && item.end_episode >= currentEpisodeNumber)[0];
            setSelectedArc(`${currentArc.name.toUpperCase()} ARC`);
          }

          break;
        }
      }
    } else {
      setSelectedEpisode(infoValue?.episodes[0].id);
      setSelectedEpisodeName("EP 1: " + infoValue?.episodes[0].title);

      // Define Arc Name
      if (indexId == 21) {
        let currentArc = arcs[0];
        setSelectedArc(`${currentArc.name.toUpperCase()} ARC`);
      }

    }

    setContentTitle(infoValue?.title?.english || infoValue?.title?.userPreferred || infoValue?.title?.romaji || infoValue?.title?.native);
    setRecommendations(infoValue?.relations?.length > 0 ? infoValue?.relations : infoValue?.recommendations);

  }, [selectedEpisode, indexId]);

  const set_selectedLinkSubtitle = useCallback((resourceValue) => {

    // Default Link
    let defLink = resourceValue?.data?.sources?.filter( (result) => { return result.quality === "default"; });
    defLink = defLink?.length > 0 ? defLink[0]?.url : "";
    setDefaultLink(apiConfig.anime_video_link_enable_override_cors === true ? `${apiConfig.override_cors}${defLink.replace("https://", "")}` : defLink);

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
      episodeIdVar = selectedEpisode || (infoValue?.episodes?.length > 0 ? infoValue.episodes[0].id : undefined);
  }

  // movie link
  let resourceData = useQuery(['anime_stream_links', {episodeId: episodeIdVar}], anime_stream_links, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
    retry: 1, // Number of retries
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
    if (selectedEpisodeIndex > 0 && selectedEpisodeIndex < infoValue?.episodes?.length) {
      additionalControls.push({
        position: 'right',
        html: `&#8678;`,
        tooltip: 'Previous Episode',
        style: {
          fontSize: '32px',
          marginTop: '-4px'
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
        html: `&#8680;`,
        tooltip: 'Next Episode',
        style: {
          fontSize: '32px',
          marginTop: '-4px'
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
      set_selectedSeasonEpisode(infoValue);
      setSelectedEpisodeIndex(infoValue?.episodes?.indexOf(infoValue?.episodes?.find((item) => item.id == selectedEpisode)));
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

  }, [contentTitle, infoData.isSuccess, resourceData.isSuccess, infoValue, resourceValue, episodeNum, set_selectedSeasonEpisode, set_selectedLinkSubtitle, selectedEpisode]);

  return (
    <div className="movie_dashboard">
      <ReactQueryTools/>
      <SideBar Type={type} subType={null} transparentBg={false} isStream={true} />
      <div className="movie_cover" style={{backgroundImage: `linear-gradient(rgba(0, 0, 10, 1),rgba(0, 0, 10, 0.5), rgba(0, 0, 10, 0.2)), url("${infoValue?.cover}"), url("${homeBackground}")`}}>
        <div className="heading cheading movie-stream-title">
          <h6> </h6>
        </div>
        {infoData.isSuccess && resourceData.isSuccess && defaultLink !== "" && videoQualities.length > 0 && !loadingEpisode ? 
          <Player
            className="movie_player"
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
                    onSelect: function (item, $dom, event) {
                        console.info(item, $dom, event);
                        this.switchQuality(item.url, item.html);
                        return item.html;
                    },
                },
                {
                  html: 'Subtitles',
                  width: 300,
                  tooltip: "No selected",
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
                  {"default": false, "html": "Add Subtitle", "url": "add.vtt"},
                  ],
                  onSelect: function (item) {
                      if (item.html === 'Add Subtitle') {
                        alert('Under Development.');
                      } else {
                        this.subtitle.switch(item.url, {
                          name: item.html,
                        }); 
                        return item.html;
                      }
                  },
                },
              ],
              controls: additionalControls,
              // quality: videoQualities,
            }}
          />
        : 
          resourceData.isError ? 
            <Box style={{ textAlign: 'center', marginBlock: '30vh' }}>
              <h3>Loading episode error, please try again later.</h3>
              <div className="video-error-btn" style={{ marginTop: '10px' }}>
                {(selectedEpisodeIndex > 0 && selectedEpisodeIndex < infoValue?.episodes?.length) && 
                  <Button variant="contained" size="small" style={{ marginInline: '3px' }} onClick={() => previousEpisode()}>Previous Episode</Button>
                }
                {(selectedEpisodeIndex >= 0 && (selectedEpisodeIndex + 1) < infoValue?.episodes?.length) && 
                  <Button variant="contained" size="small" style={{ marginInline: '3px' }} onClick={() => nextEpisode()}>Next Episode</Button>
                }
              </div>
            </Box>
          :
            <InitPlayerLoading />
        }
      </div>

      <div className="anime_info">

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

        <div className={infoValue?.episodes?.length > 1 ? 'content-details' : 'content-details asian-movie'}>
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
            <Grid item xl={2} lg={2} md={0} sm={0} xs={0} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                <center>
                  <img src={infoValue?.image} alt={contentTitle} style={{ marginTop: '-30px', marginBottom: '30px' }} />
                </center>
            </Grid>
            <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
              <h3 className='media-title' style={{ marginTop: '-30px', marginLeft: '10px' }}><b>{contentTitle}{indexId == 21 ? `: ${selectedArc}` : ''}</b></h3>
              <div className="media_props">
                {/* <Typography variant="subtitle1" style={{ verticalAlign: 'middle', marginLeft: '10px', marginRight: '15px', display: 'inline-flex' }}>
                    <StarIcon style={{ marginRight: '8px', color: "#E4A11B" }}/> {infoValue?.rating}
                </Typography> */}
                <Grid container spacing={0.4} style={{ marginLeft: '5px' }}>
                  <Grid item>
                    <h5 style={{ marginRight: 10 }}>
                      <span className='stream-video-quality-span' style={{ color: 'rgba(129,181,223,255)', backgroundColor: 'transparent', fontWeight: 'bolder', border: '1.5px solid' }}>
                        {infoValue?.subOrDub === 'dub' ? 'English Dub' : 'English Subtitle'}
                      </span>
                    </h5>
                  </Grid>
                  <Grid item>
                    <AccessTimeFilledIcon style={{ fontSize: 16, marginBottom: -1, color: "#54B4D3" }}/>
                  </Grid>
                  <Grid item>
                    <h5>{convertMinutesToHoursAndMinutes(infoValue?.duration)}</h5>
                  </Grid>
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
                    <td>{infoValue?.season}</td>
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
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <div style={{ marginLeft: '-13px' }}>
                <div className="heading bheading">
                  <h6>CHARACTERS</h6>
                </div><br/>
                  <Container maxWidth={'xxl'}>
                    <Box sx={{ marginInline: '20px', marginTop: '-20px' }} display={{ xs: "block", sm: "block", md: "block", lg: "block", xl: "block" }}>
                      <Slider {...anime_character_carousel_settings}>
                        {infoValue?.characters?.map((item, index) => {
                          return (
                            <Fragment key={index}>
                              <AnimeCharacterCard characterInfo={item}/>
                            </Fragment>
                          )
                        })}
                      </Slider>
                    </Box>
                  </Container>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <br/><br/><br/>
      {recommendations?.length > 0 ?
        <>
          <div className="heading bheading">
            <h6>You May Also Like</h6>
          </div>
          <AnimeSuggestions Suggest={recommendations} />
        </>
      : ""}
      
      <FloatingButton/>
      <Footer/>
    </div>
  );
}

export default AnimeDashboard;
