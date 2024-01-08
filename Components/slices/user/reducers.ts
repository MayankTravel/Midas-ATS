import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  userdata: <any>[],
  roles: <any>[],
  selected: <any>{},
  manager: <any>[],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    api_is_userdata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.userdata = [];
    },
    api_is_userdata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.userdata = [];
    },
    api_is_userdata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.userdata = action.payload;
    },
    api_is_roles_fetched(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.roles = action.payload;
    },
    is_user_selected_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.selected = action.payload;
    },
    is_user_manager_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.manager = action.payload;
    },
  },
});

export const {
  api_is_userdata_loading,
  api_is_userdata_error,
  api_is_userdata_success,
  is_user_selected_success,
  api_is_roles_fetched,
  is_user_manager_success,
} = userSlice.actions;
export default userSlice.reducer;
