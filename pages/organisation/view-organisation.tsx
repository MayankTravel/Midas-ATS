import React, { ReactElement, useEffect, useState } from "react";
// import { Card, Col, NavItem, Row } from "react-bootstrap";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Custom_Filter from "@common/utils/filter/filter_utils";
import { fetchOrganisation } from "Components/slices/organisation/thunk";
import Loader2 from "@common/Loader2";
import { LAYOUT_MODE_TYPES } from "../../Components/Common/constants/layout";

const ViewOrganisation = () => {
  const dispatch: any = useDispatch();
  const { organisationdata } = useSelector(
    (state: any) => state.organisationdata
  );
  const { isLoading } = useSelector((state: any) => ({
    isLoading: state.organisationdata.isLoading,
  }));
  const [filteredData, setFilteredData] = useState<any>([]);

  const { layoutModeType } = useSelector((state: any) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const columns: any = [
    {
      name: "Organisation Name",
      id: "name",
      selector: (row: any) => row.name,
      sortable: true,
    },

    {
      name: "Website",
      id: "website",
      selector: (row: any) => row.website,
      sortable: true,
    },
  ];

  useEffect(() => {
    dispatch(fetchOrganisation());
  }, []);

  console.log(organisationdata);

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
              data={filteredData.length === 0 ? organisationdata : filteredData}
              pagination
              defaultSortFieldId={1}
              subHeader
              subHeaderComponent={
                <Custom_Filter
                  data={organisationdata}
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

ViewOrganisation.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ViewOrganisation;
