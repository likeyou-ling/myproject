// encapsulation request api
import { httpRequest } from "@/utils";

// login
function getLoginAPI(loginData) {
  return httpRequest({
    method: "POST",
    url: "/authorizations",
    data: loginData,
  });
}

// user info
function getUserInfoAPI() {
    return httpRequest({
    method: "GET",
    url: "/user/profile",
  });
}

export { getLoginAPI, getUserInfoAPI };
