import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoGridFlex from '../components/VideoGridFlex';
import VideoItem from '../components/VideoItem';
import { getTrending } from '../reducers/trendingSlice';

const Trending = () => {
  const dispatch = useDispatch();

  const { loading, videos } = useSelector((state) => state.trending);

  useEffect(() => {
    dispatch(getTrending());
    document.title = 'Trending';
  }, [dispatch]);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <VideoGridFlex miniWidth={330}>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </VideoGridFlex>
  );
};

export default Trending;
