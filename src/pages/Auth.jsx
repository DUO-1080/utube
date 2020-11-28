import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, authUiConfig } from '../firebase/config';

const Auth = () => (
  <div>
    <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={auth} />
  </div>
);

export default Auth;
