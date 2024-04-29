import React, { useState, Fragment } from 'react';
import { Button, Typography, Container } from "@mui/material";

// Material UI Icons
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

// Helpers
import { addSession, getSession } from "../../Helpers/Sessions";

function CookiesConsentDialog() {

  const [consentGiven, setConsentGiven] = useState(false);

  const handleSaveProgress = () => {
    addSession('allow_cookies', true);
    setConsentGiven(true);
  };

  return (
    <Fragment>
      {(!consentGiven && !getSession('allow_cookies')) && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', backgroundColor: 'rgba(var(--body-raw-color), 0.5)', color: 'var(--four-color)', padding: '18px 0', textAlign: 'center', fontWeight: 'normal', zIndex: 20 }}>
            <Container maxWidth="xxl">
              <Typography variant='span'>
                  By continuing, you agree to save your watching progress using cookies.
              </Typography>
              <div style={{ paddingTop: '18px' }}>
                  <Button variant='contained' size='small' onClick={() => handleSaveProgress()} startIcon={<ThumbUpAltIcon/>}>I Agree</Button>
              </div>
            </Container>
        </div>
      )}
    </Fragment>
  );
}

export default CookiesConsentDialog;
