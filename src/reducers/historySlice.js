import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../firebase/config';

export const getHistory = createAsyncThunk('history/getHistory', async (uid) => {
  const historyList = (
    await firestore
      .collection('userprofile')
      .doc(uid)
      .collection('history')
      .orderBy('createdAt', 'desc')
      .get()
  ).docs.map((doc) => ({ id: doc.id, createdAt: doc.data().createdAt }));

  // await firestore.collection('video').orderBy('createdAt', 'desc').get()).docs.map(
  //   async (doc) => {
  //     const data = doc.data();
  //     const info = (await firestore.collection('userprofile').doc(data.uid).get()).data();
  //     return { id: doc.id, info, ...data };
  //   }

  const result = Promise.all(
    historyList.map(async ({ id, createdAt }) => {
      const videoDetail = firestore
        .collection('video')
        .doc(id)
        .get()
        .then(async (v) => {
          const data = v.data();
          console.log('get video history data: ', data);
          const info = (await firestore.collection('userprofile').doc(data.uid).get()).data();
          return { id, createdAt, video: { ...data, info, id } };
        });

      return videoDetail;
    })
  );

  return result;
});

const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: [],
    loading: true,
  },
  extraReducers: {
    [getHistory.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
  },
});

export default historySlice.reducer;
