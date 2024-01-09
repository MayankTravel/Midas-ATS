import { toast } from "react-toastify";
import {
  api_is_managerdata_loading,
  api_is_managerdata_error,
  api_is_managerdata_success,
  assigned_by_accountmanager,
} from "./reducer";
import {
  GET_MANAGER_DATA,
  POST_ACCOUNT_JOBS,
  hrms_api_host,
  job_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import { token } from "Components/APIFactory/token";

export const ManagerData = async (dispatch: any) => {
  try {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      dispatch(api_is_managerdata_loading(true));
      const options = {
        method: "GET",
        url: `${hrms_api_host}${GET_MANAGER_DATA}/${obj.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      };
      const fetch_api = axios.request(options);
      const data: any = await fetch_api;
      dispatch(api_is_managerdata_success(data.payload));
      AccountData(dispatch, data.payload);
      return data;
    }
  } catch (error) {
    dispatch(api_is_managerdata_error(error));
    toast.error("API Key Added Failed", { autoClose: 3000 });
    return error;
  }
};

export const AccountData = async (dispatch: any, objArray: any) => {
  try {
    const options = {
      url: `${job_api_host}${POST_ACCOUNT_JOBS}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        accountManagers: objArray.map((item: any) => {
          return item.id;
        }),
      },
    };
    const fetch_api: any = axios.request(options);
    const data = await fetch_api;
    dispatch(assigned_by_accountmanager(data));
    toast.success("Jobs Fetched Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    console.log(error);
    dispatch(api_is_managerdata_error(error));
    return error;
  }
};
