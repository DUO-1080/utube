/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoGridFlex from '../components/VideoGridFlex';
import VideoItem from '../components/VideoItem';
import { getFeed } from '../reducers/feedSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, videos } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getFeed());
    document.title = 'Home';
  }, []);

  if (loading) {
    return <p>Loading Feed.</p>;
  }

  return (
    <VideoGridFlex miniWidth={330}>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </VideoGridFlex>
  );
};

export default Home;
