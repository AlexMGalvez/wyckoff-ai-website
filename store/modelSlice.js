import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    model: null,
}

export const modelSlice = createSlice({
    name: "model",
    initialState,
    reducers: {
        setModel: (state, action) => {
            state.model = action.payload;
        }
    }
})

export const { setModel } = modelSlice.actions;

export default modelSlice.reducer;