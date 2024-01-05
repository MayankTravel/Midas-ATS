import React, { ReactElement, useEffect, useState } from "react";
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
import { fetchOrganisation } from "Components/slices/organisation/thunk";
import { AddNewFacility } from "Components/slices/facility/thunk";
import { fetchVMS } from "Components/slices/vms/thunk";
import { fetchClient } from "Components/slices/client/thunk";
import USCities from "../../Components/Common/utils/USCities.json";

const AddFacility = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { organisationdata, vmsdata, clientdata, isLoading } = useSelector(
    (state: any) => ({
      organisationdata: state.organisationdata.organisationdata,
      vmsdata: state.VMS.vmsdata,
      isLoading: state.VMS.isLoading,
      clientdata: state.client.clientdata,
    })
  );

  const formik = useFormik({
    initialValues: {
      zip: "",
      city: "",
      state: "",
      clientId: "",
      name: "",
      parentOrganization: "",
      vmsId: "",
    },
    validationSchema: Yup.object({
      clientId: Yup.string().required("Please Choose Client"),
      zip: Yup.string()
        .required("Zip Code is Required")
        .min(3, "Zip Code must be at least 3 characters")
        .max(5, "Zip Code must be at most 5 characters"),
      city: Yup.string().required("City is Required"),
      state: Yup.string().required("State is Required"),
      name: Yup.string().required("Name is Required"),
      parentOrganization: Yup.string().required("Please Choose Organization"),
      vmsId: Yup.string().required("Please Choose VMS"),
    }),
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(AddNewFacility(values, router));
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

  useEffect(() => {
    dispatch(fetchOrganisation());
    dispatch(fetchVMS());
    dispatch(fetchClient());
  }, []);

  // console.log("USCities Array:", USCities);

  return (
    <React.Fragment>
      <Head>
        <title>Add Facility | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Add Facility" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
              <Col lg={6} xs={6}>
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

              <Col lg={6} xs={6}>
                <FormLabel for="zip" labelname="Zip Code" />
                <FormInput
                  inpType="text"
                  inpId="zip"
                  inpchange={handleZipChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.zip}
                  inpPlaceholder="Enter your Zip Code"
                />
                <span className="text-danger">
                  {formik.touched.zip && formik.errors.zip ? (
                    <div className="text-danger">{formik.errors.zip}</div>
                  ) : null}
                </span>
              </Col>
              <Col className="mt-3" lg={6} xs={6}>
                <FormLabel for="city" labelname="City" />
                <FormInput
                  inpType="text"
                  inpId="city"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.city} // Use the local state or formik value for city
                  inpPlaceholder="Enter your city"
                />
                <span className="text-danger">
                  {formik.touched.city && formik.errors.city ? (
                    <div className="text-danger">{formik.errors.city}</div>
                  ) : null}
                </span>
              </Col>
              <Col className="mt-3" lg={6} xs={6}>
                <FormLabel for="state" labelname="State" />
                <FormInput
                  inpType="text"
                  inpId="state"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.state} // Use the local state or formik value for state
                  inpPlaceholder="Enter your state"
                />
                <span className="text-danger">
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-danger">{formik.errors.state}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="vmsId" labelname="VMS" />

                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="vmsId"
                >
                  <option selected>Open this select menu</option>
                  {vmsdata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
                <span className="text-danger">
                  {formik.touched.vmsId && formik.errors.vmsId ? (
                    <div className="text-danger">{formik.errors.vmsId}</div>
                  ) : null}
                </span>
              </Col>
              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="client" labelname="Client" />

                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="clientId"
                  value={formik.values.clientId}
                >
                  <option selected>Open this select menu</option>

                  {clientdata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
                <span className="text-danger">
                  {formik.touched.clientId && formik.errors.clientId ? (
                    <div className="text-danger">{formik.errors.clientId}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel
                  for="organisationName"
                  labelname="Parent Organization"
                />

                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="parentOrganization"
                  value={formik.values.parentOrganization}
                >
                  <option selected>Open this select menu</option>

                  {organisationdata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
                <span className="text-danger">
                  {formik.touched.parentOrganization &&
                  formik.errors.parentOrganization ? (
                    <div className="text-danger">
                      {formik.errors.parentOrganization}
                    </div>
                  ) : null}
                </span>
              </Col>
              <Col lg={12} className="mt-4">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Add Facility
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

AddFacility.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddFacility;
