// Packages
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Framer Motion
import { motion } from "framer-motion";

// Material UI Componenets
import { Grid, Container, Box, Typography, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// Icons
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// CSS
import "./Home.css";

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
// import ParticleEffect from "../../Components/UI/ParticleEffect";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// partial page
import Faq from "./Faq";
import MediaCategories from "./MediaCategories";
import RecentWatched from "./RecentWatched";
import TopPlayed from "./TopPlayed";
import Products from "./Products";

import { search } from '../../Features/searchSlice';

// Utilities
import { moveToClassName } from "../../Services/Utils";

// Config
import { title, pageLoadMS } from "../../Config/settings.config";

// Images
import { mainLogo, homeBackground } from "../../Config/images.config";

const Home = () => {

  document.title = title;
  var searchText = "";
  const type = 'home';
  const queryParams = new URLSearchParams(window.location.search);
  const searchKeyword = queryParams.get("keyword") === null ? "" : queryParams.get("keyword");

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const searchChange = (e) => {
    searchText = e.currentTarget.value;
  }

  const queryHandler = (e) => {
    e.preventDefault();
    navigate(`/${type}/search?keyword=${search(searchText).payload}`);
  };

  // ---------------------------------------------------------------------------------------
  // Styles
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      color: 'white',
      [theme.breakpoints.only('xs')]: {
        width: '30ch',
      },
      [theme.breakpoints.up('sm')]: {
        width: '50ch',
        '&:focus': {
          width: '50ch',
        },
      },
    },
  }))

  // --------------------------------------------------------------------------------------------------- 

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, pageLoadMS);
  }, []);
  
  return (
    isLoading ? 
      <LoadingPage/>
     : 
    <div className="landing-page">
      {/* <ParticleEffect containerId="landing-page"/> */}
      <ReactQueryTools/>
      <SideBar Type={type} subType={null} haveSearch={false}/>

      <div className="home-bg" style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <center>
          <Container style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: 'inherit' }}>
            <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0} justifyContent="center">
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <motion.div 
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0 }}
                  className="owner-image"
                >
                      <img
                        src={mainLogo}
                        width={'300px'}
                        alt={title}
                      />
                </motion.div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                <motion.p 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }} 
                  className="text-white" 
                  style={{ marginBottom: 1, fontWeight: '550' }}
                >
                  For optimal viewing, use a PC or laptop for the best performance.
                </motion.p>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }} 
                >
                  <Box sx={{ textAlign: 'left' }} width={{ xs: '85vw', sm: '500px', md: '600px' }}>
                    <form onSubmit={(e) => queryHandler(e)}>
                              <Search>
                                  <SearchIconWrapper>
                                  <SearchIcon style={{ color: '#dddddd' }} />
                                  </SearchIconWrapper>
                                  <StyledInputBase
                                  placeholder={'Search here...'}
                                  onChange={(e) => searchChange(e)}
                                  inputProps={{ 'aria-label': 'search', defaultValue: `${searchKeyword}` }}
                                  required
                                  />
                              </Search>
                      </form>
                  </Box>
                </motion.div>

                {/* <Box display={{ xs: 'block', md: 'none' }} style={{ marginTop: '100px', marginBottom: '-100px' }}>
                  <div className="text-white" style={{ cursor: 'pointer' }} onClick={() => moveToClassName('media-categories-divider')}><ArrowDownwardIcon sx={{ fontSize: '23px', marginBottom: '-5px' }}/> See More</div>
                </Box> */}
              </Grid>
            </Grid>
          </Container>
        </center>
      </div>

      {/* #ccced1 */}
      {/* <Box display={{ xs: 'block', md: 'none' }}>
        <hr className="media-categories-divider" style={{ height: 0, width: 0 }}/>
      </Box> */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="media-categories">
          <MediaCategories/>
        </div>
      </motion.div>

      <div className="media-top-played" hidden>
        <TopPlayed/>
      </div>

      <hr className="media-faq-divider" style={{ color: 'rgba(0, 0, 0, 255)', backgroundColor: 'rgba(0, 0, 0, 255)', marginInline: '30px', height: 0, width: 0 }} hidden/>
      
      <div className="faq">
        <Faq/>
      </div>

      <div className="media-products" hidden>
        <Products/>
      </div>

      <FloatingButton/>
      <Footer />
    </div>
  );
}

export default Home;
