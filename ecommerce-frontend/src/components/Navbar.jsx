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
  const { authenticated, user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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

        {/* WISHLIST ICON */}
        {authenticated && (
          <Link
            to="/wishlist"
            className="relative text-red-600 hover:text-red-600 transition"
            aria-label="Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor" // ✅ red fill
              stroke="white" // ✅ black outline
              strokeWidth={1.8}
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733-.716-1.607-2.378-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs px-1.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
        )}

        {/* CART ICON */}
        <Link
          to="/cart"
          className="relative text-gray-800 hover:text-gray-900 transition"
          aria-label="Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M2 2h2l3.6 7.59-1.35 2.44A2 2 0 008 15h12v-2H8.42a.25.25 0 01-.22-.37L9.1 11h7.45a2 2 0 001.8-1.1l3.58-6.49A1 1 0 0021 2H5.21l-.94-2H2z" />
            <circle cx="10" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* AUTH SECTION */}
        {!authenticated ? (
          <>
            <Link to="/register" className="text-sm text-gray-700">
              Sign Up
            </Link>
            <Link to="/login" className="text-sm text-gray-700">
              Login
            </Link>
          </>
        ) : (
          /* PROFILE AVATAR */
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold uppercase cursor-pointer"
            >
              {user?.charAt(0)}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg overflow-hidden">
                <Link
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  My Orders
                </Link>

                <button
                  type="button"
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
