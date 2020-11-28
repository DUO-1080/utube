import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import TimeAgo from './TimeAgo';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  color: ${(props) => props.theme.primaryColor};

  time {
    color: ${(props) => props.theme.secondaryColor};
    font-weight: normal;
  }

  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
  .username {
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text {
    font-size: 14px;
  }
`;

const CommentItem = ({ comment }) => (
  <Wrapper>
    <div className="avatar">
      <Avatar medium src={comment.info.photoURL} />
    </div>
    <div className="info">
      <div className="username">
        {comment.info.displayName} <TimeAgo seconds={comment.createdAt.seconds} />
      </div>
      <div className="text">{comment.comment}</div>
    </div>
  </Wrapper>
);

export default CommentItem;
