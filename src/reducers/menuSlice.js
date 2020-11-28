const { createSlice } = require('@reduxjs/toolkit');

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    open: false,
  },
  reducers: {
    openMenu: (state, action) => {
      state.open = true;
    },
    closeMenu: (state, action) => {
      state.open = false;
    },
  },
});

export const { openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
