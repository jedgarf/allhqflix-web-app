import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

// Material UI Components
import { Grid, Container, Card, CardContent, Typography } from '@mui/material';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// Config
import { title } from "../../Config/settings.config";

// Images
import { homeBackground } from "../../Config/images.config";

const PrivacyPolicy = () => {

    document.title = 'AllHQFlix - Privacy Policy';
    const type = 'privacy_policy';

    useEffect(() => {
        document.getElementsByClassName('divFocus')[0].focus();
    })

    return (
        <div>
            <div className="landing-page">
                <ReactQueryTools/>
                <SideBar Type={type} subType={null} haveSearch={true} transparentBg={false} isStream={true}/>
                    <div className="divFocus" style={{backgroundImage: `linear-gradient(rgba(2, 9, 22, 0.8),rgba(2, 9, 22, 0.8))` }}>
                        <div style={{ marginTop: '70px', minHeight: 600, width: '99vw' }}>

                        <Grid container rowSpacing={9}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Card sx={{ minHeight: '150px', marginInline: '10px' }} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${homeBackground}")`, paddingTop: '40px' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ textTransform: 'uppercase', fontWeight: 550, textAlign: 'center', color: '#ccced1' }}>
                                            Privacy Policy
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Container fluid="true">
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={3} style={{ fontWeight: 'normal', fontSize: '14px' }}>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h5' style={{ color: '#ccced1' }}>Last Updated: October 20, 2023</Typography>
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <p style={{ textAlign: 'justify' }}>At {title.toLowerCase()}.vercel.app, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information and data while you use our website and services.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550', color: '#ccced1' }}>Information We Collect</Typography>
                                            <p style={{ marginBottom: '3px' }}>We collect limited information to provide and improve our services:</p>
                                            <div style={{ marginTop: '5px' }}>
                                                <p><b>Log Data</b>: We automatically collect log data, including your IP address, browser type, and the pages you visit on our site.</p>
                                                <p><b>Cookies</b>: We use cookies to enhance your experience and for analytics. You can manage cookie settings in your browser.</p>
                                            </div>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550', color: '#ccced1' }}>How We Use Your Information</Typography>
                                            <p>We use the collected information for the following purposes:</p>
                                            <div style={{ marginTop: '5px' }}>
                                                <p><b>Improvement</b>: To analyze and improve our services.</p>
                                                <p><b>Security</b>: To monitor and enhance the security of our website.</p>
                                                <p><b>Analytics</b>: To understand user behavior and preferences.</p>
                                            </div>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550', color: '#ccced1' }}>Third-Party Services</Typography>
                                            <p>We use third-party services (e.g., Google Analytics) that may collect and use your information. Their privacy policies apply.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550', color: '#ccced1' }}>Data Sharing and Disclosure</Typography>
                                            <p>We do not share your personal information with third parties. We may share aggregated, non-personal information for analytics and research.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550', color: '#ccced1' }}>Data Security</Typography>
                                            <p>We take reasonable measures to protect your data. However, no data transmission over the internet is completely secure.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550', color: '#ccced1' }}>Data Sharing and Disclosure</Typography>
                                            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.</p>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant='h6' style={{ marginBottom: '5px', fontWeight: '550', color: '#ccced1' }}>Contact Us</Typography>
                                            <p>If you have questions about this Privacy Policy, please click <Link className='text-link' to={`/contact_us`}>here</Link> to contact us.</p>
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

export default PrivacyPolicy;