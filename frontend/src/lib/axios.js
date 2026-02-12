import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3500/api"
      : `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
});
