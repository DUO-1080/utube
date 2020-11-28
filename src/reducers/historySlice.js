import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../firebase/config';

export const getHistory = createAsyncThunk('history/getHistory', async (uid) => {
  const data = (
    await firestore
      .collection('userprofile')
      .doc(uid)
      .collection('history')
      .orderBy('createdAt', 'desc')
      .get()
  ).docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
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
