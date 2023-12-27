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
import { AddNewEmployee } from "Components/slices/employee/thunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganisation } from "Components/slices/organisation/thunk";

const AddEmployee = () => {
  const dispatch: any = useDispatch();
  const { organisationdata, isLoading } = useSelector((state: any) => ({
    organisationdata: state.organisationdata.organisationdata,
    isLoading: state.employee.isLoading,
  }));

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      organisation: "",
      name: "",
      dob: "",
      ssn: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      contactDetails: "",
    },
    validationSchema: Yup.object({
      organisation: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      dob: Yup.string().required("Required"),
      ssn: Yup.string()
        .required("Social Security Number is required")
        .min(9, "Social Security Number Must be 9 Digits long")
        .max(9, "Social Security Number Must be 9 Digits long"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zipCode: Yup.string()
        .required("Zipcode is required")
        .min(5, "Zipcode should not be long less than 5 digits")
        .max(5, "Zipcode should not be long more than 5 digits"),
      email: Yup.string().email("Invalid email address").required("Required"),
      contactDetails: Yup.string()
        .required("Contact-Number is required")
        .min(10, "Contact Number should not be long less than 10 digits")
        .max(10, "Contact Number should not be long more than 10 digits"),
    }),
    onSubmit: (values) => {
      dispatch(AddNewEmployee(values, router));
    },
  });

  useEffect(() => {
    dispatch(fetchOrganisation());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Add Employee | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Add Employee" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
              <Col lg={4} xs={4}>
                <FormLabel for="organisation" labelname="Organisation" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="organisation"
                >
                  <option selected>Open this select menu</option>;
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
              </Col>

              <Col lg={4} xs={4}>
                <FormLabel for="name" labelname="Name" />
                <FormInput
                  inpType="text"
                  inpchange={formik.handleChange}
                  inpId="name"
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.name}
                  inpPlaceholder="Enter your name"
                />
                <span className="text-danger">
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={4} xs={4}>
                <FormLabel for="address" labelname="Address" />
                <FormInput
                  inpType="text"
                  inpId="address"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.address}
                  inpPlaceholder="Enter your address"
                />
                <span className="text-danger">
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-danger">{formik.errors.address}</div>
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
                  inpPlaceholder="Enter your dob"
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
                  inpPlaceholder="Enter your ssn"
                />
                <span className="text-danger">
                  {formik.touched.ssn && formik.errors.ssn ? (
                    <div className="text-danger">{formik.errors.ssn}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="city" labelname="City" />
                <FormInput
                  inpType="text"
                  inpId="city"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.city}
                  inpPlaceholder="Enter your city"
                />
                <span className="text-danger">
                  {formik.touched.city && formik.errors.city ? (
                    <div className="text-danger">{formik.errors.city}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="state" labelname="State" />
                <FormInput
                  inpType="text"
                  inpId="state"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.state}
                  inpPlaceholder="Enter your state"
                />
                <span className="text-danger">
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-danger">{formik.errors.state}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="zip code" labelname="Zip Code" />
                <FormInput
                  inpType="text"
                  inpId="zipCode"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.zipCode}
                  inpPlaceholder="Enter your zipCode"
                />
                <span className="text-danger">
                  {formik.touched.zipCode && formik.errors.zipCode ? (
                    <div className="text-danger">{formik.errors.zipCode}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="email" labelname="Email" />
                <FormInput
                  inpType="email"
                  inpId="email"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.email}
                  inpPlaceholder="Enter your email address"
                />
                <span className="text-danger">
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="contact" labelname="Contact Details" />
                <FormInput
                  inpType="text"
                  inpId="contactDetails"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.contactDetails}
                  inpPlaceholder="Enter your contact details"
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

              <Col lg={12} className="mt-3 mb-3">
                <Button
                  style={{ marginTop: "20px" }}
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Add Employee
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

AddEmployee.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddEmployee;
