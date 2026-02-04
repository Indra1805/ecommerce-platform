import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();   // ✅ FIX
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    fetchWishlist()
      .then((data) =>
        setWishlist(data.map((i) => i.product))
      );
  }, [isAuthenticated]);

  const toggleWishlist = async (product) => {
    if (!isAuthenticated) {
      alert("Please login to use wishlist");
      return;
    }

    const exists = wishlist.some(
      (p) => p.id === product.id
    );

    if (exists) {
      await removeFromWishlist(product.id);
      setWishlist((prev) =>
        prev.filter((p) => p.id !== product.id)
      );
    } else {
      await addToWishlist(product.id);
      setWishlist((prev) => [...prev, product]);
    }
  };

  const isWishlisted = (id) =>
    wishlist.some((p) => p.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
