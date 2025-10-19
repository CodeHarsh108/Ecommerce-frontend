import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or Redux store
    const authData = localStorage.getItem("auth");
    if (authData) {
      const { jwtToken } = JSON.parse(authData);
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
