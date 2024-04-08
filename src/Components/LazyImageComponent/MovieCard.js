import React from 'react';

import Skeleton from '@mui/material/Skeleton';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the CSS for the placeholder effect (you can choose a different effect)

// Icons
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// Images
import { noImagePlaceholder } from "../../Config/images.config";

const MovieCard = ({ src, title, contentType }) => {
    return (
        <div className="image-container">
            <LazyLoadImage 
                src={`${src}`} 
                placeholder={<Skeleton className="img-card-skeleton" sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" />} 
                alt={title} 
                effect="blur" 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = noImagePlaceholder;
                }} 
            />
            <div className="overlay">
                <PlayCircleIcon/>
            </div>
        </div>
    );
};

export default MovieCard;