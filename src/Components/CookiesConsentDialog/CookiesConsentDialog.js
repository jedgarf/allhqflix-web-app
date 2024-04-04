import React, { Fragment, useState } from 'react';
import { Button, Typography } from "@mui/material";

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
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '18px', textAlign: 'center', fontWeight: 'normal', zIndex: 2 }}>
            <Typography variant='span'>
                By continuing, you agree to save your watching progress using cookies.
            </Typography>
            <div style={{ paddingTop: '18px' }}>
                <Button variant='contained' size='small' onClick={() => handleSaveProgress()} startIcon={<ThumbUpAltIcon/>}>I Agree</Button>
            </div>
        </div>
      )}
    </Fragment>
  );
}

export default CookiesConsentDialog;
