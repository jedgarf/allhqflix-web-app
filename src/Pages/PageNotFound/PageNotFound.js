// Packages
import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

// CSS
import "./PageNotFound.css";

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";

// Images
import { notFoundImage } from "../../Config/images.config";

function PageNotFound() {

  return (
    <>
      <div className="landing-page">
        <SideBar Type={'home'} subType={null}/>
        <div className="error_404_image">
            <img src={notFoundImage} alt="404 not found" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PageNotFound;
