import {
  GET_ASSIGNED_JOBS_BY_ME,
  GET_ASSIGNED_JOBS_TO_ME,
  UNASSIGNED_JOBS,
  job_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_assigndata_error,
  api_is_assigndata_loading,
  api_is_assigndata_success,
  api_is_assigned_by_am,
  assigned_feed_to_me,
  assigned_feeds_by_me,
  unassigned_success,
} from "./reducers";
import Swal from "sweetalert2";

export const getAssignedJobsToMe = (id: any) => async (dispatch: any) => {
  try {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      console.log(`${job_api_host}${GET_ASSIGNED_JOBS_TO_ME}/${obj.id}`);
      const options = {
        url: `${job_api_host}${GET_ASSIGNED_JOBS_TO_ME}/${obj.id}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      dispatch(api_is_assigndata_loading(true));
      const fetch_api = axios.request(options);
      const data: any = await fetch_api;
      dispatch(assigned_feed_to_me(data));
      return data;
    }
  } catch (error) {
    dispatch(api_is_assigndata_error(error));
    toast.error("API Key Added Failed", { autoClose: 3000 });
    return error;
  }
};

export const getAssignedJobByoMe = (id: any) => async (dispatch: any) => {
  try {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      const options = {
        url: `${job_api_host}${GET_ASSIGNED_JOBS_BY_ME}/${obj.id}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: "{}",
      };
      dispatch(api_is_assigndata_loading(true));
      const fetch_api = axios.request(options);
      const data: any = await fetch_api;
      dispatch(assigned_feeds_by_me(data));
      return data;
    }
  } catch (error) {
    dispatch(api_is_assigndata_error(error));
    console.log("error");
    return error;
  }
};

const unassignmap = async ({ rollId, selectedJobs, dispatch }: any) => {
  const amIdArray = selectedJobs.map((item: any) => item.amId);
  const tlIdArray = selectedJobs.map((item: any) => item.tlId);
  const FinalUserArray = selectedJobs.map(
    (item: any) => item.finalUserAssignee
  );
  function removeDuplicatesWithForEachAm(arr: any) {
    const uniqueArray: any = [];

    arr.forEach((item: any) => {
      if (!uniqueArray.includes(item)) {
        uniqueArray.push(item);
      }
    });

    return uniqueArray;
  }
  const am = removeDuplicatesWithForEachAm(amIdArray);
  function removeDuplicatesWithForEachId(arr: any) {
    const uniqueArray: any = [];

    arr.forEach((item: any) => {
      if (!uniqueArray.includes(item)) {
        uniqueArray.push(item);
      }
    });

    return uniqueArray;
  }
  const tl = removeDuplicatesWithForEachId(tlIdArray);
  function removeDuplicatesWithForEachFinalUser(arr: any) {
    const uniqueArray: any = [];

    arr.forEach((item: any) => {
      if (!uniqueArray.includes(item)) {
        uniqueArray.push(item);
      }
    });

    return uniqueArray;
  }
  const finalUser = removeDuplicatesWithForEachFinalUser(FinalUserArray);

  const options = {
    url: `${job_api_host}${UNASSIGNED_JOBS}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      managerId: rollId.role === "ACCOUNTMANAGER" ? am[0] : tl[0],
      recruiterId: rollId.role === "ACCOUNTMANAGER" ? tl[0] : finalUser[0],
      jobProviderIds: selectedJobs.map((item: any) => item.ProviderJobID),
    },
  };
  const fetch_api = await axios.request(options);
  const data: any = await fetch_api;
  if (data.status === "OK") {
    Swal.fire({
      title: "Successfully Un-asssigned.",
      text: "Job(s) has been unassigned successfully. It will take upto 5 Mins to get updated.",
      icon: "info",
      timer: 10000,
    });
    dispatch(unassigned_success(data.message));
  } else {
    Swal.fire({
      title: data.message,
      icon: "error",
    });
  }
  return data;
};
const unassign = async ({ id, jobsdata, rollId, dispatch }: any) => {
  const options = {
    url: `${job_api_host}${UNASSIGNED_JOBS}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      managerId:
        rollId.role === "ACCOUNTMANAGER" ? jobsdata.amId : jobsdata.tlId,
      recruiterId:
        rollId.role === "ACCOUNTMANAGER"
          ? jobsdata.tlId
          : jobsdata.finalUserAssignee,
      jobProviderIds: [jobsdata.ProviderJobID],
    },
  };

  console.log(options.data);
  const fetch_api = axios.request(options);
  const data: any = await fetch_api;
  if (data.status === "OK") {
    Swal.fire({
      title: "Successfully Un-asssigned.",
      text: "Job(s) has been unassigned successfully. It will take upto 5 Mins to get updated.",
      icon: "info",
      timer: 6000,
    });
    dispatch(unassigned_success(data.message));
    // window.location.reload();
  } else {
    Swal.fire({
      title: data.message,
      icon: "error",
    });
  }
  return data;
};

export const unassignedJobs =
  ({ id, jobsdata, rollId, selectedJobs }: any) =>
  async (dispatch: any) => {
    try {
      Swal.fire({
        title: "Are your sure to unassign",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, unassign it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (selectedJobs.length !== 0) {
            unassignmap({ id, jobsdata, rollId, selectedJobs, dispatch });
          } else {
            unassign({ id, jobsdata, rollId, selectedJobs, dispatch });
          }
        }
      });
    } catch (error) {
      dispatch(api_is_assigndata_error(error));
      return error;
    }
  };

export const getJobsByAmAndRecruiter =
  (userdata: any) => async (dispatch: any) => {
    try {
      if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser") || "");
        var filterAraya: any = userdata.filter(
          (item: any) => item.id === obj.id
        );
        console.log(
          `${job_api_host}${GET_ASSIGNED_JOBS_BY_ME}/${filterAraya[0].managerId}`
        );
        const options = {
          url: `${job_api_host}${GET_ASSIGNED_JOBS_BY_ME}/${filterAraya[0].managerId}`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: "{}",
        };
        dispatch(api_is_assigndata_loading(true));
        const fetch_api = axios.request(options);
        const data: any = await fetch_api;

        dispatch(api_is_assigned_by_am(data));
        return data;
      }
    } catch (error) {
      dispatch(api_is_assigndata_error(error));
      console.log("error");
      return error;
    }
  };
