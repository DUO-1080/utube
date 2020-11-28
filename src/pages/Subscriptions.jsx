import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoGridFlex from '../components/VideoGridFlex';
import VideoItem from '../components/VideoItem';
import { getSubscriptions } from '../reducers/subscriptions';

const Subscriptions = () => {
  const dispatch = useDispatch();

  const { loading: loadingChannel, channels } = useSelector((state) => state.channel);
  const { loading: loadingVideos, videos } = useSelector((state) => state.subscription);

  useEffect(() => {
    if (!loadingChannel) {
      dispatch(getSubscriptions(channels));
    }
  }, [dispatch, loadingChannel]);

  if (loadingVideos || loadingChannel) {
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

export default Subscriptions;
