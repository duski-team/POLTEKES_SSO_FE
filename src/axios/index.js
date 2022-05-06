import axios from "axios";

let token = localStorage.getItem('SSO_access_token')

axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

const ip = "http://localhost:8869";

export default axios.create({
  baseURL: ip,
});
