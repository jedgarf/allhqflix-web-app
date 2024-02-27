import React, { useState, useEffect } from 'react';
import { Button, Modal, Backdrop, Fade, Box, Grid, Paper, InputBase, Divider, IconButton } from '@mui/material';
import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { QRCode } from 'react-qrcode-logo';

// Icons
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    RedditShareButton,
    ViberShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    ViberIcon,
    EmailIcon,
  } from 'react-share';

  import { copyMovieLink } from "../../Services/Utils";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const ShareModal = ({ infoValue, size = '18px' }) => {

    const { type } = useParams();
    const shareLink = `${window.location.protocol}//${window.location.host}/${type}/stream_dashboard?mediaId=${infoValue.id}&share=true`;

    const [modalQROpen, setModalQROpen] = useState(false);
    const handleModalQRClose = () => setModalQROpen(false);

    const copyLink = (link) => {
        copyMovieLink(link);
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
      
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <IconButton title='Share' variant='contained' color='error' size='small' onClick={() => setModalQROpen(true)}>
                <ShareIcon style={{ fontSize: size, padding: 0 }}/>
            </IconButton>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalQROpen}
                onClose={handleModalQRClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
                >
                <Fade in={modalQROpen}>
                <Box sx={modalQRStyle} width={{ xs: 300, sm: 570, md: 600 }} height={{ xs: 530, sm: 340 }}>
                <center>
                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={1} justifyContent="center" style={{ marginTop: 20, marginRight: 10 }}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                            <Box display={{ xs: 'block', sm: 'block', md: 'block', lg: 'block' }} sx={{ marginBottom: 2 }}>
                                <QRCode 
                                    value={shareLink} 
                                    ecLevel='Q' // L | M | Q | H
                                    logoImage={process.env.PUBLIC_URL + "/images/multimedia_hub_logo.png"} 
                                    // logoOpacity={1} 
                                    size={200} 
                                    quietZone={4} 
                                    removeQrCodeBehindLogo={false} 
                                    logoWidth={70} 
                                    logoHeight={50}
                                    // bgColor='white'
                                    // fgColor='red'
                                    logoPaddingStyle='circle' // square | circle
                                    qrStyle='squares' // squares | dots
                                    enableCORS={false} />
                            </Box>
                        </Grid>
                        <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                            <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={1.5} justifyContent="center">
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Paper
                                        component="form"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '90%', marginBottom: 2 }}
                                        >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1, color: 'blanchedalmond' }}
                                            placeholder="Movie Link"
                                            inputProps={{ 'aria-label': 'Share link' }}
                                            value={`${shareLink}`}
                                            readOnly={true} 
                                            color='primary'
                                        />
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={ () => copyLink(shareLink) } >
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <EmailShareButton
                                        url={`${shareLink}`}
                                        subject={`AllHQFlix - ${infoValue?.title}`}
                                        body=""
                                        separator=""
                                    >
                                        <EmailIcon size={40} round />
                                    </EmailShareButton>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <FacebookShareButton
                                        url={`${shareLink}`}
                                        quote={`AllHQFlix - ${infoValue?.title}`}
                                        hashtags="#allhqflix"
                                    >
                                        <FacebookIcon size={40} round />
                                    </FacebookShareButton>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <TwitterShareButton
                                        url={`${shareLink}`}
                                        title={`AllHQFlix - ${infoValue?.title}`}
                                        via=""
                                        hashtags={["allhqflix", "freemovies"]}
                                    >
                                        <TwitterIcon size={40} round />
                                    </TwitterShareButton>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <LinkedinShareButton
                                        url={`${shareLink}`}
                                    >
                                        <LinkedinIcon size={40} round />
                                    </LinkedinShareButton>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <ViberShareButton
                                        url={`${shareLink}`}
                                        title={`AllHQFlix - ${infoValue?.title}`}
                                        separator=""
                                    >
                                        <ViberIcon size={40} round />
                                    </ViberShareButton>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <TelegramShareButton
                                        url={`${shareLink}`}
                                        title={`AllHQFlix - ${infoValue?.title}`}
                                    >
                                        <TelegramIcon size={40} round />
                                    </TelegramShareButton>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <WhatsappShareButton
                                        url={`${shareLink}`}
                                        title={`AllHQFlix - ${infoValue?.title}`}
                                        separator=""
                                    >
                                        <WhatsappIcon size={40} round />
                                    </WhatsappShareButton>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3} hidden>
                                    <PinterestShareButton
                                        url={`${shareLink}`}
                                        media={`${shareLink}`}
                                        description={`AllHQFlix - ${infoValue?.title}`}
                                    >
                                        <PinterestIcon size={40} round />
                                    </PinterestShareButton>
                                </Grid>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <RedditShareButton
                                        url={`${shareLink}`}
                                        title={`AllHQFlix - ${infoValue?.title}`}
                                    >
                                        <RedditIcon size={40} round />
                                    </RedditShareButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <hr style={{ marginTop: 14 }} />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Button variant='outlined' color='error' size='small' style={{ fontWeight: 'bolder', marginTop: 6 }} startIcon={<CloseIcon/>} onClick={handleModalQRClose}>Close</Button>
                        </Grid>
                    </Grid>
                </center>
                </Box>
                </Fade>
            </Modal>
        </ThemeProvider>
    );
};

export default ShareModal;