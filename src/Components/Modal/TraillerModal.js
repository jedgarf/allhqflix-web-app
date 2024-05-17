import React from 'react';

// Material UI Components
import { Button, Modal, Backdrop, Fade, Box, IconButton } from '@mui/material';

// Material UI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Icons
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CloseIcon from '@mui/icons-material/Close';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const TraillerModal = ({ category, infoValue, size = '18px', elem = 'button', color = 'var(--four-color)' }) => {

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalClose = () => setModalOpen(false);
    var mediaTitle = "";
    var trallerURL = "";

    if (category === 'anime') {
        mediaTitle = infoValue?.title?.english || infoValue?.title?.userPreferred || infoValue?.title?.romaji || infoValue?.title?.native; 
    } else if (category === 'asian_films') {
        mediaTitle = infoValue?.title;  
    } else {
        mediaTitle = infoValue?.title;
    }

    if (category === 'anime') {
        if (infoValue?.id == 21) {
            trallerURL = 'https://www.youtube.com/embed/tUg2fRRls8o?autoplay=1'; 
        } else {
            trallerURL = 'https://www.youtube.com/embed/' + infoValue?.trailer?.id + '?autoplay=1'; 
        }
    } else if (category === 'asian_films') {
        trallerURL = infoValue?.trailer + '?autoplay=1';  
    } else {
        trallerURL = infoValue?.trailer + '?autoplay=1';
    }

    const modalStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {infoValue?.trailer !== undefined || infoValue?.id == 21 ? 
                elem === "button" ? 
                    <Button title='Trailer' variant='outlined' color='error' size='small' style={{ marginRight: '10px' }} onClick={() => setModalOpen(true)} startIcon={<LocalMoviesIcon/>}>Trailer</Button>
                : 
                    <IconButton title='Trailer' variant='outlined' size='small' style={{ marginRight: '5px', padding: '3px', border: `${color} solid 1px` }} onClick={() => setModalOpen(true)}>
                        <LocalMoviesIcon style={{ fontSize: size, color: color }}/>
                    </IconButton>
            : ''}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={handleModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={modalOpen}>
                    <Box className='modal-container' sx={modalStyle} width={{ xs: 380, sm: 620, md: 800 }} height={{ xs: 405, sm: 405, md: 405 }}>
                        <center>
                            <iframe 
                                title={mediaTitle} 
                                width="100%" 
                                height="350" 
                                src={trallerURL} 
                                name='iframe_video'
                                frameBorder="0" 
                                allow="autoplay; encrypted-media"
                                allowFullScreen="allowfullscreen"
                                mozallowfullscreen="mozallowfullscreen" 
                                msallowfullscreen="msallowfullscreen" 
                                oallowfullscreen="oallowfullscreen" 
                                webkitallowfullscreen="webkitallowfullscreen"
                            >
                            </iframe>
                            <br/>
                        </center>
                        <div style={{ textAlign: 'center' }}>
                            <Button variant='outlined' color='error' size='small' startIcon={<CloseIcon/>} style={{ marginTop: '5px', fontWeight: 'bolder' }} onClick={handleModalClose}>Close</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </ThemeProvider>
    );
};

export default TraillerModal;