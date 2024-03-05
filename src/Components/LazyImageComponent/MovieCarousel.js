import React from 'react';

import { Skeleton, CircularProgress } from '@mui/material';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the CSS for the placeholder effect (you can choose a different effect)

// Icons
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// Images
import { noImagePlaceholder } from "../../Config/images.config";

// API
import apiConfig from "../../Config/api.config";

const MovieCarousel = ({ src, title, category }) => {

    switch (category) {
        case 'movie':
            src = `${apiConfig.media_proxy_cors}/image-proxy?url=${encodeURIComponent(src)}&headers=${encodeURIComponent(JSON.stringify({ Referer: apiConfig.flixhq_referer }))}`;
            break;
        case 'anime':
            break;
        case 'drama':
            break;
        default:
            break;
    }

    return (
        <div class="image-containerx" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
            <LazyLoadImage 
                src={src} 
                placeholder={<Skeleton className="img-carousel-skeleton" sx={{ bgcolor: 'gray.900' }} variant="rectangular" animation="wave" />} 
                alt={title} width={'100%'} height={'auto'} effect="blur" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = noImagePlaceholder;
                }}
            />
            {/* <Skeleton className="img-carousel-skeleton" sx={{ bgcolor: 'blue.900' }} variant="rectangular" animation="wave" /> */}
            {/* <div className="img-carousel-skeleton" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ fontSize: 100 }} />
            </div> */}
            {/* <div class="overlay">
                <PlayCircleIcon sx={{ fontSize: '60px' }}/>
            </div> */}
        </div>
    );
};

export default MovieCarousel;