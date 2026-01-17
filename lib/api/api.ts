import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});