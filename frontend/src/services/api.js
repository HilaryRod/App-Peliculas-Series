import axios from "axios";

export const api = axios.create({
  baseURL: 'https://app-peliculas-series.vercel.app/api',
  withCredentials: true,
});
