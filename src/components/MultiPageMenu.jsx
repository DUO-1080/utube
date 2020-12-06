/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase/config';
import Avatar from './Avatar';
import { SignOutIcon, ThemeIcon } from './Icons';
import NavItem from './NavItem';

const Wrapper = styled.div`
  width: 280px;
  position: absolute;
  top: 50px;
  right: 10px;
  border: 1px solid ${(props) => props.theme.divider};
  background-color: ${(props) => props.theme.barBg};

  .account {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 12px;
    border-bottom: 1px solid ${(props) => props.theme.divider};
    cursor: pointer;

    .display-name {
      margin-top: 12px;
    }
  }

  .menu-container {
    width: 100%;
    padding-top: 12px;
  }
  .menu-item {
    cursor: pointer;
  }
  .menu-item:hover {
    background-color: ${(props) => props.theme.itemHover};
  }
`;

const MultiPageMenu = ({ profile: { photoURL, displayName, uid } }) => {
  const history = useHistory();
  const handleSignOut = () => {
    auth.signOut();
    history.push('/');
  };

  return (
    <Wrapper>
      <Link to={`/channel/${uid}`}>
        <div className="account">
          <Avatar src={photoURL} large />
          <h4 className="display-name"> {displayName} </h4>
        </div>
      </Link>
      <div className="menu-container">
        <div className="menu-item">
          <NavItem Icon={ThemeIcon} text="Theme" className="icon" />
        </div>
        <div className="sign-out menu-item" onClick={handleSignOut}>
          <NavItem Icon={SignOutIcon} text="Sign out" className="icon" />
        </div>
      </div>
    </Wrapper>
  );
};

export default MultiPageMenu;
