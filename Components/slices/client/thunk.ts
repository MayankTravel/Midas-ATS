import { CLIENT, hrms_api_host } from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_clientdata_error,
  api_is_clientdata_loading,
  api_is_clientdata_success,
} from "./reducer";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const AddNewClient =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${CLIENT}`;
      const body = {
        name: values.name,
        email: values.email,
        address: values.address,
        phone: values.phone,
        contactPerson: values.contactPerson,
        parentOrganization: values.parentOrganization,
      };
      const fetch: any = await Factory("POST", setter, url, body);
      if (fetch.status === "OK") {
        dispatch(api_is_clientdata_success(fetch));
        Swal.fire("Success", "Client added successfully", "success").then(
          () => {
            router.push("/client/view-client");
          }
        );
      } else {
        dispatch(api_is_clientdata_error(fetch));
      }
      dispatch(api_is_clientdata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_clientdata_error(error));
    }
  };

export const EditNewClient =
  (values: any, router: any) => async (dispatch: any) => {
    console.log(values);
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${CLIENT}`;
      const body = {
        id: values.id,
        name: values.name,
        email: values.email,
        address: values.address,
        phone: values.phone,
        contactPerson: values.contactPerson,
        parentOrganization: values.parentOrganization,
      };
      const fetch: any = await Factory("PATCH", setter, url, body);
      if (fetch.status === "OK") {
        dispatch(api_is_clientdata_success(fetch));
        Swal.fire("Success", "Client Edit successfully", "success").then(() => {
          router.push("/client/view-client");
        });
      } else {
        dispatch(api_is_clientdata_error(fetch));
      }
      dispatch(api_is_clientdata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_clientdata_error(error));
    }
  };

export const fetchClient = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${CLIENT}`;
    dispatch(api_is_clientdata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    dispatch(api_is_clientdata_success(fetch));
    // dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_clientdata_error(error));
  }
};
