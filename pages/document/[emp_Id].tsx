import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import FormLabel from "@common/FormLabel";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, Card, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  DeleteDocument,
  PostDocument,
  fetchEmployeeDoc,
} from "Components/slices/employee/thunk";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import Loader2 from "@common/Loader2";
import moment from "moment";
import Swal from "sweetalert2";
import Link from "next/link";
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
  const [show, setShow] = useState(false);
  const [apiUrl, setApiUrl] = useState<any>("");
  const [currentRole, setCurrentRole] = useState<any>([]);

  const { employeedata, isLoading, docs } = useSelector(
    (state: any) => state.employee
  );

  const dispatch: any = useDispatch();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState("");
  const [url, setUrl] = useState("");

  var downloadARR: any = [];
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
      name: "Expiry Date",
      id: "expiryDate",
      selector: (row: any) => moment(row.expiryDate).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Action",
      id: "action",
      sortable: true,
      width: "100px",
      cell: (row: any) => (
        <>
          <Link href={row.webUrl} target="__blank">
            <span className="cursor-pointer" title="Edit">
              <i style={{ fontSize: "18px" }} className="bi bi-eye-fill"></i>
            </span>
          </Link>
          {currentRole.role === "SUPERADMIN" && (
            <span
              className="cursor-pointer"
              title="Delete"
              onClick={() => {
                Swal.fire({
                  title: "Delete Document?",
                  text: `Are you sure you want to delete this document?`,
                  showCancelButton: true,
                  showCloseButton: true,
                }).then((results) => {
                  if (results.isConfirmed) {
                    dispatch(DeleteDocument(row.id, emp_Id));
                  }
                });
              }}
            >
              <i
                style={{ fontSize: "18px", color: "red", marginLeft: "10px" }}
                className="bi bi-trash"
              ></i>
            </span>
          )}
        </>
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
    if (localStorage.getItem("currentrole")) {
      var currentRole = JSON.parse(localStorage.getItem("currentrole") || "");
      setCurrentRole(currentRole[0]);
    }
    dispatch(fetchEmployeeDoc(emp_Id));
  }, []);
  if (isLoading === true) {
    return (
      <div className="page-content">
        <Loader2 />
      </div>
    );
  }

  for (let index = 0; index < docs.length; index++) {
    const element = docs[index];
    const parse_url =
      element.docStructure !== undefined && JSON.parse(element.docStructure);
    console.log("docStructure:", parse_url);
    rows.push({
      id: element.id,
      type: element.type,
      employeeName: element.employee?.name,
      downloadUrl: parse_url["@microsoft.graph.downloadUrl"],
      expiryDate: element.expiryDate,
      webUrl: parse_url.webUrl,
    });
  }
  console.log("rows:", rows);

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

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {documentData ? (
              <DocViewer
                pluginRenderers={DocViewerRenderers}
                documents={[documentData]}
              />
            ) : (
              <p>Loading document...</p>
            )} */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
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
