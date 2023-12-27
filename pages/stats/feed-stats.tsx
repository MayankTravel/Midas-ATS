import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import { Material } from "@common/Material_Table";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { Jobs } from "Components/interface/jobs";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "Components/slices/stats/thunk";
import Loader from "@common/Loader";
import { DatePicker } from "@mui/x-date-pickers";

const FeedsStats = () => {
  const dispatch: any = useDispatch();
  const { isLoading, statdata } = useSelector((state: any) => state.statFeed);
  const { userdata } = useSelector((state: any) => state.user);
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const handleChangeDates = (name: any, value: any) => {
    setDates({ ...dates, [name]: moment(value).format("YYYY-MM-DD") });
  };
  const columns = useMemo<MRT_ColumnDef<Jobs>[]>(
    () => [
      {
        id: "Job-details", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorKey: "vmsCountsOpenMaps", //accessorFn used to join multiple data into a single cell
            id: "vmsCountsOpenMaps", //id is still required when using accessorFn instead of accessorKey
            header: "vmsCountsOpenMaps",
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
                  {" "}
                  {renderedCellValue === null || renderedCellValue === undefined
                    ? ""
                    : Object.keys(renderedCellValue).map((key) => [
                        key,
                        " : ",
                        renderedCellValue[key],
                        <br key={key + "-br"} />,
                      ])}
                </span>
              </Box>
            ),
          },
          {
            accessorKey: "vmsCountsNonOpenMaps", //accessorFn used to join multiple data into a single cell
            id: "vmsCountsNonOpenMaps", //id is still required when using accessorFn instead of accessorKey
            header: "vmsCountsNonOpenMaps",
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
                  {" "}
                  {renderedCellValue === null || renderedCellValue === undefined
                    ? ""
                    : Object.keys(renderedCellValue).map((key) => [
                        key,
                        " : ",
                        renderedCellValue[key],
                        <br key={key + "-br"} />,
                      ])}
                </span>
              </Box>
            ),
          },
          {
            accessorKey: "updateTime", //accessorFn used to join multiple data into a single cell
            id: "updateTime", //id is still required when using accessorFn instead of accessorKey
            header: "updateTime",
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
                  {moment(renderedCellValue).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchStats(dates.startDate, dates.endDate));
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Feed Stats | Midas</title>
      </Head>

      <div className="page-content">
        {isLoading === true ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-around"}
              >
                <DatePicker
                  label="From Date"
                  onChange={(newValue: any) =>
                    handleChangeDates("startDate", newValue.$d)
                  }
                />
                <DatePicker
                  label="To Date"
                  onChange={(newValue: any) =>
                    handleChangeDates("endDate", newValue.$d)
                  }
                />
                <Button
                  variant="outlined"
                  onClick={() =>
                    dispatch(fetchStats(dates.startDate, dates.endDate))
                  }
                >
                  Search
                </Button>
              </Stack>
            </Box>
            <Material columns={columns} data={statdata} />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

FeedsStats.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default FeedsStats;
