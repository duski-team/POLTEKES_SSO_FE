import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import store from "@/store/index.js";
import qs from "qs";

// const ip = "http://localhost:8869/";
const ip = "https://billing.poltekkes-smg.ac.id/api/";

// export function setToken(token) {
//   axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
// }

const instance = axios.create({
  baseURL: ip,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

instance.interceptors.request.use(async (req) => {
  let token = store.state.sso_access_token;
  let expired = store.state.expired;
  let now = moment();
  // console.log('start', token,req.url)
  if (!token) {
    // console.log('no token', token)
    token = store.state.sso_access_token;
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  } else {
    if (!expired) {
      // console.log("no expired", expired);
      token = store.state.sso_access_token;
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    } else {
      // console.log('yes token', token)
      const isExpired = now.diff(expired, "seconds") > 0;
      if (isExpired && token && expired) {
        console.log("isExpired", isExpired, token, req.url);
        let datas = {
          client_id: store.state.sso_client_id,
          grant_type: "refresh_token",
          client_secret: "SSO",
          refresh_token: store.state.sso_refresh_token,
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
          // console.log(response.data);
          store.dispatch("save_token_intercept", response.data);
          req.headers.Authorization = `Bearer ${store.state.sso_access_token}`;
          console.log("tokenbaru", store.state.sso_access_token);
          return req;
        } catch (error) {
          console.log(error);
        }
      } else {
        req.headers.Authorization = `Bearer ${store.state.sso_access_token}`;
        return req;
      }
    }
  }
});

export default instance;
