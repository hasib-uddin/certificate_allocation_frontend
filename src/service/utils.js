/** @format */
import axios from "axios";
export const api_url = `http://localhost:4000/`;

export const fetch = async (
  endPoint = "",
  method = "get", //bydefault get leta h
  data = null, //body
  headers = {}
) => {
  const instance = axios.create({
    baseURL: "http://localhost:4000/",
  });
  return await instance({
    url: endPoint,
    method,
    data,
    headers,
  });
};


export const scrollToTop = (top = 0) => {
  window.scrollTo({
    top: top,
    behavior: "smooth",
  });
};






