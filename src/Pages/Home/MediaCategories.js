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

// Images
import { familyWatching } from "../../Config/images.config";

// Models
import { sub_menus } from "../../Services/SettingService";

const MediaCategories = () => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

     // React Query
    let getSubMenu = useQuery(['sub_menus', { is_active: 1, id: null }], sub_menus, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
    });

    let submenu = getSubMenu?.data?.data?.data;

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
                                <Typography variant="p" sx={{ fontWeight: '550', textTransform: 'uppercase' }}>Unlimited Movies, TV Series and more.</Typography>
                            </motion.div>
                        </center>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 15 }} hidden>
                        <Stack sx={{ width: '100%', textAlign: 'left !important' }} spacing={0}>
                            <Alert severity="info">
                                <AlertTitle>Attention Movie Enthusiasts!</AlertTitle>
                                🎬 We're aware of some hiccups in our <strong>International Movies</strong> and <strong>International Series</strong> sections. 🌍 Developer is on the case, working tirelessly to fix these issues ASAP! 🛠️ Your seamless streaming experience is our priority, and we appreciate your patience. Sit back, relax, and stay tuned for an improved movie-watching journey! 🍿✨ <strong>#TechFixInProgress</strong>
                            </Alert>
                        </Stack>
                    </Grid>

                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{ margin: 'auto', width: '640px', padding: '10px' }}>
                        <center>
                            <Container fluid="true" sx={{ width: '100%' }}>
                                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={1} justifyContent="center">
                                {submenu?.filter((item) => parseInt(item.is_main) === 1).map((item, index) => {
                                    return (
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={index}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -100 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 + (0.2 * index) }}
                                        >
                                            {item.is_dev ? 
                                                <Button className="provider-links" variant="contained" color={item.is_dev ? 'error' : 'primary'} fullWidth={true} style={{ fontWeight: '550' }}>{item.full_name} {item.is_dev ? '('+item.badge_message+')' : ''}</Button>
                                            : 
                                                <Link to={item.link}>
                                                    <Button className="provider-links" variant="contained" color={item.is_dev ? 'error' : 'primary'} fullWidth={true} style={{ fontWeight: '550' }}>{item.full_name} {item.is_dev ? '('+item.badge_message+')' : ''}</Button>
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
                                <img src={familyWatching} alt='' style={{ borderRadius: 10 }}/>
                            </motion.div>
                        </center>
                    </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default MediaCategories;