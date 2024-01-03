import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import { Container } from "react-bootstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient } from "Components/slices/client/thunk";
import { useRouter } from "next/router";
import { is_client_selected_success } from "Components/slices/client/reducer";
import Loader2 from "@common/Loader2";

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
      name: "Edit",
      id: "edit",
      sortable: true,
      width: "100px",
      cell: (row: any) => (
        <span
          className="cursor-pointer"
          onClick={() => {
            dispatch(is_client_selected_success(row));
            router.push(`/client/edit-client`);
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </span>
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
