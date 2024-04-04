import React, { Fragment } from "react";
import "./Footer.css";
import moment from 'moment';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

// Components
import CookiesConsentDialog from "../CookiesConsentDialog/CookiesConsentDialog";

import { title, version } from "../../Config/settings.config";
import { moveToTop } from "../../Services/Utils";

function Footer() {

    return (
        <Fragment>
        <CookiesConsentDialog/>
        <br/><br/><br/>
            <footer className="footer">
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 10, lg: 10, xl: 10 }} rowSpacing={1}>
                    <Grid item xl={7} lg={7} md={6} sm={12} xs={12} display={{ xs: 'none', sm: 'none', md: 'block' }}>
                        <div className="footer_title footer_content_header">
                            <div className="heading">
                                <h3><b>{title} v{version}</b></h3>
                            </div>
                            <div className="footer_text">
                                <p>{title} allows users to watch tens of thousands of Movies, TV shows, Anime and Asian Films in HD quality safely, freely, and smoothly. Despite the extensive content library and premium features, {title} does not require any commitment from users. You are not obliged to pay, or even register to enjoy your favorite movies on the site without limits. We update new titles on a daily basis; therefore, you can rest assured, the fun never ends on {title}. Sharing is caring! Introduce {title} to your friends and family to protect them from shady and low-quality sites.</p>
                                <br/>
                                <p><b>Disclaimer:</b> This site does not store any files on its server. All contents are provided by non-affiliated third parties.</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xl={4} lg={4} md={5} sm={12} xs={12}>
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 10, lg: 10, xl: 10 }} rowSpacing={1}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginTop: '10px', marginBottom: '-20px' }}>
                                <div className="link-head-title" style={{ fontWeight: 'bolder' }}>LINKS</div>
                            </Grid>
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                <div className="footer_links">
                                    <ul type='none'>
                                        <li><Link className="text-link" to="/" onClick={moveToTop}>Home Page</Link></li>
                                        <li><Link className="text-link" to="/foreign/movies">Movies</Link></li>
                                        <li><Link className="text-link" to="/foreign/tvshow">TV Series</Link></li>
                                        <li><Link className="text-link" to="/anime">Anime</Link></li>
                                        {/* <li><Link className="text-link" to="/asian_drama">Asian Films</Link></li> */}
                                        {/* <li><Link className="text-link" to="/asian_films">Asian Films</Link></li> */}
                                        <li><Link className="text-link" to="/">Asian Films (UD)</Link></li>
                                        {/* <li><Link className="text-link" to="/tv_channels">TV Channels</Link></li> */}
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item xl={7} lg={7} md={7} sm={7} xs={7}>
                                <div className="footer_links">
                                    <ul type='none'>
                                        <li><Link className="text-link" to="/native_apps">Mobile App</Link></li>
                                        {/* <li><Link className="text-link" to="/about_developers">About the Developers</Link></li> */}
                                        <li><Link className="text-link" to="/terms_and_conditions">Terms & Conditions</Link></li>
                                        <li><Link className="text-link" to="/privacy_policy">Privacy Policy</Link></li>
                                        <li><Link className="text-link" to="/contact_us">Contact Us</Link></li>
                                        {/* <li><a href="/sitemap.xml" target="__blank">Site Map</a></li> */}
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="lower-footer">
                            <div className="copyRight">
                                {title} 2023. All Rights Reserved.
                                {/* {moment().format('YYYY')} */}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </footer>
        </Fragment>
    );
}

export default Footer;
