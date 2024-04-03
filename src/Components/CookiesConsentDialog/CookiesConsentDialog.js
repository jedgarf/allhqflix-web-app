import React, { useState } from 'react';
import { Button, Typography } from "@mui/material";

import { addSession, getSession } from "../../Helpers/Sessions";

function CookiesConsentDialog() {

    const [consentGiven, setConsentGiven] = useState(false);

  const handleSaveProgress = () => {
    addSession('allow_cookies', true);
    setConsentGiven(true);
  };

  return (
    <div>
      {(!consentGiven && !getSession('allow_cookies')) && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '18px', textAlign: 'center', fontWeight: 'normal' }}>
            <Typography variant='span'>
                By continuing, you agree to save your watching progress using cookies.
            </Typography>
            <div style={{ paddingTop: '18px' }}>
                <Button variant='contained' size='small' onClick={() => handleSaveProgress()}>I Agree</Button>
            </div>
        </div>
      )}
    </div>
  );
}

export default CookiesConsentDialog;
