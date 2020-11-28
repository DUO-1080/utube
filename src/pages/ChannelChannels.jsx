import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../components/Avatar';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 18px 80px 0;

  .channel {
    width: 200px;
    /* height: 190px; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .channel-name {
    font-size: 14px;
    font-weight: 500;
    line-height: 15px;
    margin-top: 16px;
    color: ${(props) => props.theme.primaryColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .subscribers {
    font-size: 13px;
    color: ${(props) => props.theme.secondaryColor};
  }
`;

const ChannelChannels = ({ channels }) => (
  <Wrapper>
    {channels.map((channel) => (
      <Link key={channel.id} to={`/channel/${channel.profile.uid}`}>
        <div className="channel">
          <Avatar huge src={channel.profile.photoURL} />
          <div className="channel-name">{channel.profile.displayName}</div>
          <div className="subscribers"> {channel.subscribers} subscribers</div>
        </div>
      </Link>
    ))}
  </Wrapper>
);

export default ChannelChannels;
