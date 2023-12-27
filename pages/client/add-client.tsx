import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import FormLabel from "@common/FormLabel";
import FormInput from "@common/FormInput";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchOrganisation } from "Components/slices/organisation/thunk";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AddNewClient } from "Components/slices/client/thunk";

const AddClient = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { organisationdata, isLoading } = useSelector((state: any) => ({
    organisationdata: state.organisationdata.organisationdata,
    isLoading: state.client.isLoading,
  }));

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      contactPerson: "",
      parentOrganization: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      address: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      contactPerson: Yup.string().required("Required"),
      parentOrganization: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(AddNewClient(values, router));
    },
  });

  useEffect(() => {
    dispatch(fetchOrganisation());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Add Client | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Add Client" breadcrumb="Dashboard" />
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

              <Col className="mt-3" lg={6} xs={6}>
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
              <Col className="mt-3" lg={6} xs={6}>
                <FormLabel for="phone" labelname="Phone No." />
                <FormInput
                  inpType="number"
                  inpId="phone"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.phone}
                  inpPlaceholder="Enter your Phone Number"
                />
                <span className="text-danger">
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-danger">{formik.errors.phone}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={6} xs={6}>
                <FormLabel
                  for="contactPerson"
                  labelname="Contact Person Name"
                />
                <FormInput
                  inpType="text"
                  inpId="contactPerson"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.contactPerson}
                  inpPlaceholder="Enter your Contact Person Name"
                />
                <span className="text-danger">
                  {formik.touched.contactPerson &&
                  formik.errors.contactPerson ? (
                    <div className="text-danger">
                      {formik.errors.contactPerson}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={6} xs={6}>
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
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Add Client
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

AddClient.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddClient;
