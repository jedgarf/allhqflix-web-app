import React, { Fragment } from 'react';

// Material UI Components
import { Grid, Skeleton } from '@mui/material';

export const AnimeDetailsSkeleton = () => {
    return (
        <Fragment>
            <Grid item xl={2} lg={2} md={0} sm={0} xs={0} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                <center>
                <Skeleton
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave"
                    variant="rectangular"
                    width={210}
                    height={318}
                />
                </center>
            </Grid>
            <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                <h3 className='media-title' style={{ marginTop: '-30px', marginLeft: '10px' }}>
                <Skeleton 
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave" 
                    width={350} 
                    height={80} 
                />
                </h3>
                <div className="media_props">
                <Grid container spacing={0.4} style={{ marginLeft: '5px' }}>
                    <Grid item>
                    <h5 style={{ marginRight: 10 }}>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={80} 
                        height={50} 
                        />
                    </h5>
                    </Grid>
                    <Grid item>
                    <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={80} 
                        height={50} 
                    />
                    </Grid>
                </Grid>
                </div>
                <div style={{ marginLeft: '10px' }}>
                <Skeleton 
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave" 
                    width={'100%'} 
                    height={30} 
                />
                <Skeleton 
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave" 
                    width={'100%'} 
                    height={30} 
                />
                <Skeleton 
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave" 
                    width={'100%'} 
                    height={30} 
                />
                </div>
                <table>
                <tbody>
                    <tr>
                    <th>Country:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Season:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Genre:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Released:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Status:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Synonyms:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                </tbody>
                </table>
            </Grid>
        </Fragment>
    );
};

export const MovieDetailsSkeleton = () => {
    return (
        <Fragment>
            <Grid item xl={2} lg={2} md={0} sm={0} xs={0} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                <center>
                <Skeleton
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave"
                    variant="rectangular"
                    width={210}
                    height={318}
                />
                </center>
            </Grid>
            <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                <h3 className='media-title' style={{ marginTop: '-30px', marginLeft: '10px' }}>
                <Skeleton 
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave" 
                    width={350} 
                    height={80} 
                />
                </h3>
                <div className="media_props">
                <Grid container spacing={0.4} style={{ marginLeft: '5px' }}>
                    <Grid item>
                    <h5 style={{ marginRight: 10 }}>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={80} 
                        height={50} 
                        />
                    </h5>
                    </Grid>
                    <Grid item>
                    <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={80} 
                        height={50} 
                    />
                    </Grid>
                </Grid>
                </div>
                <div style={{ marginLeft: '10px' }}>
                <Skeleton 
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave" 
                    width={'100%'} 
                    height={30} 
                />
                <Skeleton 
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave" 
                    width={'100%'} 
                    height={30} 
                />
                <Skeleton 
                    sx={{ bgcolor: 'grey.900' }}
                    animation="wave" 
                    width={'100%'} 
                    height={30} 
                />
                </div>
                <table>
                <tbody>
                    <tr>
                    <th>Country:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Genre:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Released:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Production:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                    <tr>
                    <th>Casts:</th>
                    <td>
                        <Skeleton 
                        sx={{ bgcolor: 'grey.900' }}
                        animation="wave" 
                        width={130} 
                        height={30} 
                        />
                    </td>
                    </tr>
                </tbody>
                </table>
            </Grid>
        </Fragment>
    );
};