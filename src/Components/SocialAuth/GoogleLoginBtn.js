import React from 'react';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleClientId } from "../../Config/socialMedia.config";

const GoogleLoginBtn = ({ isMobileSize, onSuccess, onFailure }) => {

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin
        theme="filled_blue"
        size="large"
        type={isMobileSize ? 'icon' : 'standard'}
        // text="signin"
        shape='circle'
        onSuccess={onSuccess}
        onError={onFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginBtn;

