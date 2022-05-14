import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import qs from "qs";

const ip = "http://localhost:8869/";
let token = localStorage.getItem("SSO_access_token");

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
  let token = localStorage.getItem("SSO_access_token");
  let expired = localStorage.getItem("expired");
  let now = moment();
  console.log('start', token,req.url)
  if (!token) {
    console.log('no token', token)
    token = localStorage.getItem("SSO_access_token");
    req.headers.Authorization = `Bearer ${token}`;
    return req
  } else {
    if (!expired) {
      console.log("no expired", expired);
      token = localStorage.getItem("SSO_access_token");
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    } else {
      const isExpired = now.diff(expired, "seconds") > 0;
      if (isExpired && token && expired) {
        console.log('isExpired', isExpired, token, req.url)
        let datas = {
          client_id: localStorage.getItem("SSO_client_id"),
          grant_type: "refresh_token",
          client_secret: "SSO",
          refresh_token: localStorage.getItem("SSO_refresh_token"),
        };
        try {
          console.log(
            isExpired,
            "exp",
            moment(expired).format("llll"),
            moment(now).format("llll"),
            now.diff(expired, "seconds")
          );
          let response = await axios.post(
            ip + "oauth/token",
            qs.stringify(datas)
          );
          console.log(response);
          localStorage.setItem("SSO_access_token", response.data.accessToken);
          localStorage.setItem("expired", response.data.accessTokenExpiresAt);
          req.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return req;
        } catch (error) {
          console.log(error);
        }
      } else {
        return req;
      }
    }
  }
});

export default instance;
