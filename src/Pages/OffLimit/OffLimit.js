import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

// CSS
import './css/OffLimit.css';

// Icons
import HomeIcon from '@mui/icons-material/Home';

// Images
import { homeBackground, offLimits } from "../../Config/images.config";

const OffLimit = () => {

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
                            height: 330,
                            width: 350,
                            textAlign: 'center',
                            maxHeight: { xs: 330, md: 377 },
                            maxWidth: { xs: 350, md: 450 },
                            }}
                            alt="Off Limit"
                            src={offLimits}
                            justifyContent="center" 
                            alignItems="center"
                        />
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

export { OffLimit };