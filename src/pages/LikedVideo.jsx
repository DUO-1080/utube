import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PlaylistContainer from '../components/PlaylistContainer';
import { getLikedVideo } from '../reducers/likedVideoSlice';

const Wrapper = styled.div`
  width: 80%;
  min-width: 400px;
  margin-left: 100px;
  padding: 24px 24px 0;
`;

const LikedVideo = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.userdetail.profile);
  const { loading, videos } = useSelector((state) => state.liked);

  useEffect(() => {
    dispatch(getLikedVideo(uid));
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <Wrapper>
      <p>Liked videos:</p>
      <PlaylistContainer videos={videos} />
    </Wrapper>
  );
};

export default LikedVideo;
