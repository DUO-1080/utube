import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../firebase/config';

export const getLikedVideo = createAsyncThunk('liked/getLikedVideo', async (uid) => {
  const likedList = (await firestore.collection('liked').where('uid', '==', uid).get()).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

  const data = await Promise.all(
    likedList.map(async (liked) => {
      const likedVideoData = (await firestore.collection('video').doc(liked.targetId).get()).data();
      const info = (await firestore.collection('userprofile').doc(likedVideoData.uid).get()).data();

      return { id: liked.targetId, ...likedVideoData, info };
    })
  );

  return data;
});

const likedVideoSlice = createSlice({
  name: 'liked',
  initialState: {
    loading: true,
    videos: [],
  },
  extraReducers: {
    [getLikedVideo.fulfilled]: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
  },
});

export default likedVideoSlice.reducer;
