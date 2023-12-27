import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  rates: <any>[],
  mealRate: "",
  lodgingRate: "",
  selectedJob: [],
};

const calcSlice = createSlice({
  name: "calcSlice",
  initialState,
  reducers: {
    api_is_rates_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.rates = [];
    },
    api_is_rates_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.rates = [];
    },
    api_is_rates_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.rates = action.payload;
      state.lodgingRate = action.payload.payload.rates[0].rate[0].months.month;
      state.mealRate = action.payload.payload.rates[0].rate[0].meals;
    },
    api_is_selected_job_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.selectedJob = action.payload;
    },
  },
});

export const {
  api_is_rates_loading,
  api_is_rates_error,
  api_is_rates_success,
  api_is_selected_job_success,
} = calcSlice.actions;
export default calcSlice.reducer;
