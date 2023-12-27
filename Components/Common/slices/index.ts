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
import userSlice from "./user/reducers";
import organisationSlice from "./organisation/reducer";
import vmsSlice from "./vms/reducer";
import clientSlice from "./client/reducer";
import employeeSlice from "./employee/reducers";
import projectSlice from "./project/reducer";
import facilitySlice from "./facility/reducer";

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
  user: userSlice,
  organisationdata: organisationSlice,
  vms: vmsSlice,
  client: clientSlice,
  employee: employeeSlice,
  project: projectSlice,
  facility: facilitySlice,
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
