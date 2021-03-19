/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MainContainer from './pages/MainContainer';
import Home from './pages/Home';
import { closeMenu } from './reducers/menuSlice';
import ScrollToTop from './components/ScrollToTop';

const AppRouter = () => {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container" onClick={() => dispatch(closeMenu())}>
        <Topbar />
        <Sidebar />
        <MainContainer>
          <React.Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/feed/trending"
                component={React.lazy(() => import('./pages/Trending'))}
              />
              <Route
                path="/feed/subscriptions"
                component={React.lazy(() => import('./pages/Subscriptions'))}
              />
              <Route path="/feed/history" component={React.lazy(() => import('./pages/History'))} />
              <Route
                path="/feed/liked"
                component={React.lazy(() => import('./pages/LikedVideo'))}
              />
              <Route path="/feed/library" component={React.lazy(() => import('./pages/Library'))} />
              <Route
                path="/channel/:channelId"
                component={React.lazy(() => import('./pages/Channel'))}
              />
              <Route path="/watch/:videoId" component={React.lazy(() => import('./pages/Watch'))} />
              <Route path="/sign-in" component={React.lazy(() => import('./pages/SignIn'))} />
              <Route path="404" component={React.lazy(() => import('./pages/PageNotFount'))} />
              <Route component={React.lazy(() => import('./pages/PageNotFount'))} />
            </Switch>
          </React.Suspense>
        </MainContainer>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
