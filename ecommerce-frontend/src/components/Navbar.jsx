import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { search, setSearch } = useSearch();
  const { isAuthenticated, user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-5">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          One8
        </Link>

        {/* SEARCH */}
        <input
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* WISHLIST */}
        {isAuthenticated && (
          <Link to="/wishlist" className="relative text-red-600">
            ❤️
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs px-1.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
        )}

        {/* CART */}
        <Link to="/cart" className="relative">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* AUTH */}
        {!isAuthenticated ? (
          <>
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer"
            >
              {user?.username?.charAt(0).toUpperCase()}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                <Link
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Orders
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
