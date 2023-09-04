import axios from "axios";

const apiKeyHeaders = {
  "X-API-KEY": "0a65017c-ecc9-4a86-9cf5-be06f1af36ad",
};
export let token = localStorage.getItem("token");
export const setToken = (t: string) => {
  token = t;
};
export const axiosInstance = axios.create({
  baseURL: "https://fullstack.exercise.applifting.cz",
  headers: { ...apiKeyHeaders, Authorization: token },
});
