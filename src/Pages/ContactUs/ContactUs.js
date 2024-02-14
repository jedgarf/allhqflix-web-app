import React, { useState, useEffect } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

// Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Grid, Container, Card, CardContent, CardActions, Typography, Button, Box, TextField } from '@mui/material';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import SnackBar from "../../Components/SnackBar/SnackBar";

// Utilities
import { moveToTop, moveToClassName } from "../../Services/Utils";

// Config
import { title, version, allowed_countries, jefdev_logo_transparent, dev_portfolio, fb_link, linkedin_link, github_link, site_email } from "../../Config/settings.config";

// Services
import { receiveEmail } from "../../Services/SettingService";

// Images
import { mainLogo, headerLogo, homeBackground } from "../../Config/images.config";

const AboutDevelopers = () => {

    document.title = 'AllHQFlix - Contact Us';

    const type = 'contact_us';

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isSubjectValid, setIsSubjectValid] = useState(true);
    const [isMessageValid, setIsMessageValid] = useState(true);

    // alert variable
    const [snackBarType, setSnackBarType] = useState("info");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleSnackBarOpen = () => {
        setSnackBarType("");
        setSnackBarOpen(false);
    };

    const validateEmail = (email) => {
        // A simple email validation regex
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const validateSubject = (subject) => {
        return subject ? true : false;
    };

    const validateMessage = (email) => {
        return email ? true : false;
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsEmailValid(validateEmail(newEmail));
    };

    const handleSubjectChange = (e) => {
        const newSubject = e.target.value;
        setSubject(newSubject);
        setIsSubjectValid(validateSubject(newSubject));
    };

    const handleMessageChange = (e) => {
        const newMessage = e.target.value;
        setMessage(newMessage);
        setIsMessageValid(validateMessage(newMessage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        setIsEmailValid(validateEmail(email));
        setIsSubjectValid(validateSubject(subject));
        setIsMessageValid(validateMessage(message));

        if (validateEmail(email) && validateSubject(subject) && validateMessage(message)) {
            try {
                const response = await receiveEmail(email, subject, message);
                setSnackBarType('success');
                setSnackBarMessage(response.message);
                setSnackBarOpen(true);

                // Clear all fields
                setEmail('');
                setSubject('');
                setMessage('');
            } catch (error) {
                console.error('Error posting data:', error);
            }
        } else {
            setSnackBarType('error');
            setSnackBarMessage(`Please complete all required fields.`);
            setSnackBarOpen(true);
        }
    };

    useEffect(() => {
        document.getElementsByClassName('divFocus')[0].focus();
    })

    return (
        <div className="landing-page">
            {process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? <div className="top"><ReactQueryDevtools initialIsOpen={false} /></div> : <div className="top"></div> }
            <SideBar Type={type} subType={null} haveSearch={true} transparentBg={false} isStream={true}/>
            <div className="divFocus" style={{backgroundImage: `linear-gradient(rgba(2, 9, 22, 0.8),rgba(2, 9, 22, 0.8))` }}>
                <SnackBar severity={snackBarType} handleSnackBarOpen={handleSnackBarOpen} status={snackBarOpen} snackBarMessage={snackBarMessage} />
                <div style={{ marginTop: '70px', minHeight: 600, width: '99vw' }}>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <Grid container rowSpacing={5}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Card sx={{ minHeight: '150px', marginInline: '10px' }} style={{backgroundImage: `linear-gradient(rgba(2, 9, 22, 0.4),rgba(2, 9, 22, 0.9)), url("${homeBackground}")`, paddingTop: '40px' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ textTransform: 'uppercase', fontWeight: 550, textAlign: 'center' }}>
                                            Contact Us
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <center>
                                    <Container fluid maxWidth='md'>
                                        <Grid container rowSpacing={5}>
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <p>Have question and need to talk to us? Please complete this form and we will get in touch as soon as possible.</p>
                                            </Grid>
                                            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        marginTop: 2,
                                                        '& > :not(style)': { mb: 2, width: '100%' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Your Email *" 
                                                        variant="filled" 
                                                        fullWidth
                                                        size='small'
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                        onFocus={handleEmailChange}
                                                        error={!isEmailValid}
                                                        helperText={isEmailValid ? '' : 'Invalid email format'}
                                                    />
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Subject *" 
                                                        variant="filled" 
                                                        fullWidth
                                                        size='small'
                                                        value={subject}
                                                        onChange={handleSubjectChange}
                                                        onFocus={handleSubjectChange}
                                                        error={!isSubjectValid}
                                                        helperText={isSubjectValid ? '' : 'Subject field is required'}
                                                    />
                                                    <TextField
                                                        id="filled-multiline-static"
                                                        label="Message *"
                                                        multiline
                                                        rows={4}
                                                        defaultValue=""
                                                        variant="filled"
                                                        fullWidth
                                                        size='small'
                                                        value={message}
                                                        onChange={handleMessageChange}
                                                        onFocus={handleMessageChange}
                                                        error={!isMessageValid}
                                                        helperText={isMessageValid ? '' : 'Message field is required'}
                                                    />
                                                    <Box sx={{ width: 50, textAlign: 'right' }}>
                                                        <Button variant="contained" color='error' size='small' onClick={handleSubmit} startIcon={<SendIcon/>}>Submit</Button>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                                                <Container fluid>
                                                    <Grid container rowSpacing={0}>
                                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                            <center>
                                                                <img src={mainLogo} alt={title} width={230}/>
                                                            </center>
                                                        </Grid>
                                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                            <Typography>Contact Email: <a className='text-link' href={`mailto:${site_email}`}>{site_email}</a></Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Container>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </center>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default AboutDevelopers;