/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';
import { closeSidebar, openSidebar } from '../reducers/sidebarSlice';
import { Hamburger, NotificationIcon, UploadIcon } from './Icons';
import Search from './Search';
import Avatar from './Avatar';
import VideoUpload from './VideoUpload';
import MultiPageMenu from './MultiPageMenu';
import { closeMenu, openMenu } from '../reducers/menuSlice';
import SignInButton from './SignInButton';
import useUser from '../hooks/useUser';

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  z-index: 2020;
  background-color: ${(props) => props.theme.barBg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  .start {
    display: flex;
    align-items: center;

    svg {
      margin-right: 24px;
    }

    p {
      font-size: 20px;
      font-weight: 400;
    }
  }

  .end {
    height: 40px;
    display: flex;

    .menu-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .menu-icon::nth-child(3) {
      position: relative;
      width: 60px;
    }
  }
`;

const Topbar = () => {
  // const user = useSelector((state) => state.userdetail);

  const { userprofile } = useUser();
  const { sidebar } = useSelector((state) => state.sidebar);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.menu);

  const handleSidebar = () => (sidebar ? dispatch(closeSidebar()) : dispatch(openSidebar()));
  const handleOpenMenu = (e) => {
    e.stopPropagation();
    open ? dispatch(closeMenu()) : dispatch(openMenu());
  };

  const closeModal = () => setOpenModal(false);

  if (userprofile) {
    console.log(userprofile);
  }

  return (
    <Wrapper>
      <div className="start">
        <Hamburger onClick={handleSidebar} />
        <p>
          <Link to="/">utube</Link>
        </p>
      </div>
      <Search />

      <div className="end">
        {userprofile ? (
          <>
            <div className="menu-icon" onClick={() => setOpenModal(true)}>
              <UploadIcon />
            </div>
            <div className="menu-icon">
              <NotificationIcon />
            </div>
            <div className="menu-icon" onClick={handleOpenMenu}>
              <Avatar src={userprofile.photoURL} />
            </div>
            {open && userprofile && <MultiPageMenu profile={userprofile} />}
            <VideoUpload open={openModal} onClose={closeModal} />
          </>
        ) : (
          <div className="">
            <Link to="/sign-in">
              <SignInButton fill="100%" />
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Topbar;
