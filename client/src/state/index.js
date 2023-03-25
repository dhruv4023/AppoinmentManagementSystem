import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "dark",
  user: null,
  token: null,
  services: [],
  categories: [],
  help: false,
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setHelp: (state) => {
      state.help = !state.help;
    },
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

export const {
  setMode,
  setLogin,
  setLogout,
  setServiceData,
  setCategories,
  setHelp,
} = authState.actions;
export default authState.reducer;
