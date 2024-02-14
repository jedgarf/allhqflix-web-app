import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom CSS
import './SideBar.css';

// Material UI Components
import { Box, IconButton, Divider, Drawer, List, CircularProgress, Badge, Paper, Button } from '@mui/material';
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from "@material-ui/core";
import { styled, alpha } from '@mui/material/styles';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AndroidIcon from '@mui/icons-material/Android';
import WebIcon from '@mui/icons-material/Web';
import InfoIcon from '@mui/icons-material/Info';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

// Components
import SideBarListItem from "./SideBarListItem";

// Config
import { title } from "../../Config/settings.config";

// Images
import main_logo from "../../Assets/images/multimedia_hub_logo.png";

// utils
import { useContainerDimensions, moveToTop } from "../../Services/Utils";


const useStyles = makeStyles({
    text: {
      fontWeight: "bold",
      fontFamily: "courier",
      fontSize: "12px !important"
    },
    appBarTransparent: {
      backgroundColor: 'rgba(15, 22, 34, 0.5) !important'
    },
    appBarSolid: {
      backgroundColor: 'rgba(15, 22, 34, 255) !important'
    }
});

const MobileSideBar = ({ Type, subType, getMenu, menu, submenu }) => {

    const drawerWidth = 270;

    const componentRef = useRef();
    const { pxWidth } = useContainerDimensions(componentRef);
    
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const gotoHome = () => {
        setMobileOpen(!mobileOpen);
        moveToTop();
    }

    const StyledSubBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -9,
        top: 0,
        padding: '1px 5px',
        fontSize: 7
    },
    }));

    // ---------------------------------------------------------------------------------------------------
    
    const drawer = (
        <>
            <Link to="/" onClick={(event) => gotoHome()}>
                <center>
                    <Box
                        component="img"
                        sx={{
                        my: 4,
                        mx: 0,
                        height: 123,
                        width: 175,
                        display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' },
                        }}
                        alt={title}
                        src={main_logo}
                    />
                </center>
            </Link>
            {getMenu.isLoading ?
            <center>
                <CircularProgress sx={{ fontSize: 10 }} />
            </center>
                : 
            <>
                <Divider />

                <div>
                    <List subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        CATEGORIES
                    </ListSubheader>
                    }>
                        {menu?.filter((item) => { return item.is_active === true }).sort((a, b) => { return a.sequence - b.sequence }).map((page, index) => {
                            return page.code === Type ? 
                            <SideBarListItem page={page} subType={subType} subPage={submenu} classes={classes} selected={true} />
                            :
                            <SideBarListItem page={page} subType={subType} subPage={submenu} classes={classes} selected={false} />
                        })}
                    </List>
                </div>

                {/*  style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} */}

                <div>
                    <List style={{ paddingTop: '5px' }} subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        OTHER SITES
                    </ListSubheader>
                    }>
                        <a href={`https://media-alchemy.vercel.app/`} target="__blank" style={{ textDecoration: 'none', fontWeight: 'bolder !important' }}>
                            <ListItem disablePadding>
                                <ListItemButton selected={false} style={{ color: '#DC4C64', fontWeight: '550' }}>
                                    <ListItemIcon>
                                        <WebIcon sx={{ color: "#3B71CA" }} />
                                    </ListItemIcon>
                                        <StyledSubBadge badgeContent={`Beta`} color="error">
                                        <ListItemText className='sidebar-no-link-menu' primary={'MEDIA ALCHEMY'} classes={{ primary: classes.text }} />
                                        </StyledSubBadge>
                                </ListItemButton>
                            </ListItem>
                        </a>
                    </List>
                </div>

                <div>
                    <List style={{ paddingTop: '5px' }} subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        SITE INFORMATION
                    </ListSubheader>
                    }>
                        <Link to={`/terms_and_conditions`} style={{ textDecoration: 'none', fontWeight: 'bolder !important' }}>
                            <ListItem disablePadding>
                                <ListItemButton selected={Type === "terms_and_conditions" ? true : false} style={{ color: '#DC4C64', fontWeight: '550' }}>
                                <ListItemIcon>
                                    <InfoIcon sx={{ color: "#3B71CA" }} />
                                </ListItemIcon>
                                    <ListItemText className='sidebar-no-link-menu' primary={'TERMS AND CONDITIONS'} classes={{ primary: classes.text }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={`/privacy_policy`} style={{ textDecoration: 'none', fontWeight: 'bolder !important' }}>
                            <ListItem disablePadding>
                                <ListItemButton selected={Type === "privacy_policy" ? true : false} style={{ color: '#DC4C64', fontWeight: '550' }}>
                                <ListItemIcon>
                                    <PrivacyTipIcon sx={{ color: "#DC4C64" }} />
                                </ListItemIcon>
                                    <ListItemText className='sidebar-no-link-menu' primary={'PRIVACY POLICY'} classes={{ primary: classes.text }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={`/about_developers`} style={{ textDecoration: 'none', fontWeight: 'bolder !important' }}>
                            <ListItem disablePadding>
                                <ListItemButton selected={Type === "about_developers" ? true : false} style={{ color: '#DC4C64', fontWeight: '550' }}>
                                <ListItemIcon>
                                    <PersonIcon sx={{ color: "#54B4D3" }} />
                                </ListItemIcon>
                                    <ListItemText className='sidebar-no-link-menu' primary={'ABOUT THE DEVELOPERS'} classes={{ primary: classes.text }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={`/contact_us`} style={{ textDecoration: 'none', fontWeight: 'bolder !important' }}>
                            <ListItem disablePadding>
                                <ListItemButton selected={Type === "contact_us" ? true : false} style={{ color: '#DC4C64', fontWeight: '550' }}>
                                <ListItemIcon>
                                    <EmailIcon sx={{ color: "#3B71CA" }} />
                                </ListItemIcon>
                                    <ListItemText className='sidebar-no-link-menu' primary={'CONTACT US'} classes={{ primary: classes.text }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </>
            }
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;
    // ---------------------------------------------------------------------------------------------------

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            <Box>
                <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
                sx={{ mr: 2 }}
                >
                <MenuIcon sx={{ color: '#DC4C64' }} />
                </IconButton>
            </Box>

            <Box
                component="nav"
                sx={{ flexShrink: { xs: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    // display: { xs: 'flex', lg: 'none' },
                    position: 'relative',
                    // overflow: 'hidden',
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
};

export default MobileSideBar;