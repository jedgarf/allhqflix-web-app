import React, { useState, useEffect } from 'react';

// Material UI Components
import { Grid, Container, Button } from '@mui/material';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Icons
import InstallMobileIcon from '@mui/icons-material/InstallMobile';

// Download Button Images
import { 
    GooglePlayButton,
    AppGalleryButton,
    AppStoreButton,
    ButtonsContainer,
} from "react-mobile-app-button";

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { pageLoadMS } from "../../Config/settings.config";
import { homeBackground, appPhoto } from "../../Config/images.config";

// CSS
import './NativeApps.css';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const NativeApps = () => {

    document.title = 'AllHQFlix - Mobile App';
    const type = 'native_apps';
    const APKUrl = "";
    const IOSUrl = "";

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
        <div className="home-bg-only" style={{ height: '100%' }}>
            <ReactQueryTools/>
            <SideBar Type={type} subType={null} haveSearch={true} transparentBg={false} isStream={false}/>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div style={{ width: '100%' }}>
                    <Container maxWidth={'xxl'}>
                        <div className="appdownloads">
                            <div className="apd-container">
                                <div className="apdc-content text-white">
                                    <Grid container direction="row" columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={0}>
                                        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                                            <center>
                                                <div className="app-demo">
                                                    <div className="app-screen"><img src={appPhoto} alt='' width={260}/></div>
                                                </div>
                                            </center>
                                        </Grid>
                                        <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
                                            <h1 className="app-heading"><strong>AllHQFLix Official Mobile App</strong></h1>
                                            <div className="app-desc" style={{ marginLeft: '-20px' }}>
                                                <ul>
                                                    <li>Free HD Movies and Series for Android Phones and Android TV.</li>
                                                    <li>Absolutely no ads.</li>
                                                    <li>Chrome cast support.</li>
                                                    <li>Daily update on both Movies and Series.</li>
                                                </ul>
                                            </div>
                                            <div className="app-btn" style={{  }}>
                                                {/* https://dl.getmenow.click/onstream-latest.apk?ref=289 */}
                                                {/* <a href="https://drive.google.com/file/d/1C3GxpI17MdX5_yRoWzhRRIUAUOkuLUe6/view" target='__blank' className='text-link-without-underline' style={{ maxWidth: '100px' }}>
                                                    <Button variant='contained' color='primary' style={{ color: 'black !important' }} size='small' fullWidth startIcon={<InstallMobileIcon/>}>
                                                        Download for hybrid android app
                                                    </Button>
                                                </a><br/> */}
                                                <big style={{ color: 'var(--main-red)', fontWeight: 'bolder' }}><br/>Tentative Release: 1<sup>st</sup> Quarter of 2025</big>
                                                <Button variant='contained' color='primary' style={{ color: 'black !important', marginBottom: '20px' }} size='small' fullWidth startIcon={<InstallMobileIcon/>} disabled={true}>
                                                    Download Alpha Version (Soon)
                                                </Button>
                                                {/* <ButtonsContainer direction="row" gap="2">
                                                    <GooglePlayButton
                                                        url={APKUrl}
                                                        theme={"dark"}
                                                        width={'100%'}
                                                        height={70}
                                                        className={'google-play-download-btn'}
                                                    />
                                                    <AppStoreButton
                                                        url={IOSUrl}
                                                        theme={"dark"}
                                                        width={'100%'}
                                                        height={70}
                                                        className={'app-store-download-btn'}
                                                        disabled
                                                    />
                                                </ButtonsContainer>
                                                <br/>
                                                <ButtonsContainer direction="row" gap="2">
                                                    <AppGalleryButton
                                                        url={APKUrl}
                                                        theme={"dark"}
                                                        width={'100%'}
                                                        height={70}
                                                        className={'app-gallery-download-btn'}
                                                    />
                                                </ButtonsContainer> */}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </ThemeProvider>
            <FloatingButton/>
            <Footer />
        </div>
    );
};

export default NativeApps;