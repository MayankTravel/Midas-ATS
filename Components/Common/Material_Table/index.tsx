import { useEffect, useMemo, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import moment from "moment";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Swal from "sweetalert2";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_RowSelectionState,
} from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { mkConfig, generateCsv, download } from "export-to-csv";

//Material UI Imports
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

//Icons Imports
import { IconButton, Tooltip } from "@mui/material";

//Icons Imports
import { deleteVMS } from "Components/slices/vms/thunk";
import { useSelector, useDispatch } from "react-redux";
import { api_is_jobsel_success } from "Components/slices/jobs/_client/reducers";
import { api_is_selected_job_success } from "Components/slices/calculator/reducers";
import { GetTravelRates } from "Components/slices/calculator/thunk";
import { LAYOUT_MODE_TYPES } from "../constants/layout";
import { unassignedJobs } from "Components/slices/jobs/_assigned/thunk";
import { useRouter } from "next/router";

export const Material = (props: any) => {
  const [open, setOpen] = useState(false);
  const {
    columns,
    data,
    setShow,
    dispatch,
    modalChildren,
    billCalculator,
    unassigned,
    assignJob,
    jobDetailModal,
    exportData,
    show,
  } = props;
  const [selected, setSelected] = useState<any>(data);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [username, setusername] = useState<any>({});
  const [roles, setroles] = useState<any>({});
  const router = useRouter();
  const rowSelectionIndexes: any = Object.keys(rowSelection);

  var feeds = router.asPath === "/jobs/assigned" ? data : selected;

  var sel: any = rowSelectionIndexes.map((item: any) => {
    return feeds[item].ProviderJobID;
  });
  var selecteds = rowSelectionIndexes.map((item: any) => {
    return feeds[item];
  });

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      const role = JSON.parse(localStorage.getItem("currentrole") || "");
      setusername(obj);
      setroles(role[0]);
    }
  }, []);

  const { layoutModeType } = useSelector((state: any) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableFullScreenToggle: false,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: (row: any) => {
      if (
        roles.role === "ACCOUNTMANAGER" &&
        row.original.isAssigned === true &&
        router.asPath === "/jobs/client"
      ) {
        return false;
      } else if (
        (roles.role === "RECUITER" && row.original.tlId !== "0") ||
        (roles.role === "TEAMLEAD" && row.original.finalUserAssignee !== "0") ||
        (roles.role === "RECUITER" &&
          row.original.amId !== "0" &&
          router.asPath === "/jobs/assigned")
      ) {
        return false;
      } else {
        return true;
      }
    },
    enableStickyHeader: true,
    enableRowActions: router.asPath === "/vms/assign-vms" ? false : true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: "compact",
      pagination: { pageIndex: 0, pageSize: 30 },
    },
    paginationDisplayMode: "pages",
    getRowId: (row) => row.userId,

    renderTopToolbarCustomActions: ({ table }) => (
      <>
        {exportData === true ? (
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              padding: "8px",
              flexWrap: "wrap",
            }}
          >
            <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
              Export
            </Button>
          </Box>
        ) : (
          ""
        )}
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
          }}
        >
          {assignJob === true ? (
            <Button
              variant="outlined"
              onClick={() => {
                table.setCreatingRow(true);
                dispatch(api_is_jobsel_success(sel));
              }}
              disabled={
                sel.length !== 0
                  ? false
                  : true || username.rollId === 5
                  ? true
                  : false
              }
            >
              Assign Jobs
            </Button>
          ) : null}
          {unassigned === true ? (
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(
                  unassignedJobs({
                    id: username.id,
                    jobsdata: {},
                    rollId: roles,
                    selectedJobs: selecteds,
                  })
                );
              }}
              disabled={
                sel.length !== 0
                  ? false
                  : true || username.rollId === 5
                  ? true
                  : false
              }
            >
              Unassign Jobs
            </Button>
          ) : null}
        </Box>
      </>
    ),
    renderRowActions: ({ row }) => (
      <>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {billCalculator === true ? (
            <Tooltip title="Billing">
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  dispatch(GetTravelRates(row.original));
                  dispatch(api_is_selected_job_success(row.original));
                  setShow(true);
                }}
              >
                <AttachMoneyTwoToneIcon />
              </IconButton>
            </Tooltip>
          ) : (
            false
          )}
          {unassigned === true ? (
            <Tooltip title="Unassigned Job">
              <IconButton
                color="error"
                size="small"
                onClick={() => {
                  dispatch(
                    unassignedJobs({
                      id: username.id,
                      jobsdata: row.original,
                      rollId: roles,
                      selectedJobs: selecteds,
                    })
                  );
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
          ) : (
            false
          )}
        </Box>
      </>
    ),

    positionToolbarAlertBanner: "top",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [30, 50, 100, 150],
      shape: "rounded",
      variant: "outlined",
    },
    renderDetailPanel: ({ row }) =>
      jobDetailModal == true ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="col-md-3 job-select me-4">
                  <label>Job-Description</label>
                  <textarea
                    rows={8}
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.Note}
                    readOnly
                  />
                </div>
                <div className="row job-select-row">
                  <div className="col-md-2 job-select">
                    <label>Job-ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.SourceID}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job-Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.Title}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={
                        row.original.WorkType == "1"
                          ? "Travel"
                          : row.original.WorkType == "2"
                          ? "Perm"
                          : row.original.WorkType == "3"
                          ? "Per Diem"
                          : row.original.WorkType
                      }
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.StatusString}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Profession</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.Degree}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Speciality</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.JobSpecialty}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Facility</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.Facility}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.City}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.State}
                      disabled
                    />
                  </div>

                  <div className="col-md-2 job-select">
                    <label>Job On Call Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={`$ ${row.original.OnCallRate}`}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Bill Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={`$ ${row.original.BillRate}`}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>VMS Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.SourceName}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Start Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={moment(row.original.FormattedStartDate).format(
                        "MM/DD/YYYY"
                      )}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job End Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={moment(row.original.EndDate).format("MM/DD/YYYY")}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Posted On</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={moment(row.original.PostDate).format("MM/DD/YYYY")}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Guaranteed Hours</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={row.original.GuaranteedHours}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 job-select">
                    <label>Job Bonus</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      value={`$ ${row.original.Bonus}`}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      ) : null,

    muiTableBodyRowProps: ({ row }: any) => ({
      onClick: () => {
        row.getToggleSelectedHandler();
      },
      sx: { cursor: "pointer" },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    renderCreateRowDialogContent: ({
      table,
      row,
      internalEditComponents,
    }: any) => {
      return (
        <>
          <DialogTitle variant="h6">Assign Jobs</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            Selected ID -{" "}
            {rowSelectionIndexes.map((item: any) => {
              return feeds[item].ProviderJobID + ",";
            })}
            {modalChildren}
          </DialogContent>
        </>
      );
    },
  });
  return (
    <>
      {layoutModeType === LAYOUT_MODE_TYPES.DARKMODE ? (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline /> <MaterialReactTable table={table} />{" "}
        </ThemeProvider>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
};
