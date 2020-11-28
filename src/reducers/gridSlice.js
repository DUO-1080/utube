const { createSlice } = require('@reduxjs/toolkit');

const gridSlice = createSlice({
  name: 'grid',
  initialState: {
    width: 0,
  },
  reducers: {
    setWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { setWidth } = gridSlice.actions;

export default gridSlice.reducer;
