import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  vmsdata: <any>[],
  selectedvms: <any>{},
};

const vmsSlice = createSlice({
  name: "vmsSlice",
  initialState,
  reducers: {
    api_is_vmsdata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.vmsdata = [];
    },
    api_is_vmsdata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.vmsdata = [];
    },
    api_is_vmsdata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.vmsdata = action.payload.payload;
    },
    is_vms_selected_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.selectedvms = action.payload;
    },
  },
});

export const {
  api_is_vmsdata_loading,
  api_is_vmsdata_error,
  api_is_vmsdata_success,
  is_vms_selected_success,
} = vmsSlice.actions;
export default vmsSlice.reducer;
