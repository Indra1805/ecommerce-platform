import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";

import "./index.css";

import { AuthProvider, useAuth } from "./context/AuthContext";

function AppBootstrap() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <AppBootstrap />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
