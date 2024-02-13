import React from 'react';

// Icons
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// Images
import { noImagePlaceholder } from "../../Config/images.config";

const TVCard = ({ src, title }) => {
    return (
        <div class="image-container">
            <img src={`${src}`} alt={title} width={'100%'} height={'245'} effect="blur" onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = noImagePlaceholder;
            }} />
            <div class="overlay">
                <PlayCircleIcon sx={{ fontSize: '60px' }}/>
            </div>
        </div>
    );
};

export default TVCard;