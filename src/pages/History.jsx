import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { HistoryIcon } from '../components/Icons';
import PlaylistItem from '../components/PlaylistItem';
import SignInRequire from '../components/SignInRequire';
import TimeAgo from '../components/TimeAgo';
import useUser from '../hooks/useUser';
import { getHistory } from '../reducers/historySlice';

const Wrapper = styled.div`
  width: 80%;
  min-width: 400px;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0;
`;

const History = () => {
  const dispatch = useDispatch();
  const { userprofile } = useUser();
  const uid = userprofile?.uid;

  const { loading, value: history } = useSelector((state) => state.history);

  useEffect(() => {
    if (userprofile) {
      dispatch(getHistory(uid));
    }
    document.title = 'History';
  }, []);

  if (!userprofile) {
    return (
      <SignInRequire
        Icon={HistoryIcon}
        title="Keep track of what you watch"
        text="Watch history isn't viewable when signed out."
      />
    );
  }
  if (loading) {
    return <p>loading</p>;
  }

  console.log('history: ', history);

  return (
    <Wrapper miniWidth={330}>
      <p>History</p>
      {history.map((h) => (
        <div key={h.id}>
          <TimeAgo seconds={h.createdAt.seconds} />
          <PlaylistItem key={h.id} video={h.video} />
        </div>
      ))}
    </Wrapper>
  );
};

export default History;
