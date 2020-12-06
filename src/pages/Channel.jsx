import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import EditProfile from '../components/EditProfile';
import SubscribeButton from '../components/SubscribeButton';
import { firestore } from '../firebase/config';
import ChannelAbout from './ChannelAbout';
import ChannelChannels from './ChannelChannels';
import ChannelHome from './ChannelHome';
import { updateProfile } from '../reducers/userdetailSlice';
import { getChannel } from '../reducers/channelSlice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .banner {
    width: 100%;
    height: 185px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .channel-header {
    /* margin: 18px 80px 0; */
    margin-top: 16px;
    padding: 0 80px;
    display: flex;
    align-items: center;

    .meta {
      margin-left: 18px;
      flex-grow: 1;

      .channel-name {
        font-size: 24px;
        letter-spacing: 1.1px;
      }
      .subscribers {
        font-size: 14px;
        color: ${(props) => props.theme.secondaryColor};
      }
    }

    .edit-profile-button {
      background-color: ${(props) => props.theme.toggle};
    }
  }

  .channel-tags {
    padding: 0 80px;
    display: flex;
    align-items: flex-start;
    margin-top: 16px;
    color: ${(props) => props.theme.secondaryColor};

    .tag {
      margin: 8px;
      padding: 0 24px;
    }

    .tag:hover {
      color: ${(props) => props.theme.primaryColor};
    }

    .active-tag {
      border-bottom: 2px solid ${(props) => props.theme.primaryColor};
      color: ${(props) => props.theme.primaryColor};
    }
  }

  .content {
    flex-grow: 1;
    background-color: ${(props) => props.theme.channelBg};
  }
`;

const Channel = () => {
  const { channelId } = useParams();
  const { uid } = useSelector((state) => state.userdetail.profile);
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(async () => {
    setLoading(true);

    const profile = (await firestore.collection('userprofile').doc(channelId).get()).data();

    if (!profile) {
      history.push('/404');
      return;
    }

    const videos = (
      await firestore.collection('video').where('uid', '==', channelId).get()
    ).docs.map((doc) => ({ id: doc.id, ...doc.data(), info: profile }));

    const channels = await Promise.all(
      (await firestore.collection('subscription').where('uid', '==', channelId).get()).docs.map(
        async (doc) => {
          const data = doc.data();
          const profile = (
            await firestore.collection('userprofile').doc(data.channel).get()
          ).data();
          const subscribed =
            uid === channelId
              ? true
              : (
                  await firestore
                    .collection('subscription')
                    .where('uid', '==', uid)
                    .where('channel', '==', doc.id)
                    .get()
                ).docs.length > 0;

          const subscribers = (
            await firestore.collection('subscription').where('channel', '==', data.channel).get()
          ).docs.length;

          return { id: doc.id, profile, subscribed, subscribers };
        }
      )
    );

    const subscribers = (
      await firestore.collection('subscription').where('channel', '==', channelId).get()
    ).docs.length;

    const subscribed =
      (await (
        await firestore
          .collection('subscription')
          .where('uid', '==', uid)
          .where('channel', '==', channelId)
          .get()
      ).docs.length) > 0;

    setChannelData({ profile, videos, channels, subscribers, subscribed });
    setLoading(false);

    document.title = profile.displayName;
  }, [channelId]);

  const handleSubscribe = () => {
    if (channelData.subscribed) {
      firestore
        .collection('subscription')
        .where('uid', '==', uid)
        .where('channel', '==', channelId)
        .get()
        .then((snapshot) => snapshot.docs.forEach((doc) => doc.ref.delete()));

      setChannelData({
        ...channelData,
        subscribed: false,
        subscribers: channelData.subscribers - 1,
      });
    } else {
      firestore.collection('subscription').add({ uid, channel: channelId });
      setChannelData({
        ...channelData,
        subscribed: true,
        subscribers: channelData.subscribers + 1,
      });
    }
    dispatch(getChannel());
  };

  const closeModal = (profile) => {
    if (profile) {
      setChannelData({ ...channelData, profile: { ...channelData.profile, ...profile } });
      dispatch(updateProfile({ profile }));
    }
    setOpenModal(false);
  };

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <Wrapper>
      {channelData.profile.banner && (
        <div className="banner">
          <img src={channelData.profile.banner} alt="channel banner" />
        </div>
      )}
      <div className="channel-header">
        <Avatar large src={channelData.profile.photoURL} />
        <div className="meta">
          <div className="channel-name"> {channelData.profile.displayName} </div>
          <div className="subscribers"> {channelData.subscribers} subscribers </div>
        </div>

        {uid === channelId ? (
          <button
            type="button"
            className="edit-profile-button button"
            onClick={() => setOpenModal(true)}
          >
            EDIT PROFILE
          </button>
        ) : (
          <SubscribeButton subscribed={channelData.subscribed} handleSubscribe={handleSubscribe} />
        )}
      </div>
      <div className="channel-tags">
        <NavLink to={`/channel/${channelId}`} activeClassName="active-tag" exact>
          <div className="tag"> HOME </div>
        </NavLink>
        <NavLink to={`/channel/${channelId}/channels`} activeClassName="active-tag" exact>
          <div className="tag"> CHANNELS </div>
        </NavLink>
        <NavLink to={`/channel/${channelId}/about`} activeClassName="active-tag" exact>
          <div className="tag"> ABOUT </div>
        </NavLink>
      </div>

      <div className="content">
        <Route path={`/channel/${channelId}`} exact>
          <ChannelHome videos={channelData.videos} />
        </Route>

        <Route path={`/channel/${channelId}/channels`}>
          <ChannelChannels channels={channelData.channels} />
        </Route>

        <Route path={`/channel/${channelId}/about`}>
          <ChannelAbout profile={channelData.profile} />
        </Route>
      </div>

      <EditProfile open={openModal} onClose={closeModal} profile={channelData.profile} />
    </Wrapper>
  );
};

export default Channel;
