import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase/config';
import useUser from '../hooks/useUser';
import { DislikeIcon, LikeIcon } from './Icons';

const Wrapper = styled.div`
  display: flex;
  color: ${(props) => props.theme.secondaryColor};

  button {
    vertical-align: middle;
    color: inherit;
    outline: none;
    background-color: transparent;
    margin: 0;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  svg {
    fill: #909090;
  }

  .count {
    line-height: 24px;
    margin: 0 8px;
  }

  .liked-box {
    display: flex;
    justify-content: center;
    margin-right: 8px;
  }

  .liked-box:last-child {
    .count {
      margin-right: 0;
    }
  }

  .liked {
    svg {
      fill: ${(props) => {
        if (props.like === true) return props.theme.toggle;
      }};
    }
  }
  .disliked {
    svg {
      fill: ${(props) => {
        if (props.like === false) return props.theme.toggle;
      }};
    }
  }
`;

const Liked = ({ targetId }) => {
  const [me, setMe] = useState(null);
  const [likedCount, setLikedCount] = useState(0);
  const [dislikedCount, setDislikedCount] = useState(0);
  const { userprofile } = useUser();
  const uid = userprofile?.uid;

  useEffect(() => {
    if (userprofile) {
      firestore
        .collection('liked')
        .where('targetId', '==', targetId)
        .onSnapshot((snapshot) => {
          const likedList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setLikedCount(likedList.filter((l) => l.liked).length);
          setDislikedCount(likedList.filter((l) => !l.liked).length);
        });
    }
  }, []);

  useEffect(() => {
    if (userprofile) {
      console.log('uid: ', userprofile);
      firestore
        .collection('liked')
        .where('uid', '==', uid)
        .where('targetId', '==', targetId)
        .onSnapshot((snapshot) => {
          const me = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setMe(me[0]);
        });
    }
  }, []);

  const handleLike = () => {
    if (!userprofile) {
      return;
    }
    if (me) {
      if (me.liked) {
        firestore.collection('liked').doc(me.id).delete();
      } else {
        firestore.collection('liked').doc(me.id).update({ liked: true });
      }
    } else {
      firestore.collection('liked').add({ uid, targetId, liked: true });
    }
  };

  const handleDislike = () => {
    if (!userprofile) {
      return;
    }
    if (me) {
      if (!me.liked) {
        firestore.collection('liked').doc(me.id).delete();
      } else {
        firestore.collection('liked').doc(me.id).update({ liked: false });
      }
    } else {
      firestore.collection('liked').add({ uid, targetId, liked: false });
    }
  };

  return (
    <Wrapper like={me?.liked}>
      <button
        type="button"
        className="liked-box liked"
        disabled={!userprofile}
        onClick={handleLike}
      >
        <LikeIcon />
        <span className="count">{likedCount}</span>
      </button>

      <button
        type="button"
        className="liked-box disliked"
        disabled={!userprofile}
        onClick={handleDislike}
      >
        <DislikeIcon />
        <span className="count">{dislikedCount}</span>
      </button>
    </Wrapper>
  );
};

export default Liked;
