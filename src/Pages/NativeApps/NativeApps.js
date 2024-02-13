import React, { useEffect } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

// Material UI Components
import { Grid, Container, Card, CardContent, CardActions, Typography, Button, Box, Alert, Stack } from '@mui/material';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Icons
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AndroidIcon from '@mui/icons-material/Android';
import LiveTvIcon from '@mui/icons-material/LiveTv';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";

import { homeBackground, appPhoto } from "../../Config/images.config";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const NativeApps = () => {

    document.title = 'AllHQFlix - Native Apps';

    const type = 'native_apps';

    const notAvailable = (e) => {
        e.preventDefault();
        alert("Not Available.");
    }

    return (
        <div>
            <div className="landing-page">
            {process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? <div className="top"><ReactQueryDevtools initialIsOpen={false} /></div> : <div className="top"></div> }
                <SideBar Type={type} subType={null} haveSearch={true} transparentBg={false} isStream={true}/>
                    <div className="divFocus">
                        <ThemeProvider theme={darkTheme}>
                            <CssBaseline />
                            <div style={{ marginTop: '77px', minHeight: 300, width: '99vw' }}>
                                <Container maxWidth={'xxl'} style={{ marginBottom: '20px' }}>
                                    <Stack sx={{ width: '100%' }} spacing={0}>
                                        <Alert severity="info">Exciting news! Our official mobile app development is underway. In the meantime, feel free to enjoy the temporary hybrid app experience. Stay tuned for the enhanced features coming your way soon!</Alert>
                                    </Stack>
                                </Container>
                                <Container maxWidth={'md'}>
                                    <div className="appdownload" style={{ backgroundImage: `linear-gradient(rgba(2, 9, 22, 0.8),rgba(2, 9, 22, 0.8)) , url("${homeBackground}")`, borderRadius: 10, padding: 40, minHeight: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className="apd-container">
                                            <div className="apdc-content">
                                                <Grid container direction="row" columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={2}>
                                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                        <center>
                                                            <div className="app-demo">
                                                                <div className="app-screen"><img src={appPhoto} alt='' width={260}/></div>
                                                            </div>
                                                        </center>
                                                    </Grid>
                                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                        <h1 className="app-heading"><strong>AllHQFLix Progressive Web Application</strong></h1><br/>
                                                        {/* <div className="app-heading-sub">Official Android App of AllHQFLix</div><br/> */}
                                                        <div className="app-desc">
                                                            <ul>
                                                                <li>Free HD Movies and TV Series for Android Phones and Android TV.</li>
                                                                {/* <li>Multiple languages of Subtitles.</li> */}
                                                                <li>Absolutely No Ads.</li>
                                                                {/* <li>Fast streaming speed than on the website.</li> */}
                                                                <li>Daily update on both Movies and Shows.</li>
                                                            </ul>
                                                        </div>
                                                        <br/><br/>
                                                        <div className="app-btn" style={{ textAlign: 'center' }}>
                                                            {/* https://dl.getmenow.click/onstream-latest.apk?ref=289 */}
                                                            <a href="https://drive.google.com/file/d/1C3GxpI17MdX5_yRoWzhRRIUAUOkuLUe6/view" target='__blank' className='text-link-without-underline' style={{ maxWidth: '100px' }}>
                                                                <Button variant='contained' color='primary' style={{ color: 'black !important' }} size='small' fullWidth startIcon={<PhoneAndroidIcon/>}>
                                                                    Download for hybrid android app
                                                                </Button>
                                                            </a><br/>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </div>
                                </Container>

                            </div>
                        </ThemeProvider>
                        <Footer />
                    </div>
            </div>
        </div>
    );
};

export default NativeApps;