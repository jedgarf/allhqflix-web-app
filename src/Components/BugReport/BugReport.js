import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { NavLink } from "react-router-dom";
import BugReportIcon from '@mui/icons-material/BugReport';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BugReport() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen} startIcon={<BugReportIcon/>}>
        Bug Report
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} style={{backgroundColor: "gray"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Bug Report
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Send
            </Button>
          </Toolbar>
        </AppBar>
        <form>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 3, width: '97%' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="standard-basic" label="Standard" variant="standard" />
            </Box>
        </form>
      </Dialog>
    </div>
  );
}