import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import { Button, Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "Components/slices/project/thunk";
import { useRouter } from "next/router";
import { selected_projectdata_success } from "Components/slices/project/reducer";
import Loader2 from "@common/Loader2";
import { LAYOUT_MODE_TYPES } from "@common/constants/layout";

const ManageProjects = (props: any) => {
  const { emp_id } = props;
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { projectdata, isLoading } = useSelector((state: any) => ({
    projectdata: state.project.projectdata,
    isLoading: state.project.isLoading,
  }));
  const [filteredData, setFilteredData] = useState<any>([]);

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
      name: "Designation",
      id: "designation",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Start Date",
      id: "startDate",
      selector: (row: any) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      id: "endDate",
      selector: (row: any) => row.endDate,
      sortable: true,
    },

    {
      name: "Organisation",
      id: "organisation",
      selector: (row: any) =>
        row.organisation !== null && row.organisation !== undefined
          ? row.organisation.name
          : "",
      sortable: true,
      width: "120px",
    },

    {
      name: "Facility",
      id: "facility",
      selector: (row: any) => (row.facility !== null ? row.facility.name : ""),
      sortable: true,
      width: "120px",
    },
    {
      name: "Pay-Rates",
      id: "payRates",
      selector: (row: any) => row.payRates,
      sortable: true,
    },
    {
      name: "Designation",
      id: "designation",
      selector: (row: any) => row.designation,
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      id: "projectStatus",
      selector: (row: any) => row.projectStatus,
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
          onClick={() => {
            router.push(`/projects/edit/${emp_id}`);
            dispatch(selected_projectdata_success(row));
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </span>
      ),
    },
    {
      name: "Project Extension",
      id: "action",
      selector: (row: any) => row.action,
      sortable: true,
      width: "150px",
    },
  ];

  useEffect(() => {
    dispatch(fetchProjects(emp_id));
  }, []);

  console.log(projectdata);

  return (
    <React.Fragment>
      <Head>
        <title>Manage Projects | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="Manage Projects" breadcrumb="Dashboard" />
        <Container fluid={true}>
          {isLoading === true ? (
            <Loader2 />
          ) : (
            <DataTable
              columns={columns}
              data={filteredData.length === 0 ? projectdata : filteredData}
              pagination
              defaultSortFieldId={1}
              subHeader
              subHeaderComponent={
                <Custom_Filter
                  data={projectdata}
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
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

ManageProjects.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = (context: any) => {
  const { emp_id } = context.query;

  return {
    props: { emp_id },
  };
};

export default ManageProjects;
