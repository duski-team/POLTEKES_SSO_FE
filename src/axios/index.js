import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import qs from "qs";

const ip = "http://localhost:8869/";
let token = localStorage.getItem("SSO_access_token");
let expired = moment(localStorage.getItem("expired")).format("llll");
let datas = {
  client_id: localStorage.getItem("SSO_client_id"),
  grant_type: "refresh_token",
  client_secret: "SSO",
  refresh_token: localStorage.getItem("SSO_refresh_token"),
};

export function setToken(token) {
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

const instance = axios.create({
  baseURL: ip,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

instance.interceptors.request.use(async (req) => {
  if (token) {
    token = localStorage.getItem("SSO_access_token");
    req.headers.Authorization = `Bearer ${token}`;
  } 

    const isExpired = expired <= moment().format("llll");
      token = localStorage.getItem("SSO_access_token");
      req.headers.Authorization = `Bearer ${token}`;

    if (isExpired && token) {
      try {
        console.log(isExpired,'exp');
        let response = await axios.post(
          ip + "oauth/token",
          qs.stringify(datas)
        );
        localStorage.setItem("SSO_access_token", response.data.accessToken);
        req.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return req;
      } catch (error) {
        console.log(error);
      }
    } else {
      return req;
    }
});

export default instance;
