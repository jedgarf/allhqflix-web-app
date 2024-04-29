import React from 'react';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { IconButton, Dialog, DialogTitle, Divider } from '@mui/material';

import CloseIcon from "@material-ui/icons/Close";

const ReusableModal = ({ isModalOpen, handleModal, OptionIcon, title, children }) => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Dialog fullWidth maxWidth='md' open={isModalOpen} onClose={() => handleModal(false)} aria-labelledby='max-width-dialog-title'>
        <DialogTitle className='modal-container' id='max-width-dialog-title' sx={{ fontWeight: '550' }} onClose={() => handleModal(false)}>
          {OptionIcon} {title}
          <IconButton
            aria-label="close"
            onClick={() => handleModal(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 13,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider/>
        {children}
      </Dialog>
    </ThemeProvider>
  );
};

export default ReusableModal;