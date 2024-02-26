// Packages
import React from "react";
import { useNavigate } from 'react-router-dom';

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
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// partial page
import Faq from "./Faq";
import MediaCategories from "./MediaCategories";
import TopPlayed from "./TopPlayed";
import Products from "./Products";

import { search } from '../../Features/searchSlice';

// Utilities
import { moveToClassName } from "../../Services/Utils";

// Config
import { title } from "../../Config/settings.config";

// Images
import { mainLogo, homeBackground } from "../../Config/images.config";

const Home = () => {

  document.title = title;

  var searchText = "";
  const type = 'home';

  const queryParams = new URLSearchParams(window.location.search);
  const searchKeyword = queryParams.get("keyword") === null ? "" : queryParams.get("keyword");

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

  return (
    <div className="landing-page">
      <ReactQueryTools/>
      <SideBar Type={type} subType={null} haveSearch={false}/>

      <div className="divFocus" style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 1)), url("${homeBackground}")`, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <center>
          <Container>
            <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0} justifyContent="center">
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: -50 }}>
                <div className="owner-image">
                      <img
                        src={mainLogo}
                        width={'300px'}
                        alt={title}
                      />
                </div>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                {/* <Typography variant="h5" style={{ marginBottom: 1, fontWeight: '550', color: '#ccced1 !important' }}>Watch Everywhere</Typography> */}
                <Typography variant="span" style={{ marginBottom: 1, fontWeight: '550', color: '#ccced1 !important' }}>Watch unlimited movies and tv shows on your phone, tablet and laptop.</Typography>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ textAlign: 'left' }} width={{ xs: '85vw', sm: '500px', md: '600px' }}>
                  <form onSubmit={(e) => queryHandler(e)}>
                            <Search>
                                <SearchIconWrapper>
                                <SearchIcon style={{ color: '#dddddd' }} />
                                </SearchIconWrapper>
                                <StyledInputBase
                                placeholder={'Type here and hit enter'}
                                onChange={(e) => searchChange(e)}
                                inputProps={{ 'aria-label': 'search', defaultValue: `${searchKeyword}` }}
                                required
                                />
                            </Search>
                    </form>
                </Box>

                <Box display={{ xs: 'block', md: 'none' }} style={{ marginTop: '100px', marginBottom: '-100px' }}>
                  <div style={{ cursor: 'pointer' }} onClick={() => moveToClassName('media-categories-divider')}><ArrowDownwardIcon sx={{ fontSize: '23px', marginBottom: '-5px' }}/> See More</div>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </center>
      </div>

      {/* #ccced1 */}
      <hr className="media-categories-divider" style={{ color: 'rgba(0, 0, 0, 255)', backgroundColor: 'rgba(0, 0, 0, 255)', marginInline: '30px', height: 0, width: 0 }}/>

      <div className="media-categories">
        <MediaCategories/>
      </div>

      <div className="media-top-played">
        <TopPlayed/>
      </div>

      <div className="media-products">
        <Products/>
      </div>

      <hr className="media-faq-divider" style={{ color: 'rgba(0, 0, 0, 255)', backgroundColor: 'rgba(0, 0, 0, 255)', marginInline: '30px', height: 0, width: 0 }} hidden/>
      
      <div className="faq">
        <Faq/>
      </div>

      <hr className="media-communities-divider" style={{ color: 'rgba(0, 0, 0, 255)', backgroundColor: 'rgba(0, 0, 0, 255)', marginInline: '30px', height: 0, width: 0 }} hidden/>

      <div className="footer-advertisements" hidden>
        <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={1} justifyContent="center">
          <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'}>
            <div id="container-8edd6f971e91335abcef94ec9add6c1b"></div>
          </Grid>
        </Grid>
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;
