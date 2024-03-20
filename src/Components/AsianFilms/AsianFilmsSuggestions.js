// Packages
import React, {Fragment, useEffect} from 'react';
import Grid from '@mui/material/Grid';

// React Query
import { useQuery } from 'react-query';

// Auto Slider
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// CSS
import "./css/AsianFilmsSuggestions.css";

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Pages
import AsianFilmsRow from "../../Components/AsianFilms/AsianFilmsRow";

// Config
import { suggestion_movie_card_carousel_settings } from "../../Config/settings.config";

// Services
import { asianfilms_bycountry } from "../../Services/ViewAsianService";

export default function AsianFilmsSuggestions({ infoValue }) {

    const shuffle = (array) => {
        for (var i = array?.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
    };

    // get movies by country
    let philippineData = useQuery(['asianfilms_suggestion', { country: infoValue?.country.toLowerCase(), page: 1 }], asianfilms_bycountry, {
        cacheTime: 1 * 1000, // 1 minute
    });
    let philippineValue = philippineData.data?.data?.results;

    useEffect(() => {
        // console.log("country", country.country); 
    }, [infoValue]);

    return (
        <div className='suggestion_content'>
            <Slider {...suggestion_movie_card_carousel_settings} style={{ marginInline: '30px' }}>
                {philippineValue?.map((data, i) => {
                    return (
                        <Fragment key={i}>
                            <AsianFilmsRow
                                isloadImage={true}
                                cat={"suggestions"}
                                id={data?.id}
                                img={data?.image}
                                title={data?.title}
                                release_date={data?.releaseDate}
                                type={data?.type}
                                rate={data?.rating}
                                episode={data?.totalEpisodes}
                                key={i}
                            />
                        </Fragment>
                    )
                })}
            </Slider>
        </div>
    )
}
