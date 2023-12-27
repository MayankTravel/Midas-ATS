import { FACILITY, hrms_api_host } from "Components/helpers/url_helper";
import {
  api_is_facilitydata_error,
  api_is_facilitydata_loading,
  api_is_facilitydata_success,
} from "./reducer";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const AddNewFacility =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${FACILITY}`;
      const body = {
        address: values.address,
        clientId: values.clientId,
        name: values.name,
        parentOrganization: values.parentOrganization,
        vmsId: values.vmsId,
      };
      const fetch: any = await Factory("POST", setter, url, body);
      if (fetch.status === "OK") {
        dispatch(api_is_facilitydata_success(fetch));
        Swal.fire("Success", "Facility added successfully", "success").then(
          () => {
            router.push("/facility/view-facility");
          }
        );
      } else {
        dispatch(api_is_facilitydata_error(fetch));
      }
      dispatch(api_is_facilitydata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_facilitydata_error(error));
    }
  };

export const EditedFacility =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${FACILITY}`;
      const body = {
        id: values.id,
        address: values.address,
        clientId: values.clientId,
        name: values.name,
        parentOrganization: values.parentOrganization,
        vmsId: values.vmsId,
      };
      console.log("body:", JSON.stringify(body));

      const fetch: any = await Factory("PATCH", setter, url, body);
      if (fetch.status === "OK") {
        dispatch(api_is_facilitydata_success(fetch));
        Swal.fire("Success", "Facility Edited successfully", "success").then(
          () => {
            router.push("/facility/view-facility");
          }
        );
      } else {
        dispatch(api_is_facilitydata_error(fetch));
      }
      dispatch(api_is_facilitydata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_facilitydata_error(error));
    }
  };
export const fetchFacilty = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${FACILITY}`;
    dispatch(api_is_facilitydata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    dispatch(api_is_facilitydata_success(fetch));
    // dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_facilitydata_error(error));
  }
};
