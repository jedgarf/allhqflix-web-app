import React, { useEffect } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

// Material UI Components
import { Grid, Container, Card, CardContent, Typography, Button } from '@mui/material';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { title, dev_portfolio, fb_link, linkedin_link, github_link, site_email } from "../../Config/settings.config";

// Images
import { homeBackground, jefdevLogoTransparent } from "../../Config/images.config";

const AboutDevelopers = () => {

    document.title = 'AllHQFlix - About the Developers';

    const type = 'about_developers';

    useEffect(() => {
        document.getElementsByClassName('divFocus')[0].focus();
    })

    return (
        <div>
            <div className="movies">
                <ReactQueryTools/>
                <SideBar Type={type} subType={null} haveSearch={true} transparentBg={false} isStream={true}/>
                    <div className="divFocus" style={{backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.5), rgba(10, 10, 10, 0.5))` }}>
                        <div style={{ marginTop: '70px', minHeight: 550, width: '99vw' }}>

                        <Grid container rowSpacing={9}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Card sx={{ minHeight: '150px', marginInline: '10px' }} style={{backgroundImage: `linear-gradient(rgba(2, 9, 22, 0.4),rgba(2, 9, 22, 0.9)), url("${homeBackground}")`, paddingTop: '40px' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ textTransform: 'uppercase', fontWeight: 550, textAlign: 'center', color: '#ccced1' }}>
                                            About the Developers
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Container fluid="true" style={{ marginBlock: `15vh` }}>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={3} style={{ fontWeight: 'normal', fontSize: '16px' }}>

                                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                            <center>
                                                <img src={jefdevLogoTransparent}
                                                style={{ width: '300px' }}
                                                alt="JEDGARF PROJECTS"/>
                                            </center>
                                        </Grid>
                                        
                                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{ margin: 'auto', width: 'auto', padding: '10px' }}>
                                            <center>
                                                <div>
                                                    {/* <p style={{ textAlign: 'left', marginBottom: 5 }}><b>Developer's Name:</b> John Edgar Jr. Francisco</p> */}
                                                    <p style={{ textAlign: 'left', marginBottom: 5 }}><b>Email:</b> <a href='mailto:jedgarf.dev12@gmail.com' className='text-link'>jedgarf.dev12@gmail.com</a></p>
                                                    <p style={{ textAlign: 'left', marginBottom: 5 }}><b>Professional Portfolio:</b> <a href={dev_portfolio} target='__blank' className='text-link'>{dev_portfolio}</a></p>
                                                    <p style={{ textAlign: 'left', marginBottom: 5 }}><b>GitHub:</b> <a href={ github_link } target='__blank' className='text-link'>{ github_link }</a></p>
                                                    <p style={{ textAlign: 'left', marginBottom: 5 }}><b>LinkedIn:</b> <a href={ linkedin_link } target='__blank' className='text-link'>{ linkedin_link }</a></p>
                                                    <p style={{ textAlign: 'left', marginBottom: 5 }}><b>Facebook:</b> <a href={ fb_link } target='__blank' className='text-link'>{ fb_link }</a></p>
                                                    {/* <p style={{ textAlign: 'left', marginBottom: 5 }}><b>Site Email:</b> <a href={`mailto:${site_email}`} className='text-link'>{ site_email }</a></p> */}
                                                </div>
                                            </center>
                                        </Grid>
                                        
                                    </Grid>
                                </Container>
                            </Grid>
                        </Grid>

                        </div>
                        <Footer />
                    </div>
            </div>
        </div>
    );
};

export default AboutDevelopers;