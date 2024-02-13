import React, { useState, useEffect, useCallback } from "react";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// CSS
import "./css/Seasons.css";

// Icons
import CircularProgress from '@mui/material/CircularProgress';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import MovieIcon from '@mui/icons-material/Movie';

const Seasons = ({movieInfo, mediaId, seasonId, episodeId, server, setSelectedSeason, setSelectedEpisode, setSelectedServer, setSelectedEpisodeName, setLoadingEpisode, moveToTop, lowerEpisodeList }) => {

  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const [inselectedSeason, setInSelectedSeason] = useState(seasonId || 1);
  const [inselectedEpisode, setInSelectedEpisode] = useState(episodeId);
  // const [inselectedServer, setInSelectedServer] = useState(server);


  const handleChangeSeason = (event) => {
    setInSelectedSeason(event.target.value);
    // setSelectedSeason(event.target.value);
  };

  const handleChangeEpisode = (epId, title) => {
    setLoadingEpisode(true);
    setInSelectedEpisode(epId);
    setSelectedEpisode(epId);
    moveToTop();
  };

  const separatedSeasons = (xs, key) => {
    if (xs !== undefined) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    } else {
      return [];
    }
  }

  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };

  const generateSeasons = useCallback((sepSeason) => {
    let seasonList = [];
    for (let seasonLength = 0; seasonLength < Object.keys(sepSeason).length; seasonLength++) {
      let episodeCount = movieInfo?.episodes?.filter( (result) => { return result.season === (seasonLength + 1); }).length;
      seasonList.push({"id": (seasonLength + 1), "season": "Season " + (seasonLength + 1) + " (" + (episodeCount > 0 ? episodeCount + ' Episodes' : episodeCount + ' Episode') + ")"});
    }
    return seasonList;
  }, [movieInfo?.episodes]);

  useEffect(() => {
    let sepSeason = separatedSeasons(movieInfo?.episodes, 'season');
    setSeasons(generateSeasons(sepSeason));
    setEpisodes(sepSeason);
  }, [generateSeasons, movieInfo?.episodes]);

  console.log("inselectedSeason", inselectedSeason);

  return (
    <>
      <div className="seasons_content">
        {seasons?.length > 0 ? (
            <div className="season_dropdown">

              <Box sx={{ minWidth: '200px' }}>
                <FormControl  sx={{ m: 1, width: '200px', color: 'white' }} color="primary" hiddenLabel={true} size="small" onChange={handleChangeSeason}>
                  {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Select Category
                  </InputLabel> */}
                  <NativeSelect
                    value={inselectedSeason}
                    inputProps={{
                      name: 'category',
                      id: 'uncontrolled-native',
                    }}
                  >
                  {seasons?.map((item, i) => {
                    return (
                      <>
                      <option key={i} value={item.id}>{item.season}</option>
                    </>
                    )
                  })}
                  </NativeSelect>
                </FormControl>
              </Box>

            </div>
        ) : (
            ""
        )}

        <Grid className="episode_list" container columnSpacing={{ xs: 2, sm: 2, md: 5, lg: 5, xl: 5 }} rowSpacing={3}>
        {episodes[inselectedSeason]?.length > 0 ? (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <List className={lowerEpisodeList === true ? "episode_list_content_mobile" : "episode_list_content" }>
            {episodes[inselectedSeason]?.map((item, i) => {
                  return (
                      <ListItem key={i} disablePadding>
                        {item.id === episodeId ?
                          <ListItemButton selected={(item.id === episodeId) ? true : false}>
                            <ListItemIcon>
                              {(item.id === episodeId) ? <PlaylistPlayIcon sx={{ color: "#14A44D", fontSize: '20px' }}/> : <MovieIcon sx={{ color: "#FBFBFB", fontSize: '20px' }} /> }
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{fontSize: '12px'}} sx={{ color: ((item.id === episodeId) ? '#14A44D' : '#FBFBFB') }} primary={item.title} />
                          </ListItemButton>
                         : 
                         <ListItemButton selected={(item.id === episodeId) ? true : false} onClick={() => handleChangeEpisode(item.id, item.title)}>
                            <ListItemIcon>
                              {(item.id === episodeId) ? <PlaylistPlayIcon sx={{ color: "#14A44D", fontSize: '20px' }}/> : <MovieIcon sx={{ color: "#FBFBFB", fontSize: '20px' }} /> }
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{fontSize: '12px'}} sx={{ color: ((item.id === episodeId) ? '#14A44D' : '#FBFBFB') }} primary={item.title} />
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

export default Seasons;
