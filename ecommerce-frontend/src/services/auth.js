// services/auth.js

const API_URL = import.meta.env.VITE_AUTH_BASE_URL;
const ACCESS_KEY = "access_token";

// ---------------- TOKEN STORAGE ----------------

export const setAccessToken = (token) => {
  localStorage.setItem(ACCESS_KEY, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_KEY);
};

export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_KEY);
};

// ---------------- AUTH ----------------

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Registration failed");
  }

  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  setAccessToken(data.access);
  return data;
};

/**
 * IMPORTANT:
 * If refresh cookie doesn't exist → return null
 * Do NOT throw.
 */

export const refreshAccessToken = async () => {
  const res = await fetch(`${API_URL}/refresh/`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    return null; // 👈 NOT THROW
  }

  const data = await res.json();
  setAccessToken(data.access);
  return data.access;
};

export const fetchMe = async (token) => {
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
};

export const logoutUser = async () => {
  await fetch(`${API_URL}/logout/`, {
    method: "POST",
    credentials: "include",
  });

  clearAccessToken();
};
