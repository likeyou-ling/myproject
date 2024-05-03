import axios from "axios";
import { _getToken } from "./token";
const httpRequest = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// add request catch handle request params
httpRequest.interceptors.request.use((config) => {
  const token = _getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// add reponst catch handle reponse params
httpRequest.interceptors.response.use(
  (response) => {
    // status code in 2XX
    return response.data;
  },
  (error) => {
    // status code not in 2XX
    return Promise.reject(error);
  }
);

export { httpRequest };
