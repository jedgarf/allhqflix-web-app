import React from 'react';
import "./InitPlayerLoader.css";
import { CircularProgress } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function InitPlayerLoader() {
  return (
    <Stack className="loading_icon" direction="row" alignItems="center" gap={1}>
        {/* <CircularProgress />
        <Typography className="loading_icon_text" variant="body1">Please wait...</Typography> */}
        <div className="loadingio-spinner-ellipsis-i8f1l4nyjia"><div className="ldio-q2z4r9d0un">
        <div></div><div></div><div></div><div></div><div></div>
        </div></div>
    </Stack>
  )
}
