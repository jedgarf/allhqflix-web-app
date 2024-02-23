import React from 'react';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleClientId } from "../../Config/socialMedia.config";

const GoogleLoginBtn = ({ isMobileSize, haveSearch, onSuccess, onFailure }) => {

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin
        theme="filled_blue"
        size="large"
        type={isMobileSize ? (haveSearch ? 'icon' : 'standard') : 'standard'}
        // text="signin"
        shape='circle'
        onSuccess={onSuccess}
        onError={onFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginBtn;

