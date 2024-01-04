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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  PostDocument,
  fetchEmployee,
  fetchEmployeeDoc,
} from "Components/slices/employee/thunk";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import Loader2 from "@common/Loader2";

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

const sample: any = [
  {
    id: "6595c77569b4e3791a910f8b",
    type: "dl",
    employee: {
      id: "6584ac11b67952563329d924",
      name: "Anubhav Kaushik",
      address: "711 ",
      city: "Great Fallas",
      contactDetails: "8800182022",
      createDate: null,
      dob: "2000-11-16",
      email: "anubhav@gmail.com",
      modifyDate: "2024-01-02T19:14:32.197+00:00",
      ssn: "999999999",
      state: "NC",
      status: true,
      user: {
        id: "658dfb086764754f1fa564d0",
        profilePicture: "default",
        email: "archit.mishra@midastravel.org",
        userType: "INTERNAL",
        password:
          "$2a$10$ultRlnqSL/DcUMvl3t/X8.caA4WPH9zvvpqW7UpJ9Fx2nIyDWyhOm",
        manager: null,
        firstName: "Archit",
        lastName: "Mishra",
        mobileNumber: "9718910927",
        roles: [
          {
            id: "658472f94b18126ca69a4923",
            role: "SUPERADMIN",
          },
        ],
        dateCreated: "2023-12-28T22:47:36.073+00:00",
        dateModified: "2023-12-28T22:47:36.073+00:00",
        active: true,
        fullName: "Archit Mishra",
      },
      zipCode: "20100",
      projects: [],
    },
    expiryDate: "2024-11-10T18:30:00.000+00:00",
    docStructure:
      '{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#drives(\'b%21uPqgbIcqFU6hRNh2NNy1aXJWPRtHdIhBmC4SZAJhOhBCF-UF6RIYQ7WCbzH_wEcf\')/root/$entity","@microsoft.graph.downloadUrl":"https://midasconsultingmgmt.sharepoint.com/sites/erp-resume-data/_layouts/15/download.aspx?UniqueId=fd7498b7-ff07-4528-9ead-2ae7fec8713e&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvbWlkYXNjb25zdWx0aW5nbWdtdC5zaGFyZXBvaW50LmNvbUBlNmJkNmNiZC01YmJjLTQ2ZjktYjdmNi0zMTUwNzI1MTFhNjEiLCJpc3MiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAiLCJuYmYiOiIxNzA0MzE0NzQxIiwiZXhwIjoiMTcwNDMxODM0MSIsImVuZHBvaW50dXJsIjoiYlR6M0p0TTR1L0FzYXh6ZXJ0N0pQOCsrQ1QxcDJFRVdaanVCYlZRamJUcz0iLCJlbmRwb2ludHVybExlbmd0aCI6IjE1MiIsImlzbG9vcGJhY2siOiJUcnVlIiwiY2lkIjoiY3crMWxiU3lpa0t4eHl6eDNmb0oydz09IiwidmVyIjoiaGFzaGVkcHJvb2Z0b2tlbiIsInNpdGVpZCI6Ik5tTmhNR1poWWpndE1tRTROeTAwWlRFMUxXRXhORFF0WkRnM05qTTBaR05pTlRZNSIsImFwcF9kaXNwbGF5bmFtZSI6ImVtcGxveWVlLWRvY3VtZW50cy11cGxvYWQiLCJuYW1laWQiOiI1NmRjZjhmMi1lMzc3LTQwNjEtYWMzMy02MWI1NTQ0MzVlNjlAZTZiZDZjYmQtNWJiYy00NmY5LWI3ZjYtMzE1MDcyNTExYTYxIiwicm9sZXMiOiJhbGxzaXRlcy53cml0ZSBhbGxmaWxlcy53cml0ZSBhbGxmaWxlcy5yZWFkIiwidHQiOiIxIiwiaXBhZGRyIjoiMjAuMTkwLjE0NS4xNzEifQ.kDo1wFtDmnhCPSIjtr2GOg9IkbH6nS7OkxVTWLQ9OAE&ApiVersion=2.0","createdDateTime":"2023-12-29T16:59:56Z","eTag":"\\"{FD7498B7-FF07-4528-9EAD-2AE7FEC8713E},14\\"","id":"01M6X5QMFXTB2P2B77FBCZ5LJK477MQ4J6","lastModifiedDateTime":"2024-01-03T20:45:41Z","name":"file","webUrl":"https://midasconsultingmgmt.sharepoint.com/sites/erp-resume-data/Shared%20Documents/hrms-employee-docs/file","cTag":"\\"c:{FD7498B7-FF07-4528-9EAD-2AE7FEC8713E},14\\"","size":26213,"createdBy":{"application":{"id":"56dcf8f2-e377-4061-ac33-61b554435e69","displayName":"employee-documents-upload"},"user":{"displayName":"SharePoint App"}},"lastModifiedBy":{"application":{"id":"56dcf8f2-e377-4061-ac33-61b554435e69","displayName":"employee-documents-upload"},"user":{"displayName":"SharePoint App"}},"parentReference":{"driveType":"documentLibrary","driveId":"b!uPqgbIcqFU6hRNh2NNy1aXJWPRtHdIhBmC4SZAJhOhBCF-UF6RIYQ7WCbzH_wEcf","id":"01M6X5QMFADLEKLDXXP5AZLHPCHW2HZWV7","name":"hrms-employee-docs","path":"/drives/b!uPqgbIcqFU6hRNh2NNy1aXJWPRtHdIhBmC4SZAJhOhBCF-UF6RIYQ7WCbzH_wEcf/root:/hrms-employee-docs","siteId":"6ca0fab8-2a87-4e15-a144-d87634dcb569"},"file":{"mimeType":"application/octet-stream","hashes":{"quickXorHash":"H222d65zJpq+vqf86z1nonZkrkE="}},"fileSystemInfo":{"createdDateTime":"2023-12-29T16:59:56Z","lastModifiedDateTime":"2024-01-03T20:45:41Z"},"shared":{"scope":"users"}}',
    user: {
      id: "658dfb086764754f1fa564d0",
      profilePicture: "default",
      email: "archit.mishra@midastravel.org",
      userType: null,
      password: "$2a$10$ultRlnqSL/DcUMvl3t/X8.caA4WPH9zvvpqW7UpJ9Fx2nIyDWyhOm",
      manager: null,
      firstName: "Archit",
      lastName: "Mishra",
      mobileNumber: "9718910927",
      roles: [
        {
          id: "658472f94b18126ca69a4923",
          role: "SUPERADMIN",
        },
      ],
      dateCreated: null,
      dateModified: null,
      active: true,
      fullName: "Archit Mishra",
    },
  },
];

