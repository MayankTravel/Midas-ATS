import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  projectdata: <any>[],
  roles: <any>[],
  selecteddata: <any>{},
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    api_is_projectdata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.projectdata = [];
    },
    api_is_projectdata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.projectdata = [];
    },
    api_is_projectdata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.projectdata = action.payload.payload;
    },
    selected_projectdata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.selecteddata = action.payload;
    },
  },
});

export const {
  api_is_projectdata_loading,
  api_is_projectdata_error,
  api_is_projectdata_success,
  selected_projectdata_success,
} = projectSlice.actions;
export default projectSlice.reducer;
