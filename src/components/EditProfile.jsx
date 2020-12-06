/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';
import ModalContainer from '../pages/ModalContainer';
import Avatar from './Avatar';
import useInput from '../hooks/useInput';
import { fireStorage, firestore } from '../firebase/config';
import uuid from '../helper/uuid';
import { getFileExt } from '../helper/file';

const Wrapper = styled.div`
  width: 800px;
  height: 600px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  label {
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
  }

  .banner {
    width: 100%;
    height: 185px;
    background-color: ${(props) => props.theme.channelBg};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    margin: 18px;
    flex-grow: 1;

    input,
    textarea {
      border: none;
      outline: none;
      width: 100%;
      color: ${(props) => props.theme.primaryColor};
      resize: none;
      line-height: 1.3em;
    }

    .meta {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .title {
        color: ${(props) => props.theme.secondaryColor};
        font-size: 13px;
      }
    }

    .meta-section {
      border: 1px solid ${(props) => props.theme.divider};
      padding: 8px;
      border-radius: 4px;
      margin: 8px;
      display: flex;
      flex-direction: column;

      textarea {
        height: 100%;
        width: 100%;
      }
    }

    .meta-section:last-child {
      flex-grow: 1;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .avatar {
      width: 180px;
      height: auto;
      margin: 18px;
      text-align: center;
    }

    .button {
      width: 100%;
      background-color: ${(props) => props.theme.disableBg};
      margin: 8px 0;
    }

    .error {
      border: 1px solid red;
    }

    .confirm-button {
      background-color: ${(props) => props.theme.toggle};
    }
  }
`;

const EditProfile = ({ open, onClose, profile }) => {
  const [banner, setBanner] = useState(profile.banner);
  const [avatar, setAvatar] = useState(profile.photoURL);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const bannerRef = useRef();
  const avatarRef = useRef();
  const name = useInput(profile.displayName);
  const description = useInput(profile.description);

  if (!open) {
    return null;
  }

  const handleBannerChange = () => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(bannerRef.current.files[0]);
    fileReader.onload = () => {
      setBanner(fileReader.result);
    };
  };

  const handleAvatarChange = () => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(avatarRef.current.files[0]);
    fileReader.onload = () => {
      setAvatar(fileReader.result);
    };
  };

  const handleSubmit = async () => {
    setUpdating(true);
    const newName = name.value.trim();
    if (!newName) {
      setError('Channel name cannot be empty');
      return;
    }
    if (
      profile.displayName !== newName &&
      (await (await firestore.collection('userprofile').where('displayName', '==', newName).get())
        .docs.length) > 0
    ) {
      setError(`${newName} already exist`);
      return;
    }
    let bannerUrl = profile.banner;
    let avatarUrl = profile.photoURL;
    Promise.resolve()
      .then(() => {
        if (banner.startsWith('data:')) {
          console.log(bannerRef);
          return fireStorage
            .ref(`${uuid()}.${getFileExt(bannerRef.current.files[0].name)}`)
            .put(bannerRef.current.files[0]);
        }
      })
      .then((ref) => {
        if (ref) {
          return ref.ref.getDownloadURL();
        }
      })
      .then((url) => {
        if (url) {
          bannerUrl = url;
        }
        if (avatar.startsWith('data:')) {
          const file = avatarRef.current.files[0];
          return fireStorage.ref(`${uuid()}.${file.name.split('.').pop()}`).put(file);
        }
      })
      .then((ref) => {
        if (ref) {
          return ref.ref.getDownloadURL();
        }
      })
      .then((url) => {
        if (url) {
          avatarUrl = url;
        }
      })
      .then(() => {
        const newProfile = {
          banner: bannerUrl,
          photoURL: avatarUrl,
          displayName: newName,
          description: description.value,
        };

        console.log('profile: ', profile.uid);

        firestore
          .collection('userprofile')
          .doc(profile.uid)
          .update(newProfile)
          .then(() => {
            setUpdating(false);
            onClose(newProfile);
          });
      });
  };

  return ReactDOM.createPortal(
    <ModalContainer>
      <Wrapper>
        {updating && (
          <ModalContainer>
            <ReactLoading width={48} height={48} type="spin" />
          </ModalContainer>
        )}
        <div className="banner">
          <label htmlFor="banner">{banner && <img src={banner} alt="banner" />}</label>
          <input
            type="file"
            id="banner"
            accept="image/*"
            ref={bannerRef}
            onChange={handleBannerChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="content">
          <div className="meta">
            <div className={error ? 'meta-section error' : 'meta-section'}>
              <div className="title">
                Name {error && <span style={{ color: 'red' }}>{error.value}</span>}
              </div>
              <input
                type="text"
                required
                value={name.value}
                onChange={name.onChange}
                placeholder="Enter channel name"
              />
            </div>
            <div className="meta-section">
              <div className="title">Channel description</div>
              <textarea
                type="text"
                value={description.value}
                onChange={description.onChange}
                placeholder="Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places."
              />
            </div>
          </div>
          <div className="right">
            <div>
              <label htmlFor="avatar" className="avatar">
                <Avatar huge src={avatar} />
              </label>
              <input
                type="file"
                id="avatar"
                ref={avatarRef}
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </div>
            <div>
              <button className="button cancel-button" onClick={onClose} type="button">
                CANCEL
              </button>
              <button className="button confirm-button" onClick={handleSubmit} type="button">
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </ModalContainer>,
    document.getElementById('modal')
  );
};
export default EditProfile;
