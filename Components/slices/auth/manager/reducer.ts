import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  isError: "",
  managerdata: [],
  account_manager: [],
};

const managerSlice = createSlice({
  name: "managerSlice",
  initialState,
  reducers: {
    api_is_managerdata_loading(state, action) {
      state.isloading = action.payload;
      state.isError = "";
      state.managerdata = [];
    },
    api_is_managerdata_error(state, action) {
      state.isloading = false;
      state.isError = action.payload;
      state.managerdata = [];
    },
    api_is_managerdata_success(state, action) {
      state.isloading = false;
      state.isError = "";
      state.managerdata = action.payload;
    },
    assigned_by_accountmanager(state, action) {
      state.isloading = false;
      state.isError = "";
      state.account_manager = action.payload;
    },
  },
});

export const {
  api_is_managerdata_loading,
  api_is_managerdata_error,
  api_is_managerdata_success,
  assigned_by_accountmanager,
} = managerSlice.actions;
export default managerSlice.reducer;
