import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  HistoryIcon,
  HomeIcon,
  LibraryIcon,
  LikeIcon,
  NavLikeIcon,
  SubscriptionIcon,
  TrendingIcon,
  VideoIcon,
} from './Icons';
import NavItem from './NavItem';
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
`;

const Sidebar = () => {
  const { uid } = useSelector((state) => state.userdetail.profile);

  return (
    <Wrapper>
      <div className="items">
        <NavLink exact to="/" activeClassName="nav-active">
          <NavItem text="Home" Icon={HomeIcon} className="icon" />
        </NavLink>
        <NavLink exact to="/feed/trending" activeClassName="nav-active">
          <NavItem text="Trending" Icon={TrendingIcon} className="icon" />
        </NavLink>
        <NavLink exact to="/feed/subscriptions" activeClassName="nav-active">
          <NavItem text="Subscriptions" Icon={SubscriptionIcon} className="icon" />
        </NavLink>

        <div className="items-section" />

        <NavLink exact to="/feed/library" activeClassName="nav-active">
          <NavItem text="Library" Icon={LibraryIcon} className="icon" />
        </NavLink>
        <NavLink exact to="/feed/history" activeClassName="nav-active">
          <NavItem text="History" Icon={HistoryIcon} className="icon" />
        </NavLink>
        <NavLink exact to={`/channel/${uid}`} activeClassName="nav-active">
          <NavItem text="Your videos" Icon={VideoIcon} className="icon" />
        </NavLink>

        <NavLink exact to="/feed/liked" activeClassName="nav-active">
          <NavItem text="Liked videos" Icon={NavLikeIcon} className="icon" />
        </NavLink>

        <div className="items-section" />

        <h3 className="subscriptions">SUBSCRIPTIONS</h3>

        <SubscribedChannels />
      </div>
    </Wrapper>
  );
};

export default Sidebar;
