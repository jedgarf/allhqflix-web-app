import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { useQuery } from 'react-query';

// Material UI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Button, Typography, Divider, Container, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

// Material UI Icons
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

// Components
import ReusableModal from "./ReusableModal";

import apiConfig from "../../Config/api.config";

// Utilities
import { parseM3U } from "../../Services/Utils";

// Services
import { tv_channel_playlist } from "../../Services/LiveChannelServices";

const CountryChannelsModal = ({ countryCode, countryName, countryFlag }) => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [playlistData, setPlaylistData] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const useStyles = makeStyles((theme) => ({
        dialogContent: {
            overflowX: 'auto', // Enable horizontal scrolling
        },
    }));
    const classes = useStyles();
      
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModal = (status) => {
        setIsModalOpen(status);
        handleClose();
    }

    // React Query
    useQuery(['tv_channel_playlist', { countryCode: countryCode.toLowerCase() }], tv_channel_playlist, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        enabled: isModalOpen,
        onSuccess: (response) => {
            const parsedData = parseM3U(response);
            setPlaylistData(parsedData);
            setIsLoading(false);
        },
        onError: (error) => {
            // error.response.status = http code
            // error.response.data.message = api message
            console.log(error.response.status);
            if (error.response.status == 404) {
                setPlaylistData([]);
                console.error('Error fetching the playlist:', error.message); 
            } else {
                setPlaylistData([]);
                console.error('Error fetching the playlist:', error.response);   
            }
        }
    });

    return (
        <>
            <ThemeProvider theme={darkTheme}>
            <CssBaseline />

                <Button
                    id="demo-customized-button"
                    size='small'
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={() => handleModal(true)}
                    style={{ marginRight: '10px' }}
                >
                    {`${countryFlag} ${countryName}`}
                </Button>

                {/* Modal */}
                <ReusableModal isModalOpen={isModalOpen} handleModal={handleModal} OptionIcon={""} title={`${countryFlag} ${countryName}`}>
                    {!isLoading && playlistData.length > 0 ? (
                        <>
                            <DialogContent className={classes.dialogContent}>
                                <Typography variant='big'>Available Channels ({playlistData.length})</Typography>
                                <Container style={{ fontSize: '13px', marginTop: '10px', width: 'auto', whiteSpace: 'wrap' }}>
                                    {playlistData.length > 0 && (
                                        <ol className='two-column-ol'>
                                        {playlistData.map((item, index) => (
                                            <li key={index}>
                                                <b>{item.title}</b>
                                            </li>
                                        ))}
                                        </ol>
                                    )}
                                </Container>
                            </DialogContent>
                            <Divider/>
                            <DialogActions>
                                <Button size='small' variant='contained' color='success' onClick={(e) => setIsModalOpen(false)} startIcon={<CloseIcon/>}>Close</Button>
                                {process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? (
                                    <>
                                        {playlistData.length > 0 ?
                                        (<>&nbsp;&nbsp;<Link className='text-link' to={`/watch/live_channels/${countryCode}`}><Button size='small' variant='contained' color='primary' startIcon={<PlayCircleOutlineIcon/>}>Play</Button></Link></>)
                                        : 
                                        (<Button size='small' variant='contained' color='primary' startIcon={<PlayCircleOutlineIcon/>} disabled>Play</Button>)}
                                    </>
                                ) : (
                                    <>
                                        {playlistData.length > 0 ?
                                        (<Button size='small' variant='contained' color='primary' onClick={(e) => alert('Temporary not available (under development)')} startIcon={<PlayCircleOutlineIcon/>}>Play</Button>)
                                        : 
                                        (<Button size='small' variant='contained' color='primary' startIcon={<PlayCircleOutlineIcon/>} disabled>Play</Button>)}
                                    </>
                                )}
                            </DialogActions>
                        </>
                    ) : (
                        <DialogContent className={classes.dialogContent}>
                            <center><CircularProgress sx={{ fontSize: 10 }} /></center>
                        </DialogContent>
                    )}
                </ReusableModal>
            </ThemeProvider>
        </>
    );
};

export default CountryChannelsModal;