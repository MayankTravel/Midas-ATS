import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import { Material } from "@common/Material_Table";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import moment from "moment";
import { Jobs } from "Components/interface/jobs";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAssignedJobs } from "Components/slices/jobs/_assigned/thunk";
import Loader from "@common/Loader";
import {
  getAssignedJobByoMe,
  getAssignedJobsToMe,
} from "Components/slices/jobs/_assigned/thunk";
import JobAssignmentRole from "Components/pages_comp/JobAssignmentRole";
import Recruiter from "Components/Recruit";
import { fetchAllUser } from "Components/slices/user/thunk";
const AssignedJobs = () => {
  const dispatch: any = useDispatch();
  const { isLoading, jobdata, assignFeed, assignFeedByMe, userdata } =
    useSelector((state: any) => ({
      jobdata: state.jobFeeds.jobdata,
      assignFeed: state.assignFeed.assigned_tome,
      assignFeedByMe: state.assignFeed.assignedfeedsbyme,
      isLoading: state.assignFeed.isLoading,
      userdata: state.user.userdata,
    }));
  const [userObj, setUserObj] = useState<any>({});
  const [active, setActive] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [userCurrent, setUserCurrent] = useState<any>([]);
  const [mergeRow, setMergedRow] = useState<any>([]);
  var rows: any = [];
  var ByMeRow: any = [];
  var assignee = "";
  var assigner = "";

  const columns = useMemo<MRT_ColumnDef<Jobs>[]>(
    () => [
      {
        id: "Job-details", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorFn: (row) => `${row.assignee}`, //accessorFn used to join multiple data into a single cell
            id: "assignee", //id is still required when using accessorFn instead of accessorKey
            header: "Job-Assignee",
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
            accessorFn: (row) => `${row.assigner}`, //accessorFn used to join multiple data into a single cell
            id: "assigner", //id is still required when using accessorFn instead of accessorKey
            header: "Job-Assigner",
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
            accessorKey: "StatusString", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "StatusString",
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

  if (assignFeedByMe.length !== 0 && localStorage.getItem("authUser")) {
    for (let index = 0; index < assignFeedByMe.length; index++) {
      const element = assignFeedByMe[index];
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      const jobsFeeeds =
        element.jobsFeedsSet !== undefined &&
        element.jobsFeedsSet !== null &&
        element.jobsFeedsSet
          ? element.jobsFeedsSet
          : [];
      for (var x of jobsFeeeds) {
        if (obj.rollId === 6) {
          userdata
            .filter((item: any) => item.id === x.finalUserAssignee)
            .map((ite: any) => {
              console.log(ite.name);
              return (assignee = ite.name);
            });
        } else {
          userdata
            .filter((item: any) => item.id === x.tlId)
            .map((ite: any) => {
              return (assignee = ite.name);
            });
        }
        if (obj.rollId === 7) {
          userdata
            .filter((item: any) => item.id === x.amId)
            .map((ite: any) => {
              return (assigner = ite.name);
            });
        } else {
          userdata
            .filter((item: any) => item.id === x.tlId)
            .map((ite: any) => {
              return (assigner = ite.name);
            });
        }

        ByMeRow.push({
          ...x,
          assignee: assignee,
          assigner: assigner,
        });
      }
    }
  }

  if (assignFeed.length !== 0 && localStorage.getItem("authUser")) {
    for (let index = 0; index < assignFeed.length; index++) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      const element = assignFeed[index];
      const jobsFeeeds =
        element.jobsFeedsSet !== undefined &&
        element.jobsFeedsSet !== null &&
        element.jobsFeedsSet
          ? element.jobsFeedsSet
          : [];
      for (var x of jobsFeeeds) {
        if (x.finalUserAssignee === 0) {
          userdata
            .filter((item: any) => item.id === x.tlId)
            .map((ite: any) => {
              return (assignee = ite.name);
            });
        } else {
          userdata
            .filter((item: any) => item.id === x.finalUserAssignee)
            .map((ite: any) => {
              return (assignee = ite.name);
            });
        }
        if (x.tlId !== 0 && obj.rollId === 5) {
          userdata
            .filter((item: any) => item.id === x.tlId)
            .map((ite: any) => {
              return (assigner = ite.name);
            });
        } else {
          userdata
            .filter((item: any) => item.id === x.amId)
            .map((ite: any) => {
              return (assigner = ite.name);
            });
        }
        rows.push({
          ...x,
          assignee: assignee,
          assigner: assigner,
        });
      }
    }
  }

  const teamlead = userdata.filter((ite: any) => ite.rollId == "6");
  const recruiterData = userdata.filter((ite: any) => ite.rollId == "5");
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setUserCurrent(obj);
      setUserObj(obj);
    }
    dispatch(fetchAllUser());
    dispatch(getAssignedJobByoMe());
    dispatch(getAssignedJobsToMe());
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Assigned Jobs | Midas Portal</title>
      </Head>

      <div className="page-content">
        {userObj.rollId == 6 ? (
          <div>
            <span
              className={`${
                active === 1 ? "text-white bg-dark" : "text-black bg-light"
              } btn my-2 mx-2 cursor-pointer`}
              onClick={() => {
                setActive(1);
                dispatch(getAssignedJobsToMe());
              }}
            >
              Assigned To Me
            </span>
            <span
              className={`${
                active === 2 ? "text-white bg-dark" : "text-black bg-light"
              } btn my-2 mx-2 cursor-pointer`}
              onClick={() => {
                setActive(2);
                dispatch(getAssignedJobByoMe());
              }}
            >
              Assigned To Team
            </span>
          </div>
        ) : null}
        <>
          {assignFeed.length !== 0 ||
          (assignFeedByMe.length !== 0 && isLoading === false) ||
          (userObj !== undefined && userObj !== null) ? (
            <>
              {userObj.rollId === 7 ? (
                <Material
                  columns={columns}
                  data={ByMeRow}
                  unassigned={true}
                  assignJob={true}
                  dispatch={dispatch}
                  setShow={setShow}
                  show={show}
                  jobDetailModal={true}
                  modalChildren={
                    <JobAssignmentRole
                      teamLead={teamlead}
                      recruiterData={recruiterData}
                      setShow={setShow}
                      show={show}
                    />
                  }
                />
              ) : userObj.rollId === 6 ? (
                <>
                  {active === 1 ? (
                    <>
                      {rows.length === 0 ? (
                        <Recruiter
                          userdata={userdata}
                          userCurrent={
                            userCurrent.length === 0 ? [] : userCurrent
                          }
                          active={active}
                          assignJob={true}
                          dispatch={dispatch}
                          setShow={setShow}
                          show={show}
                          jobDetailModal={true}
                          modalChildren={
                            <JobAssignmentRole
                              teamLead={teamlead}
                              recruiterData={recruiterData}
                              setShow={setShow}
                              show={show}
                            />
                          }
                        />
                      ) : (
                        <Material
                          columns={columns}
                          data={rows}
                          dispatch={dispatch}
                          assignJob={true}
                          setShow={setShow}
                          show={show}
                          jobDetailModal={true}
                          modalChildren={
                            <JobAssignmentRole
                              teamLead={teamlead}
                              recruiterData={recruiterData}
                              setShow={setShow}
                              show={show}
                            />
                          }
                        />
                      )}
                    </>
                  ) : active === 2 ? (
                    <>
                      {ByMeRow.length === 0 ? (
                        <Recruiter
                          userdata={userdata}
                          userCurrent={
                            userCurrent.length === 0 ? [] : userCurrent
                          }
                          active={active}
                          unassigned={true}
                          assignJob={true}
                          dispatch={dispatch}
                          setShow={setShow}
                          show={show}
                          jobDetailModal={true}
                          modalChildren={
                            <JobAssignmentRole
                              teamLead={teamlead}
                              recruiterData={recruiterData}
                              setShow={setShow}
                              show={show}
                            />
                          }
                        />
                      ) : (
                        <Material
                          columns={columns}
                          data={ByMeRow}
                          dispatch={dispatch}
                          assignJob={true}
                          setShow={setShow}
                          show={show}
                          jobDetailModal={true}
                          modalChildren={
                            <JobAssignmentRole
                              teamLead={teamlead}
                              recruiterData={recruiterData}
                              setShow={setShow}
                              show={show}
                            />
                          }
                        />
                      )}
                    </>
                  ) : null}
                </>
              ) : (
                <Material
                  columns={columns}
                  data={rows}
                  dispatch={dispatch}
                  setShow={setShow}
                  show={show}
                  jobDetailModal={true}
                  modalChildren={
                    <JobAssignmentRole
                      teamLead={teamlead}
                      recruiterData={recruiterData}
                      setShow={setShow}
                      show={show}
                    />
                  }
                />
              )}
            </>
          ) : (
            <Loader />
          )}
        </>
      </div>
    </React.Fragment>
  );
};

AssignedJobs.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AssignedJobs;
