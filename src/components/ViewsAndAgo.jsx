import React from 'react';
import styled from 'styled-components';
import TimeAgo from './TimeAgo';

const Wrapper = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.secondaryColor};
  padding: 0;
  height: 18px;

  .views::after {
    content: '•';
    margin: 0 4px;
  }
`;

const ViewsAndAgo = ({ video, ...restProps }) => (
  <Wrapper {...restProps}>
    <span className="views">{video.views} views </span>
    <span className="ago">
      <TimeAgo seconds={video.createdAt.seconds} />
    </span>
  </Wrapper>
);

export default ViewsAndAgo;
