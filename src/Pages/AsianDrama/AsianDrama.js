// Packages
import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from 'react-query';
import Skeleton from '@mui/material/Skeleton';

// Icons
import CircularProgress from '@mui/material/CircularProgress';

// CSS
import "./css/AsianDrama.css";
import "../../Assets/css/carousel.css"; // requires a loader

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import AsianDramaDiscovers from "../../Components/AsianDrama/AsianDramaDiscovers";
import AsianDramaRow from "../../Components/AsianDrama/AsianDramaRow";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

import Footer from "../../Components/Footer/Footer";

import { asiandrama_carousel, asiandrama_popular } from "../../Services/DramaCoolService";

const AsianDrama = () => {

  document.title = 'AllHQFlix - Asian Drama';

  const urlContentType = "asian_drama";
  const urlContentSubType = "asian_drama";

  let discoverData = useQuery('asiandrama_carousel', asiandrama_carousel, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
  });
  let discoverValue = discoverData.data?.data;
  console.log("discoverValue", discoverValue);

  let recentData = useQuery(['asiandrama_popular', { page: 1 }], asiandrama_popular, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
  });
  let recentValue = recentData.data?.data?.results;

  return (
      <div className="movies">
        <ReactQueryTools/>
        <SideBar Type={urlContentType} subType={urlContentSubType} />
        {<>
          <Box
            display={{ xs: 'none', md: 'block' }}
          >
            {discoverData.isLoading ? <center><Skeleton className="carousel-skeleton" sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" width={'98%'} height={535} /></center>
             : 
            <>
            <Carousel className="carousel" autoPlay={true} infiniteLoop={true} emulateTouch={true} showArrows={false} showStatus={false} interval={5000} transitionTime={3} stopOnHover={false}>
              {discoverValue?.map((item, i) => (
                <div className="movies__boxx">
                  <AsianDramaDiscovers
                    id={item?.id}
                    banner={item?.image}
                    title={item?.title}
                    des={item?.description}
                    year={item?.releaseDate}
                    genres={item?.genres}
                    episode={item?.episodes?.length}
                    slug={item?.type}
                    key={item?.id}
                  />
                </div>
              ))}
            </Carousel>
            </>
            }
          </Box>

          {recentData.isLoading ?
          <div className="top_content">
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress sx={{ fontSize: 100 }} />
            </Box>
          </div>
          : ''}
            
            {recentData.isSuccess ? 
            <>
              <div className="heading top_content">Popular Drama</div><br/>
              <div className="movies__boxs" style={{ marginLeft: '10px', marginRight: '10px' }}>
              <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 5 }} rowSpacing={2} justifyContent="center">
                {recentValue.map((data, i) => (
                  <Grid item xl={1.33} lg={2} md={3} sm={4} xs={6}>
                    <AsianDramaRow
                      cat={"default"}
                      id={data?.id}
                      img={data?.image}
                      title={data?.title}
                      release_date={data?.releaseDate}
                      type={data?.type}
                      rate={data?.rating}
                      episode={data?.totalEpisodes}
                      key={i}
                    />
                  </Grid>
                ))}
              </Grid>
              </div>
            </> : <><br/><br/><br/><br/><br/><br/><br/></> }
            
          <Footer />
        </>}
      </div>
  );
}

export default AsianDrama;