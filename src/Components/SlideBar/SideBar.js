import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const SideBar = ({ Type, subType, haveSearch = true,  transparentBg = true, isStream = false }) => {

  const searchRef = useRef("");
  const [isGetMenu, setIsGetMenu] = useState(true);
  const [isGetSubMenu, setIsGetSubMenu] = useState(true);

  const [auth, setAuth] = useState(getSession('user') ? true : false);

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const searchKeyword = queryParams.get("keyword") === null ? "" : queryParams.get("keyword");

  // Determine if mobile size
  const theme = createTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'));

  const isAuth = (authStatus) => {
    setAuth(authStatus);
  }

  const queryHandler = (e) => {
    e.preventDefault();
    let searchText = searchRef.current.value;
    navigate(`/${Type}/search?keyword=${search(searchText).payload}`);
  };

  // -------------------------------------------------------------------------------------------
  // data source
  let getMenu = useQuery(['menus', { type: "FEATURE", is_active: 1, id: null }], menus, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    enabled: isGetMenu,
    onSuccess: (response) => {
      setIsGetMenu(false);
    }
  });
  let menu = getMenu?.data?.data?.data;

  let getSubMenu = useQuery(['sub_menus', { is_active: 1, id: null }], sub_menus, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    enabled: isGetSubMenu,
    onSuccess: (response) => {
      setIsGetSubMenu(false);
    }
  });

  let submenu = getSubMenu?.data?.data?.data;
  // ---------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  // Styles
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.35),
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.20),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.common.white, 0.20),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      // marginLeft: '-150px',
      backgroundColor: searchKeyword ? alpha(theme.palette.common.white, 0.15) : 'transparent',
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
        },
      },
      [theme.breakpoints.only('xs')]: {
        width: searchKeyword ? 'auto' : '0ch',
        '&:focus': {
          width: 'auto',
        },
      },
    },
  }));
  // ----------------------------------------------------------------------------------------------------

  // Switching AppBar Color 
  var appbarClassName = "";
  if(isMobileSize){
    if (isStream === true) {
      appbarClassName = 'app-bar-stream';
    } else {
      appbarClassName = 'app-bar-transparent';
    }
  } else {
    appbarClassName = 'app-bar';
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={ appbarClassName } elevation={0}>
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
            <MobileSideBar Type={Type} subType={subType} getMenu={getMenu} menu={menu} submenu={submenu}/>

            
            {/* Menu in non mobile size */}
            <HeaderMenu Type={Type} subType={subType} getMenu={getMenu} menu={menu} submenu={submenu}/>
              
            {/* Search */}
            {search_bar === true && haveSearch ? 
              <Box sx={{ my: 0, flexGrow: 0 }}>
                <form onSubmit={(e) => queryHandler(e)}>
                    {/* <Toolbar>  */}
                        <Search>
                            <SearchIconWrapper>
                            <SearchIcon sx={{ fontSize: '25px', color: '#DC4C64' }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                            size='small'
                            inputRef={searchRef}
                            placeholder={'Search here...'}
                            inputProps={{ 'aria-label': 'search', defaultValue: `${searchKeyword}` }}
                            required
                            />
                        </Search>
                    {/* </Toolbar> */}
                </form>
              </Box>
            : ''}

            {/* <Box sx={{ flexGrow: 0 }} display={{ xs: 'none', sm: 'none' }}>
              <IconButton onClick={(e) => openSideBarMenu(e)}>
                  <SearchIcon sx={{ color: '#DC4C64' }}/>
              </IconButton>
            </Box> */}

            {/* Search Bar */}
            {/* {search_bar === true && haveSearch ? 
              <Box sx={{ flexGrow: 0 }} hidden>
                <SearchBar/>
              </Box>
            : ''} */}
            
            {/* {isStream && <Latency/>} */}

            {/* Dev Notifications */}
            {/* <Box sx={{ flexGrow: 0 }}>
              <DevAlert/>
            </Box> */}
            
            {/* Login Modal */}
            <Box sx={{ flexGrow: 0, marginLeft: 1 }}>
              { auth ?
                <AuthMenu isStream={isStream} isAuth={isAuth}/>
               : 
                <Login isMobileSize={isMobileSize} haveSearch={haveSearch} isStream={isStream} isAuth={isAuth} align={'right'}/>
              }
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default SideBar;