import axios from "axios";
import { config } from "./config";

const api = () => {
  return axios.create({
    baseURL: config.apiBackend,
  });
};

export default api;
