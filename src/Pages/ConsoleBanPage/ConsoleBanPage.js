import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ConsoleBanPage = () => {
    return (
        <div>
            <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={1} justifyContent="center">
                <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'}>
                    <Typography sx={{ color: 'white' }}>
                        Devtools is disabled.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default ConsoleBanPage;