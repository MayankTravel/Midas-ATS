import {
  GET_ALL_CLIENT,
  POST_ASSIGNED_JOB,
  job_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_clientdata_error,
  api_is_clientdata_loading,
  api_is_clientdata_success,
  api_is_job_assigned_error,
  api_is_job_assigned_success,
  api_is_jobsel_success,
} from "./reducers";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getAssignedJobByoMe, getAssignedJobsToMe } from "../_assigned/thunk";
import { fetchAllAssignedVms } from "Components/slices/thunk";
import {
  api_is_assigndata_loading,
  api_is_assignment_success,
} from "../_assigned/reducers";

export const clientJobs = (assigntouser: any) => async (dispatch: any) => {
  console.log(assigntouser);
  if (
    assigntouser.length === 0 ||
    assigntouser == null ||
    assigntouser == undefined
  ) {
    return;
  } else {
    try {
      const options = {
        url: `${job_api_host}${GET_ALL_CLIENT}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ vmsIds: assigntouser }),
      };
      const fetch_api: any = axios.request(options);
      const data = await fetch_api;
      const response = Object.keys(data).map((item, index) => data[item]);
      dispatch(api_is_clientdata_success(response));
      toast.success("Jobs Fetched Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      console.log(error);
      dispatch(api_is_clientdata_error(error));
      return error;
    }
  }
};
export const assignjobs =
  (payload: any, setShow: any, router: any) => async (dispatch: any) => {
    try {
      const options = {
        method: "POST",
        url: `${job_api_host}${POST_ASSIGNED_JOB}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      };
      dispatch(api_is_clientdata_loading(true));
      const fetch_api: any = axios.request(options);
      const data: any = await fetch_api;
      if (router.asPath === "/jobs/client" && data.status === "OK") {
        dispatch(api_is_assigndata_loading(false));
        router.push("/jobs/assigned");
        await dispatch(fetchAllAssignedVms());
        await dispatch(getAssignedJobByoMe());
        await dispatch(getAssignedJobsToMe());
        dispatch(api_is_job_assigned_success(data));
        dispatch(api_is_jobsel_success([]));
        dispatch(api_is_job_assigned_error(""));
      } else if (data.status === "OK" && router.asPath === "/jobs/assigned") {
        dispatch(api_is_assigndata_loading(false));
        dispatch(api_is_assignment_success("Jobs Assigned Successfully"));
        await dispatch(getAssignedJobByoMe());
        await dispatch(getAssignedJobsToMe());
        await dispatch(api_is_job_assigned_success(data));
        await dispatch(api_is_jobsel_success([]));
        await dispatch(api_is_job_assigned_error(""));
      } else {
        dispatch(api_is_job_assigned_error(data));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
