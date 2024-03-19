import React, { useState, useEffect } from "react";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// CSS
import "./css/AnimeSeasons.css";

// Icons
import CircularProgress from '@mui/material/CircularProgress';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import MovieIcon from '@mui/icons-material/Movie';

const AnimeSeasons = ({details, mediaId, episodeId, setSelectedEpisode, setLoadingEpisode, moveToTop }) => {

  const [episodes, setEpisodes] = useState([]);
  const [inselectedEpisode, setInSelectedEpisode] = useState(episodeId || 1);

  const handleChangeEpisode = (epId, count, episodeName) => {
    setLoadingEpisode(true);
    setInSelectedEpisode(epId);
    setSelectedEpisode(epId);
    moveToTop();
  };

  useEffect(() => {
    setEpisodes(details?.episodes);
  }, [details?.episodes]);

  return (
    <>
      <div className="seasons_content asian_films_seasons_content">
        <div className="heading">
          <h6>EPISODES ({episodes?.length})</h6>
        </div>
        <Grid className="episode_list" container columnSpacing={{ xs: 2, sm: 2, md: 5, lg: 5, xl: 5 }} rowSpacing={3}>
        {episodes?.length > 0 ? (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <List className="episode_list_content">
            {episodes?.map((item, i) => {
                  return (
                      <ListItem key={i} disablePadding>
                        {item.id === episodeId ?
                          <ListItemButton selected={(item.id === episodeId) ? true : false}>
                            <ListItemIcon>
                              {(item.id === episodeId) ? <PlaylistPlayIcon sx={{ color: "#14A44D" }}/> : <MovieIcon sx={{ color: "#FBFBFB" }} /> }
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{fontSize: '12px'}} sx={{ color: ((item.id === episodeId) ? '#14A44D' : '#FBFBFB') }} primary={`EP ${item.number}: ${item.title}`} />
                          </ListItemButton>
                         : 
                         <ListItemButton selected={(item.id === episodeId) ? true : false} onClick={() => handleChangeEpisode(item.id, item.title)}>
                            <ListItemIcon>
                              {(item.id === episodeId) ? <PlaylistPlayIcon sx={{ color: "#14A44D" }}/> : <MovieIcon sx={{ color: "#FBFBFB" }} /> }
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{fontSize: '12px'}} sx={{ color: ((item.id === episodeId) ? '#14A44D' : '#FBFBFB') }} primary={`EP ${item.number}: ${item.title}`} />
                          </ListItemButton>}
                      </ListItem>
                  );
              })}
            </List>
          </Grid>
        ) : (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <CircularProgress sx={{ fontSize: 100 }} />
            </Grid>
        )}
        </Grid>
      </div>
    </>
  );
}

export default AnimeSeasons;
