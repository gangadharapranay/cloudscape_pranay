import axios from "axios";
const token =
  localStorage.getItem("token");
       const BaseApi = axios.create({
  baseURL: "http://192.168.1.110:8000",
  headers: {
    "Content-Type": "application/json",
    "access-token": token,
  },
});

export default BaseApi;
