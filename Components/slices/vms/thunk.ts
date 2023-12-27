import {
  GET_ALL_VMS_CONFIG_DATA,
  POST_ASSIGNED_VMS,
  DELETE_VMS,
  job_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_assigned_vms,
  api_is_error,
  api_is_loading,
  api_is_submitted_success,
  api_is_success_vms,
} from "./reducers";
import { clientJobs } from "../jobs/_client/thunk";
import Swal from "sweetalert2";

export const fetchAllAssignedVms = () => async (dispatch: any) => {
  try {
    dispatch(api_is_loading(true));

    const fetch_api = axios.get(`${job_api_host}${GET_ALL_VMS_CONFIG_DATA}`);
    const data: any = await fetch_api;

    if (localStorage.getItem("authUser")) {
      dispatch(api_is_loading(false));

      const user: any = localStorage.getItem("authUser");
      const userdata: any = JSON.parse(user);
      dispatch(api_is_assigned_vms({ data: data, id: userdata.id }));
      const assignedVMS = data
        .filter((item: any) => item.accountManager == userdata.id)
        .map((ite: any) => {
          return ite.vmsName;
        });
      dispatch(api_is_success_vms(data));
      dispatch(clientJobs(assignedVMS));
    }

    return data;
  } catch (error) {
    dispatch(api_is_error(error));
    toast.error("API Key Added Failed", { autoClose: 3000 });
    return error;
  }
};

export const submitAssignedPayload =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      await Promise.all(
        values.vmsName.map(async (item: any) => {
          const options = {
            method: "POST",
            url: `${job_api_host}${POST_ASSIGNED_VMS}`,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              vmsName: item,
              accountManager: values.accountManager,
            }),
          };
          try {
            const fetch_api: any = await axios.request(options);
            if (fetch_api.id) {
              dispatch(api_is_submitted_success("Assigned Successfully"));
              await dispatch(fetchAllAssignedVms());
              return fetch_api;
            } else {
              Swal.fire({
                title: "Failed to Assign",
                text: `Failed to assign this vms to ${values.accountManagerName}.`,
                timer: 2000,
              });
              await dispatch(fetchAllAssignedVms());
              return fetch_api;
            }
          } catch (error) {
            if (error === "Request failed with status code 500") {
              Swal.fire({
                title: "Failed to Assign",
                text: `Failed to assign this vms to ${values.accountManagerName}.`,
                timer: 2000,
              });
              await dispatch(fetchAllAssignedVms());
              return error;
            }
          }
        })
      );
    } catch (error) {
      dispatch(api_is_error(error));
    }
  };

export const deleteVMS = async ({ id, dispatch }: any) => {
  try {
    const options = {
      method: "DELETE",
      url: `${job_api_host}${DELETE_VMS}${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: "",
    };
    const fetch_api = axios.request(options);
    const data = await fetch_api;
    dispatch(fetchAllAssignedVms());
    return data;
  } catch (error) {
    dispatch(api_is_error(error));
    toast.error("API Key Added Failed", { autoClose: 3000 });
    return error;
  }
};
