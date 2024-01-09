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
import { EditNewClient } from "Components/slices/client/thunk";

const EditClient = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { organisationdata, selectedclient, isLoading } = useSelector(
    (state: any) => ({
      organisationdata: state.organisationdata.organisationdata,
      selectedclient: state.client.selectedclient,
      isLoading: state.client.isLoading,
    })
  );

  const formik: any = useFormik({
    initialValues: {
      id: selectedclient.id,
      name: selectedclient.name,
      email: selectedclient.email,
      address: selectedclient.address,
      phone: selectedclient.phone,
      contactPerson: selectedclient.contactPerson,
      parentOrganization: selectedclient.organisation?.id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      address: Yup.string().required("Required"),
      phone: Yup.string()
        .required("Contact-Number is required")
        .min(10, "Contact Number should not be long less than 10 digits")
        .max(10, "Contact Number should not be long more than 10 digits"),
      contactPerson: Yup.string().required("Required"),
      parentOrganization: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(EditNewClient(values, router));
    },
  });

  useEffect(() => {
    dispatch(fetchOrganisation());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Edit Client | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Edit Client" breadcrumb="Dashboard" />
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
                  inpPlaceholder="Enter name"
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
                  inpPlaceholder="Enter email address"
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
                  inpPlaceholder="Enter Address"
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
                  inpPlaceholder="Enter Phone Number"
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
                  inpPlaceholder="Enter Contact Person Name"
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
                  {organisationdata
                    .filter(
                      (ite: any) => ite.id === selectedclient.organisation?.id
                    )
                    .map((item: any) => (
                      <option selected>(Current) : {item.name}</option>
                    ))}

                  <option value={""}>Open this to select</option>

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
                  Save
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

EditClient.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditClient;
