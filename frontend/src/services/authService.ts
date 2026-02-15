import axios from "axios";
import type { LoginData, RegisterData } from "../types/Auth";

const API = "https://librarymanagementsystem-production-c055.up.railway.app/api/auth";

export const registerUser = (data: RegisterData) => {
  return axios.post(`${API}/register`, data);
};

export const loginUser = (data: LoginData) => {
  return axios.post(`${API}/login`, data);
};