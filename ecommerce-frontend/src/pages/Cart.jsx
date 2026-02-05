import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { createOrder } from "../services/api";

export default function Cart() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <Link
          to="/"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // ✅ SAFE CHECKOUT
  const handleCheckout = async () => {
    try {
      setLoading(true);

      const order = await createOrder(cart); // only this matters
      console.log(order)
      if (order?.id) {
        clearCart();
        navigate("/orders");
      } else {
        throw new Error("Order not created");
      }

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <div className="bg-white border rounded-xl p-4 w-full sm:w-80">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">
              ₹{total.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
