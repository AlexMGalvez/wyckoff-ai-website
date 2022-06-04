import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import model from "./modelSlice";
import stock from "./stockSlice";
import benchMark from "./benchMarkSlice";
import pattern from "./patternSlice";
import classification from "./classificationSlice";

const combinedReducer = combineReducers({
  model,
  stock,
  benchMark,
  pattern,
  classification
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      model: {
        model: action.payload.model.model
      },
      stock: {
        stock: action.payload.stock.stock
      },
      benchMark: {
        benchMark: action.payload.benchMark.benchMark
      },
      pattern: {
        pattern: action.payload.pattern.pattern
      },
      classification: {
        classification: action.payload.classification.classification
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
