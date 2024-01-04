import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import { Container } from "react-bootstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import { useDispatch, useSelector } from "react-redux";
import { deteleClient, fetchClient } from "Components/slices/client/thunk";
import { useRouter } from "next/router";
import { is_client_selected_success } from "Components/slices/client/reducer";
import Loader2 from "@common/Loader2";
import { deleteVMS } from "Components/slices/vms/thunk";
import Swal from "sweetalert2";

const ViewClient = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { clientdata } = useSelector((state: any) => state.client);
  const [filteredData, setFilteredData] = useState<any>([]);

  const { isLoading } = useSelector((state: any) => ({
    isLoading: state.client.isLoading,
  }));

  const columns: any = [
    {
      name: "Client Name",
      id: "name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      id: "email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      id: "address",
      selector: (row: any) => row.address,
      sortable: true,
    },
    {
      name: "Contact Person",
      id: "contactPerson",
      selector: (row: any) => row.contactPerson,
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
              dispatch(is_client_selected_success(row));
              router.push(`/client/edit-client`);
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </span>
          <span
            className="cursor-pointer"
            title="Delete"
            onClick={() => {
              Swal.fire({
                title: "Delete Client?",
                text: `Are you sure you want to delete the client?`,
              }).then(() => dispatch(deteleClient(row.id)));
            }}
          >
            <i
              style={{ fontSize: "18px", color: "red", marginLeft: "5px" }}
              className="bi bi-trash"
            ></i>
          </span>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchClient());
  }, []);

  console.log(clientdata);

  return (
    <React.Fragment>
      <Head>
        <title>View Clients | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="View Clients" breadcrumb="Dashboard" />
        <Container fluid={true}>
          {isLoading === true ? (
            <Loader2 />
          ) : (
            <DataTable
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
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

ViewClient.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ViewClient;
