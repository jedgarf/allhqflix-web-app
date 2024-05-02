import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom CSS
import './SideBar.css';

// Material UI Components
import { Box, Typography, Menu, Button, MenuItem, Badge, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HeaderMenu = ({ Type, subType,getMenu, menu, submenu }) => {

    const [selectedSubMenu, setSelectedSubMenu] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const openTopMenu = Boolean(anchorEl);
  
    const handleTopMenuClick = (event, menu_id) => {
      setActiveMenu(menu_id);
      setSelectedSubMenu(submenu?.filter((item) => item.menu_id === menu_id));
      setAnchorEl(event.currentTarget);
    };
    
    const handleTopMenuClose = () => {
      setAnchorEl(null);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -13,
          top: -1,
          padding: '1px 5px',
          fontSize: 7
        },
    }));
    
      const StyledSubBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -10,
          top: -1,
          padding: '1px 5px',
          fontSize: 7
        },
    }));

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            
            {/* ----------------------------------------------------------------------------------------------------------------------------------- */}
            {getMenu.isLoading ?
                <CircularProgress sx={{ fontSize: 10 }} />
            : 
                menu?.filter((item) => { return item.is_active === true })
                .sort((a, b) => { return a.sequence - b.sequence })
                .map((page, index) => {
                    return page.code === Type ?
                    <React.Fragment key={index}>
                        {page.link === '' ? 
                        <div style={{ textDecoration: 'none', fontWeight: 'bolder !important', marginRight: '20px' }}>
                        <Button
                            key={page.id}
                            sx={{ my: 2, color: 'var(--main-red)', fontWeight: '550', display: 'block' }}
                            aria-controls={openTopMenu ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openTopMenu ? 'true' : undefined}
                            onClick={(event) => handleTopMenuClick(event, page.id)}
                        >
                            {page.is_dev === 1 ?
                            <StyledBadge badgeContent={page.badge_message} color="error">
                                {page.name} {openTopMenu && activeMenu === page.id ? <ExpandLessIcon style={{ color: 'var(--main-red)', marginBottom: '-7px' }} /> : <ExpandMoreIcon style={{ color: 'var(--main-red)', marginBottom: '-7px' }} />}
                            </StyledBadge>
                            : <>{page.name} {openTopMenu && activeMenu === page.id ? <ExpandLessIcon style={{ color: 'var(--main-red)', marginBottom: '-7px' }} /> : <ExpandMoreIcon style={{ color: 'var(--main-red)', marginBottom: '-7px' }} />}</>}
                        </Button>
                        </div>
                        :
                        <Link to={page.link} style={{ textDecoration: 'none', fontWeight: 'bolder !important', marginRight: '20px' }}>
                        <Button
                            key={page.id}
                            sx={{ my: 2, color: 'var(--main-red)', fontWeight: '550', display: 'block' }}
                            aria-controls={openTopMenu ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openTopMenu ? 'true' : undefined}
                        >
                            {page.is_dev === 1 ?
                            <StyledBadge badgeContent={page.badge_message} color="error">
                                {page.name}
                            </StyledBadge>
                            : <>{page.name}</>}
                        </Button>
                        </Link>}
                    </React.Fragment>
                    :
                    <React.Fragment key={index}>
                        {page.link === '' ? 
                            <div style={{ textDecoration: 'none', fontWeight: 'bolder !important', borderBottom: 'none', marginRight: '20px' }}>
                                <Button
                                    key={page.id}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    aria-controls={openTopMenu ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openTopMenu ? 'true' : undefined}
                                    onClick={(event) => handleTopMenuClick(event, page.id)}
                                >
                                    {page.is_dev === 1 ?
                                    <StyledBadge badgeContent={page.badge_message} color="error">
                                        {page.name} {openTopMenu && activeMenu === page.id ? <ExpandLessIcon style={{ color: 'white', marginBottom: '-7px' }} /> : <ExpandMoreIcon style={{ color: 'white', marginBottom: '-7px' }} />}
                                    </StyledBadge>
                                    : <>{page.name} {openTopMenu && activeMenu === page.id ? <ExpandLessIcon style={{ color: 'white', marginBottom: '-7px' }} /> : <ExpandMoreIcon style={{ color: 'white', marginBottom: '-7px' }} />}</>}
                                </Button>
                            </div>
                        :
                            <Link to={page.link} style={{ textDecoration: 'none', fontWeight: 'bolder !important', borderBottom: 'none', marginRight: '20px' }}>
                                <Button
                                    key={page.id}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    aria-controls={openTopMenu ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openTopMenu ? 'true' : undefined}
                                >
                                    {page.is_dev === 1 ?
                                    <StyledBadge badgeContent={page.badge_message} color="error">
                                        {page.name}
                                    </StyledBadge>
                                    : <>{page.name}</>}
                                </Button>
                            </Link>
                        }
                    </React.Fragment>
                })
            }

            {/* ----------------------------------------------------------------------------------------------------------------------------------- */}

            <Menu
                elevation={0}
                id="basic-menu"
                anchorEl={anchorEl}
                open={openTopMenu}
                onClose={handleTopMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                    width: 150,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(var(--menu-raw-color),0.32))',
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
                        left: 14,
                        width: 10,
                        height: 10,
                        // bgcolor: 'background.paper',
                        bgcolor: 'rgba(var(--menu-raw-color), 1)',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {selectedSubMenu?.filter((item) => { return item.is_active === true }).sort((a, b) => { return a.sequence - b.sequence }).map((subPage, index) => {
                    return subPage.code === subType ? 
                    <Link to={subPage.link} style={{ textDecoration: 'none', fontWeight: 'bolder' }} key={index}>
                    <MenuItem onClick={handleTopMenuClose} selected>
                        {subPage.is_dev === 1 ?
                        <StyledSubBadge badgeContent={subPage.badge_message} color="error">
                            <Typography className='sub-menu-text sub-menu-active' textAlign="left" sx={{ color: 'var(--main-red) !important' }}>{subPage.name.toUpperCase()}</Typography>
                        </StyledSubBadge>
                        : <Typography className='sub-menu-text sub-menu-active' textAlign="left" sx={{ color: 'var(--main-red) !important' }}>{subPage.name.toUpperCase()}</Typography>}
                    </MenuItem>
                    </Link>
                    : 
                    <Link to={subPage.link} style={{ textDecoration: 'none', fontWeight: 'bolder' }} key={index}>
                    <MenuItem onClick={handleTopMenuClose}>
                        {subPage.is_dev === 1 ?
                        <StyledSubBadge badgeContent={subPage.badge_message} color="error">
                            <Typography className='sub-menu-text' textAlign="left">{subPage.name.toUpperCase()}</Typography>
                        </StyledSubBadge>
                        : <Typography className='sub-menu-text' textAlign="left">{subPage.name.toUpperCase()}</Typography>}
                    </MenuItem>
                    </Link>
                })}
            </Menu>
        </Box>
    );
};

export default HeaderMenu;