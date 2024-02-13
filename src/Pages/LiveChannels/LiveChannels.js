import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// CSS
import './css/LiveChannels.css';

// Pages
import ChannelsDrawer from "../../Components/BottomDrawer/ChannelsDrawer";
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import { Player } from "../../Components/Player/Player";

// Icons
import CircularProgress from '@mui/material/CircularProgress';

import apiConfig from '../../Config/api.config';
import { moveToTop } from "../../Services/Utils";
import { live_channel_countries, live_channel_languages, live_channel_names, live_channel_streams } from "../../Services/LiveChannelServices";

const LiveChannels = () => {

    const urlContentType = 'live_channels';
    const no_image = process.env.PUBLIC_URL + "/images/no_image_available.jpg";
    const allhqflix_logo = process.env.PUBLIC_URL + "/images/multimedia_hub_logo.png";
    const [defaultCountry, setDefaultCountry] = useState("US");
    const [selectedCountry, setSelectedCountry] = useState("US");
    const [selectedStreamChannelId, setSelectedStreamChannelId] = useState('AMCEast.us');
    const [selectedStreamChannelName, setSelectedStreamChannelName] = useState("");

    // Paramters
    let countryData = useQuery('live_channel_countries', live_channel_countries, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
    });
    let countryValue = countryData?.data?.data;
    
    let languagesData = useQuery('live_channel_languages', live_channel_languages, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
    });
    let languagesValue = languagesData?.data?.data;

    let channelData = useQuery(['live_channel_names', { country: selectedCountry, is_nsfw: false, channel_id: null }], live_channel_names, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
    });
    let channelValue = channelData?.data?.slice(0, 300);

    // ----------------------------------------------------------------------------------------------------------------------------
    

    let selectedChannelData = useQuery(['live_channel_names', { country: defaultCountry, is_nsfw: false, channel_id: selectedStreamChannelId }], live_channel_names, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
    });
    let selectedChannelValue = selectedChannelData?.data;

    let streamData = useQuery([live_channel_streams, { channel_id: selectedStreamChannelId, status: 'online' }], live_channel_streams, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
    });
    let streamValue = streamData?.data;

    // ----------------------------------------------------------------------------------------------------------------------------

    const getCountryName = (countryCode) => {
        let country = countryValue?.filter((item) => item.code === countryCode)[0];
        return country.name;
    }

    const getLanguageName = (languageCode) => {
        let language = languagesValue?.filter((item) => item.code === languageCode)[0];
        return language.name;
    }

    const ListWithComma = ({data}) => {
        return (
            <>
            {data?.length > 0 ?
            <>
                {data?.map((item, i) => {
                    return (
                        <span key={i}>
                        { (i === 0 ? " " : ", ") + item}
                        </span>
                    );
                })}
            </>
             : 
            '-'}
            </>
        );
    };

    const Languages = ({data}) => {
        return (
            <>
            {data?.length > 0 ?
            <>
                {data?.map((item, i) => {
                    return (
                        <span key={i}>
                        { (i === 0 ? " " : ", ") + getLanguageName(item)}
                        </span>
                    );
                })}
            </>
             : 
            '-'}
            </>
        );
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    }

    const handleChannelChange = async (channelId) => {

        // const streamLink = await streamValue.filter((stream) => stream.channel === channelId)[0];
        // setSelectedStreamChannel(channelData?.data?.data?.filter((item) => item.id === streamLink.channel)[0]);
        // // console.log(streamLink.url);
        // if (streamLink.url !== undefined) {
        //     setIsPlayerLoading(true);
        //     setSelectedStreamLink(streamLink.url);
        //     setSelectedStreamChannelId(streamLink.channel);
        //     setSelectedStreamChannelName(channelData?.data?.data?.filter((item) => item.id === streamLink.channel)[0].name);
        //     setIsPlayerLoading(false);
        //     moveToTop();
        // } else {
        //     alert("No Link Available.");
        // }
        setSelectedStreamChannelId(channelId);
    }

    const disableControls = (art) => {
        art.plugins.play.disable();
    }

    useEffect(() => {
        document.title = `AllHQFlix - Live Channels`;  

    }, [selectedStreamChannelId]);

    console.log("selectedStreamChannelId", selectedStreamChannelId);

    return (
        <div className='live_channels'>
        {process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? <div className="top"><ReactQueryDevtools initialIsOpen={false} /></div> : <div className="top"></div> }
        <SideBar Type={urlContentType} subType={null}/>
        <div className='live_channels_content'>
            <Grid container columnSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }} rowSpacing={3} justifyContent="center">
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <div className="live_channel_cover">
                        <h5 className='channel_title'>{ selectedChannelValue?.name ? selectedChannelValue.name : '-' }</h5>
                        <center>
                            {selectedChannelData.isLoading && streamData.isLoading && streamValue?.url === undefined ?
                            <div>
                                <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                                <CircularProgress sx={{ fontSize: 100 }} />
                                </Box>
                            </div>
                            : 
                            <>
                                {streamValue?.url !== undefined ?
                                    <Player
                                        className="live_channels_content_player"
                                        defaultlink={ streamValue?.url }
                                        infotitle={ selectedChannelValue?.name ? selectedChannelValue.name : '-' }
                                        infocover={allhqflix_logo}
                                        episodeNum={1}
                                        totalEpisodes={1}
                                        option={{ isLive: true, screenshot: true, setting: false, hotkey: false }}
                                        getInstance={(art) => disableControls(art)}
                                    />
                                 : 'Undefined URL'}
                            </>}
                        </center>

                        <Grid container columnSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }} rowSpacing={3} justifyContent="center">
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Box
                                    display={{ xs: 'block', md: 'none' }}
                                >
                                    <div className='channel_logo_mobile'>
                                        <img alt={selectedChannelValue?.name ? selectedChannelValue.name : ''} src={selectedChannelValue?.logo ? selectedChannelValue.logo : ''} />
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <Box
                                    m={1}
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                >
                                    <ChannelsDrawer 
                                        countryValue={countryValue} 
                                        selectedCountry={selectedCountry} 
                                        handleCountryChange={handleCountryChange} 
                                        channelData={channelData} 
                                        channelValue={channelValue} 
                                        streamValue={streamValue} 
                                        handleChannelChange={handleChannelChange} 
                                        selectedStreamChannelId={selectedStreamChannelId} 
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                    </div>
                </Grid>
                
                {selectedChannelData.isLoading ?
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="50px">
                    <CircularProgress sx={{ fontSize: 100 }} />
                    </Box>
                </Grid>
                 : 
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <div className='live_channel_details'>
                        <Box
                            display={{ xs: 'none', md: 'block' }}
                        >
                            <div className='channel_logo'>
                                <img alt={selectedChannelValue?.name ? selectedChannelValue.name : ''} src={selectedChannelValue?.logo ? selectedChannelValue.logo : ''} />
                            </div>
                        </Box>
                        <div className='channel_details_table'>
                            <table cellPadding={5}>
                                <tbody>
                                    <tr>
                                        <th>Name:</th>
                                        <td>{ selectedChannelValue?.name ? selectedChannelValue.name : '-' }</td>
                                    </tr>
                                    <tr>
                                        <th>Other Names:</th>
                                        <td><ListWithComma data={selectedChannelValue?.alt_names}/></td>
                                    </tr>
                                    <tr>
                                        <th>Categories:</th>
                                        <td><ListWithComma data={selectedChannelValue?.categories}/></td>
                                    </tr>
                                    <tr>
                                        <th>Languages:</th>
                                        <td><Languages data={selectedChannelValue?.languages}/></td>
                                    </tr>
                                    <tr hidden>
                                        <th>Launched:</th>
                                        <td>{ selectedChannelValue?.launched ? selectedChannelValue.launched : '-' }</td>
                                    </tr>
                                    <tr>
                                        <th>City:</th>
                                        <td>{ selectedChannelValue?.city ? selectedChannelValue.city : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>Country:</th>
                                        <td>{ selectedChannelValue?.country ? getCountryName(selectedChannelValue.country) : '-' }</td>
                                    </tr>
                                    <tr>
                                        <th>Network:</th>
                                        <td>{ selectedChannelValue?.network ? selectedChannelValue.network : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>Broadcast Area:</th>
                                        <td><ListWithComma data={selectedChannelValue?.broadcast_area}/></td>
                                    </tr>
                                    <tr>
                                        <th>Owners:</th>
                                        <td><ListWithComma data={selectedChannelValue?.owners}/></td>
                                    </tr>
                                    <tr>
                                        <th>Website:</th>
                                        <td style={{ textTransform: 'lowercase' }}>{ selectedChannelValue?.website ? <a alt={selectedChannelValue.website} href={selectedChannelValue.website} target='__blank'>{selectedChannelValue.website}</a> : '-'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Grid>}
            </Grid>
            
        </div>
        <Footer/>
        </div>
    );
};

export default LiveChannels;