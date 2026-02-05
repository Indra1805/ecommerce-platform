import { getAccessToken, refreshAccessToken } from "./auth";

export const apiFetch = async (url, options = {}) => {
  const makeRequest = async (token) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
  };

  let token = getAccessToken();
  let res = await makeRequest(token);

  // 🔁 Try refresh ONCE
  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      res = await makeRequest(newToken);
    } catch {
      throw new Error("Session expired");
    }
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res;
};
