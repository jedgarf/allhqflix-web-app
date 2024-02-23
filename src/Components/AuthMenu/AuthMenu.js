import React, { useState, useEffect, Fragment } from 'react';
import { jwtDecode } from 'jwt-decode';

// Material UI Components
import { Button, Badge, Menu, MenuItem, Typography, Avatar } from '@mui/material';

// Material UI Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
      if (window.confirm("are you sure you want to logout?")) {
        removeSession('user');
        isAuth(false);
        handleTopMenuClose();
      } else {
        return false;
      }
    }

    useEffect(() => {
      if (getSession("user")) {
        let decodedUser = jwtDecode(getSession("user"));
        // console.log(decodedUser);
        setUser(decodedUser);
      }
    }, []);
    
    // https://lh3.googleusercontent.com/a/ACg8ocKOiWb9QOXJXNAEx-0uahx3T4d6vwNsHFzO9wBYycxXM-g=s96-c
    return (
        <>
            <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            aria-controls={openTopMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openTopMenu ? 'true' : undefined}
            onClick={(event) => handleTopMenuClick(event)}
            title={user?.name && user.name}
            >
                {/* <Badge badgeContent={devAlert.length} color="primary"> */}
                    {/* <AccountCircleIcon sx={{ color: '#DC4C64', fontSize: '30px' }} /> */}
                    <Avatar alt="A" src={user?.picture && user.picture} />
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
                <Typography sx={{ fontWeight: 'bolder' }}>{user?.name ? capitalizeString(user.name) : 'Guest'}</Typography>
            </MenuItem>
            <MenuItem onClick={() => onLogoutSession()} disableGutters={false}>
                <Typography sx={{ fontWeight: 'bolder' }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </>
    );
};

export default AuthMenu;