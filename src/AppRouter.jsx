/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MainContainer from './pages/MainContainer';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Trending from './pages/Trending';
import Subscriptions from './pages/Subscriptions';
import History from './pages/History';
import LikedVideo from './pages/LikedVideo';
import Library from './pages/Library';
import Channel from './pages/Channel';
import PageNotFount from './pages/PageNotFount';
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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/feed/trending" component={Trending} />
            <Route path="/feed/subscriptions" component={Subscriptions} />
            <Route path="/feed/history" component={History} />
            <Route path="/feed/liked" component={LikedVideo} />
            <Route path="/feed/library" component={Library} />
            <Route path="/channel/:channelId" component={Channel} />
            <Route path="/watch/:videoId" component={Watch} />
            <Route path="404" component={PageNotFount} />
            <Route component={PageNotFount} />
          </Switch>
        </MainContainer>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
