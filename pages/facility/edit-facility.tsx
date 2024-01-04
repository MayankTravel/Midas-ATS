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
import { EditedFacility, fetchFacilty } from "Components/slices/facility/thunk";
import { fetchVMS } from "Components/slices/vms/thunk";
import { fetchClient } from "Components/slices/client/thunk";

const EditFacility = (props: any) => {
  const { organisationdata, vmsdata, clientdata, selectedrow, facilitydata } =
    useSelector((state: any) => ({
      organisationdata: state.organisationdata.organisationdata,
      vmsdata: state.VMS.vmsdata,
      clientdata: state.client.clientdata,
      facilitydata: state.facility.facilitydata,
      selectedrow: state.facility.selected,
    }));
  const [selected, setSelected] = useState<any>({});
  const [disable, setDisabled] = useState<boolean>(true);
  const router = useRouter();
  const dispatch: any = useDispatch();
  console.log(selectedrow);
  const formik: any = useFormik({
    initialValues: {
      address: selectedrow.address,
      clientId: selectedrow.clientId,
      name: selectedrow.name,
      parentOrganization: selectedrow.parentOrganization,
      vmsId: selectedrow.vmsId,
    },
    validationSchema: Yup.object({
      clientId: Yup.string().required("Please Choose Client"),
      address: Yup.string().required("Address is Required"),
      name: Yup.string().required("Name is Required"),
      parentOrganization: Yup.string().required("Please Choose Organization"),
      vmsId: Yup.string().required("Please Choose VMS"),
    }),
    onSubmit: (values) => {
      const editedValue = {
        ...values,
        id: selectedrow.id,
      };
      dispatch(EditedFacility(editedValue, router));
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("selected")) {
      var authData: any = JSON.parse(localStorage.getItem("selected") || "");
      setSelected(authData);
      dispatch(fetchOrganisation());
      dispatch(fetchVMS());
      dispatch(fetchClient());
      dispatch(fetchFacilty());
    }
  }, []);
  console.log("organisationdata:", organisationdata);
  console.log("clientdata:", clientdata);
  console.log("facilitydatadsfsfds:", facilitydata);

  return (
    <React.Fragment>
      <Head>
        <title>Edit Facility | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Edit Facility" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
              <Col lg={6} xs={6}>
                <FormLabel for="name" labelname="Name" />
                <FormInput
                  inpType="text"
                  inpchange={(e: any) => {
                    formik.handleChange(e);
                  }}
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
                  inpchange={(e: any) => {
                    formik.handleChange(e);
                  }}
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
                <br />
                <FormLabel for="vmsId" labelname="VMS" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="vmsId"
                >
                  {vmsdata
                    .filter((ite: any) => ite.id === selectedrow.vmsId)
                    .map((item: any) => (
                      <option selected>(Current) : {item.name}</option>
                    ))}
                  <option>Open this to select</option>
                  {vmsdata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </Col>
              <Col className="mt-3" lg={4} xs={4}>
                <br />
                <FormLabel for="client" labelname="Client" />
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="clientId"
                >
                  {clientdata
                    .filter((ite: any) => ite.id === selectedrow.clientId)
                    .map((item: any) => (
                      <option selected>(Current) : {item.name}</option>
                    ))}

                  <option>Open this to select</option>

                  {clientdata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <br />
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
                >
                  {organisationdata
                    .filter(
                      (ite: any) => ite.id === selectedrow.parentOrganization
                    )
                    .map((item: any) => (
                      <option selected>(Current) : {item.name}</option>
                    ))}

                  <option>Open this to select</option>

                  {organisationdata.map((item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </Col>
              <Col lg={12} className="mt-4">
                <Button variant="primary" type="submit">
                  Edit Facility
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

EditFacility.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditFacility;
