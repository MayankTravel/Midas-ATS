import axios from "axios";
import { useSelector } from "react-redux";
import { token } from "./token";
import Swal from "sweetalert2";

const Factory = async (
  method: any,

  setter: any,
  url: string,
  body: any
) => {
  if (method === "GET") {
    const options = {
      method: method,
      url: url,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
    };
    const fetch_axios = await axios.request(options);
    const response = await fetch_axios;
    setter = response;
    return response;
  } else {
    try {
      const options = {
        method: method,
        url: url,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(body),
      };
      const fetch_axios = await axios.request(options);
      const response = await fetch_axios;
      setter = response;
      return response;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
        console.error("Response error headers:", error.response.headers);
        Swal.fire({
          title: "Server Error",
          text: `${error.response.data}`,
          timer: 8000,
        });
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        Swal.fire({
          title: "No Response",
          text: "No response received from the server",
          timer: 8000,
        });
        return "No response received from the server";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
        Swal.fire({
          title: "Request Setup Error",
          text: `${error.message}`,
          timer: 8000,
        });
        return error.message;
      }
    }
  }
};
export default Factory;
