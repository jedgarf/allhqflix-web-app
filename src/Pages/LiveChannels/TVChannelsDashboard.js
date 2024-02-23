// Packages
import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// CSS
import "./css/TVChannelsDashboard.css";

// Icons
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CircularProgress from '@mui/material/CircularProgress';

// Components
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import { Player } from "../../Components/Player/Player";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import apiConfig from '../../Config/api.config';
import { iptv } from '../../Config/images.config';

// Utilities
import { moveToTop, SeparateArrayByComma, parseM3U } from "../../Services/Utils";

// Services
import { tv_channel_playlist } from "../../Services/LiveChannelServices";
import { Container } from "@mui/material";

const TVChannelsDashboard = (props) => {
  
  const { id, type } = useParams();
  const countryCode = id;
  const contentType = "tv_channels";

  const channelInfo = [];

  const [isLoading, setIsLoading] = useState(false);
  const [channelNumber, setChannelNumber] = useState(1);

  const [playList, setPlayList] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState([]);

  const onChangeChannel = (number) => {
    setIsLoading(true);
    setChannelNumber(number);
    setSelectedChannel(playList[number]);
    moveToTop();
    // setIsLoading(false);
  }

  // React Query
  const tvChannelsData = useQuery(['tv_channel_playlist', { countryCode: countryCode.toLowerCase() }], tv_channel_playlist, {
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "tracked",
      retryOnMount: false,
      onSuccess: (response) => {
          let parsedData = parseM3U(response);
          let intialChannel = parsedData.length > 0 ? parsedData[1] : [];
          setPlayList(parsedData);
          setSelectedChannel(intialChannel);
      },
      onError: (error) => {
          console.error('Error fetching the playlist:', error);
      }
  });

  useEffect(() => {
    setIsLoading(false);
  }, [channelNumber])

  // ---------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="movie_dashboard">
      <ReactQueryTools/>
        <SideBar Type={contentType} subType={contentType} transparentBg={false} isStream={true} />
        {<>
          <div className="movie_cover" style={{backgroundImage: `linear-gradient(rgba(0, 0, 10, 1),rgba(0, 0, 10, 0.5)) , url("${channelInfo?.logo}")`}}>
            <div className="heading cheading movie-stream-title">
              <h6></h6>
            </div>
            {!isLoading && selectedChannel.url !== undefined && (!tvChannelsData.isLoading || !tvChannelsData.isRefetching) ? 
            (
              <Player
                className="movie_player"
                defaultlink={`${apiConfig.override_cors}${selectedChannel.url}`}
                infotitle={`${selectedChannel.title || 'N/A'}`}
                infocover={`${iptv}`}
                option={{
                  enableAds: true,
                  hotkey: true,
                  isLive: true,
                  setting: true,
                  settings: []
                }}
                getInstance={(art) => console.log("getInstance", art)}
              />
            ) : (
              <Box className="playButton" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress sx={{ fontSize: 100 }} />
              </Box>
            )}
          </div>

          <div className="movie_info">
            
            <div className='content-details'>
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 5, xl: 5 }} rowSpacing={5}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <div className="heading cheading">
                    <h6>CHANNEL LIST</h6>
                  </div>
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <table cellSpacing={10} width={'100%'}>
                    <tbody>
                      {playList.map((item, index) => {
                        return (
                          <tr>
                            <th><h3 style={{ fontWeight: index === channelNumber ? 'bolder' : 'normal' }}>{`${index+1}. ${item.title}`}</h3></th>
                            <td>
                              {index !== channelNumber ?
                                <Button variant="contained" color="primary" size="small" onClick={() => onChangeChannel(index)} startIcon={<PlayCircleIcon/>}>Play</Button>
                                : 
                              "Selected"}
                            </td>
                            <td></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <center>
                    <img src={selectedChannel.channelLogo} alt={selectedChannel.channelId} width={'100%'}/>
                  </center>
                </Grid>
              </Grid>
            </div>
          </div>
          <br/><br/>
          <Footer/>
        </>}
      </div>
    </>
  );
}

export default TVChannelsDashboard;
