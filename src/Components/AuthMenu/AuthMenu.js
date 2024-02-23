import React, { useState, useEffect, Fragment } from 'react';
import { jwtDecode } from 'jwt-decode';

// Material UI Components
import { Button, Badge, Menu, MenuItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';

// Material UI Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

// Sweet Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import '@sweetalert2/theme-borderless/borderless.css';

// Helpers
import { getSession, removeSession } from "../../Helpers/Sessions";
// Utils
import { capitalizeString } from "../../Services/Utils";

const AuthMenu = ({ isAuth }) => {

    const [user, setUser] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const openTopMenu = Boolean(anchorEl);

    const handleTopMenuClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleTopMenuClose = () => {
        setAnchorEl(null);
    };

    const onLogoutSession = () => {
      withReactContent(Swal).fire({
        title: "Click Yes to proceed",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          removeSession('user');
          isAuth(false);
          handleTopMenuClose();
          // withReactContent(Swal).fire("Saved!", "", "success");
        } else if (result.isDismissed) {
          // withReactContent(Swal).fire("Changes are not saved", "", "info");
          return false;
        }
      });
    }

    useEffect(() => {
      if (getSession("user")) {
        let decodedUser = jwtDecode(getSession("user"));
        // console.log(decodedUser);
        setUser(decodedUser);
      }
    }, []);
    
    return (
        <>
            <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            aria-controls={openTopMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openTopMenu ? 'true' : undefined}
            onClick={(event) => handleTopMenuClick(event)}
            title={user?.name && capitalizeString(user.name)}
            >
                {/* <Badge badgeContent={devAlert.length} color="primary"> */}
                    {/* <AccountCircleIcon sx={{ color: '#DC4C64',  }} /> */}
                    <center>
                      <Avatar alt={'U'} sx={{ bgcolor: '#DC4C64' }} style={{ width: '35px', height: '35px' }} src={user?.picture && user.picture} />
                    </center>
                {/* </Badge> */}
            </Button>

            {/* Sub Menu */}

            <Menu
              elevation={0}
              id="basic-menu"
              anchorEl={anchorEl}
              open={openTopMenu}
              onClose={handleTopMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                //   width: 150,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(45,45,45,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 28,
                    width: 10,
                    height: 10,
                    // bgcolor: 'background.paper',
                    bgcolor: 'rgba(45,45,45, 255)',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                sx: {
                  py: 1,
                  '& .MuiMenuItem-root': {
                      whiteSpace: 'normal',
                  },
                },
              }}
            >
            <MenuItem disableGutters={false}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: '#3B71CA' }} />
              </ListItemIcon>
              <ListItemText className='dark-theme-text-color' sx={{ fontWeight: 'bolder' }} primary={user?.name ? `${capitalizeString(user.name)}` : 'Guest'} />
            </MenuItem>
            <MenuItem onClick={() => onLogoutSession()} disableGutters={false}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#DC4C64' }} />
              </ListItemIcon>
              <ListItemText className='dark-theme-text-color' sx={{ fontWeight: 'bolder' }} primary="Logout" />
            </MenuItem>
          </Menu>
        </>
    );
};

export default AuthMenu;