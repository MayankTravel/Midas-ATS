import {
  GET_ALL_CLIENT,
  POST_ASSIGNED_JOB,
  POST_CALC_RATES,
  job_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_rates_error,
  api_is_rates_loading,
  api_is_rates_success,
} from "./reducers";

export const GetTravelRates = (values: any) => async (dispatch: any) => {

  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: `{"year":2024,"city":${JSON.stringify(
        values.City
      )},"state":${JSON.stringify(values.State)}}`,

      url: `${job_api_host}${POST_CALC_RATES}`,
    };
    dispatch(api_is_rates_loading(true));

    const fetch_api: any = axios.request(options);
    const data = await fetch_api;
  
    dispatch(api_is_rates_success(data));
    toast.success(data.payload, { autoClose: 3000 });
    return data;
  } catch (error) {
    dispatch(api_is_rates_error(error));
    return error;
  }
};
