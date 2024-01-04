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
import { fetchOrganisation } from "Components/slices/organisation/thunk";
import { AddNewFacility } from "Components/slices/facility/thunk";
import { fetchVMS } from "Components/slices/vms/thunk";
import { fetchClient } from "Components/slices/client/thunk";

const AddFacility = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { organisationdata, vmsdata, clientdata } = useSelector(
    (state: any) => ({
      organisationdata: state.organisationdata.organisationdata,
      vmsdata: state.VMS.vmsdata,
      clientdata: state.client.clientdata,
    })
  );

  const formik = useFormik({
    initialValues: {
      address: "",
      clientId: "",
      name: "",
      parentOrganization: "",
      vmsId: "",
    },
    validationSchema: Yup.object({
      clientId: Yup.string().required("Please Choose Client"),
      address: Yup.string().required("Address is Required"),
      name: Yup.string().required("Name is Required"),
      parentOrganization: Yup.string().required("Please Choose Organization"),
      vmsId: Yup.string().required("Please Choose VMS"),
    }),
    onSubmit: (values) => {
      dispatch(AddNewFacility(values, router));
    },
  });

  useEffect(() => {
    dispatch(fetchOrganisation());
    dispatch(fetchVMS());
    dispatch(fetchClient());
  }, []);
  console.log(clientdata);
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
                <FormLabel for="address" labelname="Address" />
                <FormInput
                  inpType="text"
                  inpId="address"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.address}
                  inpPlaceholder="Enter your Address"
                />
                <span className="text-danger">
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-danger">{formik.errors.address}</div>
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
              </Col>
              <Col lg={12} className="mt-4">
                <Button variant="primary" type="submit">
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
