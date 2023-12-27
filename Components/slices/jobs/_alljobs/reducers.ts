import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  jobdata: [],
};

const jobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    api_is_jobdata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.jobdata = [];
    },
    api_is_jobdata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.jobdata = [];
    },
    api_is_jobdata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.jobdata = action.payload;
    },
  },
});

export const {
  api_is_jobdata_loading,
  api_is_jobdata_error,
  api_is_jobdata_success,
} = jobSlice.actions;
export default jobSlice.reducer;
