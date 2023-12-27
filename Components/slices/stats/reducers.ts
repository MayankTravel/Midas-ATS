import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  statdata: [],
};

const statSlice = createSlice({
  name: "statSlice",
  initialState,
  reducers: {
    api_is_statdata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.statdata = [];
    },
    api_is_statdata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.statdata = [];
    },
    api_is_statdata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.statdata = action.payload;
    },
  },
});

export const {
  api_is_statdata_loading,
  api_is_statdata_error,
  api_is_statdata_success,
} = statSlice.actions;
export default statSlice.reducer;
