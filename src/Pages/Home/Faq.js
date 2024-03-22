import React from 'react';

// Material UI Components
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Container } from '@mui/material';

// Icons
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Config
import { title, allowed_countries } from "../../Config/settings.config";

const Faq = () => {

    const googleSearch = 'https://www.google.com/search?q=';

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container>
            <center>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} rowSpacing={1} style={{ margin: '85px auto 85px auto', padding: '0px' }}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography variant="h5" className='text-white' sx={{ marginBottom: 3, fontWeight: '550' }}><QuestionAnswerIcon sx={{ fontSize: 28, marginBottom: '-6px' }}/> FREQUENTLY ASKED QUESTIONS</Typography>
                        <Accordion className="home_accordion" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: '#dddddd' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography sx={{ fontWeight: 'bolder', textTransform: "uppercase", fontSize: '12px' }}>What is <b>{title}</b>?</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="home_accordion_body">
                            <Typography variant="p">
                                <div>
                                <b>{ title }</b> allows users to watch tens of thousands of Movies, TV shows, Anime and Asian Dramas in HD quality safely, freely, and smoothly. Despite the extensive content library and premium features, <b>{ title }</b> does not require any commitment from users. You are not obliged to pay, or even register to enjoy your favorite movies on the site without limits. We update new titles on a daily basis; therefore, you can rest assured, the fun never ends on <b>{ title }</b>. Sharing is caring! Introduce <b>{ title }</b> to your friends and family to protect them from shady and low-quality sites.
                                </div><br/>
                                <p>Only available in 
                                {
                                    allowed_countries.map((country, index) => {
                                        return (
                                        <React.Fragment key={index}>
                                            {index + 1 !== allowed_countries.length ?
                                            <>
                                            {index + 1 === allowed_countries.length - 1 ?
                                            ` ${country}`
                                            : 
                                            ` ${country}, `}
                                            </>
                                            : 
                                            ` and ${country}`}
                                        </React.Fragment>);
                                    })
                                }
                                .</p>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Accordion className="home_accordion" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: '#dddddd' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography sx={{ fontWeight: 'bolder', textTransform: "uppercase", fontSize: '12px' }}>Is <b>{ title }</b> safe?</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="home_accordion_body">
                            <Typography variant="div">
                                <div className="faq">
                                {/* <big>1. Is <b>{ title }</b> safe?</big> */}
                                <p>Using <b>{ title }</b> to watch Movies, TV shows, Anime and Asian Dramas online is as safe as using Google to search for results. <b>{ title }</b> does not pose any risk to your device and identity. Normally hackers use ad links to install viruses and malware into your device. Therefore, you are completely safe. In addition, <b>{ title }</b> does not require any registration or signup, which protects users from information leakage. Apart from excellent security, <b>{ title }</b> also provides users with these premium features:</p>
                                <br/>
                                <ul type="none">
                                <li>- An extensive pool of TV shows and series with tens of thousands of titles.</li>
                                <li>- HD Resolution (720p, adjustable).</li>
                                <li>- Seamless streaming feature.</li>
                                <li>- Fast loading speed.</li>
                                <li>- Private and safe streaming sources.</li>
                                <li>- Fast updates.</li>
                                <li>- Optimized UI & UX.</li>
                                <li>- Mobile-friendly Design.</li>
                                <li>- Auto-saving watching progress and can continue later.</li>
                                <li>- No signup or registration required.</li>
                                </ul>
                                {/* <br/>
                                <big>2. What is the purpose of this project?</big>
                                <p>- for professional portfolio content only, not to compete with other streaming sites</p> */}
                                </div>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} hidden>
                        <Accordion className="home_accordion" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: '#dddddd' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography sx={{ fontWeight: 'bolder', textTransform: "uppercase", fontSize: '12px' }}>Main Features</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="home_accordion_about_body">
                            <Typography variant="div">
                                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 3, lg: 10, xl: 10 }} rowSpacing={5}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <table border={1} width="100%">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <span>1. <b>Japanese Anime</b></span>
                                                    </th>
                                                    <td>
                                                        <ul className="main_features_text">
                                                        <li>Anime Series</li>
                                                        <li>Anime Movies</li>
                                                        <li>Anime Special Episodes</li>
                                                        <li>Anime Airing Schedule</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <span>2. <b>Asian Films (Movies and Series)</b></span>
                                                    </th>
                                                    <td>
                                                        <ul className="main_features_text" hidden>
                                                        <li><b>V1</b></li>
                                                        <ul className="main_features_text">
                                                            <li>Korean</li>
                                                            <li>Japanese</li>
                                                            <li>Taiwanese</li>
                                                            <li>Chinese Mainland</li>
                                                            <li>Thailand</li>
                                                        </ul>
                                                        </ul>
                                                        <ul className="main_features_text">
                                                        <li>Chinese</li>
                                                        <li>Hong Kong</li>
                                                        {/* <li>Indian</li> */}
                                                        <li>Japanese</li>
                                                        <li>Korean</li>
                                                        <li>Philippine</li>
                                                        <li>Taiwanese</li>
                                                        <li>Thailand</li>
                                                        <li>Other Asian Countries</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <span>3. <b>Movies</b></span>
                                                    </th>
                                                    <td>
                                                        <ul className="main_features_text">
                                                        <li>International Movies (including Netflix Movies)</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <span>4. <b>TV Series</b></span>
                                                    </th>
                                                    <td>
                                                        <ul className="main_features_text">
                                                        <li>International TV Series (including Netflix Series)</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr hidden>
                                                <th>
                                                    <span>5. <b>Special Uploads</b></span>
                                                </th>
                                                <td>
                                                    <ul className="main_features_text">
                                                    <li>Limited Movies and Series</li>
                                                    </ul>
                                                </td>
                                                </tr>
                                                <tr hidden>
                                                <th>
                                                    <span>5. <b>Live Channels (IPTV)</b></span>
                                                </th>
                                                <td>
                                                    <ul className="main_features_text">
                                                    <li>Live TV Streams (pending due to unstable resources)</li>
                                                    </ul>
                                                </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Grid>
                                </Grid>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Accordion className="home_accordion" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: '#dddddd' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography sx={{ fontWeight: 'bolder', textTransform: "uppercase", fontSize: '12px' }}>Technology Used</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="home_accordion_about_body">
                                <Typography variant="div">
                                    <Grid container columnSpacing={{ xs: 0, sm: 0, md: 3, lg: 10, xl: 10 }} rowSpacing={5}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <table border={1} width="100%">
                                            <tbody>
                                                <tr>
                                                <th>
                                                    <span><b>Front-End (<a className='text-link' href={`${googleSearch}progressive web app`} target='__blank'>Progressive Web App</a>)</b></span>
                                                </th>
                                                <td>
                                                    <ul className="main_features_text">
                                                        <li><a className='text-link' href={`${googleSearch}HTML5`} target='__blank'>HTML5</a></li>
                                                        <li><a className='text-link' href={`${googleSearch}CSS3`} target='__blank'>CSS3</a>/<a className='text-link' href={`${googleSearch}Material UI`} target='__blank'>Material UI Design</a></li>
                                                        <li><a className='text-link' href={`${googleSearch}Javascript`} target='__blank'>Javascript ES5/ES6</a></li>
                                                        <li><a className='text-link' href={`${googleSearch}ReactJS`} target='__blank'>ReactJS CRA (Front-End Framework)</a></li>
                                                        <li><a className='text-link' href={`${googleSearch}Google OAuth 2.0 API`} target='__blank'>Google OAuth 2.0 API</a></li>
                                                        <li><a className='text-link' href={`${googleSearch}TanStack Query`} target='__blank'>TanStack Query (Caching Management)</a></li>
                                                        <li><a className='text-link' href={`${googleSearch}Redux`} target='__blank'>Redux Toolkit (State Management)</a></li>
                                                    </ul>
                                                </td>
                                                </tr>
                                                <tr>
                                                <th>
                                                    <span><b>Back-End (<a className='text-link' href={`${googleSearch}REST API`} target='__blank'>REST API</a>)</b></span>
                                                </th>
                                                <td>
                                                    <ul className="main_features_text">
                                                    <li><a className='text-link' href={`${googleSearch}Javascript`} target='__blank'>Javascript ES5/ES6</a></li>
                                                    <li><a className='text-link' href={`${googleSearch}NodeJS`} target='__blank'>NodeJS v.20</a></li>
                                                    <li><a className='text-link' href={`${googleSearch}ExpressJS`} target='__blank'>ExpressJS (REST API Framework)</a></li>
                                                    <li><a className='text-link' href={`${googleSearch}Firebase`} target='__blank'>Firebase (Storage Management)</a></li>
                                                    {/* <li><a className='text-link' href={`${googleSearch}MySQL`} target='__blank'>MySQL Database</a></li>
                                                    <li><a className='text-link' href={`${googleSearch}Sequelize`} target='__blank'>Sequelize (ORM)</a></li> */}
                                                    </ul>
                                                </td>
                                                </tr>
                                                <tr>
                                                <th>
                                                    <span><b>Mobile App</b> <span style={{ color: '#3B71CA', fontWeight: 'bolder' }}>(Soon)</span></span>
                                                </th>
                                                <td>
                                                    <ul className="main_features_text">
                                                    <li><a className='text-link' href={`${googleSearch}Dart Programming`} target='__blank'>Dart Programming</a></li>
                                                    <li><a className='text-link' href={`${googleSearch}Flutter`} target='__blank'>Flutter (UI Software Development Kit)</a></li>
                                                    <li><a className='text-link' href={`${googleSearch}flutter BLoC`} target='__blank'>Flutter BLoC (State Management Pattern)</a></li>
                                                    </ul>
                                                </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Grid>
                                    </Grid>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                </Grid>
            </center>
        </Container>
    );
};

export default Faq;