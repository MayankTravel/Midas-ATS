/* Live */
export const hrms_api_host = "http://44.213.229.250:8077";
// export const job_api_host = "http://34.230.215.187:9292/api";
export const redirect = "http://34.230.215.187:6001/auth/reset-password/";

/* LOCAL */

/* Dheeraj Sir */
// export const redirect = "http://localhost:3000/auth/reset-password/";
export const job_api_host = "http://10.0.0.101:9292/api";
// export const hrms_api_host = "http://10.0.0.101:8077";

/* Own */
// export const job_api_host = "http://localhost:9291/api";
// export const hrms_api_host = "http://localhost:8077";
// export const redirect = "http://localhost:3000/auth/reset-password/";

//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
export const POST_LOGIN = "/api/v1/user/authenticate";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_RESET_ = "/api/v1/user";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";
export const MANAGER_BY_ROLE = "/api/v1/user/getUsersByManager";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//CALENDER
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

// API Key
export const GET_API_KEY = "/api-key";
export const ADD_NEW_API_KEY = "/add/api-key";
export const UPDATE_API_KEY = "/update/api-key";
export const DELETE_API_KEY = "/delete/api-key";

// Contacts
export const GET_CONTACTS = "/get-contacts";
export const ADD_NEW_CONTACT = "/add/contacts";
export const UPDATE_CONTACT = "/update/contacts";
export const DELETE_CONTACT = "/delete/contacts";

// Team
export const GET_TEAM = "/get-team";
export const ADD_NEW_MEMBER = "/add/member";
export const UPDATE_MEMBER = "/update/member";
export const DELETE_MEMBER = "/delete/member";

// Dashboard charts data
export const GET_ALL_DATA = "/all-data";
export const GET_MONTHLY_DATA = "/monthly-data";
export const GET_HALFYEARLY_DATA = "/halfyearly-data";
export const GET_YEARLY_DATA = "/yearly-data";

// All VMS CONFIG
export const GET_ALL_VMS_CONFIG_DATA = "/jobAssignment/getAllVmsConfig";
export const POST_ASSIGNED_VMS = "/jobAssignment/assignVMS";
export const DELETE_VMS = `/jobAssignment/deleteVmsConfig/`;

// ASSSIGNMENT
export const POST_ASSIGNED_JOB = "/jobAssignment/assignJob";
export const GET_ASSIGNED_JOBS_TO_ME = "/jobAssignment/allAssignedToMe";
export const GET_ASSIGNED_JOBS_BY_ME = "/jobAssignment/allAssignedByManager";
export const UNASSIGNED_JOBS = "/jobAssignment/unAssignManager";

// All Jobs CONFIG
export const GET_ALL_JOBS = "/allvms/getAllFeeds";

//Manager Data Config
export const GET_MANAGER_DATA = "/auth/users/getUsersByManager";

export const POST_ACCOUNT_JOBS = "/jobAssignment/allAssignedByAccountManagers";

// Client Jobs CONFIG
export const GET_ALL_CLIENT = "/allvms/getAllOpenByVMSIdFlux";

// Feed Stats CONFIG
export const GET_FEED_STATS = "/allvms/getFeedUpdateBetweenDate";

// CALCULATOR
export const POST_CALC_RATES = "/travel/perdiem/byCityStateYear";
// Users Config
export const GET_ALL_USER = "/api/v1/user/allUsers";
export const POST_NEW_USER = "/api/v1/user/register";
export const EDIT_USER = "/api/v1/user/updateprofile";

// ROLES
export const GET_ALL_ROLES = "/api/v1/user/allRoles";

// Employee Config
export const GET_ALL_EMPLOYEE = "/";
export const POST_EMPLOYEE = "";

// Organisation Config
export const ORGANISATION = "/api/v1/organisation";

// Employee Config
export const EMPLOYEE = "/api/v1/employee";
export const ADDEMPLOYEE = "/api/v1/employee/saveEmployee";
export const POST_DOCUMENT = "/api/v1/employee/uploadFile";
export const GET_DOCUMENT = "/api/v1/employee/getDocsByEmployeeId";
export const GET_ACCESS_TOKEN = "/api/v1/employee//getAccessToken";
export const DELETE_EMPLOYEE_DOCS = "/api/v1/employee/deleteEmployeeDocument";

//VMS Config
export const POST_VMS = "/api/v1/vms";

//Client Config
export const CLIENT = "/api/v1/client";

//Project Config
export const PROJECT = "/api/v1/project";
export const GET_PROJECT = "/api/v1/project/getProjectByEmployeeId";

//Facility Config
export const FACILITY = "/api/v1/facility";

//Mail Verification
export const MAIL = "/email/sendPasswordReset";
