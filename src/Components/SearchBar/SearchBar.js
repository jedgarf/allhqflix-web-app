import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Material UI Components
import { Button, Badge, Menu, MenuItem, Typography, Toolbar, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';

// settings
import { devAlert } from "../../Config/settings.config";

import { search } from '../../Features/searchSlice';

const SearchBar = () => {

    const type = 'movie';
    var searchText = "";

    const queryParams = new URLSearchParams(window.location.search);
    const searchKeyword = queryParams.get("keyword") === null ? "" : queryParams.get("keyword");

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const openTopMenu = Boolean(anchorEl);

    const handleTopMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleTopMenuClose = () => {
        setAnchorEl(null);
    };

    const searchChange = (e) => {
      searchText = e.currentTarget.value;
    }
  
    const queryHandler = (e) => {
      e.preventDefault();
      // dispatch(search(searchText));
      navigate(`/${type}/search?keyword=${search(searchText).payload}`);
    };

     // ---------------------------------------------------------------------------------------
  // Styles
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      color: 'white',
      [theme.breakpoints.only('xs')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        '&:focus': {
          width: '100%',
        },
      },
    },
  }))

  // ---------------------------------------------------------------------------------------------------

    return (
        <>
            <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            aria-controls={openTopMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openTopMenu ? 'true' : undefined}
            onClick={(event) => handleTopMenuClick(event)}
            title='Search'
            >
              <SearchIcon sx={{ fontSize: '30px', marginBottom: -1 }} />
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
                    '& .MuiMenuItem-root': {
                        whiteSpace: 'normal',
                    },
                },
              }}
            >
            {/* <MenuItem style={{ display: 'flex', flexWrap: 'wrap', pointerEvents: 'none' }}>
                <Typography sx={{ fontWeight: 'bolder' }}>CATEGORIES</Typography>
            </MenuItem> */}
            <MenuItem style={{ display: 'flex', flexWrap: 'wrap' }}>
              <form onSubmit={(e) => queryHandler(e)}>
                  <Toolbar>
                      <Search>
                          <SearchIconWrapper>
                          <SearchIcon style={{ color: '#dddddd' }} />
                          </SearchIconWrapper>
                          <StyledInputBase
                          placeholder={'Search here'}
                          onChange={(e) => searchChange(e)}
                          inputProps={{ 'aria-label': 'search', defaultValue: `${searchKeyword}` }}
                          required
                          />
                          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '-3px' }}>Search</Button>
                      </Search>
                  </Toolbar>
              </form>
            </MenuItem>
            </Menu>
        </>
    );
};

export default SearchBar;