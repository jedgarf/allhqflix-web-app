import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import React from 'react';

const ReusableModal = ({ isModalOpen, handleModal, OptionIcon, title, children }) => {
    return (
        <>
          <Dialog fullWidth maxWidth='md' open={isModalOpen} onClose={() => handleModal(false)} aria-labelledby='max-width-dialog-title'>
            <DialogTitle id='max-width-dialog-title' sx={{ fontWeight: '550' }}>{OptionIcon} {title}</DialogTitle>
            <Divider/>
            {children}
          </Dialog>
        </>
    );
};

export default ReusableModal;