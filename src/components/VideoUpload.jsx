/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { createRef, useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from '../pages/ModalContainer';
import { CloseIcon, UploadVideoIcon } from './Icons';
import useInput from '../hooks/useInput';
import { getFileName } from '../helper/file';
import { firestore, timestamp } from '../firebase/config';
import { getFeed } from '../reducers/feedSlice';

const Wrapper = styled.div`
  width: 800px;
  height: 90%;
  min-height: 600px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.divider};
    line-height: 46px;
    height: 46px;
    text-overflow: ellipsis;
    padding: 0 8px;
  }

  .prepare {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .upload-label {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .upload-icon {
      width: 120px;
      height: 120px;
      background-color: #ebebeb;
      border-radius: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .disable-button svg {
        fill: #949494;
      }
    }

    .select-button {
      margin-top: 36px;
      background-color: ${(props) => props.theme.toggle};
      color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 450;
      height: 36px;
      line-height: 36px;
      padding: 0 14px;
    }
  }

  .content {
    display: flex;
    padding: 24px 16px 0;
    flex-grow: 1;
    flex-direction: column;

    // left side
    input,
    textarea {
      resize: none;
      border: none;
      outline: none;
      padding: 4px;
      width: 100%;
      height: calc(100% - 28px);
    }
    .detail {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .error {
        color: red;
        font-size: 15px;
      }

      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .publish-button {
        background-color: ${(props) => props.theme.toggle};
      }
      .disable-button {
        background-color: ${(props) => props.theme.secondaryColor};
        cursor: inherit;
      }
      p {
        font-size: 28px;
        font-weight: 500;
      }

      .detail-section {
        border: 1px solid ${(props) => props.theme.divider};
        padding: 8px;
        margin-bottom: 8px;
      }

      .label {
        height: 20px;
        line-height: 20px;
        color: ${(props) => props.theme.secondaryColor};
        padding: 2px;
      }

      input:focus {
        border-bottom: 1px solid ${(props) => props.theme.toggle};
      }
      .description {
        flex-grow: 1;
      }
    }
    .preview {
      position: relative;
      padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */ .react-player {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
`;

const VideoUpload = ({ open, onClose }) => {
  const [video, setVideo] = useState();
  const [videoPath, setVideoPath] = useState();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const videoRef = createRef();
  const title = useInput('');
  const description = useInput('');
  const { uid } = useSelector((state) => state.userdetail.profile);

  if (!open) {
    return null;
  }

  const handleSelectVideo = () => {
    const file = videoRef.current.files[0];
    setVideo(file);
    setVideoPath(URL.createObjectURL(file));
    title.setValue(getFileName(file.name));
    if (file.size / 1000000 > 50) {
      setError('file size should be less than 50MB,');
    } else {
      setError('');
    }
  };

  const handleCloseModal = () => {
    setVideo();
    setVideoPath();
    setError('');
    description.setValue('');
    title.setValue('');
    onClose();
  };

  const handlePublish = async () => {
    const file = videoRef.current.files[0];
    if (!title.value.trim() || !file || error) {
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('upload_preset', 'utube-video');
    formData.append('file', file);
    axios.post(process.env.REACT_APP_CLOUDINARY_ENDPOINT, formData).then((result) => {
      const videoUrl = result.data.secure_url;
      const thumbUrl = `${getFileName(videoUrl)}.jpg`;
      firestore
        .collection('video')
        .add({
          uid,
          url: videoUrl,
          thumb: thumbUrl,
          title: title.value,
          description: description.value,
          createdAt: timestamp(),
          views: 0,
        })
        .then((result) => {
          setUploading(false);
          handleCloseModal();

          // when upload finish, we refetch feed data;
          dispatch(getFeed());
        });
    });
  };

  return ReactDOM.createPortal(
    <ModalContainer>
      <Wrapper>
        {uploading && (
          <ModalContainer>
            <ReactLoading width={48} height={48} type="spin" />
          </ModalContainer>
        )}
        <div className="header">
          <p> {title?.value} </p>
          <CloseIcon onClick={handleCloseModal} />
        </div>
        <input
          ref={videoRef}
          onChange={handleSelectVideo}
          type="file"
          id="video"
          accept="video/*"
          style={{ display: 'none' }}
        />
        {!video ? (
          <div className="prepare">
            <label htmlFor="video" className="upload-label">
              <div className="upload-icon">
                <UploadVideoIcon />
              </div>
              <span className="select-button" type="button">
                SELECT FILE
              </span>
            </label>
          </div>
        ) : (
          <div className="content">
            <div className="preview">
              <ReactPlayer className="react-player" controls url={videoPath} width="100%" />
            </div>
            <div className="detail">
              <div className="detail-header">
                <p>Details</p>
                <p className="error">{error}</p>
                <button
                  type="button"
                  onClick={handlePublish}
                  className={
                    !title.value.trim() || !video || error
                      ? 'button disable-button'
                      : 'button publish-button'
                  }
                >
                  PUBLISH
                </button>
              </div>
              <div className="detail-section title">
                <div className="label">Title (required)</div>
                <input required type="text" value={title.value} onChange={title.onChange} />
              </div>
              <div className="detail-section description">
                <div className="label">Description</div>
                <textarea value={description.value} onChange={description.onChange} />
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </ModalContainer>,
    document.getElementById('modal')
  );
};

export default VideoUpload;
