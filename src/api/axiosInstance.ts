import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); //JWT Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(undefined, (error) => {
  const errorStatus: number = error.status;

  //Invalid token (expired token or token not found)
  if (errorStatus === 403) {
    //Removes token and user data from localStorage(if any) and asks user to login
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    window.location.href = "/login";
  }

  return Promise.reject(error);
});
