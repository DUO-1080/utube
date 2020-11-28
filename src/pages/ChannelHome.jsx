import React from 'react';
import VideoGridFlex from '../components/VideoGridFlex';
import VideoItem from '../components/VideoItem';

const ChannelHome = ({ videos }) => (
  <VideoGridFlex miniWidth={330}>
    {videos.map((video) => (
      <VideoItem key={video.id} video={video} />
    ))}
  </VideoGridFlex>
);

export default ChannelHome;
