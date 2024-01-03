import {
  ADDEMPLOYEE,
  EMPLOYEE,
  GET_ALL_USER,
  GET_DOCUMENT,
  POST_DOCUMENT,
  hrms_api_host,
} from "Components/helpers/url_helper";

import {
  api_is_employeedata_error,
  api_is_employeedata_loading,
  api_is_employeedata_success,
} from "./reducers";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";
import moment from "moment";
import { token } from "Components/APIFactory/token";
import axios from "axios";

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
export const fetchEmployeeDoc = (id: any) => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${GET_DOCUMENT}/${id}`;
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
export const PostDocument =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      var form = new FormData();
      var setter: any = [];
      const url = `${hrms_api_host}${POST_DOCUMENT}`;

      form.append("docType", values.docType);
      form.append("file", values.file[0]);
      form.append("expiryDate", moment(values.expiryDate).format("YYYY-MM-DD"));
      form.append("empId", values.empId);

      const options = {
        method: "POST",
        url: url,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token()}`,
        },
        data: form,
      };
      const fetch_axios = await axios.request(options);
      const response: any = await fetch_axios;
      if (response.status === "OK") {
        Swal.fire(
          "Success",
          "Employee Document Uploaded successfully",
          "success"
        ).then(() => {
          router.push("#");
        });
      } else {
        Swal.fire("Error ", "Error while uploading document", "error");
      }
      dispatch(api_is_employeedata_loading(false));
      return response;
    } catch (error) {
      console.log(error);
      dispatch(api_is_employeedata_error(error));
    }
  };

// export const GetAllDocuments =
//   (values: any, router: any) => async (dispatch: any) => {
//     try {
//       var form = new FormData();
//       var setter: any = [];
//       const url = `${hrms_api_host}${POST_DOCUMENT}`;
//       form.append("docType", values.docType);
//       form.append("file", values.file[0]);
//       form.append("expiryDate", moment(values.expiryDate).format("YYYY-MM-DD"));
//       form.append("empId", values.empId);

//       const options = {
//         method: "POST",
//         url: url,
//         headers: {
//           "Content-type": "multipart/form-data",
//           Authorization: `Bearer ${token()}`,
//         },
//         data: form,
//       };
//       const fetch_axios = await axios.request(options);
//       const response: any = await fetch_axios;
//       if (response.status === "OK") {
//         dispatch(api_is_employeedata_success(fetch));
//         Swal.fire(
//           "Success",
//           "Employee Document Uploaded successfully",
//           "success"
//         ).then(() => {
//           router.push("/employee/employee-control");
//         });
//       } else {
//         dispatch(api_is_employeedata_error(fetch));
//       }
//       dispatch(api_is_employeedata_loading(false));
//       return response;
//     } catch (error) {
//       console.log(error);
//       dispatch(api_is_employeedata_error(error));
//     }
//   };
