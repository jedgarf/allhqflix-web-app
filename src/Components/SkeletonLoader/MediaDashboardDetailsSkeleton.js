import React, { Fragment } from 'react';

// Material UI Components
import { Box, Skeleton } from '@mui/material';

// Utils
import { isMobile } from "../../Services/Utils";

export const MediaDashboardSkeleton = () => {
    return (
        <Box className='stream-dashboard-content' sx={{ pl: 3, pr: 3, pt: 3, width: {xs: '100%', sm: '80%', md: '50%'} }} style={{ backgroundColor: isMobile ? 'rgba(15, 22, 34, 0.5)' : 'transparent' }}>
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="50px" width="60%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="30%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="100%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="100%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="100%" />

            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="60%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3' }} height="20px" width="50%" />
            <Skeleton animation="pulse" sx={{ bgcolor: '#54B4D3', width: {xs: '30%', sm: '20%', md: '20%'} }} height="50px" />
        </Box>
    );
};