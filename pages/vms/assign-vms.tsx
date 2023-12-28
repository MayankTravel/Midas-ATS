import React, { ReactElement, useEffect, useMemo } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import { Material } from "@common/Material_Table";
import { Employee } from "Components/interface/employee";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  ListItemIcon,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
  lighten,
} from "@mui/material";
import { fetchAllAssignedVms } from "Components/slices/thunk";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUser } from "Components/slices/user/thunk";
import { useRouter } from "next/router";
import Select_Comp from "@common/Select";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { deleteVMS, submitAssignedPayload } from "Components/slices/vms/thunk";
import DeleteIcon from "@mui/icons-material/Delete";
import { api_is_loading } from "Components/slices/vms/reducers";

const Assigned_VMS = () => {
  var rows: any[] = [];
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { isLoading, data, isError, submitSuccess } = useSelector(
    (state: any) => state.VMS
  );
  const { userdata } = useSelector((state: any) => state.user);

  const handleButtonDelete = (row: any) => {
    var id = row.original.id;
    deleteVMS({ id, dispatch });
  };

  const openDeleteConfirmModal = (row: any) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      handleButtonDelete(row);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        id: "VMS", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorKey: "accountManager", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Account-Manager",
            size: 300,
          },
          {
            accessorKey: "vmsName", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "VMS-Name",
            size: 300,
          },
          {
            accessorKey: "deleteVMS",
            header: "Delete-VMS",
            size: 200,
            Cell: ({ row }: any) => (
              <>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => openDeleteConfirmModal(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ),
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchAllAssignedVms());
    dispatch(fetchAllUser());
  }, []);
  var rolesArray: any = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    var name = "";
    userdata
      .filter((item: any) => item.id === element.accountManager)
      .map((ite: any) => {
        return (name = ite.name);
      });
    rows.push({
      ...element,
      accountManager: name,
    });
  }
  for (let index = 0; index < userdata.length; index++) {
    const element = userdata[index];

    for (var role of element.roles) {
      rolesArray.push({ ...element, roles: role.id });
    }
  }

  const AccountManager = rolesArray.filter(
    (ite: any) => ite.roles === "658472f94b18126ca69a4927"
  );
  console.log(AccountManager);
  const active_vms = [
    "AHSA",
    "FieldGlass",
    "Kruse",
    "Medefis5",
    "MedicalSolutions",
    "PeopleFluent (Vector Adaptive)",
    "ShiftWise",
    "StafferLink",
  ];

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      accountManager: "",
      vmsName: [],
      accountManagerName: "",
    },
    validationSchema: Yup.object({
      vmsName: Yup.array().required("Please Select VMS'(s)"),
    }),
    onSubmit: (values) => {
      dispatch(submitAssignedPayload(values, router));
    },
  });

  const handleChange = (
    event: SelectChangeEvent<typeof validation.vmsName>
  ) => {
    const {
      target: { value },
    } = event;
    validation.setFieldValue(
      "vmsName",
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log(validation.values);
  return (
    <React.Fragment>
      <Head>
        <title>Assign VMS(s) | Midas</title>
      </Head>

      <div className="page-content">
        <Container fluid>
          <Alert variant="error">{isError} </Alert>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Card sx={{ padding: 2, m: 2 }}>
              <Row>
                <Col>
                  <div className="h-100">
                    <FormControl sx={{ width: 300 }}>
                      <Select_Comp
                        label={"Account Manager"}
                        input={<OutlinedInput label={"Account Manager"} />}
                        data={AccountManager}
                        value={validation.values.accountManagerName}
                        multiple={false}
                        onBlur={validation.handleBlur}
                        onChange={(item: any) => {
                          validation.setFieldValue(
                            "accountManager",
                            item.target.value.id
                          );
                          validation.setFieldValue(
                            "accountManagerName",
                            item.target.value.name
                          );
                        }}
                      />
                      {validation.touched.accountManager &&
                      validation.errors.accountManager ? (
                        <Form.Control.Feedback type="invalid">
                          {validation.errors.accountManager}
                        </Form.Control.Feedback>
                      ) : null}
                    </FormControl>
                  </div>
                </Col>

                <Col>
                  <Select_Comp
                    label={"VMS"}
                    input={<OutlinedInput label={"VMS"} />}
                    data={active_vms}
                    value={validation.values.vmsName}
                    multiple={true}
                    onChange={handleChange}
                    onBlur={validation.handleBlur}
                    name={"vmsName"}
                  />
                </Col>
                <Col>
                  <Button
                    variant="contained"
                    sx={{ marginTop: "11px", height: "50px" }}
                    type="submit"
                  >
                    {isLoading == true ? (
                      <div
                        className="spinner-border text-light"
                        role="status"
                      ></div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Col>
              </Row>
              {isLoading === false ? (
                <>
                  {submitSuccess ? (
                    <Alert variant="success">{submitSuccess}</Alert>
                  ) : null}
                </>
              ) : null}
            </Card>
          </Form>
          <div className="main-table-content">
            <Material
              columns={columns}
              data={rows}
              handleButtonDelete={handleButtonDelete}
              renderRowActionsStat={true}
              headingTable={true}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

Assigned_VMS.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Assigned_VMS;
