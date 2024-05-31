import { createSlice } from "@reduxjs/toolkit";
import type {
  Action,
  ListenerEffectAPI,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  selectors: {
    selectCounter: (state) => state.value,
  },
});

export const { selectCounter } = counter.selectors;
export const { increment, decrement, incrementByAmount } = counter.actions;

export const incrementListener = {
  actionCreator: increment,
  effect: (
    action: Action,
    api: ListenerEffectAPI<unknown, ThunkDispatch<unknown, unknown, Action>>,
  ) => {
    console.log("incrementEffect", action, api);
  },
};
