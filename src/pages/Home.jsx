/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import VideoGrid from '../components/VideoGrid';
import VideoGridFlex from '../components/VideoGridFlex';
import VideoItem from '../components/VideoItem';
import { auth } from '../firebase/config';
import { getFeed } from '../reducers/feedSlice';
import MainContainer from './MainContainer';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, videos } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getFeed());
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
