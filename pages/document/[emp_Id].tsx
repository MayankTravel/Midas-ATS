import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import FormLabel from "@common/FormLabel";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { AddNewOrganisation } from "Components/slices/organisation/thunk";
// import { authData } from "Components/APIFactory/authData";
// import { token } from "Components/APIFactory/token";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import Custom_Filter from "@common/utils/filter/filter_utils";
import { Autocomplete, Card, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { PostDocument } from "Components/slices/employee/thunk";

const TAGS_OPTION = [
  "Driving-License",
  "SSN-Card",
  "Resume",
  "HR-sheet",
  "Skill-Checklist",
  "Reference-1",
  "Reference-2",
  "BLS",
  "ACLS",
  "PALS",
  "NBRC",
  "NRP",
  "TNCC",
  "CPI",
  "Nursing-License",
  "State-License",
  "COVID-Card",
  "TB-Record",
  "Physical",
  "Flu-record",
  "OSHA",
  "Fit-Test",
  "MMR",
  "Hep-B",
  "Varicella",
  "TDap",
  "Drug-Screening",
  "Core-Competency",
  "Speciality-Exam",
  "Training",
  "COA",
  "Background-Check",
  "Degree-Transcript",
  "Fingerprinting",
  "STATE-DOC",
];

const UploadDocument = (props: any) => {
  const [file, setFile] = useState("");
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { emp_Id } = props;
  const formik: any = useFormik({
    initialValues: {
      docType: "",
      file: "",
      expiryDate: "",
      empId: emp_Id,
    },
    validationSchema: Yup.object({
      docType: Yup.string().required("Requried"),
      expiryDate: Yup.string().required("Requried"),
    }),
    onSubmit: (values) => {
      dispatch(PostDocument(values, router));
      formik.resetForm();
    },
  });
  return (
    <React.Fragment>
      <Head>
        <title>Upload Document | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Upload Document" breadcrumb="Dashboard" />
        <Container fluid={true}>
          <Card sx={{ p: 3 }}>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={5}>
                  <FormLabel for="doctype" labelname="Document" />

                  <Autocomplete
                    disablePortal
                    options={TAGS_OPTION}
                    onSelect={(option: any) =>
                      formik.setFieldValue("docType", option.target.value)
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Document" />
                    )}
                  />
                </Col>

                <Col md={5}>
                  <FormLabel for="upload" labelname="Upload Document" />
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => {
                      formik.handleChange;
                      formik.setFieldValue("file", e.target.files);
                    }}
                    onBlur={formik.handleBlur}
                    className="form-control"
                  />
                </Col>
                <Col md={5}>
                  <FormLabel for="ExpiryDate" labelname="Expiry Date" />
                  <input
                    type="date"
                    id="expiryDate"
                    className="form-control"
                    name="expiryDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Col>

                <Col lg={12} className="mt-4">
                  <Button variant="primary" type="submit">
                    Upload Document
                  </Button>
                </Col>
              </Row>
            </form>
          </Card>
        </Container>

        {/* <DataTable
          columns={columns}
          data={filteredData.length === 0 ? clientdata : filteredData}
          pagination
          defaultSortFieldId={1}
          subHeader
          subHeaderComponent={
            <Custom_Filter
              data={clientdata}
              setFilteredData={setFilteredData}
            />
          }
          selectableRows
          persistTableHead
        /> */}
      </div>
    </React.Fragment>
  );
};

UploadDocument.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default UploadDocument;
export const getServerSideProps = (context: any) => {
  const { emp_Id } = context.query;

  return {
    props: { emp_Id },
  };
};

/* yyyy-mm-dd */
