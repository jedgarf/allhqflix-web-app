import React, { useEffect } from 'react';

// Material UI Components
import { Grid, Container, Card, CardContent, Typography } from '@mui/material';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { title, site_email } from "../../Config/settings.config";

// Images
import { homeBackground } from "../../Config/images.config";

const TermsAndConditions = () => {

    document.title = 'AllHQFlix - Terms and Conditions';
    const type = 'terms_and_conditions';

    useEffect(() => {
        document.getElementsByClassName('divFocus')[0].focus();
    })

    return (
        <div>
            <div className="landing-page">
                <ReactQueryTools/>
                <SideBar Type={type} subType={null} haveSearch={true} transparentBg={false} isStream={true}/>
                    <div className="divFocus" style={{backgroundImage: `linear-gradient(rgba(2, 9, 22, 0.8),rgba(2, 9, 22, 0.8))`, color: '#ccced1' }}>
                        <div style={{ marginTop: '70px', minHeight: 500, width: '99vw' }}>

                        <Grid container rowSpacing={9}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Card sx={{ minHeight: '150px', marginInline: '10px' }} style={{backgroundImage: `linear-gradient(rgba(2, 9, 22, 0.4),rgba(2, 9, 22, 0.9)), url("${homeBackground}")`, paddingTop: '40px' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ textTransform: 'uppercase', fontWeight: 550, textAlign: 'center', color: '#ccced1' }}>
                                            Terms and Conditions of use
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Container fluid>
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={3} style={{ fontWeight: 'normal', fontSize: '14px' }}>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h5' style={{ color: '#ccced1' }}>Last Updated: October 20, 2023</Typography>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ textAlign: 'justify', fontWeight: '550' }}>Please read these Terms and Conditions carefully before using {title.toLowerCase()}.vercel.app (the "Service").</Typography>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550' }}>1. Acceptance of Terms</Typography>
                                            <p style={{ textAlign: 'justify' }}>By accessing and using the Service, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these Terms, you must not use the Service.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550' }}>2. Use of Service</Typography>
                                            <p style={{ textAlign: 'justify' }}><b>2.1 No Registration Required</b>: You are not required to register or provide personal information to access and use the Service. You may browse and stream movies without creating an account.</p>
                                            <p style={{ textAlign: 'justify' }}><b>2.2 Content</b>: The content available on the Service is for personal, non-commercial use only. You may not reproduce, distribute, or otherwise use the content for any commercial purposes.</p>
                                            <p style={{ textAlign: 'justify' }}><b>2.3 Age Restriction</b>: You must be at least 18 years old to use the Service. Some content may be rated for mature audiences, and you are responsible for compliance with applicable age restrictions and laws.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550' }}>3. Intellectual Property</Typography>
                                            <p style={{ textAlign: 'justify' }}>The Service, including all content, features, and functionality, is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or distribute any part of the Service without permission.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550' }}>4. Disclaimers</Typography>
                                            <p style={{ textAlign: 'justify' }}><b>4.1 Content Accuracy</b>: While we make efforts to ensure the accuracy of content, we do not guarantee the accuracy, completeness, or reliability of any content on the Service.</p>
                                            <p style={{ textAlign: 'justify' }}><b>4.2 Third-Party Links</b>: The Service may include links to third-party websites or services. We are not responsible for the content or actions of third-party websites and services.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550' }}>5. Limitation of Liability</Typography>
                                            <p style={{ textAlign: 'justify' }}>To the fullest extent permitted by applicable law, {title.toLowerCase()}.com shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550' }}>6. Changes to Terms and Conditions</Typography>
                                            <p style={{ textAlign: 'justify' }}>We may revise and update these Terms and Conditions from time to time. Any changes will be posted on this page with the updated date. You are encouraged to review these Terms periodically.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550' }}>7. Contact Us</Typography>
                                            <p style={{ textAlign: 'justify' }}>If you have any questions about these Terms and Conditions, please contact us at <a className='text-link' href={`mailto:${site_email}`} title={site_email}>{site_email}</a></p>
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

export default TermsAndConditions;