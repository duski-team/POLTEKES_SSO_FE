import axios from "axios";

const ip = "http://localhost:8869";

export default axios.create({
  baseURL: ip,
});
