import { Input, OutlinedInput } from "@material-ui/core";
import { api_is_jobsel_success } from "Components/slices/jobs/_client/reducers";
import { assignjobs } from "Components/slices/jobs/_client/thunk";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "@common/Loader";
import { useRouter } from "next/router";
import { fetchUserByManagerId } from "Components/slices/user/thunk";

const JobAssignmentRole = (props: any) => {
  const { finalClickInfo, teamLead, recruiterData, selectedIds, setShow } =
    props;
  const { seljob, jobAssigned, isLoading, assignedLoading, variant } =
    useSelector((state: any) => ({
      seljob: state.clientFeeds.selJobs,
      jobAssigned: state.assignFeed.jobsAssigned,
      isLoading: state.clientFeeds.isLoading,
      assignedLoading: state.assignFeed.isLoading,
      variant: state.assignFeed.variant,
    }));
  const router = useRouter();
  const dispatch: any = useDispatch();
  const data: any = localStorage.getItem("currentrole");
  const currUser: any = localStorage.getItem("authUser");
  const parseUser: any = JSON.parse(currUser);
  const parseRole: any = JSON.parse(data);
  const [isValidate, setIsValidate] = useState(false);
  const [recruiter, setRecruiter] = useState([]);
  const [activeRecuiter, setActiveRecruiter] = useState(false);
  const [teamLeadId, setTeamLeadId] = useState<any>("");
  const [teamlead, setTeamLead] = useState([]);

  const formik = useFormik({
    initialValues: {
      assigneeUserId: "",
      assignerUserId: parseUser.id,
      jobIds: seljob.map((item: any) => item),
      assignType: "",
    },
    validationSchema: Yup.object({
      assigneeUserId: Yup.string().required(
        "Please select either Team Lead or Recruiter"
      ),
    }),
    onSubmit: (values) => {
      formik.resetForm();
      dispatch(assignjobs(values, setShow, router));
      dispatch(api_is_jobsel_success([]));
    },
  });
  console.log(jobAssigned);
  const handleCheckuser = () => {
    var tel = teamLead.filter(
      (item: any, index: any) => item.managerId === parseUser.id
    );
    setTeamLead(tel);
  };

  useEffect(() => handleCheckuser(), []);
  const recruiterOptions: any =
    parseRole[0].role === "TEAMLEAD"
      ? recruiterData.filter((item: any) => item.managerId === parseUser.id)
      : parseRole[0].role == "ACCOUNTMANAGER"
      ? activeRecuiter === true
        ? recruiter.filter((item: any) => item.managerId === teamLeadId)
        : []
      : [];

  const { payload } = jobAssigned;
  return (
    <div>
      <form className="g-3 needs-validation" onSubmit={formik.handleSubmit}>
        <div className="row">
          {assignedLoading === true ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {jobAssigned ? (
                <Alert variant={variant}>{payload.message}</Alert>
              ) : (
                <>
                  <div className="assign-container">
                    <label>Assigner</label>
                    <input
                      value={parseUser.fullName}
                      disabled
                      className="col-md-10 mx-2 mt-2 form-input"
                    />
                    {parseRole[0].role === "TEAMLEAD" ? null : (
                      <div
                        className={`col-md-10 mx-2 mt-2 ${
                          formik.touched.assigneeUserId &&
                          formik.errors.assigneeUserId
                            ? "has-error"
                            : ""
                        }`}
                      >
                        <label>Select Team Lead</label>
                        <select
                          className={`form-select ${
                            formik.touched.assigneeUserId &&
                            formik.errors.assigneeUserId
                              ? "is-invalid"
                              : ""
                          }`}
                          aria-label="Floating label select example"
                          onChange={(e) => {
                            formik.handleChange(e);
                            console.log(e.target.value);
                            formik.setFieldValue(
                              "assigneeUserId",
                              e.target.value
                            );
                            formik.setFieldValue(
                              "assignType",
                              "AM_ASSIGNED_TL"
                            );
                            setTeamLeadId(e.target.value);
                            setRecruiter(recruiterData);
                            dispatch(
                              fetchUserByManagerId(JSON.parse(e.target.value))
                            );
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.assigneeUserId}
                        >
                          <option value={0}>Open this select menu</option>
                          {teamlead.map((item: any, index: any) => (
                            <option key={index} value={item.id}>
                              {item.fullName}
                            </option>
                          ))}
                        </select>
                        {formik.touched.assigneeUserId &&
                          formik.errors.assigneeUserId && (
                            <div className="invalid-feedback">
                              {formik.errors.assigneeUserId}
                            </div>
                          )}
                      </div>
                    )}
                    <div
                      className={`col-md-10 mx-2 mt-2 ${
                        formik.touched.assigneeUserId &&
                        formik.errors.assigneeUserId
                          ? "has-error"
                          : ""
                      }`}
                    >
                      <label>Select Recruiter</label>
                      <select
                        className={`form-select ${
                          formik.touched.assigneeUserId &&
                          formik.errors.assigneeUserId
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="Floating label select example"
                        onChange={(e) => {
                          formik.handleChange(e);
                          if (parseRole[0].role === "ACCOUNTMANAGER") {
                            formik.setFieldValue(
                              "assigneeUserId",
                              e.target.value
                            );
                            formik.setFieldValue(
                              "assignType",
                              "AM_ASSIGNED_RECRUITER"
                            );
                          } else {
                            formik.setFieldValue(
                              "assigneeUserId",
                              e.target.value
                            );
                            formik.setFieldValue(
                              "assignType",
                              "TL_ASSIGNED_FINAL_ASSIGNEE"
                            );
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.assigneeUserId}
                        onClick={() => setActiveRecruiter(true)}
                      >
                        <option value={0}>Open this select menu</option>
                        {recruiterOptions.map((item: any, index: any) => (
                          <option key={index} value={item.id}>
                            {item.fullName}
                          </option>
                        ))}
                      </select>
                      {formik.touched.assigneeUserId &&
                        formik.errors.assigneeUserId && (
                          <div className="invalid-feedback">
                            {formik.errors.assigneeUserId}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="job-id-span mt-2 text-center">
                    <span>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isValidate}
                      >
                        Submit
                      </button>
                    </span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobAssignmentRole;
