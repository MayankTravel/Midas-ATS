import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchVMS } from "Components/slices/vms/thunk";
import { useRouter } from "next/router";
import Loader2 from "@common/Loader2";
import { LAYOUT_MODE_TYPES } from "../../Components/Common/constants/layout";
import { is_vms_selected_success } from "../../Components/slices/vms/reducers";

const ViewVMS = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { isLoading, vmsdata } = useSelector((state: any) => ({
    isLoading: state.VMS.isLoading,
    vmsdata: state.VMS.vmsdata,
  }));
  const [filteredData, setFilteredData] = useState<any>([]);
  useEffect(() => {
    dispatch(fetchVMS());
  }, [filteredData]);

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
      name: "URL",
      id: "url",
      selector: (row: any) => row.url,
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
            dispatch(is_vms_selected_success(row));
            router.push(`/vms/edit-vms`);
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </span>
      ),
    },
  ];
  console.log("row:", vmsdata);

  return (
    <React.Fragment>
      <Head>
        <title>View VMS | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumbItem="View VMS" breadcrumb="Dashboard" />
        <Container fluid={true}>
          {isLoading === true ? (
            <Loader2 />
          ) : (
            <DataTable
              columns={columns}
              data={filteredData.length === 0 ? vmsdata : filteredData}
              pagination
              defaultSortFieldId={1}
              subHeader
              theme={
                layoutModeType === LAYOUT_MODE_TYPES.DARKMODE
                  ? "dark"
                  : "default"
              }
              subHeaderComponent={
                <Custom_Filter
                  data={vmsdata}
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

ViewVMS.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ViewVMS;
