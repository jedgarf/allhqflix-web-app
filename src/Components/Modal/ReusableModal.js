import React from 'react';

// Material UI Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';

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
        <DialogTitle id='max-width-dialog-title' sx={{ fontWeight: '550' }}>{OptionIcon} {title}</DialogTitle>
        <Divider/>
        {children}
      </Dialog>
    </ThemeProvider>
  );
};

export default ReusableModal;