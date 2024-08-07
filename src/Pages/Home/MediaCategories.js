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
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

// Models
import { sub_menus } from "../../Services/SettingService";

// Images
import { homeBackground1 } from "../../Config/images.config";

const MediaCategories = () => {

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
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={3} style={{ margin: '200px auto 300px auto', padding: '0px' }}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className='text-white' style={{ marginBottom: 15 }}>
                        <center>
                            <motion.div
                                initial={{ opacity: 0, y: -100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0 }}
                            >
                                <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: '550' }}><SubscriptionsIcon sx={{ fontSize: 28, marginBottom: '-6px' }}/> FEATURES</Typography>
                                <Typography variant="p" sx={{ fontWeight: '550', textTransform: 'uppercase' }}>Unlimited Anime, Movies and TV Series.</Typography>
                            </motion.div>
                        </center>
                    </Grid>

                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{ margin: 'auto', width: 'auto' }}>
                        <center>
                            <Container sx={{ width: '100%' }}>
                                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={2} justifyContent="center">
                                {submenu?.filter((item) => parseInt(item.is_main) === 1 && item.is_active).map((item, index) => {
                                    return (
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={index}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -100 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 + (0.2 * index) }}
                                        >
                                            {item.is_dev ? 
                                                <Button className="provider-links" variant="contained" color={item.is_dev ? 'error' : 'primary'} fullWidth={true} style={{ fontWeight: '550', height: '50px', backgroundImage: `linear-gradient(rgba(var(--header-raw-color), 0.9), rgba(var(--header-raw-color), 0.3), rgba(var(--header-raw-color), 0.9)))`, fontSize: '15px' }}>{item.full_name} {item.is_dev ? '('+item.badge_message+')' : ''}</Button>
                                            : 
                                                <Link to={item.link}>
                                                    <Button className="provider-links" variant="contained" color={item.is_dev ? 'error' : 'primary'} fullWidth={true} style={{ fontWeight: '550', height: '50px', backgroundImage: `linear-gradient(rgba(var(--header-raw-color), 0.9), rgba(var(--header-raw-color), 0.3), rgba(var(--header-raw-color), 0.9)))`, fontSize: '15px' }}>{item.full_name} {item.is_dev ? '('+item.badge_message+')' : ''}</Button>
                                                </Link>
                                            }
                                        </motion.div>
                                    </Grid>
                                    )
                                })}
                                </Grid>
                            </Container>
                        </center>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{ marginTop: 5 }}>
                        <center>
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                <img src={homeBackground1} alt='' style={{ borderRadius: 10 }}/>
                            </motion.div>
                        </center>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 15 }}>
                        <Stack sx={{ width: '100%', textAlign: 'left !important' }} spacing={0}>
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                <Alert severity="info">
                                    <AlertTitle>Good News!</AlertTitle>
                                    We're thrilled to announce that we're actively working on enabling downloads for your favorite movies and series.<br/>
                                    This upcoming feature will allow you to enjoy your preferred content offline, at any time and anywhere.<br/>
                                    Stay tuned for more updates as we prepare to launch this amazing new functionality soon.<br/>
                                    Thank you for your continued support and happy viewing!
                                </Alert>
                            </motion.div>
                        </Stack>
                    </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default MediaCategories;