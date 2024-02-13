import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useParams, useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';

// Material UI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Custom CSS
import "./css/TVChannels.css";

// Material UI Components
import { Grid, Button, Divider, InputBase, Paper, IconButton, Typography, Container } from "@mui/material";

import { pink, blue } from '@mui/material/colors';
import { useSelector , useDispatch } from "react-redux";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

// Pages
import ChannelCard from "../../Components/TVChannels/ChannelCard";
import CountryChannelsModal from "../../Components/Modal/CountryChannelsModal";

// Models
import { tv_channel_countries } from "../../Services/LiveChannelServices";

// Components
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import CountryPagination from "./CountryPagination";

// Utils
import { channelSearchLike } from "../../Services/Utils";

// JSON
let countries = require('../../Services/Data/countries.json');

const TVChannels = () => {

    const urlContentType = 'live_channels';

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });


    const useStyles = makeStyles({
        customInput: {
            color: '#ccced1 !important', // Change this to your desired text color
        },
    });

    const classes = useStyles();

    const searchRef = useRef("");

    const [renderingFinished, setRenderingFinished] = useState(false);
    // const [channelList, setChannelList] = useState(countries);

    const [items, setItems] = useState(countries);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = countries.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // Page numbers
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(countries.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // if (searchTerm !== '') {
    //     currentItems = channelSearchLike(currentItems, searchTerm).slice(indexOfFirstItem, indexOfLastItem);
    // }

    const searchChange = (e) => {
        e.preventDefault();
        setRenderingFinished(false);
        setSearchTerm(searchRef.current.value);
    }

    // let filteredItems = currentItems.filter((item) =>
    //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    useEffect(() => {
        // Filter items based on the search term
        // const filteredItems = countries.filter((item) =>
        //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        let filteredItems = countries;
        if (searchTerm !== "") {
            filteredItems = channelSearchLike(countries, searchTerm);
        }

        setItems(filteredItems);
        setCurrentPage(1); // Reset to the first page when search term changes
        setRenderingFinished(true);
    }, [searchTerm, renderingFinished])
    
    return (
        <div className='live_channels'>
            {process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? <div className="top"><ReactQueryDevtools initialIsOpen={false} /></div> : <div className="top"></div> }
            <SideBar Type={urlContentType} subType={null} haveSearch={false} transparentBg={true} isStream={false}/>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div className='live_channels_content'>
                    <Container maxWidth={'xxl'}>
                        <Grid container direction="row" columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={4} style={{ marginBottom: 35 }}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div className='page-title'>
                                    <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>TV CHANNELS</Typography>
                                </div>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div className='filter_icon align-right'>
                                    <Paper
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '400px' }}
                                        >
                                        <InputBase
                                            inputRef={searchRef}
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Search by Country (ex: PHILIPPINES)"
                                            inputProps={{ 'aria-label': 'Search by Country (ex: PHILIPPINES)', 'className': classes.customInput }}
                                            // onChange={(e) => setSearchTerm(e.target.value)}
                                            // onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={(e) => searchChange(e)}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </div>
                            </Grid>
                        
                            {!renderingFinished ?
                            (
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <div className="search_result_pagination">
                                        <div className="movie_result_pagination_count" style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <CircularProgress sx={{ fontSize: 100 }} />
                                        </div>
                                    </div>
                                </Grid>
                            ) : (
                                <>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <div className="filter_icon align-right">
                                            <CountryPagination
                                                itemsPerPage={itemsPerPage}
                                                totalItems={items.length}
                                                currentPage={currentPage}
                                                paginate={paginate}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        {currentItems?.length > 0 ? (
                                            <div className="movie_result_data">
                                                <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} rowSpacing={1} justifyContent="center">
                                                    {currentItems?.map((data) => (
                                                    <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'}>
                                                        <CountryChannelsModal countryCode={data?.code} countryName={data?.name} countryFlag={data?.flag} />
                                                    </Grid>
                                                    ))}
                                                </Grid>
                                            </div>
                                        ) : (
                                            <div className="search_result_pagination">
                                                <div className="movie_result_pagination_count" style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    No Result Found.
                                                </div>
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <div className="filter_icon align-right">
                                            <CountryPagination
                                                itemsPerPage={itemsPerPage}
                                                totalItems={items.length}
                                                currentPage={currentPage}
                                                paginate={paginate}
                                            />
                                        </div>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Container>
                </div>
            </ThemeProvider>
            <Footer/>
        </div>
        
    );
};

export default TVChannels;