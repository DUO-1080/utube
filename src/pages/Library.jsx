import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HistoryIcon, LibraryIcon, NavLikeIcon } from '../components/Icons';
import SignInRequire from '../components/SignInRequire';
import VideoGridFlex from '../components/VideoGridFlex';
import VideoItem from '../components/VideoItem';
import useUser from '../hooks/useUser';
import { getHistory } from '../reducers/historySlice';
import { getLikedVideo } from '../reducers/likedVideoSlice';

const Wrapper = styled.div`
  padding: 24px 24px 0;

  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 8px 8px;

    .start {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /* margin: 0 0 8px 8px; */
    }

    .end {
      color: ${(props) => props.theme.toggle};
    }
  }

  .section:not(:first-child) {
    margin-top: 16px;
  }

  .section:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.divider};
    padding-bottom: 24px;
  }

  .icon {
    margin-right: 8px;
    height: 24px;
  }
`;

const Library = () => {
  const dispatch = useDispatch();
  const { loading: loadingHistory, value: history } = useSelector((state) => state.history);
  const { loading: loadingLiked, videos: likedVideos } = useSelector((state) => state.liked);
  const { userprofile } = useUser();
  const uid = userprofile?.uid;

  useEffect(() => {
    if (userprofile) {
      dispatch(getHistory(uid));
      dispatch(getLikedVideo(uid));
    }
    document.title = 'Library';
  }, []);

  if (!userprofile) {
    return (
      <SignInRequire
        Icon={LibraryIcon}
        title="Enjoy your favorite videos"
        msg="Sign in to access videos that you’ve liked or saved"
      />
    );
  }
  if (loadingHistory || loadingLiked) {
    return <p>loading</p>;
  }

  return (
    <Wrapper>
      <section className="section">
        <div className="section-title">
          <div className="start">
            <HistoryIcon classes="icon" /> <span>History</span>
          </div>
          <div className="end">
            <Link to="/feed/history">SEE ALL</Link>
          </div>
        </div>
        <VideoGridFlex miniWidth={250}>
          {history.map((h) => (
            <VideoItem mini video={h.video} />
          ))}
        </VideoGridFlex>
      </section>

      <section className="section">
        <div className="section-title">
          <div className="start">
            <NavLikeIcon classes="icon" />
            <span>Liked videos</span>
          </div>
          <div className="end">
            <Link to="/feed/liked">SEE ALL</Link>
          </div>
        </div>
        <VideoGridFlex miniWidth={250}>
          {likedVideos.map((video) => (
            <VideoItem mini video={video} />
          ))}
        </VideoGridFlex>
      </section>
    </Wrapper>
  );
};

export default Library;
