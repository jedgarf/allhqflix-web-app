import React, { useState } from 'react';

// Material UI Components
import { IconButton, Badge, Menu, MenuItem, Typography } from '@mui/material';

// Material UI Icons
import CampaignIcon from '@mui/icons-material/Campaign';

// settings
import { devAlert } from "../../Config/settings.config";

const DevAlert = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const openTopMenu = Boolean(anchorEl);

    const handleTopMenuClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleTopMenuClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
              sx={{ m: 0, color: 'white', display: 'block' }}
              aria-controls={openTopMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openTopMenu ? 'true' : undefined}
              onClick={(event) => handleTopMenuClick(event)}
              title='Announcement'
            >
                <Badge badgeContent={devAlert.length} color="primary">
                    <CampaignIcon sx={{ fontSize: '30px' }} />
                </Badge>
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
            {/* <MenuItem style={{ display: 'flex', flexWrap: 'wrap', pointerEvents: 'none' }}>
                <Typography sx={{ fontWeight: 'bolder' }}><CampaignIcon sx={{ fontSize: '25px', marginBottom: '-6px' }}/> Announcement/s:</Typography>
            </MenuItem> */}
            <MenuItem style={{ pointerEvents: 'none' }} disableGutters={false}>
                <Typography sx={{ fontWeight: 'bolder' }}>New Features:</Typography>
            </MenuItem>
              {devAlert.sort((a, b) => { return a.id - b.id }).filter(item => item.status === 'features').map((subPage, num) => {
                return (
                      <MenuItem style={{ pointerEvents: 'none' }} disableGutters={false}>
                          <div className='sub-menu-text'>
                              <span> • {subPage.message.toUpperCase()}</span>
                          </div>  
                      </MenuItem>
                )
              })}
          </Menu>
        </>
    );
};

export default DevAlert;