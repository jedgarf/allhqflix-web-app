import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from '@mui/material/Skeleton';

// Icons
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// Pages
import { favAdd } from "../../Features/favSlice";
import TVCard from "../LazyImageComponent/TVCard";

const ChannelCard = ({ isloadImage, contentType, id, img, title, release_date, country, subdivision, city, type, is_nsfw, website, network, hasLink }) => {
    
    const [ loadingPicture, setLoadingPicture ] = useState(isloadImage);
    const [icon, setIcon] = React.useState(<FavoriteBorderIcon />);
    const dispatch = useDispatch();
  
    const truncate = (string, num) => {
      return string?.length > num ? string.substr(0, num - 1) + "..." : string;
    };
  
    const FavHanlder = () => {
      setIcon(<FavoriteIcon />);
      dispatch(
        favAdd({
          id: id,
          img: img,
          title: title,
          type: type,
          release_date: release_date,
        })
        
      );
    };
    
    return (
        <div className='result_movie_card' key={id}>
        <Link to={`/watch/live_channels/${id}`}>
            <Suspense fallback={<Skeleton className="img-card-skeleton" sx={{ bgcolor: 'grey.900' }} variant="rectangular" animation="wave" width={170} height={249} />}>
              <TVCard src={img} title={title} />
            </Suspense>
        </Link>

        <div className="movie_card_fav" onClick={() => FavHanlder()} hidden>
          {icon}
        </div>

        <div className='movies__info inn'>
          <div className="movie__name">
            <h3 title={title}>{truncate(title, 30)}</h3>
          </div>
          <div className="movie__other">
            <p>
                { country || "" }
              {/* <span>
                <StarIcon />
              </span> */}
            </p>
            {type === null || type === undefined ? '' : <p>{type}</p>}
          </div>
        </div>
      </div>
    );
};

export default ChannelCard;