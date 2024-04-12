// Packages
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Material UI Componenets
import { Grid, Container, Box, Typography, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// Icons
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

// partial page
import RecentWatched from "../Home/RecentWatched";

// Utilities
import { moveToClassName } from "../../Services/Utils";

// Config
import { title, pageLoadMS } from "../../Config/settings.config";

// Images
import { mainLogo, homeBackground } from "../../Config/images.config";

const Home = () => {

  document.title = title;
  const type = 'home';
  const [isLoading, setIsLoading] = useState(true);


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
    <div className="movies">
      <ReactQueryTools/>
      <SideBar Type={type} subType={null} haveSearch={true}/>

      <div className="divFocus home-bg">
            <Container maxWidth={'xl'}>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={0}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ marginBottom: -50 }}>
                    <RecentWatched/>
                </Grid>
                </Grid>
            </Container>
      </div>
      <FloatingButton/>
      <Footer />
    </div>
  );
}

export default Home;
