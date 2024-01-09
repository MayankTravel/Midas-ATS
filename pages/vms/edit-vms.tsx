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
import { EditNewVMS } from "Components/slices/vms/thunk";

const EditVMS = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { organisationdata, selectedvms, isLoading } = useSelector(
    (state: any) => ({
      organisationdata: state.organisationdata.organisationdata,
      isLoading: state.VMS.isLoading,
      selectedvms: state.VMS.selectedvms,
    })
  );

  const formik: any = useFormik({
    initialValues: {
      id: selectedvms.id,
      name: selectedvms.name,
      url: selectedvms.url,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      url: Yup.string()
        .required("Url is required")
        .test("no-space", "Url cannot include a space", function (value) {
          // Check if the URL includes a space
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
      dispatch(EditNewVMS(values, router));
    },
  });

  useEffect(() => {
    dispatch(fetchOrganisation());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Edit VMS | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Edit VMS" breadcrumb="Dashboard" />
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
                  inpPlaceholder="Enter name"
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
                  inpPlaceholder="Enter URL Address"
                />
                <span className="text-danger">
                  {formik.touched.url && formik.errors.url ? (
                    <div className="text-danger">{formik.errors.url}</div>
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

EditVMS.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditVMS;
