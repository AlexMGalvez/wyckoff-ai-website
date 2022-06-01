import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pattern: null
};

export const patternSlice = createSlice({
  name: "pattern",
  initialState,
  reducers: {
    setPattern: (state, action) => {
      state.pattern = action.payload;
    },
  },
});

export const { setPattern } = patternSlice.actions;

export default patternSlice.reducer;
