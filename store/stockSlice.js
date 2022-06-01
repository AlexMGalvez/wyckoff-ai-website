import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stock: null
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStock: (state, action) => {
      state.stock = action.payload;
    },
  },
});

export const { setStock } = stockSlice.actions;

export default stockSlice.reducer;
