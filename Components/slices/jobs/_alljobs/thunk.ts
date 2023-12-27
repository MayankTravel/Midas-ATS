import { GET_ALL_JOBS, job_api_host } from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_jobdata_error,
  api_is_jobdata_loading,
  api_is_jobdata_success,
} from "./reducers";

export const fetchAllJobs = async (dispatch: any) => {
  try {
    dispatch(api_is_jobdata_loading(true));
    const fetch_api: any = axios.get(`${job_api_host}${GET_ALL_JOBS}`);
    const data = await fetch_api;
    const response = data.map((ite: any) =>
      Object.keys(ite).map((item, index) => ite[item])
    );

    dispatch(api_is_jobdata_success(response));
    toast.success("API Key Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    dispatch(api_is_jobdata_error(error));
    toast.error("API Key Added Failed", { autoClose: 3000 });
    console.log("error");
    return error;
  }
};
