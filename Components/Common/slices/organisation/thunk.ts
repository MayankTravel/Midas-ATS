import { ORGANISATION, hrms_api_host } from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_organisationdata_error,
  api_is_organisationdata_loading,
  api_is_organisationdata_success,
} from "./reducer";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const AddNewOrganisation =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${ORGANISATION}`;
      const body = {
        organizationName: values.organizationName,
        website: values.website,
      };
      const fetch: any = await Factory("POST", setter, url, body);
      console.log(fetch);
      if (fetch.status === "OK") {
        dispatch(api_is_organisationdata_success(fetch));
        Swal.fire("Success", "Organisation added successfully", "success").then(
          () => {
            router.push("/organisation/view-organisation");
          }
        );
      } else {
        dispatch(api_is_organisationdata_error(fetch));
      }
      dispatch(api_is_organisationdata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_organisationdata_error(error));
    }
  };

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
