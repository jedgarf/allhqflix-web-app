import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Themes
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material UI Components
import { Grid, Container, Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';

// Icons
import SendIcon from '@mui/icons-material/Send';

// Helpers
import { getSession } from "../../Helpers/Sessions";

// Pages
import SideBar from "../../Components/SlideBar/SideBar";
import Footer from "../../Components/Footer/Footer";
import SnackBar from "../../Components/SnackBar/SnackBar";
import ReactQueryTools from "../../Components/ReactQueryTools/ReactQueryTools";
import FloatingButton from '../../Components/FloatingButton/FloatingButton';

// Config
import { title, site_email } from "../../Config/settings.config";

// Services
import { receiveEmail } from "../../Services/SettingService";

// Images
import { mainLogo, homeBackground } from "../../Config/images.config";

const ContactUs = () => {

    document.title = 'AllHQFlix - Contact Us';

    const type = 'contact_us';

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const [isPageAuth, setIsPageAuth] = useState(getSession('user') ? true : false);
    const [user, setUser] = useState(null);
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
        setUser(getSession('user') ? jwtDecode(getSession('user')) : null);
        setEmail(user?.email ? user?.email : '');
    }, [email, isPageAuth, user?.email])

    return (
        <div className="landing-page">
            <ReactQueryTools/>
            <SideBar Type={type} subType={null} haveSearch={true} transparentBg={false} isStream={true} setIsPageAuth={setIsPageAuth}/>
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
                                    <Container fluid="true" maxWidth='md'>
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
                                                        // defaultValue=""
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
                                                <Container fluid="true">
                                                    <Grid container rowSpacing={0}>
                                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                            <center>
                                                                <img src={mainLogo} alt={title} width={230}/>
                                                            </center>
                                                        </Grid>
                                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                            <Typography>Contact Email: <a className='text-link' href={`mailto:${site_email}`}>{site_email}</a></Typography>
                                                            <Typography>Creator: <a className='text-link' href={`https://jefdev.vercel.app/`}>JEFDEV Projects</a></Typography>
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
                <FloatingButton/>
                <Footer />
            </div>
        </div>
    );
};

export default ContactUs;