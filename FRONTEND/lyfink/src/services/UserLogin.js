import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users/login";

//Register
export const registerUser = (userData) => {
  return axios.post(`${BASE_URL}/register`, userData);
};

//Login
export const loginUser = (loginData) => {
  return axios.post(`${BASE_URL}`, loginData);
};
