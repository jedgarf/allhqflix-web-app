import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { updateVideoResolutions } from "../Player/Player";

// Material UI Components
import { IconButton, Badge, Menu, MenuItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';

// Material UI Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

// Sweet Alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Helpers
import { getSession, removeSession } from "../../Helpers/Sessions";
// Utils
import { capitalizeString } from "../../Services/Utils";

const AuthMenu = ({ isStream, isAuth }) => {

    const navigate = useNavigate();
    const { id, type } = useParams();

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
      handleTopMenuClose();
      withReactContent(Swal).fire({
        background: 'rgba(0, 10, 20, 255)',
        title: "<p style='color: #ccced1; font-size: 18px;'>Are you sure you want to sign out?</p>",
        // icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: '#3B71CA',
        cancelButtonColor: '#DC4C64',
        confirmButtonText: 'Yes',
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          
          removeSession('user');
          isAuth(false);
          if (isStream && type !== undefined && id !== undefined) {
            // if (type == "anime") {
            //   navigate(`/${type}/stream_dashboard?mediaId=${id}`);
            // } else {
            //   navigate(`/${type}/stream_dashboard?mediaId=${type}/${id}`);
            // }
            // try {
            //   updateVideoResolutions();
            // } catch (error) {
            //   console.log(error);
            // }
          }
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
            <IconButton
            sx={{ my: 0, color: 'white', display: 'block' }}
            aria-controls={openTopMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openTopMenu ? 'true' : undefined}
            onClick={(event) => handleTopMenuClick(event)}
            title={user?.name && capitalizeString(user.name)}
            >
              {/* <Badge badgeContent={devAlert.length} color="primary"> */}
              <center>
                <Avatar alt={'U'} sx={{ bgcolor: '#DC4C64' }} style={{ width: '33px', height: '33px' }} src={user?.picture && user.picture} />
              </center>
              {/* </Badge> */}
            </IconButton>

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
              <ListItemText className='dark-theme-text-color' sx={{ fontWeight: 'bolder' }} primary="Sign out" />
            </MenuItem>
          </Menu>
        </>
    );
};

export default AuthMenu;