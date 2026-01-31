const API_URL = import.meta.env.VITE_AUTH_BASE_URL;
const ACCESS_KEY = "access_token";
import { getCSRFToken } from "./csrf";

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔥 allow cookies
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { access }
};

export const setAccessToken = (access) =>
  localStorage.setItem(ACCESS_KEY, access);

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_KEY);

export const clearAccessToken = () =>
  localStorage.removeItem(ACCESS_KEY);

export const refreshAccessToken = async () => {
  const res = await fetch(`${API_URL}/refresh/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": getCSRFToken(),
    },
  });

  if (!res.ok) throw new Error("Session expired");

  const data = await res.json();
  setAccessToken(data.access);
  return data.access;
};


export const logoutUser = async () => {
  await fetch(`${API_URL}/logout/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": getCSRFToken(),
    },
  });
};

// export const logoutUser = async () => {
//   await fetch("http://localhost:8000/api/auth/logout/", {
//     method: "POST",
//     credentials: "include", // 🔥 required to send cookie
//   });
// };