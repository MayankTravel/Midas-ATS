import { POST_VMS, hrms_api_host } from "Components/helpers/url_helper";
import {
  api_is_vmsdata_error,
  api_is_vmsdata_loading,
  api_is_vmsdata_success,
} from "./reducer";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const AddNewVMS =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${POST_VMS}`;
      const body = {
        name: values.name,
        orgCode: values.orgCode,
        parentOrganization: values.parentOrganization,
        password: values.password,
        url: values.url,
      };
      const fetch: any = await Factory("POST", setter, url, body);
      if (fetch.status === "OK") {
        dispatch(api_is_vmsdata_success(fetch));
        Swal.fire(
          "Success",
          `VMS(s) ${values.name}  added successfully`,
          "success"
        ).then(() => {
          // Redirect using router after user clicks "OK"
          router.push("/vms/view-vms");
        });
      } else {
        dispatch(api_is_vmsdata_error(fetch));
      }
      dispatch(api_is_vmsdata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_vmsdata_error(error));
    }
  };

export const EditNewVMS =
  (values: any, router: any) => async (dispatch: any) => {
    console.log(values);
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${POST_VMS}`;
      const body = {
        id: values.id,
        name: values.name,
        orgCode: values.orgCode,
        parentOrganization: values.parentOrganization,
        password: values.password,
        url: values.url,
      };
      const fetch: any = await Factory("PATCH", setter, url, body);
      if (fetch.status === "OK") {
        // console.log(fetch);
        dispatch(api_is_vmsdata_success(fetch));
        Swal.fire(
          "Success",
          `VMS(s) ${values.name}  edit successfully`,
          "success"
        ).then(() => {
          // Redirect using router after user clicks "OK"
          router.push("/vms/view-vms");
        });
      } else {
        dispatch(api_is_vmsdata_error(fetch));
      }
      dispatch(api_is_vmsdata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_vmsdata_error(error));
    }
  };

export const fetchVMS = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${POST_VMS}`;
    dispatch(api_is_vmsdata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    console.log(fetch);
    dispatch(api_is_vmsdata_success(fetch));
    // dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_vmsdata_error(error));
  }
};
