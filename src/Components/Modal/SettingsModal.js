import React, { useState, useRef, useEffect, Fragment } from 'react';
import { styled, alpha } from '@mui/material/styles';

// Sweet Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Container, ListItemIcon, ListItemText, Box, Button, Menu, MenuItem, Divider, Typography, Paper, InputBase, Grid, InputAdornment, CircularProgress, DialogActions, DialogContent, FormControl, InputLabel, Select } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SettingsIcon from '@mui/icons-material/Settings';

// Components
import PlayerSettings from "../Common/PlayerSettings";
import ReusableModal from "./ReusableModal";

// Helpers
import { addLocalStorage, getLocalStorage } from "../../Helpers/LocalStorage";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const SettingsModal = ({ settingModal, setSettingModal, setUpperMenu }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Player Settings
    const [playerSettings, setPlayerSettings] = useState([]);

    const handleModal = (status) => setSettingModal(status);

    const onSubmit = (evt) => {
        evt.preventDefault();
        addLocalStorage('player_auto_play', playerSettings.auto_play);
        addLocalStorage('player_auto_next', playerSettings.auto_next);
        addLocalStorage('player_auto_fullscreen', playerSettings.auto_fullscreen);
        if (getLocalStorage('player_auto_next') && getLocalStorage('player_auto_fullscreen')) {
            setSettingModal(false);
            withReactContent(Swal).fire({
                background: 'rgba(56,56,56,255)',
                title: "<p style='color: #ccced1; font-size: 18px;'>Successfully saved.</p>",
                icon: "success"
              });   
        } else {
            withReactContent(Swal).fire({
                background: 'rgba(56,56,56,255)',
                title: "<p style='color: #ccced1; font-size: 18px;'>Changes are not saved.</p>",
                icon: "warning"
              });
        }
    }


    useEffect(() => {
        setUpperMenu && setUpperMenu(false);
        setIsModalOpen(settingModal);
        setPlayerSettings({
            auto_play: getLocalStorage('player_auto_play') && getLocalStorage('player_auto_play') === 'true' ? true : false,
            auto_next: getLocalStorage('player_auto_next') && getLocalStorage('player_auto_next') === 'true' ? true : false,
            auto_fullscreen: getLocalStorage('player_auto_fullscreen') && getLocalStorage('player_auto_fullscreen') === 'true' ? true : false
        });
    }, [setUpperMenu, settingModal])
    
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ReusableModal isModalOpen={isModalOpen} handleModal={handleModal} OptionIcon={<SettingsIcon sx={{ marginBottom: '-4px' }} />} title={`SETTINGS`}>
                <DialogContent>
                    <PlayerSettings playerSettings={playerSettings} setPlayerSettings={setPlayerSettings}/>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button size='small' variant='outlined' color='error' startIcon={<CloseIcon/>} onClick={() => handleModal(false)}>Close</Button>
                    <Button size='small' variant='contained' color='primary' onClick={(evt) => onSubmit(evt)} startIcon={<SaveIcon/>}>Save</Button>
                </DialogActions>
            </ReusableModal>
        </ThemeProvider>
    );
};

export default SettingsModal;