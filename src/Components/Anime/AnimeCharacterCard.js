import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './css/AnimeCharacterCard.css';

const AnimeCharacterCard = ({ characterInfo }) => {
  return (
    <Card sx={{ width: 250, height: 350, marginInline: '10px', backgroundColor: 'rgba(20, 40, 70, 255)', color: '#ccced1' }}>
      <center>
        <CardMedia
            sx={{ height: 240, width: 150 }}
            image={characterInfo?.image}
            title={characterInfo?.name?.full}
        />
      </center>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
          {characterInfo?.name?.full}
        </Typography>
        <Typography variant="body2">
            <b>Voice Actor</b><br/>
            {characterInfo?.voiceActors.length > 0 ?
                <a href={`https://www.google.com/search?q=${characterInfo?.voiceActors[0].name?.full}`} target='__blank' style={{ color: '#ccced1' }}>{characterInfo?.voiceActors[0].name?.full}</a>
             : 'Unspecified'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AnimeCharacterCard;