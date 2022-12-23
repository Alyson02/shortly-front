import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvaider/Util";

export const Api = axios.create({
  baseURL: "https://shortly-api-xg9b.onrender.com",
  // baseURL: "http://localhost:4000"
});

Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    config.headers.Authorization = `Bearer ${user?.token}`;
    console.log("Service - Api", `Bearer ${user?.token}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
