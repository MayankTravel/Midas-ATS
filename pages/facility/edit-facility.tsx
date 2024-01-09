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
import USCities from "../../Components/Common/utils/USCities.json";

const EditFacility = (props: any) => {
  const {
    organisationdata,
    vmsdata,
    clientdata,
    selectedrow,
    facilitydata,
    isLoading,
  } = useSelector((state: any) => ({
    organisationdata: state.organisationdata.organisationdata,
    vmsdata: state.VMS.vmsdata,
    clientdata: state.client.clientdata,
    facilitydata: state.facility.facilitydata,
    selectedrow: state.facility.selected,
    isLoading: state.facility.isLoading,
  }));
  const [disable, setDisabled] = useState<boolean>(true);
  const router = useRouter();
  const dispatch: any = useDispatch();

  const formik: any = useFormik({
    initialValues: {
      id: selectedrow.id,
      zip: selectedrow.zip,
      city: selectedrow.city,
      state: selectedrow.state,
      clientId: selectedrow.clientId,
      name: selectedrow.name,
      parentOrganization: selectedrow.parentOrganization,
      vmsId: selectedrow.vmsId,
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
      dispatch(EditedFacility(values, router));
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
    dispatch(fetchFacilty());
  }, []);

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
                  inpPlaceholder="Enter name"
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
                  inpPlaceholder="Enter Zip Code"
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
                  inpPlaceholder="Enter city"
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
                  inpPlaceholder="Enter state"
                />
                <span className="text-danger">
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-danger">{formik.errors.state}</div>
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

EditFacility.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditFacility;
