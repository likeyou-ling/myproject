import axios from "axios";
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// add request catch handle request params
request.interceptors.request.use((config) => {
  return config;
});

// add reponst catch handle reponse params
request.interceptors.reposinse.use(
  (response) => {
    // status code in 2XX
    return response;
  },
  (error) => {
    // status code not in 2XX
    return Promise.reject(error);
  }
);

export {request};
