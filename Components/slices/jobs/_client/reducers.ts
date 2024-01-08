import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  clientdata: [],
  selJobs: <any>[],
  jobsAssigned: <string>"",
};

const clientSlice = createSlice({
  name: "clientSlice",
  initialState,
  reducers: {
    api_is_clientdata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.clientdata = [];
    },
    api_is_clientdata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.clientdata = [];
    },
    api_is_clientdata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.clientdata = action.payload;
    },
    api_is_jobsel_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.selJobs = action.payload;
    },
    api_is_job_assigned_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.jobsAssigned = action.payload.payload;
    },
    api_is_job_assigned_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.jobsAssigned = action.payload;
    },
  },
});

export const {
  api_is_clientdata_loading,
  api_is_clientdata_error,
  api_is_clientdata_success,
  api_is_jobsel_success,
  api_is_job_assigned_success,
  api_is_job_assigned_error,
} = clientSlice.actions;
export default clientSlice.reducer;
