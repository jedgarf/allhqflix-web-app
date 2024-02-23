import React from 'react';

// Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Grid, Typography, Container, Badge } from "@mui/material";

// Icons
import WebIcon from '@mui/icons-material/Web';

// Config
import { mediaAlchemyLogo } from '../../Config/images.config';

const Products = () => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={3} style={{ margin: '85px auto 85px auto', padding: '0px' }}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 50 }}>
                        <center>
                            <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: '550' }}><WebIcon sx={{ fontSize: 28, marginBottom: '-6px' }}/> OTHER USEFUL SITES</Typography>
                        </center>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{ margin: 'auto', width: '640px', padding: '10px' }}>
                        <center>
                            <a href='https://media-alchemy.vercel.app/' target='__blank'>
                                <Badge badgeContent={'Beta'} color="error">
                                    <img src={mediaAlchemyLogo} alt='Media Alchemy Logo'  style={{ borderRadius: 10, width: '300px' }}/>
                                </Badge>
                            </a>
                        </center>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Products;