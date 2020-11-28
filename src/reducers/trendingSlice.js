const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
const { firestore } = require('../firebase/config');

export const getTrending = createAsyncThunk('trending/getTrending', async () => {
  const data = await Promise.all(
    (await firestore.collection('video').orderBy('views', 'asc').get()).docs.map(async (doc) => {
      const data = doc.data();
      const info = (await firestore.collection('userprofile').doc(data.uid).get()).data();
      return { id: doc.id, info, ...data };
    })
  );
  return data;
});

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    videos: [],
    loading: true,
  },
  extraReducers: {
    [getTrending.fulfilled]: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    },
  },
});

export default trendingSlice.reducer;
