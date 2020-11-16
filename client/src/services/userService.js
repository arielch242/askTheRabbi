import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null; // user is not logged
  }
}

export const getCurrentUserDetails = async (user) => {
  try {
    let response = await http.get(`${apiUrl}/users/me`, user);
    let { name, favs } = response.data;
    let userDetails = [name, favs];              // returns an array of user details where name is on place 0 and favs is on place 1 
    return userDetails;
  } catch (err) {}
};

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export default { login, getCurrentUser, logout, getJwt, getCurrentUserDetails };
