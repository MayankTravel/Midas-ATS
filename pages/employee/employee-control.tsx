import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import { Button, Container } from "react-bootstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import { data } from "@common/data/fakeTableData";
import Link from "next/link";
import Custom_Filter from "@common/utils/filter/filter_utils";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loader2 from "@common/Loader2";
import { is_selected_success } from "Components/slices/employee/reducers";
import { LAYOUT_MODE_TYPES } from "../../Components/Common/constants/layout";
import { fetchEmployee } from "Components/slices/employee/thunk";

const EmployeeControl = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [filteredData, setFilteredData] = useState<any>([]);

  const { employeedata, isLoading } = useSelector((state: any) => ({
    employeedata: state.employee.employeedata,
    isLoading: state.employee.isLoading,
  }));

  const { layoutModeType } = useSelector((state: any) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  const columns = [
    {
      name: "Name",
      id: "name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "SSN",
      id: "ssn",
      selector: (row: any) => row.ssn,
      sortable: true,
    },
    {
      name: "Email",
      id: "email",
      selector: (row: any) => row.email,
      sortable: true,
      headerStyle: (selector: any, id: any) => {
        return { textAlign: "center" };
      },
      width: "200px",
    },
    {
      name: "Date Of Birth",
      id: "dob",
      selector: (row: any) => moment(row.dob).format("MM-DD-YYYY"),
      sortable: true,
    },
    {
      name: "Edit",
      id: "edit",
      sortable: true,

      width: "100px",
      cell: (row: any) => (
        <span
          className="cursor-pointer"
          title="Edit"
          onClick={() => {
            console.log("row:", row);
            dispatch(is_selected_success(row));
            router.push(`/employee/edit-employee`);
          }}
        >
          <i style={{ fontSize: "18px" }} className="bi bi-pencil-square"></i>
        </span>
      ),
    },

    {
      name: "Project",
      id: "project",
      sortable: true,
      width: "100px",
      cell: (row: any) => (
        <span
          className="cursor-pointer"
          title="See Project"
          // onClick={() => router.push(`/employee/edit-employee?${row.id}`)}
        >
          <i
            style={{ fontSize: "20px", marginLeft: "10px" }}
            className="bi bi-eye-fill"
          ></i>
        </span>
      ),
    },
    {
      name: "Document",
      id: "Document",
      sortable: true,
      cell: (row: any) => (
        <span
          className="cursor-pointer"
          title="Upload document"
          onClick={() => router.push(`/document/${row.id}`)}
        >
          <i
            style={{ fontSize: "20px", marginLeft: "20px" }}
            className="bi bi-cloud-arrow-up-fill"
          ></i>
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchEmployee());
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Employee Control | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Employee Control" breadcrumb="Dashboard" />
        <Container fluid={true}>
          {isLoading === true ? (
            <Loader2 />
          ) : (
            <>
              <Link href="/employee/add-employee">
                <Button className="mb-3" variant="primary">
                  Add Employee
                </Button>
              </Link>
              <DataTable
                columns={columns}
                data={filteredData.length === 0 ? employeedata : filteredData}
                pagination
                defaultSortFieldId={1}
                subHeader
                subHeaderComponent={
                  <Custom_Filter
                    data={employeedata}
                    setFilteredData={setFilteredData}
                  />
                }
                selectableRows
                persistTableHead
                theme={
                  layoutModeType === LAYOUT_MODE_TYPES.DARKMODE
                    ? "dark"
                    : "default"
                }
              />
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

EmployeeControl.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EmployeeControl;
