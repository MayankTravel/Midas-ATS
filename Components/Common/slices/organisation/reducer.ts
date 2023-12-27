import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  organisationdata: <any>[],
  roles: <any>[],
};

const organisationSlice = createSlice({
  name: "organisationSlice",
  initialState,
  reducers: {
    api_is_organisationdata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.organisationdata = [];
    },
    api_is_organisationdata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.organisationdata = [];
    },
    api_is_organisationdata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.organisationdata = action.payload.payload;
    },
  },
});

export const {
  api_is_organisationdata_loading,
  api_is_organisationdata_error,
  api_is_organisationdata_success,
} = organisationSlice.actions;
export default organisationSlice.reducer;
