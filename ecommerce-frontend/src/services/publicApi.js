// services/publicApi.js

import { publicFetch } from "./publicFetch";

const BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsPublic = async () => {
  const res = await publicFetch(`${BASE}/products/`);
  return res.json();
};
