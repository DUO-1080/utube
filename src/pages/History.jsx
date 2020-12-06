import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PlaylistItem from '../components/PlaylistItem';
import TimeAgo from '../components/TimeAgo';
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

  const { loading, value: history } = useSelector((state) => state.history);
  const { uid } = useSelector((state) => state.userdetail.profile);

  useEffect(() => {
    dispatch(getHistory(uid));
  }, []);
  if (loading) {
    return <p>loading</p>;
  }

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
