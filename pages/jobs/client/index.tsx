import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import { Material } from "@common/Material_Table";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import moment from "moment";
import { Jobs } from "Components/interface/jobs";
import { useDispatch, useSelector } from "react-redux";

import JobAssignmentRole from "Components/pages_comp/JobAssignmentRole";
import Loader from "@common/Loader";
import Calculator from "Components/pages_comp/Calculator";

import { fetchAllAssignedVms } from "Components/slices/thunk";
import { api_is_selected_job_success } from "Components/slices/calculator/reducers";
import { useer_filter } from "@common/utils/user_filter";
import { fetchAllRoles } from "Components/slices/user/thunk";

const index = () => {
  const [assignedvms, setassignedvmsuser] = useState<any>();
  const [selectedIds, setSelectedIds] = useState<Set<number>>();
  const [show, setShow] = useState<boolean>(false);
  const [vms, setvms] = useState<any>();
  const [rolesArr, setRolesArr] = useState<any>([]);
  const dispatch: any = useDispatch();
  const { clientdata, selJobs, userdata, isLoading, selectedJob, roles } =
    useSelector((state: any) => ({
      isLoading: state.clientFeeds.isLoading,
      clientdata: state.clientFeeds.clientdata,
      selJobs: state.clientFeeds.selJobs,
      userdata: state.user.userdata,
      roles: state.user.roles,
      selectedJob: state.calc.selectedJob,
      assigntouser: state.VMS.assigntouser,
    }));

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
            filterFn: "equals",
            filterSelectOptions: [
              { label: "Travel", value: "1" },
              { label: "Perm", value: "2" },
              { label: "Per-Diem", value: "3" },
            ],
          },
          {
            accessorKey: "Alias", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
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
            filterVariant: "range",
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
            filterVariant: "range",
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

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setassignedvmsuser(obj);
    }
    dispatch(fetchAllAssignedVms());
    dispatch(fetchAllRoles());
  }, []);

  var rolesArray: any = [];
  for (let index = 0; index < userdata.length; index++) {
    const element = userdata[index];
    for (var role of element.roles) {
      rolesArray.push({
        ...element,
        roleName: role === null || role === undefined ? "" : role.role,
        managerId: element.manager === null ? "" : element.manager.id,
      });
    }
  }
  const teamlead = rolesArray.filter((ite: any) => ite.roleName === "TEAMLEAD");
  const recruiterData = rolesArray.filter(
    (ite: any) => ite.roleName === "RECRUITER"
  );

  return (
    <React.Fragment>
      <Head>
        <title>Client Jobs | Midas Jobs Portal</title>
      </Head>

      <div className="page-content">
        {clientdata.length > 0 && isLoading === false ? (
          <Material
            columns={columns}
            data={clientdata}
            selectionValue={true}
            setSelectedIds={setSelectedIds}
            dispatch={dispatch}
            selectedIds={selectedIds}
            modalChildren={
              <JobAssignmentRole
                teamLead={teamlead}
                recruiterData={recruiterData}
                selectedIds={selJobs}
                // setShow={setShow}
              />
            }
            billCalculator={true}
            setShow={setShow}
            assignJob={true}
            jobDetailModal={true}
            exportData={true}
            show={show}
          />
        ) : (
          <Loader />
        )}

        <Calculator
          show={show}
          setShow={setShow}
          onHide={() => {
            dispatch(api_is_selected_job_success([]));
            setShow(false);
          }}
          values={selectedJob}
        />
      </div>
    </React.Fragment>
  );
};

index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default index;
