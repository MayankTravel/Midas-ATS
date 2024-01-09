import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import FormLabel from "@common/FormLabel";
import FormInput from "@common/FormInput";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AddNewProject } from "Components/slices/project/thunk";
import { fetchFacilty } from "Components/slices/facility/thunk";
import { fetchOrganisation } from "Components/slices/organisation/thunk";
import moment from "moment";

const AddProjects = (props: any) => {
  const { emp_id } = props;

  const router = useRouter();
  const dispatch: any = useDispatch();
  const { organisationdata, facilitydata, isLoading, selecteddata } =
    useSelector((state: any) => ({
      organisationdata: state.organisationdata.organisationdata,
      facilitydata: state.facility.facilitydata,
      isLoading: state.project.isLoading,
      selecteddata: state.project.selecteddata,
    }));

  console.log(emp_id);

  const OCCUPATION = [
    {
      value: "W2",

      label: "W2",
    },

    {
      value: "C2C",

      label: "C2C",
    },
    {
      value: "1099",

      label: "1099",
    },
  ];

  const PROJECT = [
    {
      value: "Process",
      label: "Process",
    },
    {
      value: "Joined",
      label: "Joined",
    },
    {
      value: "Completed",
      label: "Completed",
    },
    {
      value: "Backout",
      label: "Backout",
    },
    {
      value: "Terminated",
      label: "Terminated",
    },
  ];
  const formik: any = useFormik({
    initialValues: {
      emp_id: emp_id,
      id: selecteddata.id,
      billRates: selecteddata.billRates,
      designation: selecteddata.designation,
      endDate: moment(selecteddata.endDate).format("DD-MM-YYYY"),
      facilityId: selecteddata.facility?.id,
      guaranteeHours: selecteddata.guaranteeHours,
      name: selecteddata.name,
      occupationType: selecteddata.occupationType,
      organisationId: selecteddata.organisation?.id,
      overTimeRates: selecteddata.overTimeRates,
      payRates: selecteddata.payRates,
      preDeim: selecteddata.preDeim,
      startDate: moment(selecteddata.startDate).format("DD-MM-YYYY"),
      projectStatus: selecteddata.projectStatus,
      timeSheets: selecteddata.timeSheets,
      travelAllowance: selecteddata.travelAllowance,
      projectType: "EXTENSION",
      projectId: selecteddata.id,
    },
    validationSchema: Yup.object({
      facilityId: Yup.string().required("required fields."),
      occupationType: Yup.string().required("required fields."),
      organisationId: Yup.string().required("required fields."),
      projectStatus: Yup.string().required("required fields."),
      guaranteeHours: Yup.string()
        .matches(/^\d+$/, "Please enter only numbers")
        .required("required fields."),
      designation: Yup.string().required("required fields."),

      startDate: Yup.string()
        .required("required fields.")
        .test(
          "valid-year",
          "Invalid year format. Please enter a valid year.",
          function (value) {
            const year = value.split("-")[0];
            // Check if the year is a valid numeric value greater than or equal to 4 digits
            return (
              (/^\d{4,}$/.test(year) && parseInt(year) <= 2099) ||
              this.createError({
                message: "Invalid year format. Please enter a valid year.",
              })
            );
          }
        ),
      endDate: Yup.string()
        .required("required fields.")
        .test(
          "valid-year",
          "Invalid year format. Please enter a valid year.",
          function (value) {
            const year = value.split("-")[0];
            // Check if the year is a valid numeric value greater than or equal to 4 digits
            return (
              (/^\d{4,}$/.test(year) && parseInt(year) <= 2099) ||
              this.createError({
                message: "Invalid year format. Please enter a valid year.",
              })
            );
          }
        )
        .test(
          "valid-end-date",
          "End date must be greater than start date",
          function (value, context) {
            const { startDate } = context.parent;
            // Compare start and end dates
            return (
              new Date(value) > new Date(startDate) ||
              this.createError({
                message: "End date must be greater than start date",
              })
            );
          }
        ),
      billRates: Yup.string()
        .matches(/^\d+$/, "Please enter only numbers")
        .required("required fields."),
      payRates: Yup.string()
        .matches(/^\d+$/, "Please enter only numbers")
        .required("required fields.")
        .test(
          "valid-rates",
          "Pay rates cannot exceed bill rates",
          function (value, context) {
            const { billRates } = context.parent;
            // Compare pay rates and bill rates
            return (
              parseFloat(value) <= parseFloat(billRates) ||
              this.createError({
                message: "Pay rates cannot exceed Bill rates",
              })
            );
          }
        ),
      preDeim: Yup.string()
        .matches(/^\d+$/, "Please enter only numbers")
        .required("required fields."),
      overTimeRates: Yup.string()
        .matches(/^\d+$/, "Please enter only numbers")
        .required("required fields."),
      name: Yup.string().required("required fields."),
    }),
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(AddNewProject(values, router));
    },
  });

  useEffect(() => {
    dispatch(fetchOrganisation());
    dispatch(fetchFacilty());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Add Projects | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Add Projects" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
              <Col lg={4} xs={4}>
                <FormLabel for="organisationId" labelname="Organization" />

                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="organisationId"
                  value={formik.values.organisationId}
                >
                  <option selected>Open this select menu</option>

                  {organisationdata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
                <span className="text-danger">
                  {formik.touched.organisationId &&
                  formik.errors.organisationId ? (
                    <div className="text-danger">
                      {formik.errors.organisationId}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col lg={4} xs={4}>
                <FormLabel for="facilityId" labelname="Facility" />

                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="facilityId"
                  value={formik.values.facilityId}
                >
                  <option selected>Open this select menu</option>

                  {facilitydata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
                <span className="text-danger">
                  {formik.touched.facilityId && formik.errors.facilityId ? (
                    <div className="text-danger">
                      {formik.errors.facilityId}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col lg={4} xs={4}>
                <FormLabel for="Project-Status" labelname="Project-Status" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="projectStatus"
                >
                  <option selected>Open this select menu</option>

                  {PROJECT.map((item, index) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>

                <span className="text-danger">
                  {formik.touched.projectStatus &&
                  formik.errors.projectStatus ? (
                    <div className="text-danger">
                      {formik.errors.projectStatus}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="Occupation-Type" labelname="Occupation-Type" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="occupationType"
                >
                  <option selected>Open this select menu</option>

                  {OCCUPATION.map((item, index) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>

                <span className="text-danger">
                  {formik.touched.occupationType &&
                  formik.errors.occupationType ? (
                    <div className="text-danger">
                      {formik.errors.occupationType}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="Designation" labelname="Designation" />
                <FormInput
                  inpType="text"
                  inpId="designation"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.designation}
                  inpPlaceholder="Enter Project designation"
                />
                <span className="text-danger">
                  {formik.touched.designation && formik.errors.designation ? (
                    <div className="text-danger">
                      {formik.errors.designation}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="name" labelname="Name" />
                <FormInput
                  inpType="text"
                  inpId="name"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.name}
                  inpPlaceholder="Enter Project name"
                />
                <span className="text-danger">
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="Start Date" labelname="Start Date" />
                <FormInput
                  inpType="date"
                  inpId="startDate"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.startDate}
                  inpPlaceholder="Enter Project Start Date"
                />
                <span className="text-danger">
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <div className="text-danger">{formik.errors.startDate}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="End Date" labelname="End Date" />
                <FormInput
                  inpType="date"
                  inpId="endDate"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.endDate}
                  inpPlaceholder="Enter Project End Date"
                />
                <span className="text-danger">
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <div className="text-danger">{formik.errors.endDate}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="Bill Rates" labelname="Bill Rates" />
                <FormInput
                  inpType="text"
                  inpId="billRates"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.billRates}
                  inpPlaceholder="Enter  Bill Rates"
                />
                <span className="text-danger">
                  {formik.touched.billRates && formik.errors.billRates ? (
                    <div className="text-danger">{formik.errors.billRates}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="Pay Rates" labelname="Pay Rates" />
                <FormInput
                  inpType="text"
                  inpId="payRates"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.payRates}
                  inpPlaceholder="Enter Pay Rates"
                />
                <span className="text-danger">
                  {formik.touched.payRates && formik.errors.payRates ? (
                    <div className="text-danger">{formik.errors.payRates}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="Per-Diem" labelname="Per-Diem" />
                <FormInput
                  inpType="text"
                  inpId="preDeim"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.preDeim}
                  inpPlaceholder="Enter Project Per Diem"
                />
                <span className="text-danger">
                  {formik.touched.preDeim && formik.errors.preDeim ? (
                    <div className="text-danger">{formik.errors.preDeim}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="guaranteeHours" labelname="Guarantee Hours" />
                <FormInput
                  inpType="number"
                  inpId="guaranteeHours"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.guaranteeHours}
                  inpPlaceholder="Enter Guaranteed Hours"
                />
                <span className="text-danger">
                  {formik.touched.guaranteeHours &&
                  formik.errors.guaranteeHours ? (
                    <div className="text-danger">
                      {formik.errors.guaranteeHours}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="Over Time Rates" labelname="Over Time Rates" />
                <FormInput
                  inpType="text"
                  inpId="overTimeRates"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.overTimeRates}
                  inpPlaceholder="Enter Over Time Rates"
                />
                <span className="text-danger">
                  {formik.touched.overTimeRates &&
                  formik.errors.overTimeRates ? (
                    <div className="text-danger">
                      {formik.errors.overTimeRates}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel
                  for="Travel Allowance"
                  labelname="Travel Allowance (Optional)"
                />
                <FormInput
                  inpType="text"
                  inpId="travelAllowance"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.travelAllowance}
                  inpPlaceholder="Enter Travel Allowance"
                />
                <span className="text-danger">
                  {formik.touched.travelAllowance &&
                  formik.errors.travelAllowance ? (
                    <div className="text-danger">
                      {formik.errors.travelAllowance}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col lg={12} className="mt-4 mb-3">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

AddProjects.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = (context: any) => {
  const { emp_id } = context.query;

  return {
    props: { emp_id },
  };
};
export default AddProjects;
