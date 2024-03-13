import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Modal, Backdrop, Fade, Box, Grid, Paper, InputBase, Divider, IconButton, Container, Tabs, Tab, TextField } from '@mui/material';
import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Player } from "../Player/Player";

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


// Icons
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const SubtitleModal = ({ subtitles, isMobile }) => {

    const [modalSubtitleOpen, setModalSubtitleOpen] = useState(false);
    const subtitleNameRef = useRef(null);
    const subtitleFileRef = useRef(null);

    const handleModalSubtitleClose = () => setModalSubtitleOpen(false);

    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const onsubmit = (e) => {
        e.preventDefault();
        if (subtitleNameRef.current && subtitleFileRef.current) {
            const subtitleName = subtitleNameRef.current.value;
            const subtitleFile = subtitleFileRef.current.value;

            // artInstance.subtitles = [{language: subtitleName, url: subtitleFile}];
            // alert(subtitleName + " - " + subtitleFile);
        }
    }

    const modalQRStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 430,
        // height: 410,
        bgcolor: '#0f1622',
        borderRadius: '4px',
        // p: 4,
      };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
      
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {isMobile ? (
                <IconButton title='Subtitles' color='primary' size='small' onClick={() => setModalSubtitleOpen(true)}>
                    <ClosedCaptionIcon/>
                </IconButton>
            ) : (
                <Button title='Subtitles' variant='outlined' color='primary' size='small' onClick={() => setModalSubtitleOpen(true)} startIcon={<ClosedCaptionIcon/>}>Subtitles</Button>
            )}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalSubtitleOpen}
                onClose={handleModalSubtitleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
                >
                <Fade in={modalSubtitleOpen}>
                <Box sx={modalQRStyle} width={{ xs: 340, sm: 570, md: 600 }} height={{ xs: 290, sm: 290 }}>
                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0} justifyContent="center">
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Box sx={{ width: '100%' }}>
                                <TabContext value={tabValue}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                        <Tab label="Local" value="1" />
                                        <Tab label="Online" value="2" />
                                    </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <Box
                                            sx={{
                                                '& > :not(style)': { mb: 2, pb: 1, width: '100%' },
                                            }}
                                            autoComplete="off"
                                        >
                                            <TextField inputRef={subtitleNameRef} id="filled-basic" size='small' label="Name" variant="filled" required/>
                                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                                Upload subtitle
                                                <VisuallyHiddenInput ref={subtitleFileRef} type="file" required/>
                                            </Button>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <Box
                                            sx={{
                                                '& > :not(style)': { mb: 2, width: '100%' },
                                            }}
                                            autoComplete="off"
                                        >
                                            <TextField id="filled-basic" size='small' label="Name" variant="filled" required/>
                                            <TextField id="filled-basic" size='small' label="Subtitle URL" variant="filled" required/>
                                        </Box>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <hr />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Container fluid style={{ textAlign: 'right', marginTop: 13 }}>
                                <Button variant='contained' color='primary' size='small' style={{ fontWeight: 'bolder', marginRight: 6 }} onClick={(e) => onsubmit(e)}>Apply</Button>
                                <Button variant='contained' color='error' size='small' style={{ fontWeight: 'bolder' }} onClick={handleModalSubtitleClose}>Close</Button>
                            </Container>
                        </Grid>
                    </Grid>
                </Box>
                </Fade>
            </Modal>
        </ThemeProvider>
    );
};

export default SubtitleModal;