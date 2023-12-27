import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: "",
  error: "",
  manager: [],
  loading: false,
  isUserLogout: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUserLogout = false;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    assigned_feeds_by_me(state, action) {
      state.loading = false;
      state.manager = action.payload;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
    },
    reset_login_flag(state) {
      state.error = "";
    },
  },
});

export const { apiError, loginSuccess, logoutUserSuccess, reset_login_flag } =
  loginSlice.actions;

export default loginSlice.reducer;
