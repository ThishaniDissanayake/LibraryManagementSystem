import axios from "axios";
import type { LoginData, RegisterData } from "../types/Auth";

const API = "http://localhost:5116/api/auth";

export const registerUser = (data: RegisterData) => {
  return axios.post(`${API}/register`, data);
};

export const loginUser = (data: LoginData) => {
  return axios.post(`${API}/login`, data);
};