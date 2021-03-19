/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { auth, firestore } from './firebase/config';
import Splash from './pages/Splash';
import { signIn } from './reducers/userdetailSlice';
import AppRouter from './AppRouter';
import GlobalStyle from './styled/GlobalStyle';
import { light } from './styled/themes';
import useUser from './hooks/useUser';

const App = () => {
  const dispatch = useDispatch();
  const { userdetail } = useUser();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      console.log('auth state change', user);
      if (user) {
        firestore
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
      {/* remove login require */}
      {/* {userdetail.loading ? <Splash /> : userdetail.profile ? <AppRouter /> : <Auth />} */}
      {userdetail.loading ? <Splash /> : <AppRouter />}
    </ThemeProvider>
  );
};
export default App;
