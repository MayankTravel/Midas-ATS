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
          "Content-type": "application/json , multipart/form-data",
          Authorization: `Bearer ${token()}`,
        },
        data: JSON.stringify(body),
      };
      const fetch_axios = await axios.request(options);
      const response = await fetch_axios;
      setter = response;
      return response;
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong",
        text: `${error}`,
        timer: 8000,
      });
      return error;
    }
  }
};
export default Factory;
