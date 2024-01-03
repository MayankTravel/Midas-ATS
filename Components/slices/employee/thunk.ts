import {
  ADDEMPLOYEE,
  EMPLOYEE,
  GET_ALL_USER,
  hrms_api_host,
} from "Components/helpers/url_helper";

import {
  api_is_employeedata_error,
  api_is_employeedata_loading,
  api_is_employeedata_success,
} from "./reducers";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const AddNewEmployee =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${ADDEMPLOYEE}`;
      const body = {
        address: values.address,
        city: values.city,
        contactDetails: values.contactDetails,
        dob: values.dob,
        email: values.email,
        employmentType: "W2C",
        name: values.name,
        organisation: values.organisation,
        projects: values.projects.map(
          (selectedProject: any) => selectedProject.value
        ),
        ssn: values.ssn,
        state: values.state,
        zipCode: values.zipCode,
      };
      console.log("requiredBody", body);

      const fetch: any = await Factory("POST", setter, url, body);
      if (fetch.status === "OK") {
        dispatch(api_is_employeedata_success(fetch));
        Swal.fire("Success", "Employee added successfully", "success").then(
          () => {
            router.push("/employee/employee-control");
          }
        );
      } else {
        dispatch(api_is_employeedata_error(fetch));
      }
      dispatch(api_is_employeedata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_employeedata_error(error));
    }
  };

export const fetchEmployee = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${EMPLOYEE}`;
    dispatch(api_is_employeedata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    console.log(fetch);
    dispatch(api_is_employeedata_success(fetch));
    // dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_employeedata_error(error));
  }
};

export const EditedEmployee =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${EMPLOYEE}`;
      const body = {
        id: values.id,
        address: values.address,
        city: values.city,
        contactDetails: values.contactDetails,
        dob: values.dob,
        email: values.email,
        name: values.name,
        projects: values.projects.map(
          (selectedProject: any) => selectedProject.value
        ),
        ssn: values.ssn,
        state: values.state,
        zipCode: values.zipCode,
        status: true,
      };
      console.log(JSON.stringify(body));

      const fetch: any = await Factory("PATCH", setter, url, body);
      console.log(fetch);
      if (fetch.status === "OK") {
        dispatch(api_is_employeedata_success(fetch));
        Swal.fire("Success", "Employee Edited successfully", "success").then(
          () => {
            router.push("/employee/employee-control");
          }
        );
      } else {
        dispatch(api_is_employeedata_error(fetch));
      }
      dispatch(api_is_employeedata_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(api_is_employeedata_error(error));
    }
  };
