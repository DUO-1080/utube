const { createSlice } = require('@reduxjs/toolkit');

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebar: true,
  },
  reducers: {
    openSidebar: (state) => {
      state.sidebar = true;
    },
    closeSidebar: (state) => {
      state.sidebar = false;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
