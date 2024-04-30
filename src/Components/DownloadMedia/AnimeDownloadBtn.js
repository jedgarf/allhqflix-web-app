import React from 'react';

// Sweet Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Material UI Components
import { IconButton, Button } from '@mui/material';

// Icons
import DownloadIcon from '@mui/icons-material/Download';

// Helpers
import { getSession } from "../../Helpers/Sessions";

const AnimeDownloadBtn = ({ url, hasManyEpisode }) => {

    const handleOnDownload = (e, url) => {
        if (getSession('user')) {
            // proceed to download link
            window.open(url, '_blank');
        } else {
            // unable to download dialog box
            withReactContent(Swal).fire({
            customClass: 'swal-container',
            title: "<p style='color: #ccced1; font-size: 18px;'>You must sign in to download</p>",
            icon: "warning"});
        }
    }

    return hasManyEpisode ? 
        <IconButton 
            variant="outlined" 
            color='primary' 
            size='small' 
            title='Download' 
            onClick={(e) => handleOnDownload(e, url)} 
            style={{ marginRight: 10 }}>
                <DownloadIcon />
        </IconButton>
    : 
        <Button 
            variant="outlined" 
            color='primary' 
            size='small' 
            title='Download' 
            onClick={(e) => handleOnDownload(e, url)} 
            style={{ marginRight: 0 }}
            startIcon={<DownloadIcon />}>
                Download
        </Button>;
};

export default AnimeDownloadBtn;