import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "light",
  user: null,
  token: null,
  services: [],
  categories: [],
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.services = [];
    },
    setServiceData: (state, action) => {
      state.services = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setMode, setLogin, setLogout, setServiceData, setCategories } =
  authState.actions;
export default authState.reducer;
