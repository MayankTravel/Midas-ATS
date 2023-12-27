import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  clientdata: <any>[],
  roles: <any>[],
  selectedclient: <any>{},
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
      state.clientdata = action.payload.payload;
    },
    is_client_selected_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.selectedclient = action.payload;
    },
  },
});

export const {
  api_is_clientdata_loading,
  api_is_clientdata_error,
  api_is_clientdata_success,
  is_client_selected_success,
} = clientSlice.actions;
export default clientSlice.reducer;
