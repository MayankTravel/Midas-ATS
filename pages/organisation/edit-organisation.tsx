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
import { EditNewOrganisation } from "Components/slices/organisation/thunk";
import { authData } from "Components/APIFactory/authData";
import { token } from "Components/APIFactory/token";
import axios from "axios";

const EditOrganisation = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  var userid = authData().id;

  const { selectedorganisation, isLoading } = useSelector((state: any) => ({
    selectedorganisation: state.organisationdata.selectedorganisation,
    isLoading: state.organisationdata.isLoading,
  }));

  const formik: any = useFormik({
    initialValues: {
      id: selectedorganisation.id,
      organizationName: selectedorganisation.name,
      website: selectedorganisation.website,
    },
    validationSchema: Yup.object({
      organizationName: Yup.string().required("Organisation Name is required"),
      website: Yup.string().required("Website is required"),
    }),
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(EditNewOrganisation(values, router));
    },
  });

  return (
    <React.Fragment>
      <Head>
        <title>Edit Organisation | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Edit Organisation" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
              <Col className="mt-3" lg={6} xs={6}>
                <FormLabel
                  for="organizationName"
                  labelname="Organisation Name"
                />
                <FormInput
                  inpType="text"
                  inpId="organizationName"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.organizationName}
                  inpPlaceholder="Enter your Organization Name"
                />
                <span className="text-danger">
                  {formik.touched.organizationName &&
                  formik.errors.organizationName ? (
                    <div className="text-danger">
                      {formik.errors.organizationName}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={6} xs={6}>
                <FormLabel for="website" labelname="Website" />
                <FormInput
                  inpType="text"
                  inpId="website"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.website}
                  inpPlaceholder="Enter your website Address"
                />
                <span className="text-danger">
                  {formik.touched.website && formik.errors.website ? (
                    <div className="text-danger">{formik.errors.website}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={12} className="mt-4">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Edit Organisation
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

EditOrganisation.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditOrganisation;
