import React, { useEffect, useState } from "react";
import Router from "next/router";
import { user } from "Components/interface/user";
const Navdata = () => {
  // state data
  const [isAuth, setIsAuth] = useState(false);
  const [hrms, setHrms] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [isVms, setIsVms] = useState(false);
  const [isStats, setIsStats] = useState(false);
  const [isOrganisation, setIsOrganisation] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isFacility, setIsFacility] = useState(false);
  const [user, setUser] = useState(false);
  //  Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVMSHrms, setIsVMSHRMS] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userObj, setUserobj] = useState<any>({});
  //  Pages
  const [isProfile, setIsProfile] = useState(false);

  //  Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [isCurrentState, setIsCurrentState] = useState("");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("sub-items")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id: any = item.getAttribute("sub-items");
        var menusId = document.getElementById(id);
        if (menusId) {
          (menusId.parentElement as HTMLElement).classList.remove("show");
        }
      });
      e.target.classList.add("active");
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (isCurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (isCurrentState !== "Pages") {
      setIsPages(false);
    }
    if (isCurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (isCurrentState === "Dashboard") {
      Router.push("/dashboard");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "Widgets") {
      Router.push("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "Calendar") {
      Router.push("/calendar");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "API Key") {
      Router.push("/api-key");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "Contact") {
      Router.push("/contact");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "Leaderboard") {
      Router.push("/leaderboard");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "Components") {
      Router.push("https:hybrix-nextjs-components.vercel.app/");
      document.body.classList.add("twocolumn-panel");
    }
    if (localStorage.getItem("currentrole")) {
      const obj: any = JSON.parse(localStorage.getItem("currentrole") || "{}");
      setUserobj(obj[0]);
    }
  }, [isCurrentState, isAuth, isPages, isMultiLevel]);

  const menuItems: any =
    userObj.role === "SUPERADMIN" || userObj.role === "ADMIN"
      ? [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: "bi bi-speedometer2",
            link: "/dashboard",
            click: function (e: any) {
              e.preventDefault();
              setIsCurrentState("Dashboard");
            },
          },
          {
            id: "jobs",
            label: "Jobs",
            icon: "bi bi-menu-button-wide-fill  ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsAuth(!isAuth);
              setIsCurrentState("Auth");
              updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
              {
                id: "allJobs",
                label: "All-Jobs",
                link: "/jobs/all-feeds",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
            ],
          },
          {
            id: "vms",
            label: "VMS's Config",
            icon: "bi bi-person-circle",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsVms(!isVms);
              setIsCurrentState("VMS's Config");
              updateIconSidebar(e);
            },
            stateVariables: isVms,
            subItems: [
              {
                id: "assignVms",
                label: "Assign-VMS",
                link: "/vms/assign-vms",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "vms",
                stateVariables: isSignIn,
              },
            ],
          },
          {
            id: "stats",
            label: "Stats",
            icon: "bi bi-clipboard-data",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsStats(!isStats);
              setIsCurrentState("Stats");
              updateIconSidebar(e);
            },
            stateVariables: isStats,
            subItems: [
              {
                id: "feedStats",
                label: "Feed Stats",
                link: "/stats/feed-stats",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "stats",
                stateVariables: isSignIn,
              },
            ],
          },
          {
            id: "user",
            label: "Users",
            icon: "bi bi-person-circle ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setUser(!user);
              setIsCurrentState("User");
              updateIconSidebar(e);
            },
            stateVariables: user,
            subItems: [
              {
                id: "adduser",
                label: "Add-Users",
                link: "/users/add-user",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "user",
                stateVariables: isSignIn,
              },
              {
                id: "viewuser",
                label: "View-Users",
                link: "/users/view-user",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "user",
                stateVariables: isSignUp,
              },
            ],
          },

          {
            id: "employee",
            label: "Employees",
            icon: "bi bi-menu-button-wide-fill ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsEmployee(!isEmployee);
              setIsCurrentState("VMS's Config");
              updateIconSidebar(e);
            },
            stateVariables: isEmployee,
            subItems: [
              {
                id: "control",
                label: "Employee-control",
                link: "/employee/employee-control",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "employee",
                stateVariables: isSignIn,
              },
            ],
          },

          {
            id: "client",
            label: "Clients",
            icon: "bi bi-clipboard-data",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsClient(!isClient);
              setIsCurrentState("Stats");
              updateIconSidebar(e);
            },
            stateVariables: isClient,
            subItems: [
              {
                id: "addClient",
                label: "Add Client",
                link: "/client/add-client",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "client",
                stateVariables: isSignIn,
              },
              {
                id: "viewClient",
                label: "View Client",
                link: "/client/view-client",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "client",
                stateVariables: isSignIn,
              },
            ],
          },
          {
            id: "facility",
            label: "Facility",
            icon: "bi bi-layers",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsFacility(!isFacility);
              setIsCurrentState("Stats");
              updateIconSidebar(e);
            },
            stateVariables: isFacility,
            subItems: [
              {
                id: "addFacility",
                label: "Add Facility",
                link: "/facility/add-facility",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "facility",
                stateVariables: isSignIn,
              },
              {
                id: "viewFacility",
                label: "View Facility",
                link: "/facility/view-facility",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "facility",
                stateVariables: isSignIn,
              },
            ],
          },
          {
            id: "vms",
            label: "VMS",
            icon: "bi bi-clipboard-data",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsVMSHRMS(!isVMSHrms);
              setIsCurrentState("Stats");
              updateIconSidebar(e);
            },
            stateVariables: isVMSHrms,
            subItems: [
              {
                id: "addVMS",
                label: "Add VMS",
                link: "/vms/add-vms",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "vms",
                stateVariables: isSignIn,
              },
              {
                id: "viewVMS",
                label: "View VMS",
                link: "/vms/view-vms",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "vms",
                stateVariables: isSignIn,
              },
            ],
          },
          {
            id: "organisation",
            label: "Organisation",
            icon: "bi bi-command",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsOrganisation(!isOrganisation);
              setIsCurrentState("Stats");
              updateIconSidebar(e);
            },
            stateVariables: isOrganisation,
            subItems: [
              {
                id: "addOrganisation",
                label: "Add Organisation",
                link: "/organisation/add-organisation",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "organisation",
                stateVariables: isSignIn,
              },
              {
                id: "viewOrganisation",
                label: "View Organisation",
                link: "/organisation/view-organisation",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "organisation",
                stateVariables: isSignIn,
              },
            ],
          },
        ]
      : userObj.role === "ACCOUNTMANAGER"
      ? [
          {
            label: "Menu",
            isHeader: true,
          },
          {
            id: "dashboard",
            label: "Dashboard",
            icon: "bi bi-speedometer2",
            link: "/dashboard",
            click: function (e: any) {
              e.preventDefault();
              setIsCurrentState("Dashboard");
            },
          },
          {
            label: "Pages",
            isHeader: true,
          },
          {
            id: "jobs",
            label: "Jobs",
            icon: "bi bi-menu-button-wide-fill  ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsAuth(!isAuth);
              setIsCurrentState("Auth");
              updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
              {
                id: "client",
                label: "Client-Jobs",
                link: "/jobs/client",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "jobs",
                stateVariables: isSignIn,
              },
              {
                id: "allJobs",
                label: "All-Jobs",
                link: "/jobs/all-feeds",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
              {
                id: "assignedJobs",
                label: "Assigned-Jobs",
                link: "/jobs/assigned",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
            ],
          },
        ]
      : userObj.role === "TEAMLEAD"
      ? [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: "bi bi-speedometer2",
            link: "/dashboard",
            click: function (e: any) {
              e.preventDefault();
              setIsCurrentState("Dashboard");
            },
          },

          {
            id: "jobs",
            label: "Jobs",
            icon: "bi bi-menu-button-wide-fill  ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsAuth(!isAuth);
              setIsCurrentState("Auth");
              updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
              {
                id: "allJobs",
                label: "All-Jobs",
                link: "/jobs/all-feeds",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
              {
                id: "assignedJobs",
                label: "Assigned-Jobs",
                link: "/jobs/assigned",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
            ],
          },
        ]
      : userObj.role === "RECRUITER"
      ? [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: "bi bi-speedometer2",
            link: "/dashboard",
            click: function (e: any) {
              e.preventDefault();
              setIsCurrentState("Dashboard");
            },
          },

          {
            id: "jobs",
            label: "Jobs",
            icon: "bi bi-menu-button-wide-fill  ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsAuth(!isAuth);
              setIsCurrentState("Auth");
              updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
              {
                id: "allJobs",
                label: "All-Jobs",
                link: "/jobs/all-feeds",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
              {
                id: "assignedJobs",
                label: "Assigned-Jobs",
                link: "/jobs/assigned",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
            ],
          },
        ]
      : userObj.role === "ONBOARD"
      ? [
          {
            id: "employee",
            label: "Employees",
            icon: "bi bi-menu-button-wide-fill ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsEmployee(!isEmployee);
              setIsCurrentState("VMS's Config");
              updateIconSidebar(e);
            },
            stateVariables: isEmployee,
            subItems: [
              {
                id: "control",
                label: "Employee-control",
                link: "/employee/employee-control",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "employee",
                stateVariables: isSignIn,
              },
            ],
          },
        ]
      : userObj.role === "MODERATOR"
      ? [
          {
            id: "user",
            label: "Users",
            icon: "bi bi-person-circle ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setUser(!user);
              setIsCurrentState("User");
              updateIconSidebar(e);
            },
            stateVariables: user,
            subItems: [
              {
                id: "adduser",
                label: "Add-Users",
                link: "/users/add-user",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "user",
                stateVariables: isSignIn,
              },
              {
                id: "viewuser",
                label: "View-Users",
                link: "/users/view-user",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "user",
                stateVariables: isSignUp,
              },
            ],
          },
        ]
      : userObj.role === "GENERALMANAGER"
      ? [
          {
            label: "Menu",
            isHeader: true,
          },
          {
            id: "dashboard",
            label: "Dashboard",
            icon: "bi bi-speedometer2",
            link: "/dashboard",
            click: function (e: any) {
              e.preventDefault();
              setIsCurrentState("Dashboard");
            },
          },
          {
            id: "jobs",
            label: "Jobs",
            icon: "bi bi-menu-button-wide-fill  ",
            link: "/#",
            click: function (e: any) {
              e.preventDefault();
              setIsAuth(!isAuth);
              setIsCurrentState("Auth");
              updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
              {
                id: "client",
                label: "Client-Jobs",
                link: "/jobs/client",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignIn(!isSignIn);
                },
                parentId: "jobs",
                stateVariables: isSignIn,
              },
              {
                id: "allJobs",
                label: "All-Jobs",
                link: "/jobs/all-feeds",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
              {
                id: "assignedJobs",
                label: "Assigned-Jobs",
                link: "/jobs/assigned",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
              {
                id: "manager",
                label: "Assigned-By-Manager",
                link: "/jobs/manager",
                click: function (e: any) {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                },
                parentId: "jobs",
                stateVariables: isSignUp,
              },
            ],
          },
        ]
      : [];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
