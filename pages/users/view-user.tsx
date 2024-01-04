import React, { ReactElement, useEffect, useState } from "react";
// import { Card, Col, NavItem, Row } from "react-bootstrap";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import DataTable, { createTheme } from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import { useRouter } from "next/router";
import { is_user_selected_success } from "Components/slices/user/reducers";
import Loader2 from "@common/Loader2";
import { LAYOUT_MODE_TYPES } from "../../Components/Common/constants/layout";
import { fetchAllUser } from "Components/slices/user/thunk";

const ViewUser = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { userdata } = useSelector((state: any) => state.user);
  const [filteredData, setFilteredData] = useState<any>([]);
  const { isLoading } = useSelector((state: any) => ({
    isLoading: state.user.isLoading,
  }));
  var rows: any = [];

  const { layoutModeType } = useSelector((state: any) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  for (let index = 0; index < userdata.length; index++) {
    const element = userdata[index];
    rows.push({
      ...element,
      status:
        element.active === true
          ? "Active"
          : element.active === false
          ? "Inactive"
          : element.active,
      rollId:
        element.rollId == 1
          ? "Super-Admin"
          : element.rollId == 2
          ? "Admin"
          : element.rollId == 3
          ? "Moderator"
          : element.rollId == 4
          ? "On-Boarding"
          : element.rollId == 5
          ? "Recruiter"
          : element.rollId == 6
          ? "Team-Lead"
          : element.rollId == 7
          ? "Account-Manager"
          : element.rollId,
      type:
        element.type == 1
          ? "Internal"
          : element.type == 2
          ? "External"
          : element.type,
      // action: (
      //   <Link
      //     type="button"
      //     className="edit-btn"
      //     state={{ data: element }}
      //     to={"/dashboard/edit-user"}
      //   >
      //     <i className="fa fa-pencil"></i>
      //   </Link>
      // ),
    });
  }

  const columns: any = [
    {
      name: "Name",
      id: "Name",
      selector: (row: any) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: "Email",
      id: "email",
      selector: (row: any) => row.email,
      sortable: true,
      headerStyle: (selector: any, id: any) => {
        return { textAlign: "center" }; // removed partial line here
      },
      width: "250px",
    },
    {
      name: "Role",
      id: "roles.role",
      selector: (row: any) => row.roles[0]?.role,
      sortable: true,
    },
    {
      name: "Number",
      id: "mobileNumber",
      selector: (row: any) => JSON.parse(row.mobileNumber),
      sortable: true,
    },
    {
      name: "Status",
      id: "status",
      selector: (row: any) => row.status,
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
            dispatch(is_user_selected_success(row));
            router.push(`/users/edit-user`);
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>View Users | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="View User" breadcrumb="Dashboard" />
        <Container fluid={true}>
          {isLoading === true ? (
            <Loader2 />
          ) : (
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

ViewUser.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ViewUser;
