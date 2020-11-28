import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { firestore } from '../firebase/config';

const Wrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const VideoPlayer = ({ video, videoId }) => {
  const [viewed, setViewed] = useState(false);

  const countingViews = (p) => {
    if (p.played > 0.75 && !viewed) {
      firestore
        .collection('video')
        .doc(videoId)
        .get()
        .then((doc) => {
          const { views } = doc.data();
          doc.ref.update({ views: views + 1 });
          setViewed(true);
        });
    }
  };
  return (
    <Wrapper>
      <ReactPlayer
        className="react-player"
        controls
        url={video.url}
        onProgress={countingViews}
        width="100%"
        height="100%"
      />
    </Wrapper>
  );
};

export default VideoPlayer;
