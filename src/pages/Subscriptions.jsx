import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoGridFlex from '../components/VideoGridFlex';
import VideoItem from '../components/VideoItem';
import { getSubscriptions } from '../reducers/subscriptions';
import useUser from '../hooks/useUser';
import SignInRequire from '../components/SignInRequire';
import { SubscriptionIcon } from '../components/Icons';

const Subscriptions = () => {
  const dispatch = useDispatch();

  const { loading: loadingChannel, channels } = useSelector((state) => state.channel);
  const { loading: loadingVideos, videos } = useSelector((state) => state.subscription);
  const { userprofile } = useUser();

  useEffect(() => {
    if (userprofile && !loadingChannel) {
      dispatch(getSubscriptions(channels));
    }
    document.title = 'Subscription';
  }, [dispatch, loadingChannel]);

  if (!userprofile) {
    return (
      <SignInRequire
        Icon={SubscriptionIcon}
        title="Don’t miss new videos"
        text="Sign in to see updates from your favorite YouTube channels"
      />
    );
  }
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
