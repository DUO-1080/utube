import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { getChannel } from '../reducers/channelSlice';
import Avatar from './Avatar';
import NavItem from './NavItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubscribedChannels = () => {
  const dispatch = useDispatch();
  const { loading, channels } = useSelector((state) => state.channel);
  const { uid } = useSelector((state) => state.userdetail.profile);

  useEffect(() => {
    dispatch(getChannel(uid));
  }, [dispatch]);

  if (loading) {
    return <span>loading</span>;
  }

  return (
    <Wrapper>
      {!loading &&
        channels.map((channel) => (
          <NavLink
            key={channel.uid}
            exact
            to={`/channel/${channel.uid}`}
            activeClassName="nav-active"
          >
            <NavItem
              Icon={Avatar}
              mini
              src={
                channel.photoURL ||
                `https://avatars.dicebear.com/api/human/${channel.displayName}.svg`
              }
              text={channel.displayName}
            />
          </NavLink>
        ))}
    </Wrapper>
  );
};

export default SubscribedChannels;
