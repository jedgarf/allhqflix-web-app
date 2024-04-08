// Packages
import React, {Fragment, useEffect} from 'react';

// Auto Slider
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// CSS
import "./css/AnimeSuggestions.css";

// Pages
import { favAdd } from "../../Features/favSlice";
import AnimeRow from "../../Components/Anime/AnimeRow";

// Config
import { suggestion_movie_card_carousel_settings } from "../../Config/settings.config";

// Utils
import { isMobile } from "../../Services/Utils";


export default function AnimeSuggestions(Suggest) {

    return (
        <Fragment>
            <Slider {...suggestion_movie_card_carousel_settings} style={{ marginInline: isMobile ? '10px' : '30px' }}>
                {Suggest.Suggest?.map((data, i) => {
                    return (
                        <Fragment key={i}>
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
        </Fragment>
    )
}
