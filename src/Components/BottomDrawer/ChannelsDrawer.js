import * as React from 'react';
import Box from '@mui/material/Box';
import { AppBar, Toolbar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// Icons
import ListItemIcon from '@mui/material/ListItemIcon';
import CircularProgress from '@mui/material/CircularProgress';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// CSS
import './css/ChannelsDrawer.css';

export default function ChannelsDrawer({ countryValue, selectedCountry, handleCountryChange, channelData, channelValue, streamValue, handleChannelChange, selectedStreamChannelId, drawerAlign }) {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const underDevelopment = () => {
    alert("Under Development");
  }

  const chooseChannel = (channelId) => {
    setIsLoading(true);
    handleChannelChange(selectedCountry, channelId);
    setIsLoading(false);
  }

  const list = (anchor) => (
    <Box
    //   className='channel_drawer_box'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500, height: 'auto', overflow: 'auto', marginBottom: '30px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Grid container columnSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }} rowSpacing={3} justifyContent="center">
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <div>
                    {channelData.isLoading ?
                        <div>
                            <Box display="flex" justifyContent="center" alignItems="center" height="50px">
                            <CircularProgress sx={{ fontSize: 100 }} />
                            </Box>
                        </div>
                    : 
                        <div>
                            {channelValue?.length > 0 ?
                            <List>
                                {channelValue?.map((item, i) => (
                                    <>
                                    {streamValue ?
                                        <>
                                            {item.id === selectedStreamChannelId ?
                                                <ListItem key={item.id} selected disablePadding>
                                                    <ListItemButton>
                                                    <ListItemIcon>
                                                        <div style={{ backgroundColor: '#353b45', padding: '5px', borderRadius: '3px' }}>
                                                            <LazyLoadImage src={item.logo} alt={item.name} title={item.name} width={30} effect="blur"/>
                                                        </div>
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.name} color='success' sx={{ fontWeight: 550 }} />
                                                    {isLoading ? <CircularProgress sx={{ fontSize: 20 }} /> : 'selected'}
                                                    </ListItemButton>
                                                </ListItem>
                                             : 
                                                <ListItem key={item.id} disablePadding>
                                                    <ListItemButton onClick={() => chooseChannel(item.id)}>
                                                    <ListItemIcon>
                                                        <div style={{ backgroundColor: '#353b45', padding: '5px', borderRadius: '3px' }}>
                                                            <LazyLoadImage src={item.logo} alt={item.name} title={item.name} width={30} effect="blur"/>
                                                        </div>
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            }
                                        </>
                                    : ''}
                                    </>
                                ))}
                            </List>
                            : 
                            <div style={{ color: 'whitesmoke' }}>
                                No Results Found.
                            </div>
                            }
                        </div>
                    }
                </div>
            </Grid>
        </Grid>
    </Box>
  );

  return (
    <div>
      {[drawerAlign].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button className="channel_list_btn" variant="contained" color='success' size='small' onClick={toggleDrawer(anchor, true)}>Channel List</Button> */}
          <Button className="channel_list_btn" variant="contained" color='success' size='small' onClick={underDevelopment}>Channel List</Button>
          <Drawer
            className='channel_drawer'
            PaperProps={{
                sx: {
                    height: anchor === 'top' || anchor === 'bottom' ? '60%' : '100%',
                },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              overflow: 'hidden',
              '& .MuiDrawer-paper': {
                overflow: 'hidden'
              }
            }}
          >
            <div className='tv_episodes_appbar' position="fixed" color='success'>
              <Toolbar>
                <Box sx={{ minWidth: '220px' }}>
                    <FormControl  sx={{ m: 1, width: '220px', color: 'white' }} color="primary" hiddenLabel={true} size="small" onChange={handleCountryChange}>
                    {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Select Country
                    </InputLabel> */}
                    <NativeSelect
                        value={selectedCountry}
                        inputProps={{
                        name: 'country',
                        id: 'uncontrolled-native',
                        }}
                    >
                    {countryValue?.map((item, no) => {
                        return (
                        <>
                        <option value={item.code}>{item.flag} {item.name}</option>
                        </>
                        )
                    })}
                    </NativeSelect>
                    </FormControl>
                </Box>
              </Toolbar>
            </div>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}