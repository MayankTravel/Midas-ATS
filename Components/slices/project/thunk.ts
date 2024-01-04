import {
  GET_PROJECT,
  PROJECT,
  hrms_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_projectdata_error,
  api_is_projectdata_loading,
  api_is_projectdata_success,
} from "./reducer";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const fetchProjects = (id: any) => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${GET_PROJECT}/${id}`;

    dispatch(api_is_projectdata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    dispatch(api_is_projectdata_success(fetch));
    // dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_projectdata_error(error));
  }
};

export const AddNewProject =
  (values: any, router: any) => async (dispatch: any) => {
    dispatch(api_is_projectdata_loading(true));

    try {
      dispatch(api_is_projectdata_loading(true));

      var setter: any = [];
      const url = `${hrms_api_host}${PROJECT}`;
      const body = {
        billRates: values.billRates,
        designation: values.designation,
        endDate: values.endDate,
        facilityId: values.facilityId,
        guaranteeHours: values.guaranteeHours,
        name: values.name,
        employeeId: values.empId,
        occupationType: values.occupationType,
        organisationId: values.organisationId,
        overTimeRates: values.overTimeRates,
        payRates: values.payRates,
        preDeim: values.preDeim,
        projectType: "NEW",
        startDate: values.startDate,
        projectStatus: values.projectStatus,
        status: true,
        timeSheets: [],
        travelAllowance: values.travelAllowance,
      };
      dispatch(api_is_projectdata_loading(true));

      const fetch: any = await Factory("POST", setter, url, body);
      dispatch(api_is_projectdata_loading(true));

      if (fetch.status === "OK") {
        dispatch(api_is_projectdata_loading(false));
        Swal.fire("Success", "Project added successfully", "success").then(
          () => {
            router.push("/employee/employee-control");
          }
        );
      } else {
        Swal.fire({
          title: "Error",
          text: fetch.errors,
          timer: 8000,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(api_is_projectdata_error(error));
    }
  };
export const EditedProject =
  (values: any, router: any) => async (dispatch: any) => {
    dispatch(api_is_projectdata_loading(true));
    try {
      dispatch(api_is_projectdata_loading(true));
      var setter: any = [];
      const url = `${hrms_api_host}${PROJECT}`;
      const body = {
        employeeId: values.emp_id,
        billRates: values.billRates,
        designation: values.designation,
        endDate: values.endDate,
        facilityId: values.facilityId,
        guaranteeHours: values.guaranteeHours,
        id: values.id,
        name: values.name,
        occupationType: values.occupationType,
        organisationId: values.organisationId,
        overTimeRates: values.overTimeRates,
        payRates: values.payRates,
        preDeim: values.preDeim,
        projectStatus: values.projectStatus,
        projectType: values.projectType,
        startDate: values.startDate,
        status: true,
        timeSheets: [],
        travelAllowance: values.travelAllowance,
      };
      dispatch(api_is_projectdata_loading(true));
      const fetch: any = await Factory("PATCH", setter, url, body);
      dispatch(api_is_projectdata_loading(true));
      if (fetch.status === "OK") {
        dispatch(api_is_projectdata_loading(false));
        Swal.fire("Success", "Project edited successfully", "success").then(
          () => {
            router.push("/employee/employee-control");
          }
        );
      } else {
        dispatch(api_is_projectdata_loading(false));
        Swal.fire({ title: "Error", text: fetch.errors, timer: 2000 });
      }
    } catch (error) {
      console.log(error);
      dispatch(api_is_projectdata_error(error));
    }
  };