const UploadDocument = (props: any) => {
  const [file, setFile] = useState("");
  const { employeedata, isLoading } = useSelector(
    (state: any) => state.employee
  );
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState("");
  const { emp_Id } = props;

  var rows: any = [];

  const columns = [
    {
      name: "Document Type",
      id: "type",
      selector: (row: any) => row.type,
      sortable: true,
    },
    {
      name: "Employee Name",
      id: "employeeName",
      selector: (row: any) => row.employeeName,
      sortable: true,
    },
    {
      name: "Start Date",
      id: "startDate",
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: "Download",
      id: "download",
      sortable: true,
      width: "100px",
      cell: (row: any) => (
        <span
          className="cursor-pointer"
          title="Edit"
          onClick={() => {
            console.log("row:", row.downloadUrl);
          }}
        >
          <i style={{ fontSize: "18px" }} className="bi bi-pencil-square"></i>
        </span>
      ),
    },
  ];
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
      formik.resetForm();
      dispatch(PostDocument(values, router));
    },
  });

  useEffect(() => {
    dispatch(fetchEmployeeDoc(emp_Id));
  }, []);
  if (isLoading === true) {
    return (
      <div className="page-content">
        <Loader2 />
        Waiting
      </div>
    );
  }
  for (let index = 0; index < employeedata.length; index++) {
    const element = employeedata[index];
    const parse_url =
      element.docStructure !== undefined && JSON.parse(element.docStructure);
    rows.push({
      type: element.type,
      employeeName: element.employee?.name,
      downloadUrl: parse_url["@microsoft.graph.downloadUrl"],
    });
  }
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
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    Upload Document
                  </Button>
                </Col>
              </Row>
            </form>
          </Card>
        </Container>

        <DataTable
          columns={columns}
          data={filteredData.length === 0 ? rows : filteredData}
          pagination
          defaultSortFieldId={1}
          subHeader
          subHeaderComponent={
            <Custom_Filter data={rows} setFilteredData={setFilteredData} />
          }
          persistTableHead
        />
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
