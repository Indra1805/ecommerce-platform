import { apiFetch } from "./apiClient";
import { publicFetch } from "./publicFetch";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// PRODUCTS
export const fetchProducts = async () => {
  const res = await publicFetch(`${BASE_URL}/products/`);
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await publicFetch(`${BASE_URL}/product/${id}/`);
  return res.json();
};



// WISHLIST
export const fetchWishlist = async () => {
  const res = await apiFetch(`${BASE_URL}/wishlist/wishlist/`);
  return res.json();
};

export const addToWishlist = async (productId) => {
  await apiFetch(`${BASE_URL}/wishlist/wishlist/`, {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
};

export const removeFromWishlist = async (productId) => {
  await apiFetch(`${BASE_URL}/wishlist/wishlist/`, {
    method: "DELETE",
    body: JSON.stringify({ product_id: productId }),
  });
};

// CART
export const fetchCart = async () => {
  const res = await apiFetch(`${BASE_URL}/cart/cart/`);
  return res.json();
};

export const addToCartAPI = async (productId) => {
  await apiFetch(`${BASE_URL}/cart/cart/`, {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
};

export const updateCartQtyAPI = async (itemId, quantity) => {
  const res = await apiFetch(`${BASE_URL}/cart/cart/`, {
    method: "PATCH",
    body: JSON.stringify({ item_id: itemId, quantity }),
  });
  return res.json();
};

export const removeFromCartAPI = async (itemId) => {
  await apiFetch(`${BASE_URL}/cart/cart/`, {
    method: "DELETE",
    body: JSON.stringify({ item_id: itemId }),
  });
};

// ✅ ORDERS
export const createOrder = async (cart) => {
  const res = await apiFetch(`${BASE_URL}/orders/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart }),
  });

  return res.json();
};


export const fetchMyOrders = async () => {
  const res = await apiFetch(`${BASE_URL}/orders/my/`);
  return res.json();
};

export const fetchOrderById = async (orderId) => {
  const res = await apiFetch(`${BASE_URL}/orders/${orderId}/`);
  return res.json();
};

export const cancelOrderAPI = async (orderId) => {
  await apiFetch(`${BASE_URL}/orders/${orderId}/cancel/`, {
    method: "PATCH",
  });
};