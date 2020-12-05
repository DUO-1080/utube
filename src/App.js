/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { auth, firestore } from './firebase/config';
import Home from './pages/Home';
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import { signIn } from './reducers/userdetailSlice';
import AppRouter from './AppRouter';
import GlobalStyle from './styled/GlobarStyle';
import { light } from './styled/themes';

const App = () => {
  const dispatch = useDispatch();
  const userdetail = useSelector((state) => state.userdetail);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      console.log('auth state change', user);
      if (user) {
        const profile = firestore
          .collection('userprofile')
          .doc(user.uid)
          .get()
          .then((result) => {
            const profile = result.data();
            console.log('userprofile: ', profile);
            dispatch(signIn({ profile }));
          });
      } else {
        dispatch(signIn({}));
      }
    });
    return unsub;
  }, []);

  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      {userdetail.loading ? <Splash /> : userdetail.profile ? <AppRouter /> : <Auth />}
    </ThemeProvider>
  );
};
export default App;
