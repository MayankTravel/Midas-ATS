import React, { ReactElement, useState, useEffect } from "react";
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
import { EditedEmployee } from "Components/slices/employee/thunk";
import Loader from "@common/Loader";
import USCities from "../../Components/Common/utils/USCities.json";
import { fetchOrganisation } from "Components/slices/organisation/thunk";

const EditEmployee = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [filteredData, setFilteredData] = useState<any>([]);

  const {
    employeedata,
    selecteddata,
    organisationdata,
    isLoading,
    projectdata,
  } = useSelector((state: any) => ({
    employeedata: state.employee.employeedata,
    selecteddata: state.employee.selected,
    organisationdata: state.organisationdata.organisationdata,
    projectdata: state.project.projectdata,
    isLoading: state.employee.isLoading,
  }));
  const { organisation } = selecteddata;
  const formik: any = useFormik({
    initialValues: {
      id: selecteddata.id,
      name: selecteddata.name,
      dob: selecteddata.dob,
      ssn: selecteddata.ssn,
      address: selecteddata.address,
      city: selecteddata.city,
      state: selecteddata.state,
      zipCode: selecteddata.zipCode,
      email: selecteddata.email,
      contactDetails: selecteddata.contactDetails,
      organisation: selecteddata.organisation,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      dob: Yup.date()
        .required("Date of Birth is required")
        .test(
          "not-in-future",
          "Date of Birth cannot be a future date",
          function (value) {
            const selectedDate = new Date(value);
            const currentDate = new Date();
            return selectedDate <= currentDate;
          }
        ),
      ssn: Yup.string()
        .required("Social Security Number is required")
        .min(9, "Social Security Number Must be 9 Digits long")
        .max(9, "Social Security Number Must be 9 Digits long"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zipCode: Yup.string()
        .required("Zip Code is Required")
        .min(3, "Zip Code must be at least 3 characters")
        .max(5, "Zip Code must be at most 5 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
      contactDetails: Yup.string()
        .matches(/^\d+$/, "Please enter only numbers")
        .required("Contact-Number is required")
        .min(10, "Contact Number should not be long less than 10 digits")
        .max(10, "Contact Number should not be long more than 10 digits"),
    }),
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(EditedEmployee(values, router));
    },
  });

  const handleZipChange = (event: any) => {
    const enteredZip = event.target.value;
    formik.handleChange(event);
    const uscity: any = USCities;
    // Find the matching zip data in the JSON file
    const matchingZipData = uscity.find(
      (zipData: any) => zipData.zip_code === parseInt(enteredZip)
    );

    if (matchingZipData) {
      formik.setFieldValue("city", matchingZipData.city);
      formik.setFieldValue("state", matchingZipData.state);
    } else {
      formik.setFieldValue("city", "");
      formik.setFieldValue("state", "");
    }
  };

  if (isLoading) {
    return <Loader />;
  } else if (selecteddata === undefined || selecteddata === null) {
    return (
      <div className="page-content">
        Please Select A Project From Project Table
      </div>
    );
  }

  useEffect(() => {
    dispatch(fetchOrganisation());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Edit Employee | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Edit Employee" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
              {/* <Col lg={4} xs={4}>
                <FormLabel for="organisation" labelname="Organisation" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="organisation"
                >
                  <option selected>{organisation.id}</option>;
                  <option>Open this select menu</option>;
                  {organisationdata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>

                <span className="text-danger">
                  {formik.touched.organisation && formik.errors.organisation ? (
                    <div className="text-danger">
                      {formik.errors.organisation}
                    </div>
                  ) : null}
                </span>
              </Col> */}
              <Col lg={4} xs={4}>
                <FormLabel for="name" labelname="Name" />
                <FormInput
                  inpType="text"
                  inpchange={formik.handleChange}
                  inpId="name"
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.name}
                  inpPlaceholder="Enter name"
                />
                <span className="text-danger">
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={4} xs={4}>
                <FormLabel for="email" labelname="Email" />
                <FormInput
                  inpType="email"
                  inpId="email"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.email}
                  inpPlaceholder="Enter email address"
                />
                <span className="text-danger">
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={4} xs={4}>
                <FormLabel for="contact" labelname="Contact Details" />
                <FormInput
                  inpType="text"
                  inpId="contactDetails"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.contactDetails}
                  inpPlaceholder="Enter contact details"
                />
                <span className="text-danger">
                  {formik.touched.contactDetails &&
                  formik.errors.contactDetails ? (
                    <div className="text-danger">
                      {formik.errors.contactDetails}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="dob" labelname="DOB" />
                <FormInput
                  inpType="date"
                  inpId="dob"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.dob}
                  inpPlaceholder="Enter dob"
                />
                <span className="text-danger">
                  {formik.touched.dob && formik.errors.dob ? (
                    <div className="text-danger">{formik.errors.dob}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="ssn" labelname="Social Security Number" />
                <FormInput
                  inpType="text"
                  inpId="ssn"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.ssn}
                  inpPlaceholder="Enter ssn"
                />
                <span className="text-danger">
                  {formik.touched.ssn && formik.errors.ssn ? (
                    <div className="text-danger">{formik.errors.ssn}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={3} xs={3}>
                <FormLabel for="address" labelname="Street Address" />
                <FormInput
                  inpType="text"
                  inpId="address"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.address}
                  inpPlaceholder="Enter Street Address"
                />
                <span className="text-danger">
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-danger">{formik.errors.address}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={3} xs={3}>
                <FormLabel for="zip code" labelname="Zip Code" />
                <FormInput
                  inpType="text"
                  inpId="zipCode"
                  inpchange={handleZipChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.zipCode}
                  inpPlaceholder="Enter Zip Code"
                />
                <span className="text-danger">
                  {formik.touched.zipCode && formik.errors.zipCode ? (
                    <div className="text-danger">{formik.errors.zipCode}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={3} xs={3}>
                <FormLabel for="city" labelname="City" />
                <FormInput
                  inpType="text"
                  inpId="city"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.city}
                  inpPlaceholder="Enter City"
                />
                <span className="text-danger">
                  {formik.touched.city && formik.errors.city ? (
                    <div className="text-danger">{formik.errors.city}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={3} xs={3}>
                <FormLabel for="state" labelname="State" />
                <FormInput
                  inpType="text"
                  inpId="state"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.state}
                  inpPlaceholder="Enter State"
                />
                <span className="text-danger">
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-danger">{formik.errors.state}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={12} className="mt-3 mb-3">
                <Button
                  style={{ marginTop: "20px" }}
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Edit Employee
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

EditEmployee.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditEmployee;
