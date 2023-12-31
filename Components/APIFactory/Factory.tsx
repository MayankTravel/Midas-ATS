import axios from "axios";
import { useSelector } from "react-redux";
import { token } from "./token";
import Swal from "sweetalert2";

const Factory = async (method: any, setter: any, url: string, body: any) => {
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
      console.log("");
    }
  }
};
export default Factory;
