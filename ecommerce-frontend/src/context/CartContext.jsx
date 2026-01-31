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
  const { authenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    if (!authenticated) {
      setCart([]);
      return;
    }

    fetchCart().then(setCart);
  }, [authenticated]);

  const addToCart = async (product) => {
    await addToCartAPI(product.id);
    const updated = await fetchCart();
    setCart(updated);
  };

  const updateQty = async (itemId, quantity) => {
    const updatedItem = await updateCartQtyAPI(itemId, quantity);
    setCart((prev) => prev.map((i) => (i.id === itemId ? updatedItem : i)));
  };

  const removeFromCart = async (itemId) => {
    await removeFromCartAPI(itemId);
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const isInCart = (productId) => cart.some((i) => i.product.id === productId);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
