import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { authenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOAD WISHLIST AFTER LOGIN
  useEffect(() => {
    if (!authenticated) {
      setWishlist([]);
      return;
    }

    setLoading(true);
    fetchWishlist()
      .then((data) => {
        // backend returns [{ id, product, created_at }]
        setWishlist(data.map(item => item.product));
      })
      .catch(() => {
        setWishlist([]);
      })
      .finally(() => setLoading(false));
  }, [authenticated]);

  const toggleWishlist = async (product) => {
    if (!authenticated) {
      alert("Please login to use wishlist");
      return;
    }

    const exists = wishlist.some(p => p.id === product.id);

    if (exists) {
      await removeFromWishlist(product.id);
      setWishlist(prev => prev.filter(p => p.id !== product.id));
    } else {
      await addToWishlist(product.id);
      setWishlist(prev => [...prev, product]);
    }
  };

  const isWishlisted = (id) =>
    wishlist.some(p => p.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
