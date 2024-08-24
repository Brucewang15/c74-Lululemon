import axios from "axios";
import { serverAPI } from "../redux/utils/helper";
import { reduxStore } from "../redux/store";
import { logout } from "../redux/actions/authAction";

const authAxios = axios.create({
  baseURL: `${serverAPI}`,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401 && error.response.data.redirectToLogin) {
        console.log("interceptor error");
        reduxStore.dispatch(logout());
        window.location.href = "/login";
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default authAxios;
