const API_URL = import.meta.env.VITE_AUTH_BASE_URL;
const ACCESS_KEY = "access_token";

export const setAccessToken = (t) =>
  localStorage.setItem(ACCESS_KEY, t);

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_KEY);

export const clearAccessToken = () =>
  localStorage.removeItem(ACCESS_KEY);

export const loginUser = async (cred) => {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(cred),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  setAccessToken(data.access);
  return data;
};

export const refreshAccessToken = async () => {
  const res = await fetch(`${API_URL}/refresh/`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("No session");

  const data = await res.json();
  setAccessToken(data.access);
  return data.access;
};

export const fetchMe = async () => {
  const res = await fetch(`${API_URL}/me/`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
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
