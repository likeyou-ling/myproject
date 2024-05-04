import axios from "axios";
import { _getToken } from "./token";
import { clearUserInfo } from "@/store/modules/user";
import router from "@/router";
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
    if (error.response.status === 401) {
      // need to login
      clearUserInfo();
      router.navigate("/login");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { httpRequest };
