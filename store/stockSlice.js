import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stock: {
    name: "CVS", data: [{
        date: "2020-01-01 00:00:00",
        open: 33,
        high: 33.5,
        low: 32.98,
        close: 33.4,
        volume: 394858493,
      },
      {
        date: "2020-01-02 00:00:00",
        open: 33.4,
        high: 35,
        low: 31,
        close: 32.4,
        volume: 294858443,
      },
      {
        date: "2020-01-03 00:00:00",
        open: 32.4,
        high: 27,
        low: 28,
        close: 33.4,
        volume: 594858493,
      },
      {
        date: "2020-01-04 00:00:00",
        open: 33,
        high: 33.5,
        low: 32.98,
        close: 33.4,
        volume: 794858493,
      },
      {
        date: "2020-01-05 00:00:00",
        open: 33.4,
        high: 35,
        low: 31,
        close: 32.4,
        volume: 494858443,
      },
      {
        date: "2020-01-06 00:00:00",
        open: 32.4,
        high: 27,
        low: 28,
        close: 33.4,
        volume: 294858493,
      },
      {
        date: "2020-01-07 00:00:00",
        open: 33,
        high: 33.5,
        low: 32.98,
        close: 33.4,
        volume: 594858493,
      },
      {
        date: "2020-01-08 00:00:00",
        open: 33.4,
        high: 35,
        low: 31,
        close: 32.4,
        volume: 394858443,
      },
      {
        date: "2020-01-09 00:00:00",
        open: 32.4,
        high: 27,
        low: 28,
        close: 33.4,
        volume: 394858493,
      },
      {
        date: "2020-01-10 00:00:00",
        open: 33,
        high: 33.5,
        low: 32.98,
        close: 33.4,
        volume: 594858493,
      },
      {
        date: "2020-01-11 00:00:00",
        open: 33.4,
        high: 35,
        low: 31,
        close: 32.4,
        volume: 594858443,
      }]
  }
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
