import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  p {
    font-size: 14px;
  }
  .title {
    font-size: 16px;
    padding: 16px 0;
  }

  .description {
    flex-grow: 1;

    padding: 40px 80px;
  }

  .stat {
    min-width: 340px;
    padding-top: 40px;

    .join-at {
      border-top: 1px solid ${(props) => props.theme.divider};
      border-bottom: 1px solid ${(props) => props.theme.divider};
    }
  }
`;

const ChannelAbout = ({ profile }) => (
  <Wrapper>
    <div className="description">
      <p className="title"> description </p>
      <p> {profile.description} </p>
    </div>
    <div className="stat">
      <p className="title">Stat</p>
      <div className="join-at">
        Join {new Date(profile.createdAt.seconds * 1000).toLocaleDateString()}
      </div>
    </div>
  </Wrapper>
);

export default ChannelAbout;
