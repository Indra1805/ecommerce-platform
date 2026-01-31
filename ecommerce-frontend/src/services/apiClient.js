import {
  getAccessToken,
  refreshAccessToken,
} from "./auth";

export const apiFetch = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const access = getAccessToken();
  if (access) {
    headers.Authorization = `Bearer ${access}`;
  }

  let response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // ✅ REQUIRED
  });

  // 🔄 Access token expired → refresh
  if (response.status === 401) {
    try {
      const newAccess = await refreshAccessToken();

      headers.Authorization = `Bearer ${newAccess}`;

      response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // ✅ REQUIRED AGAIN
      });
    } catch {
      throw new Error("Session expired");
    }
  }

  // 🚨 IMPORTANT: throw on real API failure
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API error");
  }

  return response;
};
