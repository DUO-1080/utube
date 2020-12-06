import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ViewsAndAgo from './ViewsAndAgo';

const Wrapper = styled.div`
  display: flex;
  width: 400px;
  height: 95px;

  margin-bottom: 8px;
  cursor: pointer;

  .thumb {
    width: 168px;
    min-width: 148px
    height: 100%;
    margin-right: 8px;
    object-fit:cover;
  }

  .info {
    flex-grow: 1;
  }

  .info-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    margin-bottom: 4px;
  }

  .info-owner {
    font-size: 13px;
    color: ${(props) => props.theme.secondaryColor};
    padding: 0;
    line-height: 15px;
  }
`;

const PlaylistItem = ({ video }) => (
  <Link to={`/watch/${video.id}`}>
    <Wrapper>
      <img className="thumb" src={video.thumb} alt={video.title} />

      <div className="info">
        <div className="info-title">{video.title}</div>
        <div className="info-owner">{video.info.displayName}</div>
        <div className="info-more">
          <ViewsAndAgo style={{ fontSize: '13px' }} video={video} />
        </div>
      </div>
    </Wrapper>
  </Link>
);

export default PlaylistItem;
