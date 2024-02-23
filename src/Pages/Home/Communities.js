import React from 'react';

// Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Grid, Typography, Container } from "@mui/material";

// Icons
import GroupsIcon from '@mui/icons-material/Groups';

import { consumetLogo } from '../../Config/images.config';

const Communities = () => {
    
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0} style={{ margin: '85px auto 85px auto', padding: '0px' }}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 25 }}>
                        <center>
                            <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: '550' }}><GroupsIcon sx={{ fontSize: 45, marginBottom: '-10px' }}/> COMMUNITY</Typography>
                            <Typography variant="p" sx={{ fontWeight: '550', textTransform: 'uppercase' }}>To all aspirant software developers/engineers, you can join to our growing international group.</Typography>
                        </center>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <center>
                            <a href='https://discord.gg/qTPfvMxzNH' title='Consumet' target='__blank'>
                                <img src={consumetLogo} alt='Consumet Logo' width={`200px`} style={{ marginBottom: '30px' }}/>
                            </a>
                            <br/>
                            <a href='https://discord.gg/qTPfvMxzNH' title='Consumet' target='__blank'>
                                <img src='https://discordapp.com/api/guilds/987492554486452315/widget.png?style=banner2' alt='Discord Banner'/>
                            </a>
                        </center>
                    </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Communities;