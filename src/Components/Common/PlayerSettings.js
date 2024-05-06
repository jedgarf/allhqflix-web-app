import React, { useState, Fragment } from 'react';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";

// Helpers
import { addLocalStorage } from "../../Helpers/LocalStorage";

// Utils
import { isMobile } from "../../Services/Utils";

const PlayerSettings = ({ playerSettings, setPlayerSettings }) => {

    const queryParams = new URLSearchParams(window.location.search);
    const episode = queryParams.get('episode');
    const server = queryParams.get('server');
    const [autoPlay, setAutoPlay] = useState(playerSettings.auto_play);
    const [autoNext, setAutoNext] = useState(playerSettings.auto_next);
    const [autoFullscreen, setAutoFullscreen] = useState(playerSettings.auto_fullscreen);

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const handleAutoPlay = (event) => {
        setAutoPlay(event.target.checked);
        addLocalStorage('player_auto_play', event.target.checked);
        const newPlayerSettings = {
            "auto_play": event.target.checked,
            "auto_next": playerSettings.auto_next,
            "auto_fullscreen": playerSettings.auto_fullscreen
        }; 
        setPlayerSettings(newPlayerSettings);
    }

    const handleAutoNext = (event) => {
        setAutoNext(event.target.checked);
        addLocalStorage('player_auto_next', event.target.checked);
        const newPlayerSettings = {
            "auto_play": playerSettings.auto_play,
            "auto_next": event.target.checked,
            "auto_fullscreen": playerSettings.auto_fullscreen
        };
        setPlayerSettings(newPlayerSettings);
    }

    const handleAutoFullscreen = (event) => {
        setAutoFullscreen(event.target.checked);
        addLocalStorage('player_auto_fullscreen', event.target.checked);
        const newPlayerSettings = {
            "auto_play": playerSettings.auto_play,
            "auto_next": playerSettings.auto_next,
            "auto_fullscreen": event.target.checked
        };
        setPlayerSettings(newPlayerSettings);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={autoPlay} onChange={(event) => handleAutoPlay(event)} />} label="Auto play" />
                <FormControlLabel control={<Checkbox checked={autoNext} onChange={(event) => handleAutoNext(event)} />} label="Auto next episodes (series)" />
                {!isMobile && 
                    <FormControlLabel control={<Checkbox checked={autoFullscreen} onChange={(event) => handleAutoFullscreen(event)} />} label="Auto fullscreen" />
                }
            </FormGroup>
            {(episode || server) && 
                <Typography variant='span' style={{ color: '#DC4C64', marginTop: '20px' }}>
                    <b>Note:</b>{' '}
                    Changes take effect in the next movie or episode.
                </Typography>
            }
        </ThemeProvider>
    );
};

export default PlayerSettings;