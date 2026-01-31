import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderById, cancelOrderAPI } from "../services/api";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderById(id);
        setOrder(data);
      } catch {
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, navigate]);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this order?")) return;

    setCancelling(true);
    try {
      await cancelOrderAPI(id);
      setOrder({ ...order, status: "CANCELLED" });
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20">Loading order...</p>;
  }

  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/orders")}
        className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 cursor-pointer mb-2"
      >
        ← Back to Orders
      </button>

      <h1 className="text-2xl font-bold mb-4">
        Order #{order.id}
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        Status:{" "}
        <span
          className={`font-medium ${
            order.status === "PLACED"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {order.status}
        </span>
      </p>

      <div className="border rounded-xl p-4 space-y-2">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm"
          >
            <span>
              {item.product_title} × {item.quantity}
            </span>
            <span>₹{item.product_price}</span>
          </div>
        ))}
      </div>

      <div className="font-bold text-right mt-4">
        Total: ₹{order.total_amount}
      </div>

      {order.status === "PLACED" && (
        <button
          onClick={handleCancel}
          disabled={cancelling}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 cursor-pointer"
        >
          {cancelling ? "Cancelling..." : "Cancel Order"}
        </button>
      )}
    </div>
  );
}
