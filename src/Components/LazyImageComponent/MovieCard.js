import { Fragment, useState } from 'react';

import Skeleton from '@mui/material/Skeleton';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the CSS for the placeholder effect (you can choose a different effect)

// Icons
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// Images
import { noImagePlaceholder } from "../../Config/images.config";

const MovieCard = ({ src, title, contentType, setIsImageReady }) => {

    const [isImageReveal, setIsImageReveal] = useState(false);

    const handleImageLoadingComplete = () => {
        setIsImageReveal(true);
        setIsImageReady(true);
    }
    
    return (
        <Fragment>
            <div className="image-container">
                <div style={{ width: isImageReveal ? 'auto' : 0, height: isImageReveal ? 'auto' : 0 }}>
                    <LazyLoadImage 
                        src={`${src}`} 
                        alt={title} 
                        effect="blur" 
                        onLoad={() => handleImageLoadingComplete()}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = noImagePlaceholder;
                        }} 
                    />
                    <div className="overlay">
                        <PlayCircleIcon/>
                    </div>
                </div>
                {!isImageReveal && 
                    <Skeleton className="img-card-skeleton" sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" />
                }
            </div>
        </Fragment>
    );
};

export default MovieCard;