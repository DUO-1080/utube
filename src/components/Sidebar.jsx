import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useUser from '../hooks/useUser';
import {
  HistoryIcon,
  HomeIcon,
  LibraryIcon,
  NavLikeIcon,
  SubscriptionIcon,
  TrendingIcon,
  VideoIcon,
} from './Icons';
import NavItem from './NavItem';
import SignInButton from './SignInButton';
import SubscribedChannels from './SubscribedChannels';

const Wrapper = styled.div`
  position: fixed;
  top: 56px;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.barBg};
  width: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .items {
    display: flex;
    flex-direction: column;
    padding: 12px 0;

    .items-section {
      height: 0;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid ${(props) => props.theme.divider};
    }
  }

  a:hover {
    background-color: ${(props) => props.theme.itemHover};
  }

  .subscriptions {
    padding: 8px 24px;
    font-weight: normal;
    font-size: 14px;
    color: ${(props) => props.theme.secondaryColor};
  }

  .sign-in-msg {
    padding: 0 24px;

    .msg {
      color: #030303;
      font-size: 14px;
      margin: 10px 0;
    }
  }
`;

const Sidebar = () => {
  const { userprofile } = useUser();
  const uid = userprofile?.uid;

  return (
    <Wrapper>
      <div className="items">
        <NavLink exact to="/" activeClassName="nav-active">
          <NavItem text="Home" Icon={HomeIcon} classes="icon" />
        </NavLink>
        <NavLink exact to="/feed/trending" activeClassName="nav-active">
          <NavItem text="Trending" Icon={TrendingIcon} classes="icon" />
        </NavLink>
        <NavLink exact to="/feed/subscriptions" activeClassName="nav-active">
          <NavItem text="Subscriptions" Icon={SubscriptionIcon} classes="icon" />
        </NavLink>

        <div className="items-section" />
        <NavLink exact to="/feed/library" activeClassName="nav-active">
          <NavItem text="Library" Icon={LibraryIcon} classes="icon" />
        </NavLink>
        <NavLink exact to="/feed/history" activeClassName="nav-active">
          <NavItem text="History" Icon={HistoryIcon} classes="icon" />
        </NavLink>

        {userprofile ? (
          <>
            <NavLink exact to={`/channel/${uid}`} activeClassName="nav-active">
              <NavItem text="Your videos" Icon={VideoIcon} classes="icon" />
            </NavLink>
            <NavLink exact to="/feed/liked" activeClassName="nav-active">
              <NavItem text="Liked videos" Icon={NavLikeIcon} classes="icon" />
            </NavLink>

            <div className="items-section" />
            <h3 className="subscriptions">SUBSCRIPTIONS</h3>

            <SubscribedChannels />
          </>
        ) : (
          <>
            <div className="items-section" />

            <div className="sign-in-msg">
              <NavLink exact to="/sign-in">
                <SignInButton />
              </NavLink>
              <p className="msg">Sign in to like videos, comment, and subscribe.</p>
            </div>
            <div className="items-section" />
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Sidebar;
