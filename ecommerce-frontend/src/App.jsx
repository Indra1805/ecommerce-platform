import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <>
      <Navbar />

      {/* GLOBAL CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />

          <Route
            path="/wishlist"
            element={
              <RequireAuth>
                <Wishlist />
              </RequireAuth>
            }
          />

          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <RequireAuth>
                <OrderDetails />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </>
  );
}
