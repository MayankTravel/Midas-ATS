import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  employeedata: [],
  selected: <any>{},
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    api_is_employeedata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.employeedata = [];
    },
    api_is_employeedata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.employeedata = [];
    },
    api_is_employeedata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.employeedata = action.payload.payload;
    },
    is_selected_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.selected = action.payload;
    },
  },
});

export const {
  api_is_employeedata_loading,
  api_is_employeedata_error,
  api_is_employeedata_success,
  is_selected_success,
} = employeeSlice.actions;
export default employeeSlice.reducer;
