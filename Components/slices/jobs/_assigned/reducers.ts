import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  assigndata: [],
  assignedfeedsbyme: [],
  assigned_tome: [],
  unAssignSucess: "",
  jobsAssigned: <string>"",
  assignedByAmToRecruiter: <any>[],
};

const assignSlice = createSlice({
  name: "assignSlice",
  initialState,
  reducers: {
    api_is_assigndata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.assigndata = [];
    },
    api_is_assigndata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.assigndata = [];
    },

    api_is_assigndata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.assigndata = action.payload;
    },

    assigned_feeds_by_me(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.assignedfeedsbyme = action.payload;
    },
    assigned_feed_to_me(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.assigned_tome = action.payload;
    },
    unassigned_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.assigned_tome = action.payload;
    },
    api_is_assignment_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.jobsAssigned = action.payload;
    },
    api_is_assignment_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.jobsAssigned = action.payload;
    },
    api_is_assigned_by_am(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.assignedByAmToRecruiter = action.payload;
    },
  },
});

export const {
  api_is_assigndata_loading,
  api_is_assigndata_error,
  api_is_assigndata_success,
  assigned_feeds_by_me,
  assigned_feed_to_me,
  unassigned_success,
  api_is_assigned_by_am,
  api_is_assignment_success,
  api_is_assignment_error,
} = assignSlice.actions;
export default assignSlice.reducer;
