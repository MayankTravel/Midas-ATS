import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import { Container } from "react-bootstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import { data } from "@common/data/fakeTableData";
import { deteleFacility, fetchFacilty } from "Components/slices/facility/thunk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { is_selected_success } from "Components/slices/facility/reducer";
import Loader2 from "@common/Loader2";
import { LAYOUT_MODE_TYPES } from "../../Components/Common/constants/layout";
import Swal from "sweetalert2";

const ViewFacility = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<any>([]);
  const [currentRole, setCurrentRole] = useState<any>([]);

  const { facilitydata, isLoading } = useSelector((state: any) => ({
    facilitydata: state.facility.facilitydata,
    isLoading: state.facility.isLoading,
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
      name: "Client Name",
      id: "clientName",
      selector: (row: any) => row.client?.name,
      sortable: true,
    },
    {
      name: "Zip",
      id: "zip",
      selector: (row: any) => row.zip,
      sortable: true,
    },
    {
      name: "City",
      id: "city",
      selector: (row: any) => row.city,
      sortable: true,
    },
    {
      name: "State",
      id: "state",
      selector: (row: any) => row.state,
      sortable: true,
    },

    {
      name: "Action",
      id: "action",
      sortable: true,
      width: "100px",
      cell: (row: any) => (
        <>
          <span
            className="cursor-pointer"
            onClick={() => {
              var organisation = row.organisation;
              var selectedObj = {
                id: row.id,
                zip: row.zip,
                city: row.city,
                state: row.state,
                clientId: row.client?.id,
                name: row.name,
                parentOrganization: organisation?.id,
                vmsId: row.vms?.id,
              };

              router.push(`/facility/edit-facility`);
              dispatch(is_selected_success(selectedObj));
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </span>
          {currentRole[0].role === "SUPERADMIN" && (
            <span
              className="cursor-pointer"
              title="Delete"
              onClick={() => {
                Swal.fire({
                  title: "Delete Facility?",
                  text: `Are you sure you want to delete the facility?`,
                  showCancelButton: true,
                  showCloseButton: true,
                }).then((results) => {
                  if (results.isConfirmed) {
                    dispatch(deteleFacility(row.id));
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

  useEffect(() => {
    if (localStorage.getItem("currentrole")) {
      var currentRole = JSON.parse(localStorage.getItem("currentrole") || "");
      setCurrentRole(currentRole);
    }
    dispatch(fetchFacilty());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>View Facility | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="View Facility" breadcrumb="Dashboard" />
        <Container fluid={true}>
          {isLoading === true ? (
            <Loader2 />
          ) : (
            <DataTable
              columns={columns}
              data={filteredData.length === 0 ? facilitydata : filteredData}
              pagination
              defaultSortFieldId={1}
              subHeader
              subHeaderComponent={
                <Custom_Filter
                  data={facilitydata}
                  setFilteredData={setFilteredData}
                />
              }
              dense
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

ViewFacility.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ViewFacility;
/* address
: 
"221"
clientId
: 
"6596df1631d3290a66ed87d6"
id
: 
"6596e5a7d21252416a780e36"
name
: 
"Mayank kumar"
parentOrganization
: 
"658afc3b3b6f1969cc93bdc0"
vmsId
: 
"658afc3b3b6f1969cc93bdc0" */
