import * as React from 'react';
import { Card, CardActions, CardContent, CardMedia, CardActionArea, Button, Typography } from '@mui/material';

import './css/AnimeCharacterCard.css';

const AnimeEpisodeCard = ({ episodeInfo }) => {
  return (
    <Card sx={{ width: 250, height: 350, marginInline: '10px', backgroundColor: 'rgba(20, 40, 70, 255)', color: '#ccced1' }}>
    <CardActionArea>
        <center>
            <CardMedia
                sx={{ height: 240, width: 150 }}
                image={episodeInfo?.image}
                title={episodeInfo?.title}
            />
        </center>
        <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
            {episodeInfo?.title}
            </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant='outlined' size="small" color="primary">
          Select
        </Button>
      </CardActions>
    </Card>
  );
}

export default AnimeEpisodeCard;