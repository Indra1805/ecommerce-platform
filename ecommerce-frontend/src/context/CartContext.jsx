import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCart,
  addToCartAPI,
  updateCartQtyAPI,
  removeFromCartAPI,
} from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();   // ✅ FIX
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setCart([]);
      return;
    }

    fetchCart().then(setCart);
  }, [isAuthenticated]);

  const addToCart = async (product) => {
    await addToCartAPI(product.id);
    setCart(await fetchCart());
  };

  const updateQty = async (itemId, quantity) => {
    const updated = await updateCartQtyAPI(itemId, quantity);
    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? updated : i))
    );
  };

  const removeFromCart = async (itemId) => {
    await removeFromCartAPI(itemId);
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const isInCart = (pid) =>
    cart.some((i) => i.product.id === pid);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
