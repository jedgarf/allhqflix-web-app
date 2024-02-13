import React, { useState } from 'react';
import { Stack, Snackbar, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ severity, handleSnackBarOpen, status, snackBarMessage, withLoading = false, hideDuration = 6000 }) => {

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={status} autoHideDuration={hideDuration} onClose={handleSnackBarOpen}>
        <Alert onClose={handleSnackBarOpen} severity={severity} sx={{ width: '100%' }}>
          {withLoading && <CircularProgress size={12} style={{ marginRight: '8px', color: '#ccced1' }} />}
          {snackBarMessage}
        </Alert>
      </Snackbar>

      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}

    </Stack>
  );

}

export default SnackBar;