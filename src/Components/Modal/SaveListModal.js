import React, { useState, Fragment } from 'react';

// Material UI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Button, DialogContent } from "@mui/material";

// Material UI Icons
import ChecklistIcon from '@mui/icons-material/Checklist';

// Reusable Modal
import ReusableModal from "./ReusableModal";

// Components
import RecentWatched from "../../Pages/Home/RecentWatched";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const SaveListModal = ({ loadSavedMedia }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = (status) => {
        setIsModalOpen(status);
    }

    const handleLoadSavedMedia = () => {
        loadSavedMedia();
    }

    return (
        <Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Button variant='outlined' size='small' style={{ marginRight: '10px' }} startIcon={<ChecklistIcon/>} onClick={() => handleModal(true)}>RECENT</Button>

                {/* Modal */}
                <ReusableModal isModalOpen={isModalOpen} handleModal={handleModal} OptionIcon={<ChecklistIcon sx={{ marginBottom: '-4px' }} />} title={`RECENT WATCHED`}>
                    <DialogContent>
                        <RecentWatched title={false} loadSavedMedia={handleLoadSavedMedia}/>
                    </DialogContent>
                </ReusableModal>

            </ThemeProvider>
        </Fragment>
    );
};

export default SaveListModal;