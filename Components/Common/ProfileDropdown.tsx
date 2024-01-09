import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
//import images

import { fetchAllUser } from "Components/slices/user/thunk";

const ProfileDropdown = () => {
  const dispatch: any = useDispatch();
  const { success, user } = useSelector((state: any) => ({
    success: state.Profile.success,
    user: state.user.userdata,
  }));

  const [usernamefirst, setusernamefirst] = useState<any>("");
  const [username, setusername] = useState<any>({});
  const [role, setRole] = useState<any>({});

  useEffect(() => {
    if (
      localStorage.getItem("authUser") &&
      localStorage.getItem("currentrole")
    ) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      const role = JSON.parse(localStorage.getItem("currentrole") || "");
      setusername(obj);
      setRole(role[0]);
      dispatch(fetchAllUser());
      setusernamefirst(obj.fullName.split("")[0]);
    }
  }, []);
  return (
    <React.Fragment>
      <Dropdown className="ms-sm-3 header-item topbar-user">
        <Dropdown.Toggle
          type="button"
          className="btn bg-transparent border-0 arrow-none"
          id="page-header-user-dropdown"
        >
          <span className="d-flex align-items-center">
            <Avatar>{usernamefirst}</Avatar>
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {username.fullName}
              </span>
              <span className="d-none d-xl-block ms-1 fs-13 text-muted user-name-sub-text">
                {role.role}
              </span>
            </span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {username.name}!</h6>

          <div className="dropdown-divider"></div>

          <Dropdown.Item href="/auth/logout">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span
              className="align-middle"
              data-key="t-logout"
              onClick={() => localStorage.clear()}
            >
              Logout
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
