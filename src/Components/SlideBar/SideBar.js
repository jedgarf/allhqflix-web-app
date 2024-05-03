import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Framer Motion
import { motion } from "framer-motion";

// React Query
import { useQuery } from 'react-query';

// Custom CSS
import './SideBar.css';

// Material UI Components
import { AppBar, Box, Toolbar, Container, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { useMediaQuery, createTheme } from "@material-ui/core";

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Components
import { search } from '../../Features/searchSlice';
import AuthModal from "../Modal/AuthModal";
import DevAlert from "../DevAlert/DevAlert";
import AuthMenu from "../AuthMenu/AuthMenu";
import SearchBar from "../SearchBar/SearchBar";
import Latency from "../../Components/Latency/Latency";
import HeaderMenu from "./HeaderMenu";
import MobileSideBar from "./MobileSideBar";
import Login from "../Auth/Login";

// Config
import { title, search_bar } from "../../Config/settings.config";

// Images
import header_logo from "../../Assets/images/header_logo.JPG";

// utils
import { moveToTop } from "../../Services/Utils";

// Helpers
import { getSession } from "../../Helpers/Sessions";

// Models
import { menus, sub_menus } from "../../Services/SettingService";

const SideBar = ({ Type, subType, haveSearch = true,  transparentBg = true, isStream = false, setIsPageAuth }) => {

  const menu = menus("FEATURE", 1, null);
  const submenu = sub_menus(1, null);
  
  const searchRef = useRef("");
  const [isScrollTop, setIsScrollTop] = useState(true);

  const [auth, setAuth] = useState(getSession('user') ? true : false);

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const searchKeyword = queryParams.get("keyword") === null ? "" : queryParams.get("keyword");

  // Determine if mobile size
  const theme = createTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'));

  const isAuth = (authStatus) => {
    setAuth(authStatus);
    if(typeof setIsPageAuth === 'function') setIsPageAuth(authStatus);
  }

  const queryHandler = (e) => {
    e.preventDefault();
    let searchText = searchRef.current.value;
    navigate(`/${Type}/search?keyword=${search(searchText).payload}`);
  };

  // ---------------------------------------------------------------------------------------------
  // Styles
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.35),
    backgroundColor: 'transparent',
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.common.white, 0.20),
    // },
    '&:focus': {
      opacity: 1,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      // marginLeft: '-150px',
      backgroundColor: searchKeyword ? 'rgba(var(--body-raw-color), 0.5)' : 'transparent',
      width: 'auto',
    },
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto',
    // },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: searchKeyword ? '30ch' : '0ch',
        '&:focus': {
          width: '30ch',
          opacity: 1,
          borderRadius: 5,
          backgroundColor: alpha(theme.palette.common.white, 0.15),
        },
      },
      [theme.breakpoints.only('xs')]: {
        width: searchKeyword ? '100%' : '0ch',
        '&:focus': {
          width: '100%',
          opacity: 1,
          borderRadius: 5,
          backgroundColor: alpha(theme.palette.common.white, 0.15),
        },
      },
    },
  }));
  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrollTop(true);
      } else {
        if (isStream && isMobileSize) {
          setIsScrollTop(true); 
        } else {
          setIsScrollTop(false); 
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollTop, isStream, isMobileSize]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position={`fixed`} className={ isScrollTop ? 'app-bar-transparent' : 'app-bar-stream' } elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/* Header Logo */}
            <Link to="/" onClick={(event) => moveToTop()}>
                <Box
                    component="img"
                    sx={{
                      height: 25,
                      width: 90,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                      display: { xs: 'none', lg: 'flex' },
                      marginRight: '20px'
                    }}
                    alt={title}
                    src={header_logo}
                />
            </Link>

            {/* menu for mobile */}
            <MobileSideBar Type={Type} subType={subType} menu={menu} submenu={submenu}/>

            
            {/* Menu in non mobile size */}
            <HeaderMenu Type={Type} subType={subType} menu={menu} submenu={submenu}/>
              
            {/* Search */}
            {search_bar === true && haveSearch && 
              <Box sx={{ my: 0, flexGrow: 0 }}>
                <form onSubmit={(e) => queryHandler(e)}>
                  <Search>
                      <SearchIconWrapper>
                      <SearchIcon sx={{ fontSize: '25px', color: 'var(--main-red)' }} />
                      </SearchIconWrapper>
                      <StyledInputBase
                      size='small'
                      inputRef={searchRef}
                      placeholder={'Search here...'}
                      inputProps={{ 'aria-label': 'search', defaultValue: `${searchKeyword}` }}
                      required
                      />
                  </Search>
                </form>
              </Box>
            }

            {/* Search Bar */}
            {/* {search_bar === true && haveSearch && 
              <Box sx={{ flexGrow: 0 }}>
                <SearchBar/>
              </Box>
            } */}
            
            {!haveSearch && <Latency/>}
            
            {/* Login Modal */}
            <Box sx={{ flexGrow: 0, marginLeft: 1 }}>
              { auth ?
                <AuthMenu isStream={isStream} isAuth={isAuth}/>
               : 
                <Login isMobileSize={isMobileSize} haveSearch={haveSearch} isStream={isStream} isAuth={isAuth} align={'right'}/>
              }
            </Box>

            {/* Dev Notifications */}
            {/* {!haveSearch && 
              <Box sx={{ flexGrow: 0 }}>
                <DevAlert/>
              </Box>
            } */}

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default SideBar;