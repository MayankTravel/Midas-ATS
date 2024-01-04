import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import { Material } from "@common/Material_Table";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import moment from "moment";
import { Jobs } from "Components/interface/jobs";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@common/Loader";
import { fetchAllUser } from "Components/slices/user/thunk";
import { AccountData, ManagerData } from "Components/slices/auth/manager/thunk";
const ManagerJobs = () => {
  const dispatch: any = useDispatch();
  const { isloading, managerdata, account_manager } = useSelector(
    (state: any) => state.managerFeed
  );

  const { isLoading, jobdata, userdata } = useSelector((state: any) => ({
    jobdata: state.jobFeeds.jobdata,
    isLoading: state.assignFeed.isLoading,
    userdata: state.user.userdata,
  }));
  const [userObj, setUserObj] = useState<any>({});
  const [active, setActive] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [userCurrent, setUserCurrent] = useState<any>([]);
  const [filteredAccountData, setFilteredAccountData] = useState<any>([]);

  var rows: any = [];
  var amId: any = "";
  var tlId: any = "";
  var finalUserAssignee: any = "";
  var assignee: any = "";
  var assigner: any = "";

  const columns = useMemo<MRT_ColumnDef<Jobs>[]>(
    () => [
      {
        id: "Job-details", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorFn: (row) => `${row.SourceID}`,
            id: "SourceID",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "PostDate",
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
                <span>{moment(renderedCellValue).format("DD/MM/YYYY")}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Facility",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Degree",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "JobSpecialty",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "City",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "State",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "BillRate",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.DurationWeeks}`,
            id: "DurationWeeks",
            header: "DurationWeeks",
            size: 100,
          },
          {
            accessorKey: "Shift",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "FormattedStartDate",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "FormattedEndDate",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "WorkType",
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
            accessorKey: "StatusString",
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
                <span>
                  {renderedCellValue === "O" ? "Open" : renderedCellValue}
                </span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.finalUserAssignee}`,
            id: "finalUserAssignee",
            header: "Recruiter",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.tlId}`,
            id: "tlId",
            header: "Team Lead",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.amId}`,

            id: "amId",
            header: "Account Manager",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.assigner}`,
            id: "assigner",
            header: "Assigner",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.assignee}`,
            id: "assignee",
            header: "Assignee",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.assignmentModificationDate}`,
            id: "assignmentModificationDate",
            header: "Assignment Updated",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.assignmentDate}`,
            id: "Assignment Date",
            header: "Assignment Date",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },

          {
            accessorFn: (row) => `${row.Alias}`,
            id: "Alias",
            header: "Source Alias",
            size: 100,
            Cell: ({ renderedCellValue, row }: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },

          {
            accessorKey: "SourceName",
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  if (account_manager.length !== 0) {
    for (let index = 0; index < account_manager.length; index++) {
      const element = account_manager[index];
      const jobsFeeeds =
        element.jobsFeedsSet !== undefined &&
        element.jobsFeedsSet !== null &&
        element.jobsFeedsSet
          ? element.jobsFeedsSet
          : [];
      for (var x of jobsFeeeds) {
        if (x === null || x === undefined) {
          rows.push({
            ...x,
            assignmentDate: "",
            assignmentModificationDate: "",
            assignee: "",
            assigner: "",
            amId: "",
            tlId: "",
            finalUserAssignee: "",
          });
        }
        var finalAssignee =
          x.finalUserAssignee === null || x.finalUserAssignee === undefined
            ? 0
            : x.finalUserAssignee;
        userdata
          .filter((item: any) => item.id === finalAssignee)
          .map((ite: any) => {
            return (finalUserAssignee = ite.name);
          });

        userdata
          .filter((item: any) => item.id === x.tlId)
          .map((ite: any) => {
            return (tlId = ite.name);
          });
        userdata
          .filter((item: any) => item.id === x.amId)
          .map((ite: any) => {
            return (amId = ite.name);
          });
        userdata
          .filter((item: any) => item.id === element.assignee)
          .map((ite: any) => {
            return (assignee = ite.name);
          });
        userdata
          .filter((item: any) => item.id === element.assigner)
          .map((ite: any) => {
            return (assigner = ite.name);
          });

        rows.push({
          ...x,
          assignmentDate: moment(element.assignmentDate).format(
            "DD-MM-YYYY HH:MM A"
          ),
          assignmentModificationDate: moment(
            element.assignmentModificationDate
          ).format("DD-MM-YYYY HH:MM A "),
          assignee: assignee,
          assigner: assigner,
          amId: amId,
          tlId: tlId,
          finalUserAssignee:
            x.finalUserAssignee === 0
              ? "Not Assigned"
              : x.finalUserAssignee === null
              ? "Not Assigned"
              : finalUserAssignee,
        });
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setUserCurrent(obj);
      setUserObj(obj);
    }
    dispatch(fetchAllUser());

    const managerJobs = async () => {
      try {
        await ManagerData(dispatch);
      } catch (error) {}
    };
    managerJobs();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Assigned Jobs | Midas Portal</title>
      </Head>

      <div className="page-content">
        <>
          {account_manager.length > 0 && isloading === false ? (
            <>
              <Material
                columns={columns}
                data={rows}
                jobDetailModal={true}
                exportData={true}
              />
            </>
          ) : (
            <Loader />
          )}
        </>
      </div>
    </React.Fragment>
  );
};

ManagerJobs.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ManagerJobs;
