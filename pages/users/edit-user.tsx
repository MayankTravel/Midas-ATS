import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import FormLabel from "@common/FormLabel";
import FormInput from "@common/FormInput";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EditNewUser,
  fetchAllRoles,
  fetchAllUser,
} from "Components/slices/user/thunk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import status from "@common/utils/status";

const EditUser = (props: any) => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { roleslist, selectedRow, isLoading, userdata } = useSelector(
    (state: any) => ({
      roleslist: state.user.roles,
      selectedRow: state.user.selected,
      isLoading: state.user.isLoading,
      userdata: state.user.userdata,
    })
  );

  const formik: any = useFormik({
    initialValues: {
      id: selectedRow.id,
      firstName: selectedRow.firstName,
      lastName: selectedRow.lastName,
      email: selectedRow.email,
      mobileNumber: selectedRow.mobileNumber,
      roles: selectedRow.roles,
      password: selectedRow.password,
      manager: "",
      rolesName: "",
      status: selectedRow.active,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      mobileNumber: Yup.string()
        .min(10, "Miniumm digits should be 10")
        .max(10, "Maximum digits should be 10")
        .required("Mobile Number is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      roles: Yup.array().required("Required"),
      status: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(EditNewUser(values, router));
    },
  });

  useEffect(() => {
    dispatch(fetchAllRoles());
    dispatch(fetchAllUser());
  }, []);

  if (isLoading) {
    return "Wait";
  }
  var rolesArray: any = [];

  for (let index = 0; index < userdata.length; index++) {
    const element = userdata[index];

    for (var role of element.roles) {
      rolesArray.push({
        ...element,
        roles: role === null ? "" : role.role,
      });
    }
  }
  console.log(formik.values);
  return (
    <React.Fragment>
      <Head>
        <title>Edit User | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Edit User" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
              <Col lg={6} xs={6}>
                <FormLabel for="firstName" labelname="First Name" />
                <FormInput
                  inpType="text"
                  inpchange={formik.handleChange}
                  inpId="firstName"
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.firstName}
                  inpPlaceholder="Enter First Name"
                />
                <span className="text-danger">
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-danger">{formik.errors.firstName}</div>
                  ) : null}
                </span>
              </Col>
              <Col lg={6} xs={6}>
                <FormLabel for="lastName" labelname="Last Name" />
                <FormInput
                  inpType="text"
                  inpchange={formik.handleChange}
                  inpId="lastName"
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.lastName}
                  inpPlaceholder="Enter Last Name"
                />
                <span className="text-danger">
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-danger">{formik.errors.lastName}</div>
                  ) : null}
                </span>
              </Col>
              <Col className="mt-3" lg={6} xs={6}>
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

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="mobileNumber" labelname="Mobile Number" />
                <FormInput
                  inpType="number"
                  inpId="mobileNumber"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.mobileNumber}
                  inpPlaceholder="Enter Mobile Number"
                />
                <span className="text-danger">
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <div className="text-danger">
                      {formik.errors.mobileNumber}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="role" labelname="Role" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    var rolesArray: any = [];
                    formik.handleChange;
                    rolesArray.push(JSON.parse(e.target.value));
                    formik.setFieldValue("roles", rolesArray);
                    formik.setFieldValue("rolesName", rolesArray[0].role);
                  }}
                  onBlur={formik.handleBlur}
                  name="roles"
                >
                  <option>Open this select menu</option>
                  {roleslist.map((item: any) => {
                    return (
                      <option key={item.id} value={JSON.stringify(item)}>
                        {item.role}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">
                  {formik.touched.roles && formik.errors.roles ? (
                    <div className="text-danger">{formik.errors.roles}</div>
                  ) : null}
                </span>
              </Col>
              {formik.values.rolesName === "RECRUITER" ? (
                <Col className="mt-3" lg={4} xs={4}>
                  <FormLabel for="teamleads" labelname="Team Leads" />
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="manager"
                  >
                    <option selected>Open this select menu</option>

                    {rolesArray
                      .filter((ite: any) => ite.roles === "TEAMLEAD")
                      .map((item: any) => {
                        return <option value={item.id}>{item.fullName}</option>;
                      })}
                  </select>
                </Col>
              ) : null}

              {formik.values.rolesName === "TEAMLEAD" ? (
                <Col className="mt-3" lg={4} xs={4}>
                  <FormLabel for="accountmanager" labelname="Account Manager" />

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="manager"
                  >
                    <option selected>Open this select menu</option>

                    {rolesArray
                      .filter((ite: any) => ite.roles === "ACCOUNTMANAGER")
                      .map((item: any) => {
                        return <option value={item.id}>{item.fullName}</option>;
                      })}
                  </select>
                </Col>
              ) : null}
              {formik.values.rolesName === "ACCOUNTMANAGER" ? (
                <Col className="mt-3" lg={4} xs={4}>
                  <FormLabel for="accountmanager" labelname="Account Manager" />

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="manager"
                  >
                    <option selected>Open this select menu</option>

                    {rolesArray
                      .filter((ite: any) => ite.roles === "GENERALMANAGER")
                      .map((item: any) => {
                        return <option value={item.id}>{item.fullName}</option>;
                      })}
                  </select>
                </Col>
              ) : null}

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="Status" labelname="Status" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    formik.handleChange;
                    formik.setFieldValue("status", JSON.parse(e.target.value));
                  }}
                  onBlur={formik.handleBlur}
                  name="status"
                >
                  <option>Current : {selectedRow.status}</option>
                  <option>Open this select menu</option>
                  {status.map((item: any) => {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.status}
                      </option>
                    );
                  })}
                </select>
                <span className="text-danger">
                  {formik.touched.roles && formik.errors.roles ? (
                    <div className="text-danger">{formik.errors.roles}</div>
                  ) : null}
                </span>
              </Col>
              <Col lg={12} className="mt-4 mb-3">
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

EditUser.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default EditUser;
