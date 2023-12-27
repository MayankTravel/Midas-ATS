import { createSlice } from "@reduxjs/toolkit";
import { clientJobs } from "../jobs/_client/thunk";

const initialState = {
  isLoading: false,
  isError: "",
  data: [],
  assigntouser: <any>[],
  submitSuccess: "",
};

const vmsSlice = createSlice({
  name: "vmsSlice",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isLoading = true;
      state.isError = "";
      state.data = [];
    },
    api_is_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.data = [];
    },
    api_is_success_vms(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.data = action.payload;
    },
    api_is_assigned_vms(state, action) {
      const { data, id, dispatch } = action.payload;
      const assignedVMS = data
        .filter((item: any) => item.accountManager == id)
        .map((ite: any) => {
          return ite.vmsName;
        });
      state.isLoading = false;
      state.isError = "";
      state.assigntouser = assignedVMS;
    },
    api_is_submitted_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.submitSuccess = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success_vms,
  api_is_assigned_vms,
  api_is_submitted_success,
} = vmsSlice.actions;
export default vmsSlice.reducer;
