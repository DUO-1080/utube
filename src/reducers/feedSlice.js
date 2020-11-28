import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../firebase/config';

export const getFeed = createAsyncThunk('feed/getFeed', async () => {
  const data = await Promise.all(
    (await firestore.collection('video').orderBy('createdAt', 'desc').get()).docs.map(
      async (doc) => {
        const data = doc.data();
        const info = (await firestore.collection('userprofile').doc(data.uid).get()).data();
        return { id: doc.id, info, ...data };
      }
    )
  );

  return data;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    videos: [],
    loading: true,
  },
  extraReducers: {
    [getFeed.fulfilled]: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    },
  },
});

export default feedSlice.reducer;
