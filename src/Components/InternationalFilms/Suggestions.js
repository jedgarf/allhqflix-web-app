// Packages
import React, {Fragment, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

// Auto Slider
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Pages
import { favAdd } from "../../Features/favSlice";
import MoviesRow from "../../Components/InternationalFilms/MoviesRow";

// Config
import { suggestion_movie_card_carousel_settings } from "../../Config/settings.config";

export default function Suggestions({Suggest, Type}) {
    
    const contentType = Type === 'movie' ? 'Movie' : 'TV Series';

    return (
        <div className='suggestion_content'>
            <Slider {...suggestion_movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                {Suggest?.filter((item) => item.type == contentType).map((item, i) => {
                    return (
                        <Fragment>
                            <MoviesRow
                                isloadImage={true}
                                cat={'suggestions'}
                                id={item?.id}
                                img={item?.image}
                                title={item?.title || item?.name || item?.aka || item?.slug}
                                release_date={item?.releaseDate}
                                // rate={item?.liked}
                                type={item?.type || item?.Type?.name}
                                // slug={item?.slug}
                                duration={item?.duration}
                                video_quality={item?.video_quality}
                                key={i}
                            />
                        </Fragment>
                    )
                })}
            </Slider>
        </div>
    )
}
