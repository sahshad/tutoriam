import axios from "axios";
import store  from "../redux/store";
import { refreshToken } from "../services/authService";
import {logout  } from '../redux/slices/authSlice'

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken(store.dispatch);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch {
        console.error("Session expired. Please log in again.");
        store.dispatch(logout());
        localStorage.clear()
      }
    }

    if (error.response.status === 403) {
      console.error("You do not have permission to access this resource.");
      localStorage.clear()
      store.dispatch(logout()); 
      return Promise.reject(error); 
    }

    return Promise.reject(error);
  }
);

export default api;
