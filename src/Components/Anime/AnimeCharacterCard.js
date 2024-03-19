import React, { Fragment } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

import './css/AnimeCharacterCard.css';

const AnimeCharacterCard = ({ characterInfo }) => {
  return (
    <Card sx={{ width: window.innerWidth < 720 ? 250 : 400, height: window.innerWidth < 720 ? '100%' : 270, marginInline: '10px', backgroundColor: 'rgba(105, 105, 105, 0.4)', color: '#ccced1' }}>
      <CardContent>
        <Grid container direction="row" columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} rowSpacing={0}>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <center>
              <CardMedia
                sx={{ height: 240, width: 150 }}
                image={characterInfo?.image}
                title={characterInfo?.name?.userPreferred}
              />
            </center>
          </Grid>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <Typography gutterBottom variant="h6" component="div" sx={{ textTransform: 'uppercase' }}>
              {characterInfo?.name?.userPreferred}
            </Typography>
            <Typography variant="body2">
              <b>Role: </b> {characterInfo?.role}
            </Typography>
            <Typography variant="body2">
                <b>Voice Actor(s)</b><br/>
                {characterInfo?.voiceActors.length > 0 ?
                    characterInfo?.voiceActors.map((actor, index) => {
                      return (
                        <Fragment>
                          <a className='text-link' href={`https://www.google.com/search?q=${actor.name?.userPreferred}`} target='__blank' style={{ marginRight: 2 }}>
                            {actor.name?.userPreferred}
                          </a>
                          ({actor.language})
                          <br/>
                        </Fragment>
                      )
                    })[0]
                : '-'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AnimeCharacterCard;