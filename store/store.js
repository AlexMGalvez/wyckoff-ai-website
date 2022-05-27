import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import model from "./modelSlice";
import pattern from "./patternSlice";

const combinedReducer = combineReducers({
  model,
  pattern
});

const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            model: {
                model: action.payload.model.model
            }, 
            pattern: {
                pattern: action.payload.pattern.pattern
            }
        }
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
}

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

export const wrapper = createWrapper(makeStore);
