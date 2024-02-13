import React from 'react';
import Grid from '@mui/material/Grid';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

import "./UnderMaintenance.css";

const UnderMaintenance = () => {
    return (
        <div className='content'>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 5, xl: 5 }} rowSpacing={5}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <ReportGmailerrorredIcon style={{fontSize: '200px'}} />
                    <h1>We&rsquo;ll be back soon!</h1>
                    <div>
                        <p>Sorry for the inconvenience. We&rsquo;re performing some maintenance at the moment. If you need to, you can always follow us on <a href="https://github.com/jedgarf" target="__blank">GitHub</a> for updates, otherwise we&rsquo;ll be back up shortly!</p>
                        <p>&mdash; The Multimedia Hub Developer</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default UnderMaintenance;