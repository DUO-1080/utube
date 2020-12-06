import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import Comments from '../components/Comments';
import Liked from '../components/Liked';
import PlaylistContainer from '../components/PlaylistContainer';
import PlaylistItem from '../components/PlaylistItem';
import SubscribeButton from '../components/SubscribeButton';
import VideoPlayer from '../components/VideoPlayer';
import ViewsAndAgo from '../components/ViewsAndAgo';
import { firestore, timestamp } from '../firebase/config';
import { getFeed } from '../reducers/feedSlice';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 24px 24px 0;

  .video-container {
    flex-grow: 1;
    margin-right: 24px;
  }

  .video-info {
    margin: 24px 0 8px;

    .title {
      font-weight: 400;
      font-size: 18px;
      color: ${(props) => props.theme.primaryColor};
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .top-row {
    padding-top: 16px;
    border-top: 1px solid ${(props) => props.theme.divider};
    display: flex;

    .owner {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;

      .upload-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 14px;
        line-height: 15px;
        .channel-name {
          height: auto;
        }
        .sub-count {
          font-size: 13px;
          color: ${(props) => props.theme.secondaryColor};
        }
      }
    }
    /* .subscription-button {
      button {
        width: 110px;
        height: 36px;
        text-align: center;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
        font-weight: 450;
      }
      .unsub {
        background-color: red;
        color: white;
      }

      .sub {
        background-color: #ececec;
        color: #606060;
      }
    } */
  }

  .video-description {
    margin: 0 56px;
  }

  .next-play {
    width: 400px;
  }

  @media screen and (max-width: 1400px) {
    .next-play {
      display: none;
    }
  }
`;

const Watch = () => {
  const { videoId } = useParams();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState();
  const { uid } = useSelector((state) => state.userdetail.profile);
  const { loading: feedLoading, videos: feedVideos } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    firestore
      .collection('video')
      .doc(videoId)
      .get()
      .then(async (result) => {
        const data = result.data();

        if (!data) {
          history.push('/404');
          return;
        }
        // get info detail
        const info = (await firestore.collection('userprofile').doc(data.uid).get()).data();

        // get subscribers
        const subscribers = (
          await firestore.collection('subscription').where('channel', '==', data.uid).get()
        ).size;

        // did i subscription
        const isSubscripted =
          (
            await firestore
              .collection('subscription')
              .where('channel', '==', data.uid)
              .where('uid', '==', uid)
              .get()
          ).size > 0;

        const v = {
          ...data,
          info,
          subscribers,
          isSubscripted,
        };

        setVideo(v);
        setLoading(false);
      });
  }, [videoId]);

  useEffect(() => {
    if (feedLoading) {
      dispatch(getFeed());
    }
  }, [feedLoading]);

  // record watch history
  useEffect(() => {
    if (video) {
      firestore
        .collection('userprofile')
        .doc(uid)
        .collection('history')
        .doc(videoId)
        .get()
        .then((doc) => {
          if (doc.data()) {
            doc.ref.update({ createdAt: timestamp() });
          } else {
            console.log('history not exist, create one.');
            doc.ref.set({ createdAt: timestamp(), video: { id: videoId, ...video } });
          }
        });
    }
  }, [video]);

  const handleSubscript = () => {
    if (video.isSubscripted) {
      firestore
        .collection('subscription')
        .where('channel', '==', video.uid)
        .where('uid', '==', uid)
        .get()
        .then((snapshot) => snapshot.forEach((doc) => doc.ref.delete()));
      setVideo({ ...video, isSubscripted: false, subscribers: video.subscribers - 1 });
    } else {
      firestore.collection('subscription').add({ uid, channel: video.uid });
      setVideo({ ...video, isSubscripted: true, subscribers: video.subscribers + 1 });
    }
  };

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <Wrapper>
      <div className="video-container">
        <VideoPlayer video={video} videoId={videoId} />
        <div className="video-info">
          <div className="title"> {video.title} </div>
          <div className="info">
            <ViewsAndAgo video={video} />
            <Liked targetId={videoId} />
          </div>
        </div>
        <div className="secondary-info">
          <div className="top-row">
            <div className="owner">
              <div className="avatar">
                <Avatar medium src={video.info.photoURL} />
              </div>
              <div className="upload-info">
                <span className="channel-name">
                  <Link to={`/channel/${video.info.uid}`}>{video.info.displayName}</Link>
                </span>
                <span className="sub-count">{video.subscribers} subscribers</span>
              </div>
            </div>
            {video.uid === uid || (
              // <div className="subscription-button">
              //   <button
              //     type="button"
              //     className={video.isSubscripted ? 'sub' : 'unsub'}
              //     onClick={handleSubscript}
              //   >
              //     {video.isSubscripted ? 'SUBSCRIPTED' : 'SUBSCRIBE'}
              //   </button>
              // </div>
              <SubscribeButton subscribed={video.isSubscripted} handleSubscribe={handleSubscript} />
            )}
          </div>
          <div className="video-description">{video.description}</div>
        </div>
        <Comments videoId={videoId} />
      </div>
      <div className="next-play">
        <p>Up next</p>
        {!feedLoading && <PlaylistContainer videos={feedVideos.filter((v) => v.id !== videoId)} />}
      </div>
    </Wrapper>
  );
};

export default Watch;
