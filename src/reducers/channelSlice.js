import { useSelector } from 'react-redux';

const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
const { firestore } = require('../firebase/config');

export const getChannel = createAsyncThunk('channel/getChannel', async (uid) => {
  const channelIdList = (
    await firestore.collection('subscription').where('uid', '==', uid).get()
  ).docs.map((doc) => {
    const data = doc.data().channel;
    return data;
  });

  let channels = [];

  if (channelIdList.length > 0) {
    channels = (
      await firestore.collection('userprofile').where('uid', 'in', channelIdList).get()
    ).docs.map((doc) => {
      const data = doc.data();
      return data;
    });
  }

  console.log('subscribe channels: ', channels);
  return channels;
});

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    loading: true,
    channels: [],
  },
  extraReducers: {
    [getChannel.fulfilled]: (state, action) => {
      state.channels = action.payload;
      state.loading = false;
    },
  },
});

export default channelSlice.reducer;
