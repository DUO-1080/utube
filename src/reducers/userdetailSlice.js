const { createSlice } = require('@reduxjs/toolkit');

const userdetailSlice = createSlice({
  name: 'userdetail',
  initialState: {
    profile: null,
    loading: true,
  },
  reducers: {
    signIn: (state, action) => {
      state.profile = action.payload.profile;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload.profile };
    },
  },
});

export const { signIn, updateProfile } = userdetailSlice.actions;

export default userdetailSlice.reducer;

export const selectUserdetail = (state) => state.userdetail;
