import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  facilitydata: <any>[],
  roles: <any>[],
  selected: <any>{},
};

const facilitySlice = createSlice({
  name: "facilitySlice",
  initialState,
  reducers: {
    api_is_facilitydata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.facilitydata = [];
    },
    api_is_facilitydata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.facilitydata = [];
    },
    api_is_facilitydata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.facilitydata = action.payload.payload;
    },
    is_selected_success(state, action) {
      console.log("facility", action.payload);
      state.isLoading = false;
      state.isError = "";
      state.selected = action.payload;
    },
  },
});

export const {
  api_is_facilitydata_loading,
  api_is_facilitydata_error,
  api_is_facilitydata_success,
  is_selected_success,
} = facilitySlice.actions;
export default facilitySlice.reducer;
