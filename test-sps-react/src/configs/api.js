import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 30000,
});

api.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem("token");

    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { status } = error.response;

    if (status === 403) {
      window.localStorage.clear();

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default api;
