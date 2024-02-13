import React, { useState, useEffect } from 'react';
import ReactModalLogin from 'react-modal-login';

import {facebookConfig, googleConfig} from "../../Config/socialMedia.config";

const LoginModal = () => {

  const [showModal, isShowModal] = useState(false);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => {
    isShowModal(true);
  }

  const closeModal = () => {
    isShowModal(false);
    setError(null);
  }

  const onLoginSuccess = (method, response) => {
    console.log('logged successfully with ' + method);
  }

  const onLoginFail = (method, response) => {
    console.log('logging failed with ' + method);
    setError(response);
  }

  const startLoading = () => {
    isLoading(true);
  }

  const finishLoading = () => {
    isLoading(false);
  }

  const onTabsChange = () => {
    setError(null);
  }

  useEffect(() => {
    
  }, []);

  return (
    <div>
        <button
          onClick={() => openModal()}
        >
          Login
        </button>

        <ReactModalLogin
          visible={showModal}
          onCloseModal={() => closeModal()}
          loading={loading}
          error={error}
          tabs={{
            onChange: onTabsChange()
          }}
          loginError={{
            label: "Couldn't sign in, please try again."
          }}
          registerError={{
            label: "Couldn't sign up, please try again."
          }}
          startLoading={() => startLoading()}
          finishLoading={() => finishLoading()}
          providers={{
            facebook: {
              config: facebookConfig,
              // onLoginSuccess: onLoginSuccess(this),
              // onLoginFail: onLoginFail(this),
              label: "Continue with Facebook"
            },
            google: {
              config: googleConfig,
              // onLoginSuccess: onLoginSuccess(this),
              // onLoginFail: onLoginFail(this),
              label: "Continue with Google"
            }
          }}
        />
    </div>
  )
}

export default LoginModal;