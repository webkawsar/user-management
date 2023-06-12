import axios from "axios";

const isProduction = import.meta.env.PROD;

export const axiosInstance = axios.create({
  baseURL: isProduction
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL,
});

export const axiosPrivateInstance = (token) => {
  return axios.create({
    baseURL: isProduction
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
