import {
  EDIT_USER,
  GET_ALL_ROLES,
  GET_ALL_USER,
  POST_NEW_USER,
  hrms_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_roles_fetched,
  api_is_userdata_error,
  api_is_userdata_loading,
  api_is_userdata_success,
} from "./reducers";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const fetchAllUser = () => async (dispatch: any) => {
  try {
    dispatch(api_is_userdata_loading(true));
    const fetch_api = axios.get(`${hrms_api_host}${GET_ALL_USER}`);
    const data = await fetch_api;
    dispatch(api_is_userdata_success(data));
    toast.success("API Key Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    dispatch(api_is_userdata_error(error));
    toast.error("API Key Added Failed", { autoClose: 3000 });
    return error;
  }
};

export const fetchAllRoles = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${GET_ALL_ROLES}`;
    dispatch(api_is_userdata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    dispatch(api_is_roles_fetched(fetch));
    dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_userdata_error(error));
  }
};
export const AddNewUser =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${POST_NEW_USER}`;
      const body = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        manager: values.manager,
        mobileNumber: JSON.stringify(values.mobileNumber),
        password: values.password,
        roles: values.roles,
      };
      const fetch: any = await Factory("POST", setter, url, body);
      if (fetch.status === "OK") {
        dispatch(api_is_userdata_success(fetch));
        Swal.fire("Success", "User added successfully", "success").then(() => {
          // Redirect using router after user clicks "OK"
          router.push("/users/view-user");
        });
      } else {
        dispatch(api_is_userdata_error(fetch));

        // Display SweetAlert on success
      }
      dispatch(api_is_userdata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_userdata_error(error));
    }
  };

export const EditNewUser =
  (values: any, router: any) => async (dispatch: any) => {
    console.log(values);
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${EDIT_USER}`;
      const body = {
        active: true,
        email: values.email,
        firstName: values.firstName,
        id: values.id,
        lastName: values.lastName,
        manager: "null",
        mobileNumber: JSON.stringify(values.mobileNumber),
        password: values.password,
        profilePicture: "string",
        roles: values.roles,
        userType: "INTERNAL",
      };
      const fetch: any = await Factory("PATCH", setter, url, body);
      console.log("fetch:", fetch);
      if (fetch.status === "OK") {
        console.log(fetch);
        dispatch(api_is_userdata_success(fetch));
      } else {
        dispatch(api_is_userdata_error(fetch));

        // Display SweetAlert on success
        Swal.fire("Success", "User Edit successfully", "success").then(() => {
          // Redirect using router after user clicks "OK"
          router.push("/users/view-user");
        });
      }
      dispatch(api_is_userdata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_userdata_error(error));
    }
  };
