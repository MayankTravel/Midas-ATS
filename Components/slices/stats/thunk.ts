import { GET_FEED_STATS, job_api_host } from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_statdata_error,
  api_is_statdata_loading,
  api_is_statdata_success,
} from "./reducers";
import moment from "moment";

export const fetchStats =
  (fromDate: any, toDate: any) => async (dispatch: any) => {
    var date1 = fromDate
      ? fromDate
      : moment().subtract(1, "days").format("YYYY-MM-DD");
    const date2 = toDate
      ? moment(toDate).format("YYYY-MM-DD")
      : moment().subtract(1, "days").format("YYYY-MM-DD");

    try {
      const options = {
        url: `${job_api_host}${GET_FEED_STATS}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          fromDate: date1,
          toDate: date2,
        }),
      };
      

      dispatch(api_is_statdata_loading(true));
      const fetch_api = axios.request(options);
      const data = await fetch_api;
      dispatch(api_is_statdata_success(data));
      return data;
    } catch (error) {
      dispatch(api_is_statdata_error(error));
      toast.error("API Key Added Failed", { autoClose: 3000 });
      return error;
    }
  };
