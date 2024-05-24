import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: "tk_42834792374237",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
  selectors: {
    selectToken: (state) => state.token,
  },
});

export const { selectToken } = auth.selectors;
export const { setToken, removeToken } = auth.actions;
