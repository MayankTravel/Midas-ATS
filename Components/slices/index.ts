import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// Front
import LayoutReducer from "./layouts/reducer";
import calendarSlice from "./calendar/reducer";
import APIKeyslice from "./apiKey/reducer";
import contactslice from "./contact/reducer";
import teamslice from "./team/reducer";
import dashboardslice from "./dashboard/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import vmsSlice from "./vms/reducers";
import userSlice from "./user/reducers";
import jobSlice from "./jobs/_alljobs/reducers";
import clientSlice from "./jobs/_client/reducers";
import assignSlice from "./jobs/_assigned/reducers";
import statSlice from "./stats/reducers";
import calcSlice from "./calculator/reducers";
import managerSlice from "./auth/manager/reducer";
import clientHRMSSlice from "./client/reducer";
import employeeSlice from "./employee/reducers";
import projectSlice from "./project/reducer";
import facilitySlice from "./facility/reducer";
import organisationSlice from "./organisation/reducer";

const combinedReducer = combineReducers({
  Layout: LayoutReducer,
  Calendar: calendarSlice,
  APIKey: APIKeyslice,
  Contacts: contactslice,
  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Team: teamslice,
  Dashboard: dashboardslice,
  VMS: vmsSlice,
  user: userSlice,
  jobFeeds: jobSlice,
  clientFeeds: clientSlice,
  statFeed: statSlice,
  calc: calcSlice,
  assignFeed: assignSlice,
  managerFeed: managerSlice,
  client: clientHRMSSlice,
  employee: employeeSlice,
  project: projectSlice,
  facility: facilitySlice,
  organisationdata: organisationSlice,
});

export const store = configureStore({
  reducer: combinedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
