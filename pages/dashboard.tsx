import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, Col, NavItem, Row } from "react-bootstrap";
import Head from "next/head";
import Layout from "@common/Layout";
import CountUp from "react-countup";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import Loader from "@common/Loader";
import { MRT_ColumnDef } from "material-react-table";
import { Jobs } from "Components/interface/jobs";
import moment from "moment";
import sampleJobs from "../Components/Common/sampleJobs";
import DashBoardTable from "@common/DashboardTable";
import { fetchAllJobs } from "Components/slices/jobs/_alljobs/thunk";

import banner from "../Components/assets/images/bannerimg.jpg";
import BarCharts from "@component/index";
const Dashboard = () => {
  const dispatch: any = useDispatch();
  const [feedsData, setFeedsData] = useState<any>([]);
  const [username, setusername] = useState<any>({});
  const { jobdata, userdata, isLoading, selectedJob, assigntouser } =
    useSelector((state: any) => ({
      isLoading: state.jobFeeds.isLoading,
      jobdata: state.jobFeeds.jobdata,
      selJobs: state.clientFeeds.selJobs,
      userdata: state.user.userdata,
      selectedJob: state.calc.selectedJob,
      assigntouser: state.VMS.assigntouser,
    }));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setusername(obj);
    }
    const fetchData = async () => {
      try {
        await fetchAllJobs(dispatch);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const openFilterJob =
    jobdata.length > 0
      ? jobdata[0]
          .filter(
            (item: any) =>
              item.StatusString === "Open" || item.StatusString === "O"
          )
          .map((ite: any) => ite)
      : [];


  const columns = useMemo<MRT_ColumnDef<Jobs>[]>(
    () => [
      {
        id: "Job-details", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorFn: (row) => `${row.SourceID}`, //accessorFn used to join multiple data into a single cell
            id: "SourceID", //id is still required when using accessorFn instead of accessorKey
            header: "Job-Id",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "WorkType", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "WorkType",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>
                  {renderedCellValue == "1"
                    ? "Travel"
                    : renderedCellValue == "2"
                    ? "Perm"
                    : renderedCellValue == "3"
                    ? "Per-Diem"
                    : ""}
                </span>
              </Box>
            ),
          },
          {
            accessorKey: "SourceAlias", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "VMS-Alias",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },

          {
            accessorKey: "StatusString", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Status",
            size: 100,
            Cell: ({ renderedCellValue, row, cell }: any) => (
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() == "Closed"
                      ? theme.palette.error.dark
                      : cell.getValue() == "Cancelled" &&
                        cell.getValue() == "Frozen"
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>
                  {renderedCellValue === "O" ? "Open" : renderedCellValue}
                </span>
              </Box>
            ),
          },
          {
            accessorKey: "Priority", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Priority",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Degree", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "multi-select",
            header: "Profession",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "JobSpecialty", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "multi-select",
            header: "Speciality",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Facility", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "multi-select",
            header: "Facility",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "City", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "City",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "State", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "State",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "FormattedStartDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Start Date",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "FormattedEndDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "End Date",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Shift", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Shift",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.DurationWeeks}`, //accessorFn used to join multiple data into a single cell
            id: "DurationWeeks", //id is still required when using accessorFn instead of accessorKey
            header: "DurationWeeks",
            size: 100,
          },

          {
            accessorKey: "BillRate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Bill Rate",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "SourceName", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "VMS-Name",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },

          {
            accessorKey: "PostDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,

            header: "Post Date",
            size: 100,

            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{moment(renderedCellValue).format("DD/MM/YYYY")}</span>
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard | Midas - Jobs Portal</title>
      </Head>

      <div className="page-content">
        <div className="d-flex align-items-center mb-1" style={{ gap: "10px" }}>
          <div className="avatar-sm flex-shrink-0">
            <span className="avatar-title bg-success-subtle rounded fs-3">
              <i className="bx bx-user-circle text-info"></i>
            </span>
          </div>

          <div className="heading-container">
            <h2>Anaylatics Dashboard</h2>
            <h6>
              Navigating Opportunities with Our Job Portal Admin Dashboard
            </h6>
          </div>
        </div>

        <Row>
          <Col xl={4} md={4}>
            <Card className="card-animate">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1">
                    <p className="text-uppercase fw-medium text-muted text-truncate fs-13">
                      Active Users
                    </p>
                    <h4 className="fs-22 fw-semibold mb-3">
                      <CountUp start={0} end={userdata.length} duration={3} />
                    </h4>
                    <div className="d-flex align-items-center gap-2">
                      <h5 className="text-success fs-12 mb-0">
                        <i className="ri-arrow-right-up-line fs-13 align-middle"></i>
                        +29.08 %
                      </h5>
                      <p className="text-muted mb-0">than last week</p>
                    </div>
                  </div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-warning-subtle rounded fs-3">
                      <i className="bx bx-user-circle text-warning"></i>
                    </span>
                  </div>
                </div>
              </Card.Body>
              <div className="animation-effect-6 text-warning opacity-25">
                <i className="bi bi-person"></i>
              </div>
              <div className="animation-effect-4 text-warning opacity-25">
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="animation-effect-3 text-warning opacity-25">
                <i className="bi bi-people"></i>
              </div>
            </Card>
          </Col>

          <Col xl={4} md={4}>
            <Card className="card-animate">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1">
                    <p className="text-uppercase fw-medium text-muted text-truncate fs-13">
                      ALL Jobs
                    </p>
                    <h4 className="fs-22 fw-semibold mb-3">
                      <>
                        {jobdata.length > 0 ? (
                          <CountUp
                            start={0}
                            end={jobdata.length > 0 ? jobdata[0].length : 0}
                            duration={3}
                            // prefix="$"
                          />
                        ) : (
                          <CircularProgress />
                        )}
                      </>
                    </h4>
                    <div className="d-flex align-items-center gap-2">
                      <h5 className="text-success fs-12 mb-0">
                        <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                        +18.30 %
                      </h5>
                      <p className="text-muted mb-0">than last week</p>
                    </div>
                  </div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-success-subtle rounded fs-3">
                      <i className="bx bx-dollar-circle text-success"></i>
                    </span>
                  </div>
                </div>
              </Card.Body>
              <div className="animation-effect-6 text-success opacity-25">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <div className="animation-effect-4 text-success opacity-25">
                <i className="bi bi-currency-pound"></i>
              </div>
              <div className="animation-effect-3 text-success opacity-25">
                <i className="bi bi-currency-euro"></i>
              </div>
            </Card>
          </Col>

          <Col xl={4} md={4}>
            <Card className="card-animate">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-info-subtle rounded fs-3">
                      <i className="bx bx-shopping-bag text-info"></i>
                    </span>
                  </div>
                  <div className="text-end flex-grow-1">
                    <p className="text-uppercase fw-medium text-muted text-truncate fs-13">
                      Open Jobs
                    </p>
                    <h4 className="fs-22 fw-semibold mb-3">
                      {openFilterJob.length > 0 ? (
                        <CountUp
                          start={0}
                          end={openFilterJob.length}
                          duration={3}
                        />
                      ) : (
                        <CircularProgress />
                      )}
                    </h4>
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <h5 className="text-danger fs-12 mb-0">
                        <i className="ri-arrow-right-down-line fs-13 align-middle"></i>{" "}
                        -2.74 %
                      </h5>
                      <p className="text-muted mb-0">than last week</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <div className="animation-effect-6 text-info opacity-25 left">
                <i className="bi bi-handbag"></i>
              </div>
              <div className="animation-effect-4 text-info opacity-25 left">
                <i className="bi bi-shop"></i>
              </div>
              <div className="animation-effect-3 text-info opacity-25 left">
                <i className="bi bi-bag-check"></i>
              </div>
            </Card>
          </Col>

          <Col xl={12} md={12}>
            <div
              className="welcome-banner d-flex justify-content-between "
              style={{ backgroundColor: "#a9d0fb", borderRadius: "5px" }}
            >
              <div className="welcome-text mt-5 ms-3">
                <h2>Welcome back,</h2>
                <h3>{username.name} !</h3>
                <h5 className="mt-3">
                  Welcome to <strong>Midas Job Portal.</strong>
                </h5>
              </div>
              <div className="welcome-image">
                <Image
                  src={banner}
                  alt="dummyuser"
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
