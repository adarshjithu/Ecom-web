// src/axiosInstance.js
import { showError } from '@/helpers/notification_helper';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // important so cookies are sent/received
});

// Flag to prevent multiple refresh calls at the same time
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor — you can attach headers if needed
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (!response) {
      showError("Network error or server not reachable.");
      return Promise.reject(error);
    }

    // Handle Unauthorized (401)
    if (response.status === 401 && !config._retry) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(config))
          .catch((err) => Promise.reject(err));
      }

      config._retry = true;
      isRefreshing = true;

      try {
        // 🔑 Call your regenerate-accessToken API
        await axios.get(
          `${import.meta.env.VITE_BASE_URL}auth/regenerate-accesstoken`,
          { withCredentials: true }
        );

        isRefreshing = false;
        processQueue(null);

        // Retry the original request
        return axiosInstance(config);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);

        showError("Session expired. Please login again.");
        Cookies.remove("user");
        // window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    // Handle 500 Internal Server Error
    if (response.status === 500) {
      const message = response.data?.message;
      if (message?.startsWith("The DELETE statement")) {
        showError("Unable to delete as dependencies found.");
      } else {
        console.log(message);
        showError(message || "Internal Server Error");
      }
    } 
    
    // Handle Bad Request
    else if (response.status === 400) {
      return Promise.reject({ response: { status: response.status, data: response.data } });
    }

    // Conflict
    else if (response.status === 409) {
      showError(response?.data.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;