import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    benchMark: null
};

export const benchMarkSlice = createSlice({
    name: "benchMark",
    initialState,
    reducers: {
        setBenchMark: (state, action) => {
            state.benchMark = action.payload;
        },
    },
});

export const { setBenchMark } = benchMarkSlice.actions;

export default benchMarkSlice.reducer;