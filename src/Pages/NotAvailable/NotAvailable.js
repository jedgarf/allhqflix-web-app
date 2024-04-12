import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

// Config
import { allowed_countries } from '../../Config/settings.config';

// CSS
import './css/NotAvailable.css';

// Icons
import HomeIcon from '@mui/icons-material/Home';

// Images
import { homeBackground, offLimits } from "../../Config/images.config";

const NotAvailable = () => {
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            backgroundImage: `linear-gradient(rgba(2, 9, 22, 0.8),rgba(2, 9, 22, 0.8)) , url("${homeBackground}")`
        }}>
            <Grid container direction="row" columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2} justifyContent="center">
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <center>
                        <Box
                            component="img"
                            sx={{
                            height: 250,
                            width: 250,
                            textAlign: 'center',
                            maxHeight: { xs: 330, md: 377 },
                            maxWidth: { xs: 350, md: 450 },
                            }}
                            alt="Off Limit"
                            src={offLimits}
                            justifyContent="center" 
                            alignItems="center"
                        />
                        <h1>Website Unavailable</h1>
                        <p>This website are only accessible in the following countries: 
                        {
                            allowed_countries.map((country, index) => {
                                return (<>
                                    {index + 1 !== allowed_countries.length ?
                                    <>
                                    {index + 1 === allowed_countries.length - 1 ?
                                    ` ${country}`
                                    : 
                                    ` ${country}, `}
                                    </>
                                    : 
                                    ` and ${country}`}
                                </>);
                            })
                        }
                        .</p><br/>
                        <Link title='Homepage' to={`/`}><Button variant='contained' color='primary' size='small' startIcon={<HomeIcon/>}>Homepage</Button></Link>
                    </center>
                </Grid>
                {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <center>
                        <Link title='Homepage' to={`/`}><Button variant='contained' color='primary' size='small' startIcon={<HomeIcon/>}>Back to Homepage</Button></Link>
                    </center>
                </Grid> */}
            </Grid>
        </div>
    );
};

export default NotAvailable;