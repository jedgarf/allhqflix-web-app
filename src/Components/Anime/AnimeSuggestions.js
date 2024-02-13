// Packages
import React, {Fragment, useEffect} from 'react';
import Grid from '@mui/material/Grid';

// Auto Slider
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// CSS
import "./css/AnimeSuggestions.css";

// Pages
import { favAdd } from "../../Features/favSlice";
import AnimeRow from "../../Components/Anime/AnimeRow";

// Config
import { suggestion_movie_card_carousel_settings } from "../../Config/settings.config";

export default function AnimeSuggestions(Suggest) {

    const truncate = (string, num) => {
        return string?.length > num ? string.substr(0, num - 1) + "..." : string;
    };

    useEffect(() => {
        // console.log("Suggest", Suggest.Suggest);
    }, [Suggest]);

    return (
        <div className='suggestion_content'>
            <Slider {...suggestion_movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                {Suggest.Suggest?.map((data, i) => {
                    return (
                        <Fragment>
                            <AnimeRow
                                isloadImage={true}
                                cat={"suggestions"}
                                id={data?.id}
                                img={data?.image}
                                title={data?.title.english || data?.title.userPreferred}
                                release_date={data?.releaseDate}
                                type={data?.type}
                                rate={data?.rating}
                                episode={data?.episodes}
                                key={i}
                            />
                        </Fragment>
                    )
                })}
            </Slider>
        </div>
    )
}
