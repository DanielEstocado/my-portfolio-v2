import axios from "axios";

// The one HTTP client every request in the app goes through, set VITE_API_URL in .env, not per-call.
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// Fails loudly when VITE_API_URL is missing instead of sending requests to the wrong host, a full URL to another service does not need it.
axiosInstance.interceptors.request.use((config) => {
  const isAbsoluteUrl = /^https?:\/\//.test(config.url ?? "");
  if (!config.baseURL && !isAbsoluteUrl) {
    return Promise.reject(new Error("VITE_API_URL is not set. Copy .env.example to .env and fill it in."));
  }
  return config;
});
