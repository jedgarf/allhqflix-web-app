import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse, Icon } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

// Icons
import ChecklistIcon from '@mui/icons-material/Checklist';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SideBarListItem = ({ page, subType, subPage, classes, selected }) => {

    subPage = subPage?.filter((item) => item.menu_id === page.id).sort((a, b) => { return a.sequence - b.sequence });
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const RenderIcon = ({ menuName }) => {
        let result;
        switch (menuName) {
            case 'WATCH LIST':
                result = <ChecklistIcon sx={{ color: "#3b71ca" }} />;
                break;
            case 'MOVIES & TV SERIES':
                result = <LiveTvIcon sx={{ color: "#3b71ca" }} />;
                break;
            case 'ANIMES':
                result = <LocalMoviesIcon sx={{ color: "#3b71ca" }} />;
                break;
            case 'MOBILE APP':
                result = <InstallMobileIcon sx={{ color: "#3b71ca" }} />;
                break;
            default:
                result = <LocalMoviesIcon sx={{ color: "#3b71ca" }} />;
                break;
        }

        return result;
    }
    
    const StyledSubBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -9,
        top: 0,
        padding: '1px 5px',
        fontSize: 7
    },
    }));
    
    
    return (
        <React.Fragment>
            {page.link === '' ? 
                <div style={{ fontWeight: 'bolder !important' }}>
                    <ListItem key={page.id} onClick={handleClick} disablePadding>
                        <ListItemButton selected={selected}  style={{ color: '#DC4C64', fontWeight: '550' }}>
                            <ListItemIcon>
                                <RenderIcon menuName={page.name.toLocaleUpperCase()}/>
                            </ListItemIcon>

                            {page.is_dev === 1 ?
                            <ListItemText className='sidebar-no-link-menu' primary={<StyledSubBadge badgeContent={page.badge_message} color='error'>{page.name.toLocaleUpperCase()}</StyledSubBadge>} classes={{ primary: classes.text }} />
                            : <ListItemText className='sidebar-no-link-menu' primary={page.name.toLocaleUpperCase()} classes={{ primary: selected ? classes.textActive : classes.text }} />}

                        {open ? <ExpandLessIcon sx={{ color: selected ? '#DC4C64' : '#ccced1' }} /> : <ExpandMoreIcon sx={{ color: selected ? '#DC4C64' : '#ccced1' }} />}
                        </ListItemButton>
                    </ListItem>
                </div>
            :
                <Link to={page.link} style={{ textDecoration: 'none', fontWeight: 'bolder !important' }}>
                    <ListItem key={page.id} disablePadding>
                        <ListItemButton selected={selected} style={{ color: selected ? '#DC4C64' : '', fontWeight: '550' }}>
                        <ListItemIcon>
                            <RenderIcon menuName={page.name.toLocaleUpperCase()}/>
                        </ListItemIcon>

                        {page.is_dev === 1 ?
                            <ListItemText primary={<StyledSubBadge badgeContent={page.badge_message} color="error">{page.name.toLocaleUpperCase()}</StyledSubBadge>} classes={{ primary: classes.text }} />
                        : 
                            <ListItemText primary={page.name.toLocaleUpperCase()} classes={{ primary: selected ? classes.textActive : classes.text }} />
                        }
                        </ListItemButton>
                    </ListItem>
                </Link>
            }

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" sx={{ marginLeft: '10% !important' }} disablePadding>
                    {subPage?.map((item, key) => (
                        <React.Fragment key={key}>
                            {item.code === subType ? 
                                item.link === '' ? 
                                    <div style={{ fontWeight: 'bolder !important' }}>
                                        <ListItem key={key} onClick={handleClick} disablePadding>
                                            <ListItemButton selected={true}>
                                                {/* <ListItemIcon>
                                                    <MovieIcon sx={{ color: "#DC4C64" }} />
                                                </ListItemIcon> */}
                                                
                                                {item.is_dev === 1 ?
                                                <StyledSubBadge badgeContent={item.badge_message} color="error">
                                                    <ListItemText className='sidebar-no-link-menu' primary={item.name.toLocaleUpperCase()} sx={{ color: '#DC4C64 !important' }} classes={{ primary: classes.text }} />
                                                </StyledSubBadge>
                                                : <ListItemText className='sidebar-no-link-menu' primary={item.name.toLocaleUpperCase()} sx={{ color: '#DC4C64 !important' }} classes={{ primary: classes.textActive }} />}

                                            </ListItemButton>
                                        </ListItem>
                                    </div>
                                : 
                                    <Link to={item.link} style={{ textDecoration: 'none', fontWeight: 'bolder !important' }}>
                                        <ListItem key={key} disablePadding>
                                            <ListItemButton selected={true}>
                                                {/* <ListItemIcon>
                                                    <MovieIcon sx={{ color: "#DC4C64" }} />
                                                </ListItemIcon> */}
                                                
                                                {item.is_dev === 1 ?
                                                <StyledSubBadge badgeContent={item.badge_message} color="error">
                                                    <ListItemText className='sidebar-no-link-menu' primary={item.name.toLocaleUpperCase()} sx={{ color: '#DC4C64 !important' }} classes={{ primary: classes.text }} />
                                                </StyledSubBadge>
                                                : <ListItemText className='sidebar-no-link-menu' primary={item.name.toLocaleUpperCase()} sx={{ color: '#DC4C64 !important' }} classes={{ primary: classes.textActive }} />}

                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                            : 
                                item.link === '' ? 
                                    <div style={{ fontWeight: 'bolder !important' }}>
                                        <ListItem key={key} onClick={handleClick} disablePadding>
                                            <ListItemButton selected={false}>
                                                {/* <ListItemIcon>
                                                    <MovieIcon sx={{ color: "#DC4C64" }} />
                                                </ListItemIcon> */}

                                                {item.is_dev === 1 ?
                                                <StyledSubBadge badgeContent={item.badge_message} color="error">
                                                    <ListItemText className='sidebar-no-link-menu' primary={item.name.toLocaleUpperCase()} classes={{ primary: classes.text }} />
                                                </StyledSubBadge>
                                                : <ListItemText className='sidebar-no-link-menu' primary={item.name.toLocaleUpperCase()} classes={{ primary: classes.text }} />}

                                            </ListItemButton>
                                        </ListItem>
                                    </div>
                                : 
                                    <Link to={item.link} style={{ textDecoration: 'none', fontWeight: 'bolder !important' }}>
                                        <ListItem key={key} disablePadding>
                                            <ListItemButton selected={false}>
                                                {/* <ListItemIcon>
                                                    <MovieIcon sx={{ color: "#DC4C64" }} />
                                                </ListItemIcon> */}
                                                
                                                {item.is_dev === 1 ?
                                                <StyledSubBadge badgeContent={item.badge_message} color="error">
                                                    <ListItemText className='sidebar-no-link-menu' primary={item.name.toLocaleUpperCase()} classes={{ primary: classes.text }} />
                                                </StyledSubBadge>
                                                : <ListItemText className='sidebar-no-link-menu' primary={item.name.toLocaleUpperCase()} classes={{ primary: classes.text }} />}

                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                            }
                        </React.Fragment>
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
};

export default SideBarListItem;