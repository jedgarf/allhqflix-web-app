import React, { Fragment } from "react";

// CSS
import "./PageNotFound.css";

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";

// Images
import { notFoundImage } from "../../Config/images.config";

function PageNotFound() {

  return (
    <Fragment>
      <div className="landing-page">
        <SideBar Type={'home'} subType={null}/>
        <div className="error_404_image">
            <img src={notFoundImage} alt="404 not found" />
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default PageNotFound;
