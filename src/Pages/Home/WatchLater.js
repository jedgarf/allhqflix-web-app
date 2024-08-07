import React from 'react';
import { Link } from 'react-router-dom';

// Framer Motion
import { motion } from "framer-motion";

// Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// React Query
import { useQuery } from 'react-query';

// Material UI Components
import { Grid, Typography, Container, Button, Alert, AlertTitle, Stack } from "@mui/material";

// Icons
import WatchLaterIcon from '@mui/icons-material/WatchLater';

// Models
import { sub_menus } from "../../Services/SettingService";

// Images
import { watchLaterImage } from "../../Config/images.config";

const WatchLater = () => {

    const submenu = sub_menus(1, null);

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0} style={{ margin: '100px auto 300px auto' }}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='text-white' style={{ marginBottom: 0 }}>
                        <center>
                            <motion.div
                                initial={{ opacity: 0, y: -100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0 }}
                            >
                                <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: '550' }}><WatchLaterIcon sx={{ fontSize: 28, marginBottom: '-5px' }}/> WATCH LATER</Typography>
                                <Typography variant="p" sx={{ fontWeight: '550', textTransform: 'uppercase' }}>You can now continue your viewing progress seamlessly.</Typography>
                            </motion.div>
                        </center>
                    </Grid>

                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{ margin: 'auto', width: 'auto' }}>
                        <center>
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                <img src={watchLaterImage} alt='' style={{ borderRadius: 10, width: '400px', maxWidth: '500px', alignSelf: 'center' }}/>
                            </motion.div>
                        </center>
                    </Grid>

                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{ margin: 'auto', width: 'auto' }}>
                        <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <Container sx={{ width: '100%', fontSize: '14px !important' }}>
                                <p style={{ textAlign: 'justify' }}>
                                    We are thrilled to announce the launch of our new "Watch Later" feature. You can now save your favorite movies and series to watch at your convenience.
                                </p>
                                <p style={{ textAlign: 'justify' }}>
                                    Please note that the "Watch Later" list will be saved in your browser's memory only. This means that your saved content will remain accessible as long as you use the same browser and device.
                                </p>
                                <p style={{ textAlign: 'justify' }}>
                                    Whether you want to revisit a classic, catch up on the latest episodes, or save a movie for a rainy day, the "Watch Later" feature has you covered. This new functionality enhances your viewing experience, ensuring you never miss out on your favorite content.
                                </p>
                                <p style={{ textAlign: 'justify' }}>
                                    Thank you for your continued support and happy viewing!
                                </p>
                                <Link to={'/watch_later'}>
                                    <Button variant='contained' color='primary' size='small' startIcon={<WatchLaterIcon/>} disabled={false}>
                                        Watch Later
                                    </Button>
                                </Link>
                            </Container>
                        </motion.div>
                    </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default WatchLater;