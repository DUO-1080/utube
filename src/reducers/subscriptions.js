import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../firebase/config';

export const getSubscriptions = createAsyncThunk(
  'subscriptions/getSubscriptions',
  async (channels) => {
    const data = await Promise.all(
      channels.map(async (channel) => {
        const videoList = (
          await firestore.collection('video').where('uid', '==', channel.uid).get()
        ).docs.map((doc) => ({
          id: doc.id,
          info: channel,
          ...doc.data(),
        }));

        return videoList;
      })
    );

    return data.flat(Infinity).sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  }
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    videos: [],
    loading: false,
  },
  extraReducers: {
    [getSubscriptions.fulfilled]: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    },
  },
});

export default subscriptionsSlice.reducer;
