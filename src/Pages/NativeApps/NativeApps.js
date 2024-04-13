import React, { useState, useEffect } from 'react';

// Material UI Components
import { Grid, Container, Button } from '@mui/material';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Icons
import InstallMobileIcon from '@mui/icons-material/InstallMobile';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { pageLoadMS } from "../../Config/settings.config";
import { homeBackground, appPhoto } from "../../Config/images.config";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const NativeApps = () => {

    document.title = 'AllHQFlix - Native Apps';
    const type = 'native_apps';

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, pageLoadMS);
    }, []);

    return (
        isLoading ? 
            <LoadingPage/>
        : 
        <div className="landing-page">
            <ReactQueryTools/>
            <SideBar Type={type} subType={null} haveSearch={true} transparentBg={false} isStream={true}/>
            <div className="divFocus">
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <div style={{ paddingBlock: `5vh` }}>
                        <div style={{ width: '100%' }}>

                            <Container maxWidth={'md'}>
                                <div className="appdownloads" style={{ backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.5), rgba(10, 10, 10, 0.5)) , url("${homeBackground}")`, borderRadius: 10, padding: 40, minHeight: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '130px' }}>
                                    <div className="apd-container">
                                        <div className="apdc-content text-white">
                                            <Grid container direction="row" columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={0}>
                                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <center>
                                                        <div className="app-demo">
                                                            <div className="app-screen"><img src={appPhoto} alt='' width={260}/></div>
                                                        </div>
                                                    </center>
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <h1 className="app-heading"><strong>AllHQFLix Official Mobile App</strong></h1>
                                                    <div className="app-desc" style={{ marginLeft: '-20px' }}>
                                                        <ul>
                                                            <li>Free HD Movies and Series for Android Phones and Android TV.</li>
                                                            <li>Absolutely no ads.</li>
                                                            <li>Chrome cast support.</li>
                                                            <li>Daily update on both Movies and Series.</li>
                                                        </ul>
                                                    </div>
                                                    <div className="app-btn" style={{ textAlign: 'center' }}>
                                                        {/* https://dl.getmenow.click/onstream-latest.apk?ref=289 */}
                                                        {/* <a href="https://drive.google.com/file/d/1C3GxpI17MdX5_yRoWzhRRIUAUOkuLUe6/view" target='__blank' className='text-link-without-underline' style={{ maxWidth: '100px' }}>
                                                            <Button variant='contained' color='primary' style={{ color: 'black !important' }} size='small' fullWidth startIcon={<InstallMobileIcon/>}>
                                                                Download for hybrid android app
                                                            </Button>
                                                        </a><br/> */}
                                                        <Button variant='contained' color='primary' style={{ color: 'black !important' }} size='small' fullWidth startIcon={<InstallMobileIcon/>} disabled={true}>
                                                            Download (Soon)
                                                        </Button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </Container>

                        </div>
                    </div>
                </ThemeProvider>
            </div>
            <FloatingButton/>
            <Footer />
        </div>
    );
};

export default NativeApps;