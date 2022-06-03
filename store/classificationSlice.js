import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classification: null,
}

export const classificationSlice = createSlice({
    name: "classification",
    initialState,
    reducers: {
        setClassification: (state, action) => {
            state.classification = action.payload;
        }
    }
})

export const { setClassification } = classificationSlice.actions;

export default classificationSlice.reducer;