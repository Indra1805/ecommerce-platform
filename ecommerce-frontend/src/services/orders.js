import { getCSRFToken } from "./csrf";

export const createOrder = async (cart) => {
  const res = await fetch("http://localhost:8000/api/orders/create/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify({ cart }),
  });

  if (!res.ok) throw new Error("Order failed");
  return res.json();
};
