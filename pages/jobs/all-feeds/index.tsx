import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import { Material } from "@common/Material_Table";
import { MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/material";
import moment from "moment";
import { Jobs } from "Components/interface/jobs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "Components/slices/jobs/_alljobs/thunk";
import Loader from "@common/Loader";
const AllJobs = () => {
  const dispatch: any = useDispatch();
  const { isLoading, jobdata } = useSelector((state: any) => state.jobFeeds);
  const { userdata } = useSelector((state: any) => state.user);
  const [feedsData, setFeedsData] = useState<any>([]);

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllJobs(dispatch);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>All_Jobs | Midas</title>
      </Head>

      <div className="page-content">
        <>
          {jobdata.length > 0 && isLoading === false ? (
            <Material
              columns={columns}
              data={jobdata[0]}
              jobDetailModal={true}
              exportData={true}
              billCalculator={true}
            />
          ) : (
            <Loader />
          )}
        </>
      </div>
    </React.Fragment>
  );
};

AllJobs.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AllJobs;
