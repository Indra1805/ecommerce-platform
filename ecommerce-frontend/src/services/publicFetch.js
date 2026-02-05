// services/publicFetch.js

export const publicFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res;
};
