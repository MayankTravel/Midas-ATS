import { ORGANISATION, hrms_api_host } from "Components/helpers/url_helper";

import {
  api_is_organisationdata_error,
  api_is_organisationdata_loading,
  api_is_organisationdata_success,
} from "./reducer";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const fetchOrganisation = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${ORGANISATION}`;
    dispatch(api_is_organisationdata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    dispatch(api_is_organisationdata_success(fetch));
    // dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_organisationdata_error(error));
  }
};
export const AddNewOrganisation =
  (values: any, router: any) => async (dispatch: any) => {
    dispatch(api_is_organisationdata_loading(true));

    try {
      dispatch(api_is_organisationdata_loading(true));
      var setter: any = [];
      const url = `${hrms_api_host}${ORGANISATION}`;
      const body = {
        organizationName: values.organizationName,
        website: values.website,
      };
      dispatch(api_is_organisationdata_loading(true));

      const fetch: any = await Factory("POST", setter, url, body);
      dispatch(api_is_organisationdata_loading(true));

      if (fetch.status === "OK") {
        dispatch(api_is_organisationdata_loading(false));

        Swal.fire("Success", "Organisation added successfully", "success").then(
          () => {
            router.push("/organisation/view-organisation");
          }
        );
      } else {
        Swal.fire({
          title: "Error",
          text: fetch.errors,
          timer: 2000,
        });
      }
    } catch (error: any) {
      console.error("Response error data:", error);
      console.error("Response error status:", error);
      console.error("Response error headers:", error);
    }
  };

export const EditNewOrganisation =
  (values: any, router: any) => async (dispatch: any) => {
    dispatch(api_is_organisationdata_loading(true));

    try {
      dispatch(api_is_organisationdata_loading(true));

      var setter: any = [];
      const url = `${hrms_api_host}${ORGANISATION}`;
      const body = {
        id: values.id,
        organizationName: values.organizationName,
        website: values.website,
      };
      dispatch(api_is_organisationdata_loading(true));

      const fetch: any = await Factory("POST", setter, url, body);
      dispatch(api_is_organisationdata_loading(true));

      if (fetch.status === "OK") {
        dispatch(api_is_organisationdata_loading(false));

        Swal.fire("Success", "Organisation edit successfully", "success").then(
          () => {
            router.push("/organisation/view-organisation");
          }
        );
      } else {
        dispatch(api_is_organisationdata_error(fetch));
      }
    } catch (error) {
      console.log(error);
      dispatch(api_is_organisationdata_error(error));
    }
  };

export const deteleOrganisation = (id: any) => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${ORGANISATION}/${id}`;
    const fetch: any = await Factory("DELETE", setter, url, {});
    if (fetch.status === "OK") {
      dispatch(fetchOrganisation());
    }
  } catch (error) {
    console.log(error);
  }
};
