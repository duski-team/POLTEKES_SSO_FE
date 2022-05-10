import axios from "axios";

export function setToken(token){
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

const ip = "http://localhost:8869";

export default axios.create({
  baseURL: ip,
});
