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
import { AddNewVMS } from "Components/slices/vms/thunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganisation } from "Components/slices/organisation/thunk";

const AddVMS = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const { organisationdata } = useSelector((state: any) => ({
    organisationdata: state.organisationdata.organisationdata,
    isLoading: state.isLoading,
  }));

  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      url: Yup.string()
        .required("Url is required")
        .test("no-space", "Url cannot include a space", function (value) {
          // Check if the Website includes a space
          return (
            !/\s/.test(value) ||
            this.createError({
              message: "Url cannot include a space",
            })
          );
        }),
    }),
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(AddNewVMS(values, router));
    },
  });
  useEffect(() => {
    dispatch(fetchOrganisation());
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Add VMS | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Add VMS" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
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

              <Col lg={6} xs={6}>
                <FormLabel for="url" labelname="URL" />
                <FormInput
                  inpType="text"
                  inpId="url"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.url}
                  inpPlaceholder="Enter your URL Address"
                />
                <span className="text-danger">
                  {formik.touched.url && formik.errors.url ? (
                    <div className="text-danger">{formik.errors.url}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={12} className="mt-4">
                <Button variant="primary" type="submit">
                  Add VMS
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

AddVMS.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddVMS;
