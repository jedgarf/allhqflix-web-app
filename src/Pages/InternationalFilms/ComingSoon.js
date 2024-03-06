// Packages
import React, { useState } from "react";

// React Query
import { useQuery } from 'react-query';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Icons
import CircularProgress from '@mui/material/CircularProgress';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import SearchResult from "../../Components/SearchResult/SearchResult";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";

import { moveToTop } from "../../Services/Utils";

// Models
import { movie_comming_soon } from "../../Services/FlixHQService";

function ComingSoon() {

  document.title = 'AllHQFlix - Coming Soon';
  const queryParams = new URLSearchParams(window.location.search);
  const type = 'foreign';
  const subType = 'foreigncomingsoon';
  const defaultPageNumber = queryParams.get("page") === null ? 1 : queryParams.get("page");
  const [page, setPage] = useState(defaultPageNumber);

  // loading
  const [isloadPicture, setIsloadPicture] = useState(true);

  let comingSoonData = useQuery(['movie_coming_soon', { page: page }], movie_comming_soon, {
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "tracked",
  });
  let comingSoonValue = comingSoonData.data?.data?.results;


  const pagePrev = () => {
    setIsloadPicture(true);
    setPage((page) => page - 1);
    moveToTop();
  }

  const pageNext = () => {
    setIsloadPicture(true);
    setPage((page) => page + 1);
    moveToTop();
  }

  return (
    <>
      <div className="search_result">
      <ReactQueryTools/>
       <div className="search_result_content">
        <div className="search__top">
          <SideBar Type={type} subType={subType}/>
        </div>

        <Grid container direction="row" columnSpacing={{ xs: 1, sm: 2, md: 10, lg: 10, xl: 0 }} rowSpacing={5}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

            <div className="content_types">
                <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>COMING SOON</Typography>
            </div>

          </Grid>
        </Grid>

        {<>
          {comingSoonData.isLoading ?
          (
            <div className="movie_result_pagination">
              <div className="movie_result_pagination_count">
                <CircularProgress sx={{ fontSize: 100 }} />
              </div>
            </div>
           ) : (
            <>
              <div className="movie_result_pagination">
                <div className="movie_result_pagination_buttons">
                  <Stack spacing={2} direction="row" mt={2}>
                    {comingSoonData.data?.data?.currentPage > 1 ? <Button variant="contained" size="small" onClick={() => pagePrev()}><b>Previous</b></Button> : ""}
                    {comingSoonData.data?.data?.hasNextPage === true ? <Button variant="contained" size="small" onClick={() => pageNext()}><b>Next</b></Button> : ""}
                  </Stack>
                </div>
            </div>
            {comingSoonValue?.length > 0 ? (
            <div className="movie_result_data">
              <Grid container columnSpacing={{ xs: 3, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={3} justifyContent="center">
                {comingSoonValue.map((data, index) => (
                  <Grid item xl={'auto'} lg={'auto'} md={'auto'} sm={'auto'} xs={'auto'} key={index}>
                    <SearchResult
                      isloadImage={isloadPicture}
                      contentType={type}
                      id={data?.id}
                      img={data?.image}
                      title={ data?.title?.english || data?.title?.userPreferred || data?.title?.romaji || data?.title?.native || data?.title || data?.name }
                      release_date={data?.releaseDate || data?.Year?.name}
                      rate={data?.rating}
                      season={data?.seasons}
                      episode={data?.totalEpisodes}
                      type={data?.type || data?.Type?.name}
                      // slug={data?.slug}
                      video_quality={data?.video_quality}
                      hasLink={false}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
            ) : (
            <div className="movie_result_pagination">
              <div className="movie_result_pagination_count">
                No Result Found.
              </div>
            </div>
           )}
            <div className="movie_result_pagination">
                <div className="movie_result_pagination_buttons">
                  <Stack spacing={2} direction="row" mt={2}>
                    {comingSoonData.data?.data?.currentPage > 1 ? <Button variant="contained" size="small" onClick={() => pagePrev()}><b>Previous</b></Button> : ""}
                    {comingSoonData.data?.data?.hasNextPage === true ? <Button variant="contained" size="small" onClick={() => pageNext()}><b>Next</b></Button> : ""}
                  </Stack>
                </div>
            </div>
            </>
           )}
          </>}
       </div>
      <Footer/>
      </div>
    </>
  );
}

export default ComingSoon;
